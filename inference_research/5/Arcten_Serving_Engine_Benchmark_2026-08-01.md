# Arcten Serving-Engine Benchmark

**As of:** 2026-08-01  
**Scope:** Arcten Inference; exact `zai-org/GLM-5.2-FP8` and `Qwen/Qwen3-32B-FP8`  
**Status:** benchmark design, reproducibility harness, source qualification, mock execution, and COGS calculations completed. **No NVIDIA GPU was available in the execution environment, so engine throughput, TTFT, TPOT, tail latency, HBM use, and GPU utilization remain `NOT_MEASURED`.** No external model benchmark is relabeled as an Arcten result.

## 1. Executive conclusion

1. **Launch a private GLM-5.2 alpha on SGLang 0.5.16, but do not declare it the measured winner yet.** It is the best first candidate because the exact model is documented by the model author and the current release contains GLM-5.2-specific DSA, IndexShare, MTP, and MoE work. Use vLLM 0.26.0 as the mandatory same-node challenger and operational fallback. [S1][S5][S7]
2. **Do not put TensorRT-LLM or LMDeploy on the GLM production path yet.** TensorRT-LLM documents generic `GlmMoeDsaForCausalLM`/GLM-5 support, and LMDeploy documents GLM-5 family support, but neither source proves the exact `GLM-5.2-FP8` snapshot, BF16 KV, and native 1M context as one supported configuration. TensorRT-LLM 1.3.0rc23 is also a pre-release with known hangs/crashes in other configurations. Treat a load or full-context failure as a valid result; never convert the model to force a comparison. [S10][S11][S13][S14]
3. **Use Qwen3-32B-FP8 as the one-GPU control model.** The exact artifact is about 34.3GB, has 32.8B parameters, and a native 32,768-token context, so it fits on one 80GB H100 with substantial room for BF16 KV and runtime state. The ranked lane stays at native 32K; enabling YaRN to 131K changes RoPE and is a separate experiment. [S3][S4]
4. **Run all four engines on Qwen only after an exact-checkpoint admission gate.** SGLang and vLLM have explicit official model-card deployment paths. TensorRT-LLM and LMDeploy document Qwen3 family support, not this exact blocked-FP8 snapshot in this exact BF16-KV configuration. Their first result may legitimately be “unsupported.” [S3][S11][S14]
5. **Arcten’s low-price thesis is unproved and Flex output is the hardest target.** At Lambda’s listed 8×B200 rate, a 15% aggregate non-GPU overhead placeholder, and 70% productive utilization, Flex at $1.80/M output requires about **13,569 saturated output tok/s for zero gross margin** or **22,615 tok/s for 40% gross margin** across the whole node. At CoreWeave’s listed on-demand B200 rate, those gates are about **17,443** and **29,071 tok/s**. These are formula gates, not performance forecasts. [S16][S17]
6. **Waiting is not itself an inference optimization.** It does not reduce the FLOPs of an unchanged request. It creates optionality to improve batch composition, cache affinity, capacity purchasing, spot usage, and warm-tail amortization. If compatible volume is low, decode is already saturated, or retry/tail costs are high, extra waiting can save nothing.
7. **Do not launch one shared pool for Now and delayed traffic.** Start with capacity isolation or hard reserved headroom. Otherwise long prefills and Flex bursts can poison Now p99 even when average completion windows look acceptable.
8. **Do not promise Flex pricing or strict per-request windows before measured traffic.** Begin with Priority and Standard as target windows, publish them as best-effort/percentile objectives during private alpha, and require 30 days of trace-driven evidence before binding SLOs.

### Decision table

| Decision | Recommendation | Confidence | Promotion gate |
|---|---|---:|---|
| GLM default engine | SGLang 0.5.16 | Medium | Beats or ties vLLM on deadline goodput and full COGS; native 1M passes |
| GLM fallback | vLLM 0.26.0 | Medium-high | Correctness, 1M context, failure recovery, and no material p99 regression |
| GLM TensorRT-LLM | Qualification only | High | Exact snapshot + BF16 KV + native 1M + stable OpenAI streaming |
| GLM LMDeploy | Qualification only | High | Same as above; no conversion or context reduction |
| One-GPU control | Qwen3-32B-FP8 on one H100 80GB | High | Exact artifact hashes and native 32K pass |
| Fourth engine | LMDeploy 0.15.0 | Medium | Exact blocked-FP8 and BF16-KV smoke; otherwise record unsupported |
| Initial product lanes | Now isolated; Priority/Standard experimental | Medium | p99 deadline goodput and measured COGS |
| Flex target | No commitment | High | Measured output TPS exceeds margin gate under observed utilization/failures |

## 2. Evidence table

The complete evidence matrix, including all requested fields, is in [`docs/evidence.csv`](docs/evidence.csv). Values not produced by the pinned GPU protocol remain `NOT_MEASURED`.

| Evidence | Quality category | Scope | What the source establishes | What it does **not** establish |
|---|---|---|---|---|
| GLM-5.2-FP8 revision `ba978f7`, ~756GB, native 1M context [S1][S2] | Artifact bitwise identity after local hashes | Exact checkpoint/tokenizer/template/config | Model identity, documented context, SGLang/vLLM paths | Runtime fit, throughput, tails, or cross-engine bitwise outputs |
| Qwen3-32B-FP8 revision `aa55da1`, ~34.3GB, native 32K [S3][S4] | Requested FP8 artifact; FP8 is lossy versus an unquantized parent | Exact one-GPU control | Architecture, precision format, native context | Exact TRT/LMDeploy compatibility or measured one-GPU performance |
| SGLang 0.5.16 / `fdebc93` [S5] | Mathematically intended equivalent with BF16 KV | Exact models after qualification | Current version; GLM-specific changes; dependency pins; known issue | Whole-system saving; transferable benchmark number |
| vLLM 0.26.0 / `568afb3` [S7][S8] | Mathematically intended equivalent with BF16 KV | Exact models after qualification | Current version, controls, GLM5.2 work | Rank against SGLang for Arcten’s workload |
| TensorRT-LLM 1.3.0rc23 / `d41ab33` [S10][S11][S12] | Unknown until exact loader/precision proof | Conditional Qwen; GLM qualification | Generic architecture support and OpenAI server | Exact snapshot support; production stability; performance rank |
| LMDeploy 0.15.0 / `f4b8140` [S13][S14][S15] | Unknown until exact loader/precision proof | Conditional Qwen; GLM qualification | Family support and serving controls | Exact blocked-FP8/GLM-5.2 configuration support |
| DSA cache-layer split in SGLang [S5] | No model-quality change when exact architecture is preserved | GLM-5.2, prefill CP, documented configuration | Source reports 0.77→0.20GB/rank at 8,192 tokens and CP=4 | Throughput, full-context memory, tail, or dollar saving |
| MTP/speculative decoding [S1][S5][S7][S10][S13] | Distribution-preserving only with exact verification/sampling | Decode-heavy, engine/model-specific | Feature availability and scoped component claims | Fixed acceptance, throughput, or COGS benefit |
| Prefix caching [S6][S8][S10][S13] | Intended equivalent for exact prefix reuse | Repeated prefixes, tenant isolation | Commodity mechanism | Hit rate, memory rent, security, or savings for Arcten traffic |
| FP8 KV [S6][S8][S14][S15] | **Lossy** | Separate long-context ablation | Capacity option | Equivalence to BF16 KV or acceptable quality |
| Public GPU prices [S16][S17] | Economic input | B200/H100/H200 sensitivities | Displayed list rates on access date | Availability, contract rate, taxes, retries, or full COGS |

### Quality taxonomy used throughout

- **Bitwise identity:** local artifact files hash-match. This says nothing about bitwise-identical outputs across engines, CUDA kernels, batch shapes, or parallel reductions.
- **Mathematically intended equivalent:** same checkpoint, tokenizer, template, native context, and BF16 KV; ordinary floating-point reordering can still change logits or tokens.
- **Distribution-preserving:** only claimed after sampling and any speculative verifier implement the same distribution and statistical tests fail to find a material difference. Temperature-zero equality is insufficient.
- **Lossy approximation:** changed weights, lower-precision KV, changed RoPE/YaRN, reduced context, unverified approximate attention, or any substitution.

## 3. Reproducible benchmark design and execution status

### 3.1 Exact matrix

| Model | Immutable revision | Ranked precision | Context | Primary hardware | Engines admitted initially |
|---|---|---|---:|---|---|
| `zai-org/GLM-5.2-FP8` | `ba978f7` | Exact FP8 weights + BF16 KV | 1,048,576 | 8×B200 180GB, TP8 | SGLang, vLLM |
| Same GLM | Same | Same | Same | 8×H200 141GB, TP8 sensitivity | SGLang, vLLM |
| `Qwen/Qwen3-32B-FP8` | `aa55da1` | Exact blocked-FP8 weights + BF16 KV | 32,768 | one H100 80GB, TP1 | SGLang, vLLM; TRT/LMDeploy after smoke |
| Same Qwen | Same | Same | Same | one H200 141GB sensitivity | Same admission rule |

No engine may enter the ranked matrix after converting, requantizing, reshaping into a different checkpoint, changing tokenizer/template, reducing context, or enabling YaRN. A loader may transform layout internally only if the source tensors and runtime math/precision are documented and the resulting configuration passes the exact-output and stochastic gates; any persistent converted artifact is recorded and not called bitwise-identical to the source checkpoint.

### 3.2 Pinned software

| Layer | Pin |
|---|---|
| Host driver | NVIDIA 595.71.05; Fabric Manager 595.71.05 on HGX [S18] |
| Reference container | `nvcr.io/nvidia/pytorch:26.07-py3`; Ubuntu 24.04; CUDA 13.3.1; exact OCI digest captured at execution [S19] |
| SGLang | 0.5.16, commit `fdebc93`; FlashInfer 0.6.14; `sgl-kernel` 0.4.5 [S5] |
| vLLM | 0.26.0, commit `568afb3` [S7] |
| TensorRT-LLM | 1.3.0rc23, commit `d41ab33` [S10] |
| LMDeploy | 0.15.0, commit `f4b8140` [S13] |

Each engine should use its supported image/dependency stack. Forcing every engine into one container is not fair if it creates unsupported combinations. The execution record must include the OCI digest, `pip freeze`, CUDA/NCCL/Triton/FlashInfer/kernel versions, compiled extension hashes, driver, firmware, GPU clocks/power limit, NVLink topology, NUMA, and local checkpoint hashes.

### 3.3 What was executed here

| Item | Result |
|---|---|
| Benchmark client, streaming SSE parser, concurrency/rate scheduler | Executed |
| Exact workload specification and deterministic request generation code | Implemented; actual model-tokenizer generation requires the pinned snapshots |
| Latency/throughput analyzer and bootstrap-ready result schema | Executed against deterministic mock endpoint |
| Artifact hash and output-comparison tooling | Executed; self-comparison passed |
| Full COGS calculator and pricing sensitivity | Executed; CSV outputs generated |
| Unit tests | Passed |
| Deterministic mock run | 24/24 requests completed; self-comparison passed |
| SGLang/vLLM/TRT-LLM/LMDeploy GPU runs | **Not executed: no NVIDIA GPU in runtime** |

The package therefore contains a **reproducible benchmark**, not fabricated engine results. See `EXECUTION_STATUS.json` and `results/GPU_RESULTS_NOT_EXECUTED.md`.

### 3.4 API lanes

**Raw performance lane:** `/v1/completions`, exact token-count prompts, streaming, temperature 0, top-p 1, `ignore_eos=true`. This removes chat-template and reasoning-parser differences while retaining the exact tokenizer and prompt IDs.

**Chat-equivalence lane:** `/v1/chat/completions`, exact template revision and identical request-level template kwargs. Qwen uses `enable_thinking=false` in this lane. Test content/reasoning fields, streaming boundaries, usage accounting, stop strings/token IDs, seeds, errors, disconnects, cancellation, and request IDs. vLLM’s current Qwen3 parser is `qwen3`. [S9]

**Stochastic quality lane:** model-recommended sampling parameters, paired prompts, many seeds, token/logprob distribution comparisons, task metrics, and regression thresholds. Do not use greedy equality as proof of distribution preservation.

### 3.5 Workloads

1. **Batch one:** 128→128, 1K→256, 8K→1K; GLM also 32K→1K; Qwen native boundary 32,640→128.
2. **Saturation:** 8K→1K at concurrency 1, 2, 4, 8, 16, 32, 48, 64, 80, 96, 128. Repeat with offered load at 20%, 50%, 70%, 85%, 100%, and 115% of sustainable rate.
3. **Mixed lengths:** weighted short/medium/long/very-long distributions in `workloads/scenarios.yaml`, separately valid for each model’s context.
4. **Long context:** GLM 64K, 256K, and 1,048,576-token boundary; Qwen 16K and native 32K boundary.
5. **Prefix sharing:** cold/warm/eviction tests, GLM 4K/32K/128K prefixes and Qwen 4K/16K prefixes, fanout 1/4/16/64.
6. **Burst recovery:** steady 20% load, 5× arrival burst for 60 seconds, then measure queue drain and p99 recovery.
7. **Failures:** worker SIGKILL, server SIGTERM, single-rank loss, deliberate OOM prompt, local-storage delay, network partition, router restart, and spot preemption.

### 3.6 Metrics and score

Report per request and per steady-state window:

- TTFT, time to second content chunk, raw SSE inter-chunk latency, retokenized TPOT, E2E, p50/p90/p95/p99/p99.9.
- Request/s; uncached input, cached-input, output, and total token/s; deadline goodput under each lane.
- GPU SM utilization, HBM used/bandwidth, power/clocks/throttling; NVLink/NVSwitch; CPU/RAM/storage/network.
- Queue/running/waiting requests, scheduled tokens, preemptions, cache hit/eviction, graph/JIT events, MTP acceptance and verifier cost.
- Download excluded; model load, compile, graph capture, readiness, first-request latency, and warm-tail recorded separately.
- Failures, lost requests, retries, duplicates, retry amplification, recovery time, silent corruption, and added COGS.

The production winner is **not maximum saturated token/s**. It is the configuration with the lowest complete COGS while meeting exact-model correctness, native context, and lane-specific p99/deadline-goodput gates. A useful score is:

```text
admitted_goodput = completed_tokens_meeting_all_SLOs / wall_clock_seconds
cost_per_admitted_million = complete_COGS / admitted_goodput * 1,000,000
```

### 3.7 Fair tuning

Start all engines with exact FP8 weights, BF16 KV, native context, no prefix cache, no speculation/MTP, no weight/KV offload, and the same visible GPUs. Permit at most two engineer-hours per engine/model/hardware cell to tune memory fraction, scheduler token/sequence limits, chunked-prefill size, documented attention/MoE backend, graph capture sizes, and TP/EP/CP decomposition. Freeze the configuration, randomize engine order, run three repetitions with 3-minute warmup and 15-minute steady state, report bootstrap 95% intervals, and rerun coefficient of variation above 5%.

## 4. Engine comparison and launch configuration

### 4.1 Source-qualified comparison

| Engine | GLM-5.2 exact status | Qwen3-32B exact status | Strengths to test | Principal risk |
|---|---|---|---|---|
| SGLang 0.5.16 | Documented and admitted | Documented and admitted | GLM-specific work, RadixAttention, current kernel work, rich parallel controls | Known nondeterministic graph/DP path; operational complexity |
| vLLM 0.26.0 | Documented and admitted | Documented and admitted | Broad production surface, observability, cache/parallel/KV controls | Exact GLM rank unknown; compile/backend regressions possible |
| TensorRT-LLM 1.3.0rc23 | Generic GLM-5 only; qualification | Qwen3 architecture; exact snapshot smoke | NVIDIA-specific kernels, scheduler and metrics | Pre-release, exact loader/precision uncertainty, known issues |
| LMDeploy 0.15.0 | Family support; qualification | Family support; exact snapshot smoke | PyTorch/TurboMind alternatives, mature API server | Exact blocked-FP8 path unproved; backend/precision ambiguity |

No source establishes a stronger universal production engine for both exact checkpoints. KTransformers is author-documented for GLM but changes the hardware/memory hierarchy and belongs in a separate heterogeneous CPU–GPU economics lane. NVIDIA Dynamo is an orchestration/disaggregation layer over engines, not a comparable replacement engine.

### 4.2 Provisional GLM launch configuration

**Default:** SGLang 0.5.16 on one 8×B200 HGX node.

```bash
MODEL_PATH=/immutable/zai-org/GLM-5.2-FP8/ba978f7 \
CUDA_VISIBLE_DEVICES=0,1,2,3,4,5,6,7 \
MEM_FRACTION_STATIC=0.88 \
./launch/sglang_glm_baseline.sh
```

Resolved intent:

- TP8, exact revision `ba978f7`, native context 1,048,576, BF16 KV.
- Prefix/radix cache disabled for qualification; MTP/speculation and offload not enabled.
- Metrics enabled. CUDA graphs may run only after the deterministic regression; do not enable the documented DP-attention/breakable-prefill graph path. [S5]
- Keep `--enable-dsa-cache-layer-split` and prefill CP as a **separate tuned ablation**, because its published memory result is scoped and it changes parallel execution.
- Promotion requires full 1M boundary, no silent corruption, ≤0.1% non-chaos errors, and p99 deadline goodput.

**Required challenger/fallback:** vLLM 0.26.0 on the same physical node and checkpoint.

```bash
MODEL_PATH=/immutable/zai-org/GLM-5.2-FP8/ba978f7 \
CUDA_VISIBLE_DEVICES=0,1,2,3,4,5,6,7 \
GPU_MEMORY_UTILIZATION=0.92 \
./launch/vllm_glm_baseline.sh
```

Promote vLLM over SGLang if it lowers cost per admitted million by at least 5% with overlapping confidence intervals excluded, or materially improves p99/recovery without raising complete COGS. Keep it as a fallback even if it loses by a modest amount; engine diversity is valuable against regressions, but duplicate warm capacity must be included in COGS.

### 4.3 One-GPU Qwen configuration

SGLang baseline:

```bash
MODEL_PATH=/immutable/Qwen/Qwen3-32B-FP8/aa55da1 \
CUDA_VISIBLE_DEVICES=0 \
MEM_FRACTION_STATIC=0.85 \
./launch/sglang_qwen3_32b_baseline.sh
```

vLLM baseline:

```bash
MODEL_PATH=/immutable/Qwen/Qwen3-32B-FP8/aa55da1 \
CUDA_VISIBLE_DEVICES=0 \
GPU_MEMORY_UTILIZATION=0.90 \
./launch/vllm_qwen3_32b_baseline.sh
```

Rank at native 32K only. The core performance lane uses completions. The chat lane passes `{"chat_template_kwargs":{"enable_thinking":false}}` identically. Run TensorRT-LLM and LMDeploy qualification scripts; admit them only when startup logs and resolved configs prove exact local files, no requantization, BF16 KV, exact tokenizer/template, native 32K, and OpenAI streaming parity.

### 4.4 Failure scoring

A failure-capable engine can still win only if the complete reserve is economic. For each injected event calculate:

```text
retry_amplification = total_GPU_tokens_executed / unique_successful_tokens
recovery_time = first_healthy_time_after_fault - injection_time
failure_COGS = lost_compute + retried_compute + idle_failover + duplicate_work + reserve_capacity
```

Any silent corruption is an automatic failure. Any engine that cannot serve native context is unsupported for that product configuration, not merely slower.

## 5. Reproducible calculations

### 5.1 Complete COGS

```text
COGS/hour =
  GPU execution
  + amortized model loading and compilation
  + idle and warm-tail capacity
  + CPU, RAM, storage, and networking
  + orchestration and observability
  + interruption, retry, and failure reserve
  + provider overhead
```

Payment overhead is deducted from revenue when computing required margin. Temporary cloud credits are excluded.

For each phase/token class `k`:

```text
marginal_cost_k_per_M =
  allocated_hourly_COGS_k × 1,000,000
  / (3,600 × saturated_tokens_per_second_k × productive_utilization_k)
```

When the same GPUs interleave prefill and decode, allocate node-seconds by measured phase occupancy, GPU time, or a calibrated shadow-price model. Do not charge the full node independently to every phase. Cached-input cost must include lookup compute, retained KV memory rent, eviction/rebuild cost, and miss probability:

```text
cached_cost =
  hit_rate × (hit_compute + memory_rent)
  + (1 - hit_rate) × uncached_input_cost
  + eviction_rebuild_cost
```

For a workload distribution:

```text
blended_cost_per_M_total_tokens =
  input_share × input_cost
  + cached_input_share × cached_input_cost
  + output_share × output_cost
```

The package implements these formulas in `arcten_bench/cost.py` and generates all sensitivity tables from `manifests/pricing.yaml`.

### 5.2 Price feasibility gates

Assumptions below: listed 8×B200 rate, 15% aggregate non-GPU placeholder, 70% productive utilization, no payment fee. Required rates are saturated whole-node rates. They are **not measured**.

#### Lambda 8×B200, zero gross margin

| Lane | Input tok/s required | Cached-input tok/s required | Output tok/s required |
|---|---:|---:|---:|
| Now | 17,446 | 93,938 | 5,551 |
| Priority | 34,891 | 135,688 | 8,141 |
| Standard | 48,848 | 203,532 | 9,770 |
| Flex | 61,060 | 305,298 | 13,569 |

#### Output rate required at 40% gross margin

| Provider / capacity | Now | Priority | Standard | Flex |
|---|---:|---:|---:|---:|
| Lambda 8×B200 on-demand | 9,251 | 13,569 | 16,283 | **22,615** |
| CoreWeave NA 8×B200 on-demand | 11,893 | 17,443 | 20,931 | **29,071** |

The 2.9% payment sensitivity is included in `required_throughput_by_target.csv`; it raises the required rate further. [S16][S17]

### 5.3 Multiple workload states

The following table is an **explicit unmeasured sensitivity**, using reference saturated rates of 200k uncached input tok/s, 1M cached-input tok/s, and 20k output tok/s. It shows why utilization and failure reserve dominate. It is not a performance estimate for GLM-5.2.

| Lambda 8×B200 state | Productive utilization | Input $/M | Cached $/M | Output $/M |
|---|---:|---:|---:|---:|
| Low load | 20% | 0.427 | 0.085 | 4.274 |
| Burst recovery | 40% | 0.223 | 0.045 | 2.230 |
| Sustained | 70% | 0.124 | 0.025 | 1.242 |
| High sustained | 85% | 0.103 | 0.021 | 1.032 |
| Failure degraded | 50% | 0.201 | 0.040 | 2.007 |

At these reference rates, the same engine appears profitable or unprofitable solely because productive utilization and reserve change. This is why “batching saves X%” and “spot saves Y%” are invalid fixed claims.

### 5.4 What must replace the placeholder

For every engine cell, derive:

- GPU execution from billable node-hours, including failed and duplicate work.
- Load/compile amortization from restarts per day and startup duration.
- Warm-tail from observed idle intervals and reserved Now headroom.
- CPU/RAM/storage/network from provider line items and measured bytes/IOPS.
- Orchestration from control-plane services and operator burden.
- Retry/failure reserve from interruption rate, lost work, checkpoint/replay behavior, and failover capacity.
- Provider/payment overhead from invoice terms, taxes, support, and payment processing.

A target is sustainable only when the 95% upper confidence bound of full COGS is below allowed COGS at the desired gross margin.

## 6. What is already commodity

These are necessary but not an Arcten moat by themselves:

- Continuous/inflight batching and scheduler token budgets.
- Paged KV memory and block management.
- FlashAttention/FlashInfer and fused attention kernels.
- CUDA graphs/compile and shape capture.
- Chunked prefill.
- Prefix/radix caching as a primitive.
- Tensor, expert, data, pipeline, and context parallelism.
- Model-native MTP/speculative-decoding primitives.
- OpenAI-compatible API servers and basic metrics.
- Basic prefill/decode disaggregation and KV transport primitives.
- Multi-provider provisioning and ordinary spot-instance handling.

Arcten can still outperform through operations and tuning, but the durable claim must be measured system behavior, not possession of these features.

## 7. What could become proprietary

1. **Deadline-aware admission and scheduling:** jointly optimize completion-window probability, queue age, prompt/output shape, cache state, and marginal capacity cost rather than FIFO or throughput alone.
2. **State-aware routing and cache placement:** tenant-safe prefix fingerprints, cache-affinity routing, eviction economics, and migration decisions across replicas/providers.
3. **Phase-aware cost attribution:** online estimation of marginal prefill, cached-prefill, and decode cost by model/config/load, including warm tail and failures.
4. **Capacity market controller:** choose on-demand, reserved, and interruptible capacity from observed deadline risk and interruption/recovery economics.
5. **Interruption-safe execution:** idempotent requests, exact retry semantics, duplicate suppression, partial-work accounting, and state recovery without silent model changes.
6. **Continuous autotuning and regression gates:** safely retune engine/backend/parallelism under changing versions while preserving exact model identity and quality.
7. **Global fleet controller:** a policy layer integrating queueing, cache state, model residency, provider failures, and customer deadlines. The engine remains replaceable.

The proprietary layer should sit above SGLang/vLLM so Arcten is not dependent on winning a permanent kernel race against large open-source and vendor teams.

## 8. Three experiments Arcten can run within two weeks

### Experiment 1 — Exact support and correctness gate

**Goal:** eliminate unsupported engines/configurations before expensive benchmarking.

- Provision one 8×B200 node and one isolated H100 80GB.
- Download and hash both immutable snapshots.
- Run SGLang/vLLM on GLM; all four qualification paths on Qwen; smoke TRT/LMDeploy on GLM without conversion.
- Execute deterministic corpus, OpenAI API suite, native context boundary, cancellation/disconnects, and 30-minute soak.
- Inspect resolved weight/KV precision, memory allocation, startup logs, and tokenizer/template hashes.

**Output:** admission matrix with pass/fail reasons, startup/load/compile time, exact artifact manifests, and first correctness bugs. Stop spending on any failed engine until upstream support exists.

### Experiment 2 — Performance envelope and full COGS

**Goal:** choose launch engine/configuration and establish price feasibility.

- Run batch-one, saturation, mixed lengths, long context, and prefix-sharing matrix.
- Three repetitions, randomized order, fixed two-hour tuning budget.
- Measure TTFT/TPOT/E2E tails, deadline goodput, GPU/network telemetry, load/compile/warm tail, and complete cost.
- Run BF16-KV baseline first; then separate prefix-cache and MTP ablations. FP8 KV stays in a lossy quality lane.

**Decision:** SGLang versus vLLM for GLM; best admitted engine for Qwen; measured required output TPS versus every price/margin gate.

### Experiment 3 — Delayed-window scheduler and failure economics

**Goal:** test the actual thesis rather than engine microbenchmarks.

- Replay synthetic traces spanning low load, burst, sustained load, and failure-degraded conditions.
- Compare immediate FIFO, separate Now/delayed pools, and deadline-aware/cache-affinity scheduling.
- Inject spot preemption, worker/rank loss, router restart, and storage/network delay.
- Measure completion-window hit rate, p99 lateness, cache hit rate, productive utilization, retry amplification, and COGS.

**Decision:** whether Priority/Standard lower cost without harming Now; whether Flex has enough compatible volume and interruption tolerance to exist.

## 9. Three-month engineering recommendation

### Month 1 — Establish a trustworthy serving baseline

- Complete the two-week matrix and select SGLang or vLLM per exact model.
- Build immutable model/image manifests, automated API/quality/context gates, and per-phase telemetry.
- Implement request idempotency, cancellation, complete usage accounting, and reproducible rollbacks.
- Keep a second engine qualified but cold or minimally warm; account for its reserve cost.

**Exit:** one exact GLM configuration meets private-alpha correctness and measured cost; no public low-price promise.

### Month 2 — Build the differentiated scheduler

- Implement separate Now and delayed admission pools with reserved headroom.
- Add deadline-aware scheduling, prompt/output-shape estimation, cache-affinity routing, and tenant-safe prefix identity.
- Build online marginal COGS estimates for uncached input, cached input, and output.
- Replay real/private-alpha traces before activating each policy.

**Exit:** Priority/Standard show statistically significant cost reduction at equal exact-model quality and acceptable Now p99.

### Month 3 — Multi-provider resilience and controlled alpha

- Add capacity-price ingestion, provider-aware placement, interruption-safe retries, duplicate suppression, and failure reserve estimation.
- Test on-demand plus spot/off-peak capacity without counting credits.
- Run 30-day private alpha with per-lane profitability and completion-window dashboards.
- Negotiate wholesale/OEM or host open weights directly; do not assume retail API resale rights.

**Exit:** binding price/SLO proposals only for lanes whose 95% upper COGS bound and tail behavior pass. Keep Flex best effort until evidence supports more.

## 10. Explicit reasons the proposed approach might fail

1. **Insufficient compatible volume:** requests cannot wait together in enough quantity to improve batches or capacity utilization.
2. **Decode dominates:** serial output generation remains the bottleneck; delaying admission does not reduce per-token decode work.
3. **Modern engines already capture most gains:** Arcten’s engine tuning yields little durable advantage over commodity releases.
4. **Cache economics disappoint:** prefixes are not reused, cache pollution is high, tenant isolation limits sharing, or HBM memory rent exceeds avoided prefill.
5. **Full 1M context destroys economics:** KV/state, context parallelism, communication, and tail latency make the advertised context impractical at target prices.
6. **Spot failures erase discounts:** interruption, lost work, retries, duplicate execution, and failover reserve consume the nominal price advantage.
7. **Low load and warm tail dominate:** model residency and Now headroom create high idle COGS before batching benefits appear.
8. **Customer windows are tail constraints:** average one- or five-minute completion is insufficient; p99 deadlines force expensive spare capacity.
9. **Engine/model churn is too fast:** new checkpoints and releases repeatedly invalidate tuning, compiled artifacts, or correctness assumptions.
10. **Quality constraints block cheap approximations:** FP8 KV, altered RoPE, approximate attention, or substituted models would save money but violate the product contract.
11. **Operational complexity exceeds savings:** multiple engines/providers/pools create staffing, reliability, and debugging cost greater than GPU savings.
12. **Pricing targets fail margin gates:** measured output throughput or productive utilization remains below the required threshold, especially for Flex.
13. **Provider availability and commercial terms differ from list price:** capacity scarcity, reservations, taxes, support, or egress/storage raise sustainable COGS.
14. **Legal/commercial route is unavailable:** retail API terms may prohibit resale; only self-hosted open weights, BYOK, OEM, or explicit wholesale arrangements may be viable.
15. **Cross-engine numerical behavior causes regressions:** exact weights do not guarantee identical tokens, and customers may depend on stable behavior.

## 11. Final recommendation

Proceed with a **measured private alpha**, not a pricing launch:

- GLM-5.2-FP8: SGLang 0.5.16 provisional default on 8×B200; vLLM 0.26.0 required challenger/fallback.
- Qwen3-32B-FP8: one-H100 four-engine control after exact-snapshot admission.
- BF16 KV baseline; prefix cache and MTP as separate mathematically intended/distribution-preserving candidates; FP8 KV explicitly lossy.
- Isolate Now from delayed traffic initially.
- Treat Priority and Standard as experiments; do not commit to Flex $1.80/M output until measured whole-node output exceeds roughly 22.6k tok/s at Lambda-like rates or 29.1k tok/s at CoreWeave-like on-demand rates for 40% gross margin under complete COGS.
- Build the moat in deadline-aware, cache/state-aware, failure-aware fleet control rather than a permanent fork of one serving engine.

## 12. Reproduction

```bash
cd arcten_engine_benchmark
python -m pip install -e '.[test,tokenizer]'
pytest -q
./scripts/mock_validate.sh
PYTHONPATH=. python scripts/generate_cost_tables.py
```

On GPU hosts:

1. Provision the pinned hardware/driver and engine-specific OCI image by digest.
2. Download exact model revision to local storage and run `python -m arcten_bench.quality manifest`.
3. Launch one engine using `launch/`.
4. Generate exact-token requests with `scripts/make_requests.sh`.
5. Run cells with `scripts/run_cell.sh` and saturation with `scripts/run_saturation_matrix.sh`.
6. Store telemetry, environment, model hashes, launch argv, raw responses, and summaries under `results/gpu/`.
7. Run paired quality comparisons before admitting tuned/approximate configurations.
8. Replace all `NOT_MEASURED` sensitivity inputs with observed rates and invoice-equivalent COGS.

See `README.md`, `manifests/`, `workloads/`, `launch/README.md`, and `docs/SOURCES.md`.
