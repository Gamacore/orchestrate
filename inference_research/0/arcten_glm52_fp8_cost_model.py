#!/usr/bin/env python3
"""Reproducible unit-economics model for Arcten GLM-5.2-FP8 serving.

Current-source inputs as of 2026-08-01:
- Proposed Arcten token prices from the research brief.
- CoreWeave HGX B200: $68.80/h on-demand, $34.11/h spot, 8 x 180 GB HBM.
- AWS P6-B200 capacity block: $98.84/h per 8-GPU instance.
- GLM-5.2-FP8 config: 78 layers, kv_lora_rank=512,
  qk_rope_head_dim=64, FP8 KV assumed at one byte per stored scalar.

The script intentionally does not insert an unverified GLM-5.2-FP8 throughput.
It reports break-even thresholds and clearly labeled planning scenarios instead.
"""

from __future__ import annotations

import csv
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable

OUT_DIR = Path(__file__).resolve().parent


@dataclass(frozen=True)
class Tier:
    input_per_m: float
    cached_input_per_m: float
    output_per_m: float


@dataclass(frozen=True)
class RateCase:
    raw_node_usd_per_hour: float
    productive_utilization: float = 1.0
    reserve_fraction: float = 0.0

    @property
    def effective_usd_per_productive_hour(self) -> float:
        if not 0 < self.productive_utilization <= 1:
            raise ValueError("productive_utilization must be in (0, 1]")
        return (
            self.raw_node_usd_per_hour
            * (1.0 + self.reserve_fraction)
            / self.productive_utilization
        )


TIERS: Dict[str, Tier] = {
    "Now": Tier(1.40, 0.26, 4.40),
    "Priority": Tier(0.70, 0.18, 3.00),
    "Standard": Tier(0.50, 0.12, 2.50),
    "Flex": Tier(0.40, 0.08, 1.80),
}

# Illustrative Stripe domestic-card variable fee. The fixed $0.30 fee should be
# amortized through account top-ups or invoices, not applied per API request.
VARIABLE_PAYMENT_FEE = 0.029
TARGET_GROSS_MARGIN = 0.30

# Representative token mixes for sensitivity analysis. These are workload
# assumptions, not measurements of Arcten customer traffic.
WORKLOADS = {
    "Interactive": {"input_tokens": 4_000, "output_tokens": 1_000, "cached_fraction": 0.10},
    "Agentic": {"input_tokens": 32_000, "output_tokens": 4_000, "cached_fraction": 0.60},
    "Long-context": {"input_tokens": 128_000, "output_tokens": 8_000, "cached_fraction": 0.75},
    "Batch summarization": {"input_tokens": 64_000, "output_tokens": 1_000, "cached_fraction": 0.20},
}

RATE_CASES: Dict[str, RateCase] = {
    "CoreWeave B200 on-demand, theoretical 100%": RateCase(68.80),
    "CoreWeave B200 on-demand, 85% utilization + 10% reserve": RateCase(
        68.80, 0.85, 0.10
    ),
    "CoreWeave B200 on-demand, 50% utilization + 10% reserve": RateCase(
        68.80, 0.50, 0.10
    ),
    "CoreWeave B200 spot, 75% utilization + 20% reserve": RateCase(
        34.11, 0.75, 0.20
    ),
    "AWS P6-B200 block, 85% utilization + 10% reserve": RateCase(
        98.84, 0.85, 0.10
    ),
}

# These are planning assumptions, not measured GLM-5.2-FP8 results.
PLANNING_SCENARIOS = {
    "Low load": {
        "rate": RateCase(68.80, 0.15, 0.15),
        "prefill_goodput_tps": 15_000,
        "decode_goodput_tps": 1_500,
    },
    "Burst": {
        "rate": RateCase(68.80, 0.55, 0.12),
        "prefill_goodput_tps": 30_000,
        "decode_goodput_tps": 6_000,
    },
    "Sustained": {
        "rate": RateCase(68.80, 0.85, 0.10),
        "prefill_goodput_tps": 45_000,
        "decode_goodput_tps": 10_000,
    },
    "Flex / spot": {
        "rate": RateCase(34.11, 0.75, 0.20),
        "prefill_goodput_tps": 45_000,
        "decode_goodput_tps": 10_000,
    },
    "Failure / fallback": {
        # 70% spot + 30% on-demand before reserve/utilization.
        "rate": RateCase(0.70 * 34.11 + 0.30 * 68.80, 0.55, 0.30),
        "prefill_goodput_tps": 30_000,
        "decode_goodput_tps": 6_000,
    },
}


def component_cost_per_million(
    effective_usd_per_hour: float, goodput_tokens_per_second: float
) -> float:
    if goodput_tokens_per_second <= 0:
        raise ValueError("goodput_tokens_per_second must be positive")
    return effective_usd_per_hour * 1_000_000 / (3_600 * goodput_tokens_per_second)


def break_even_tps(effective_usd_per_hour: float, price_per_million: float) -> float:
    if price_per_million <= 0:
        raise ValueError("price_per_million must be positive")
    return effective_usd_per_hour * 1_000_000 / (3_600 * price_per_million)


def write_csv(path: Path, fieldnames: Iterable[str], rows: Iterable[dict]) -> None:
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(fieldnames))
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    break_even_rows = []
    for rate_name, rate_case in RATE_CASES.items():
        r_eff = rate_case.effective_usd_per_productive_hour
        for tier_name, tier in TIERS.items():
            break_even_rows.append(
                {
                    "rate_case": rate_name,
                    "raw_node_usd_per_hour": round(rate_case.raw_node_usd_per_hour, 6),
                    "productive_utilization": rate_case.productive_utilization,
                    "reserve_fraction": rate_case.reserve_fraction,
                    "effective_usd_per_productive_hour": round(r_eff, 6),
                    "tier": tier_name,
                    "break_even_uncached_input_tps": round(
                        break_even_tps(r_eff, tier.input_per_m), 3
                    ),
                    "break_even_output_tps": round(
                        break_even_tps(r_eff, tier.output_per_m), 3
                    ),
                    "break_even_input_tps_after_2_9pct_variable_fee": round(
                        break_even_tps(
                            r_eff, tier.input_per_m * (1.0 - VARIABLE_PAYMENT_FEE)
                        ),
                        3,
                    ),
                    "break_even_output_tps_after_2_9pct_variable_fee": round(
                        break_even_tps(
                            r_eff, tier.output_per_m * (1.0 - VARIABLE_PAYMENT_FEE)
                        ),
                        3,
                    ),
                    "input_tps_for_30pct_gm_after_variable_fee": round(
                        break_even_tps(
                            r_eff,
                            tier.input_per_m
                            * (1.0 - VARIABLE_PAYMENT_FEE - TARGET_GROSS_MARGIN),
                        ),
                        3,
                    ),
                    "output_tps_for_30pct_gm_after_variable_fee": round(
                        break_even_tps(
                            r_eff,
                            tier.output_per_m
                            * (1.0 - VARIABLE_PAYMENT_FEE - TARGET_GROSS_MARGIN),
                        ),
                        3,
                    ),
                }
            )

    scenario_rows = []
    for scenario_name, scenario in PLANNING_SCENARIOS.items():
        rate_case = scenario["rate"]
        r_eff = rate_case.effective_usd_per_productive_hour
        prefill = scenario["prefill_goodput_tps"]
        decode = scenario["decode_goodput_tps"]
        scenario_rows.append(
            {
                "scenario": scenario_name,
                "raw_node_usd_per_hour": round(rate_case.raw_node_usd_per_hour, 6),
                "productive_utilization": rate_case.productive_utilization,
                "reserve_fraction": rate_case.reserve_fraction,
                "effective_usd_per_productive_hour": round(r_eff, 6),
                "assumed_prefill_goodput_tps": prefill,
                "assumed_decode_goodput_tps": decode,
                "uncached_input_cogs_per_m": round(
                    component_cost_per_million(r_eff, prefill), 6
                ),
                "output_cogs_per_m": round(
                    component_cost_per_million(r_eff, decode), 6
                ),
            }
        )

    # Lower-bound MLA KV payload for a 1M-token prefix. This excludes allocator,
    # metadata, indexer cache, MTP buffers, and fragmentation.
    layers = 78
    kv_lora_rank = 512
    qk_rope_head_dim = 64
    fp8_bytes = 1
    tokens = 1_000_000
    kv_payload_bytes = layers * (kv_lora_rank + qk_rope_head_dim) * fp8_bytes * tokens
    kv_payload_gb = kv_payload_bytes / 1_000_000_000
    b200_node_hbm_gb = 8 * 180

    cache_rows = []
    for rate_name, node_rate in {
        "CoreWeave B200 on-demand": 68.80,
        "CoreWeave B200 spot": 34.11,
    }.items():
        for minutes in (1, 5, 15, 60):
            opportunity_cost = (
                node_rate * (kv_payload_gb / b200_node_hbm_gb) * (minutes / 60)
            )
            row = {
                "rate_case": rate_name,
                "retention_minutes": minutes,
                "lower_bound_kv_payload_gb": round(kv_payload_gb, 6),
                "b200_node_hbm_gb": b200_node_hbm_gb,
                "hbm_opportunity_cost_usd": round(opportunity_cost, 6),
            }
            for tier_name, tier in TIERS.items():
                row[f"hits_to_cover_{tier_name.lower()}_cached_price"] = round(
                    opportunity_cost / tier.cached_input_per_m, 6
                )
            cache_rows.append(row)

    # Illustrative workload-level margins. Now/Priority/Standard use the
    # sustained on-demand planning scenario. Flex uses the spot planning scenario.
    # Cached-input COGS is a lower-bound HBM opportunity cost for a 1M-token prefix
    # retained five minutes and reused twice; it excludes cache-control overhead.
    od_rate = PLANNING_SCENARIOS["Sustained"]["rate"].effective_usd_per_productive_hour
    od_input_cogs = component_cost_per_million(
        od_rate, PLANNING_SCENARIOS["Sustained"]["prefill_goodput_tps"]
    )
    od_output_cogs = component_cost_per_million(
        od_rate, PLANNING_SCENARIOS["Sustained"]["decode_goodput_tps"]
    )
    spot_rate = PLANNING_SCENARIOS["Flex / spot"]["rate"].effective_usd_per_productive_hour
    spot_input_cogs = component_cost_per_million(
        spot_rate, PLANNING_SCENARIOS["Flex / spot"]["prefill_goodput_tps"]
    )
    spot_output_cogs = component_cost_per_million(
        spot_rate, PLANNING_SCENARIOS["Flex / spot"]["decode_goodput_tps"]
    )
    od_cached_cogs = (
        68.80 * (kv_payload_gb / b200_node_hbm_gb) * (5 / 60) / 2
    )
    spot_cached_cogs = (
        34.11 * (kv_payload_gb / b200_node_hbm_gb) * (5 / 60) / 2
    )

    workload_rows = []
    for workload_name, workload in WORKLOADS.items():
        input_tokens = workload["input_tokens"]
        output_tokens = workload["output_tokens"]
        cached_fraction = workload["cached_fraction"]
        uncached_tokens = input_tokens * (1.0 - cached_fraction)
        cached_tokens = input_tokens * cached_fraction
        for tier_name, tier in TIERS.items():
            if tier_name == "Flex":
                input_cogs, cached_cogs, output_cogs = (
                    spot_input_cogs,
                    spot_cached_cogs,
                    spot_output_cogs,
                )
                infrastructure_case = "Flex / spot planning scenario"
            else:
                input_cogs, cached_cogs, output_cogs = (
                    od_input_cogs,
                    od_cached_cogs,
                    od_output_cogs,
                )
                infrastructure_case = "Sustained on-demand planning scenario"

            revenue = (
                uncached_tokens * tier.input_per_m
                + cached_tokens * tier.cached_input_per_m
                + output_tokens * tier.output_per_m
            ) / 1_000_000
            gpu_cache_cogs = (
                uncached_tokens * input_cogs
                + cached_tokens * cached_cogs
                + output_tokens * output_cogs
            ) / 1_000_000
            payment_fee = revenue * VARIABLE_PAYMENT_FEE
            contribution = revenue - gpu_cache_cogs - payment_fee
            workload_rows.append(
                {
                    "workload": workload_name,
                    "tier": tier_name,
                    "infrastructure_case": infrastructure_case,
                    "input_tokens": input_tokens,
                    "output_tokens": output_tokens,
                    "cached_input_fraction": cached_fraction,
                    "revenue_usd_per_request": round(revenue, 9),
                    "gpu_idle_reserve_and_cache_cogs_usd_per_request": round(
                        gpu_cache_cogs, 9
                    ),
                    "variable_payment_fee_usd_per_request": round(payment_fee, 9),
                    "contribution_usd_before_fixed_and_control_plane_costs": round(
                        contribution, 9
                    ),
                    "illustrative_gross_margin_fraction": round(
                        contribution / revenue, 9
                    ),
                }
            )

    compile_rows = []
    for node_name, node_rate in {
        "CoreWeave B200 on-demand": 68.80,
        "CoreWeave B200 spot": 34.11,
        "CoreWeave H200 on-demand": 50.44,
    }.items():
        for minutes in (15, 30):
            compile_rows.append(
                {
                    "node": node_name,
                    "compile_minutes": minutes,
                    "node_time_cost_usd": round(node_rate * minutes / 60, 6),
                }
            )

    write_csv(
        OUT_DIR / "arcten_break_even_goodput.csv",
        break_even_rows[0].keys(),
        break_even_rows,
    )
    write_csv(
        OUT_DIR / "arcten_planning_scenario_cogs.csv",
        scenario_rows[0].keys(),
        scenario_rows,
    )
    write_csv(
        OUT_DIR / "arcten_kv_cache_economics.csv",
        cache_rows[0].keys(),
        cache_rows,
    )
    write_csv(
        OUT_DIR / "arcten_compile_cost.csv",
        compile_rows[0].keys(),
        compile_rows,
    )
    write_csv(
        OUT_DIR / "arcten_workload_margins.csv",
        workload_rows[0].keys(),
        workload_rows,
    )

    print("Break-even goodput (tokens/s per 8-GPU node):")
    for row in break_even_rows:
        if "85% utilization" in row["rate_case"]:
            print(
                f"  {row['tier']:8s} input={row['break_even_uncached_input_tps']:,.0f} "
                f"output={row['break_even_output_tps']:,.0f}"
            )

    print("\nPlanning-scenario component COGS ($/1M tokens):")
    for row in scenario_rows:
        print(
            f"  {row['scenario']:18s} input={row['uncached_input_cogs_per_m']:.3f} "
            f"output={row['output_cogs_per_m']:.3f}"
        )

    print(f"\nLower-bound FP8 MLA KV payload for 1M tokens: {kv_payload_gb:.3f} GB")
    print("\nIllustrative workload margins (after 2.9% variable fee):")
    for row in workload_rows:
        print(
            f"  {row['workload']:20s} {row['tier']:8s} "
            f"GM={100 * row['illustrative_gross_margin_fraction']:.1f}%"
        )
    print("CSV outputs written beside this script.")


if __name__ == "__main__":
    main()
