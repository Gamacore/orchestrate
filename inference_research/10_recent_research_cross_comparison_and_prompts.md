# Arcten inference-cost research: 2026 cross-comparison and researcher prompts

Date: 2026-08-04

## Scope

Arcten is evaluating two related products:

1. Open-model inference with completion windows: immediate, roughly one minute, roughly five minutes, and best effort.
2. An inference-optimization gateway that can route across open and proprietary models using customer-owned provider keys.

The near-term constraint is severe: Arcten wants to beat Sail's public prices without first needing thousands of unrelated customers. It has AWS, Azure, and GCP startup credits, but credits are launch runway rather than durable cost of goods. The analysis below therefore distinguishes:

- gains available to one sparse request;
- gains available when one customer provides internal fanout or batch density;
- gains that require a large multi-model fleet;
- mathematically/output-preserving changes;
- quality-matched or alternate-SKU changes;
- measured production economics versus paper-specific headline results.

## Executive conclusion

There is no demonstrated universal technique that makes exact GLM-5.2 FP8 inference 10x cheaper at concurrency one.

The strongest credible paths are:

1. **One-customer fanout, not many-customer aggregation.** RL rollouts, evals, synthetic data, document QA, and agent branching naturally provide concurrency and shared prefixes. The official SGLang numbers imply that moving from concurrency 1 to 16 changes raw B200 cost by about 5.1x for the same 8K-input/1K-output shape. One large customer can create that density by itself.
2. **Lossless FP8 weight compression as a high-risk hardware-threshold bet.** If GLM's block-E4M3 weights can be compressed from roughly 756 GB to comfortably below 640 GB while retaining a fast fused GEMM path, an 8xH100 80 GB deployment might become possible. That could matter more than a 10% kernel gain because it changes the hardware market Arcten can buy from. Current ECF8 results are not sufficient; the newer Shannon-bound method is promising but has not been demonstrated on GLM's format.
3. **Shared-prefix decode execution.** Standard prefix caching avoids repeated prefill, but it does not avoid repeatedly reading the shared KV prefix during every decode step. CoDec/Hydragen-style execution could be a material differentiator for fanout workloads, but the published 3.8x/32x headlines are not GLM-DSA results and use unusually favorable shared-prefix shapes.
4. **GLM-specific DSA and MoE work.** PIVOT, EcoSpec, ExpertPlex, UltraEP, and Moebius identify real remaining bottlenecks. The best GLM-adjacent measured gains range from roughly 1.2x to 2.5x, but each applies to a particular context length, load, or cluster topology.
5. **Task-level optimization for the gateway.** Context compaction, output-budget selection, and model routing can reduce isolated-request spend by 30-80% in recent papers. They do not preserve the exact model/token stream, so they belong behind customer-specific quality gates and should be sold as lower cost per accepted task, not cheaper identical tokens.

The best defensible target is **2-5x lower cost per accepted task on selected workloads** and **roughly 1.2-2x structural improvement in exact token COGS after workload qualification**, plus whatever capacity-price advantage Arcten can procure. Larger gains are possible when a workload crosses a memory-fit threshold or has extreme shared-prefix fanout.

## Baseline that every researcher must use

### Product and price reference

Sail currently lists GLM-5.2 FP8 at the following prices per million tokens:

| Window   | Input | Cached input | Output |
| -------- | ----: | -----------: | -----: |
| ASAP     | $1.00 |        $0.20 |  $3.50 |
| Priority | $0.70 |        $0.18 |  $3.00 |
| Standard | $0.50 |        $0.12 |  $2.50 |
| Flex     | $0.40 |        $0.08 |  $1.80 |

Sail describes the windows as immediate, about one minute, about five minutes, and best effort. It publicly attributes efficiency to CUDA work, inference-engine changes, provider distribution, spot capacity, and reliable failover. These are public claims, not proof of its private cost structure.

Sources:

- https://docs.sailresearch.com/pricing
- https://docs.sailresearch.com/completion-windows
- https://www.sailresearch.com/

For an illustrative 8 input : 1 output token mix, the uncached blended Sail rates are:

| Window   | Blended price / 1M total tokens |
| -------- | ------------------------------: |
| ASAP     |                          $1.278 |
| Priority |                          $0.956 |
| Standard |                          $0.722 |
| Flex     |                          $0.556 |

This blend is only a comparison anchor. A real cost model must separate prefill, cache-hit prefill, and decode.

### Official GLM/SGLang reference

The official GLM-5.2 FP8 repository is approximately 756 GB. Its configuration identifies a 753B-parameter, 256-routed-expert MoE with eight experts selected per token, DSA, one next-token prediction layer, block FP8 E4M3 weights, and 128x128 quantization blocks. It already shares DSA index results across many layers and across MTP iterations, so IndexCache-like gains must not be counted again as wholly new.

Sources:

- https://huggingface.co/zai-org/GLM-5.2-FP8
- https://huggingface.co/zai-org/GLM-5.2-FP8/raw/main/config.json

SGLang reports the following 8K-input/1K-output FP8 throughput on B200. The metric is total input-plus-output tokens per second per GPU:

| Max concurrency | Total tok/s/GPU | Raw COGS at $2.14/B200-GPU-hour |
| --------------: | --------------: | ------------------------------: |
|               1 |             288 |            $2.06/M total tokens |
|              16 |           1,476 |                        $0.403/M |
|              64 |           3,078 |                        $0.193/M |
|             256 |           5,022 |                        $0.118/M |
|           1,024 |           4,059 |                        $0.146/M |

Formula: `GPU hourly rate * 1,000,000 / (tok/s/GPU * 3,600)`.

Important caveat: the concurrency-1/16 and 64/256 benchmark recipes set `SGLANG_SIMULATE_ACC_LEN` to force MTP acceptance lengths of 3.5 and 2. These are useful capacity bounds, not trustworthy production economics until rerun with natural acceptance on real prompts. The high-throughput concurrency-1,024 run has no speculative decoding.

Sources:

- https://github.com/sgl-project/sglang/blob/87f9dc2dcda778d02ae0f4c91f473734f11d5570/docs_new/src/snippets/configs/zai-org/glm-5.2-benchmarks.jsx
- https://verda.com/b200

At this public B200 spot rate, sparse exact FP8 is more expensive than Sail ASAP before overhead. The same node can be comfortably below Sail's delayed prices once a single workload creates concurrency in the 16-64 range. Customer count is therefore the wrong variable; compatible in-flight work is the variable.

## Exactness vocabulary

Use these labels consistently:

- **E: model/precision preserving.** Same checkpoint and nominal math. Floating-point reduction order may still prevent bitwise identity unless tested.
- **D: distribution preserving.** Speculative verification preserves the target distribution, but deterministic byte-for-byte output is not automatically guaranteed.
- **Q: quality matched.** Prompts, attention candidates, experts, context, or output budgets change. Quality must be evaluated on customer tasks.
- **SKU: different product.** A different quantization or model. It may be excellent, but it cannot be marketed as identical FP8 inference.

## Cross-comparison of recent results

Headline numbers are the authors' reported maxima. They are not additive.

| Technique                     |                                                 Headline | What creates the gain                                                                        | Sparse c1 benefit?                              | Label                          | GLM-5.2 assessment                                                                                                                                                                                    |
| ----------------------------- | -------------------------------------------------------: | -------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SGLang B200 concurrency       |                                  5.1x c1 -> c16 raw COGS | Weight/KV traffic and launch overhead amortization                                           | No, unless one customer fans out                | E                              | Proven baseline shape, but MTP acceptance was simulated                                                                                                                                               |
| GB300 FP8                     |              1.35-1.61x tok/s/GPU vs B200 across c1-c256 | More capacity per GPU and only four GPUs for the model                                       | Yes if rental/GPU is below the throughput ratio | E                              | Official GLM benchmark; obtain real rental quotes                                                                                                                                                     |
| GLM NVFP4 on B200             |               1.06-1.83x vs FP8 depending on concurrency | Lower precision and memory traffic                                                           | Yes, strongest at c1                            | SKU                            | Separate product; broad quality validation required                                                                                                                                                   |
| ECF8                          |    9.8-14.8% LLM weight reduction; up to 150% throughput | Lossless exponent compression plus larger feasible batch                                     | Potentially, mainly by changing hardware fit    | E claimed                      | 14.8% applied to 756 GB is about 644 GB, still above 8x80 GB before runtime/KV headroom; paper has hardware-table inconsistencies                                                                     |
| Shannon-bound ANS compression |          about 1.4x FP8 footprint; up to 1.6x throughput | Tile-level entropy coding fused with GEMM                                                    | Potentially high if it enables H100 fit         | E weights; outputs to verify   | Highest-upside exact R&D lead; tested E5M2, not GLM block-E4M3                                                                                                                                        |
| ZipServ                       |                        up to 30% size; 1.22x average E2E | Fixed-length lossless encoding and fused decompression GEMM                                  | Modest                                          | E weights; outputs to verify   | Tested BF16, not native FP8; useful design reference                                                                                                                                                  |
| LMCache                       |                                     up to 15x throughput | Reuse/offload KV state across requests and engines                                           | Only with repeated prefixes or resumed state    | E                              | Strong for agents, evals, and fanout; no benefit for unique output decode                                                                                                                             |
| CoDec                         |                        1.9x attention; 3.8x TPOT vs vLLM | Reads shared-prefix KV once for multiple decode queries                                      | Yes when one request creates branches           | E computation; verify numerics | High-value R&D direction; paper defaults to Qwen3-4B, A100, vLLM 0.6.6, and 120K shared prefixes, not DSA                                                                                             |
| Hydragen                      |                                      up to 32x attention | Shared-prefix attention decomposition                                                        | Same qualification as CoDec                     | E computation                  | Supports the direction, not a GLM COGS estimate                                                                                                                                                       |
| Tutti                         |                 78.3% lower TTFT; 27% lower serving cost | SSD-backed KV cache scheduling                                                               | Only for long/reused contexts                   | E                              | Useful for cache-rich workloads, not raw decode                                                                                                                                                       |
| INFERCEPT                     |                                        1.6-2x throughput | Preserve/swap/recompute KV around tool-call pauses                                           | Yes for long agent sessions                     | E                              | Agent-specific and older, but directly relevant to Arcten's workload thesis                                                                                                                           |
| PIVOT                         |                           up to 4x DSA indexer; 1.6x E2E | Shares a full-prefix DSA scan among nearby/MTP queries                                       | Mainly long context                             | Q                              | Directly GLM-adjacent. Candidate pruning can omit the true top-k even though retained candidates are rescored exactly                                                                                 |
| EcoSpec                       |                                       up to 1.62x decode | Selects speculative paths that reuse activated MoE experts                                   | Potentially                                     | D                              | Promising, but not evaluated on GLM-5.2 and overlaps MTP gains                                                                                                                                        |
| Training-free embedding MTP   |                 15-19% over prior training-free baseline | Better draft generation without new training                                                 | Yes                                             | D                              | GLM already ships MTP; incremental value likely modest                                                                                                                                                |
| Moebius                       |                                1.16-1.25x on RL rollouts | Runtime TP/EP switching as concurrency changes                                               | Some                                            | E                              | Useful for burst-to-tail workloads; tested Qwen3-235B on 8xH200                                                                                                                                       |
| ExpertPlex                    | 1.5x short and 2.5x long vs SGLang colocation on GLM-5.1 | Shares MoE experts across prefill/decode; disaggregates attention; persistent tile scheduler | No practical launch benefit                     | E                              | Strongest recent GLM-scale systems result, but uses 16-24 H800 GPUs and sustained load                                                                                                                |
| UltraEP                       |                                    1.49x average prefill | Exact per-layer expert rebalancing on rack-scale fabric                                      | No                                              | E                              | Prefill-only and rack-scale; later-stage fleet work                                                                                                                                                   |
| ASAP MoE prefill              |                                  90% SLO-throughput gain | Async attention/expert execution on a supernode                                              | No                                              | E                              | Prefill-only and specialized hardware topology                                                                                                                                                        |
| MoEless                       |                           84-95% reported cost reduction | Elastic serverless expert replicas                                                           | Claimed, but not proven economically            | E routing                      | Cost is a memory-times-latency proxy on an 8xA6000 testbed; requests are batched in one-second buckets because Megatron lacks continuous batching. Treat as a research lead, not dollar COGS evidence |
| TokenPilot                    |                                    56-87% cost reduction | Context compaction while preserving provider cache continuity                                | Yes                                             | Q                              | Valuable gateway feature; uses task scores and commercial token prices, not exact GLM execution                                                                                                       |
| CAPC                          |    49% mean saving over cache-only; up to 90% vs vanilla | Cache-aware prompt compression                                                               | Yes                                             | Q                              | Very new, single-author result; reproduce before product claims                                                                                                                                       |
| R2-Router                     |                   4-5x lower cost than routing baselines | Joint model and output-length choice                                                         | Yes                                             | Q/SKU                          | Strong gateway direction; not same-model inference                                                                                                                                                    |
| Robust KV reservation         |                                     up to 56% lower cost | Better output-length uncertainty management                                                  | No at sparse load                               | E                              | Trace-driven simulation against fixed reservation; useful after utilization grows                                                                                                                     |
| ShuntServe                    |              about 31% cost-efficiency gain vs on-demand | Heterogeneous AWS spot pools and output-preserving migration                                 | Procurement benefit                             | E                              | Tested L4/A10G/L40S on 32B/70B, not an 8-way frontier MoE                                                                                                                                             |
| Coral                         |                                   up to 2.79x lower cost | Joint multi-model placement over 20 GPU configurations                                       | No                                              | E or Q depending routing       | Needs six models, many GPUs, and demand; future fleet controller, not launch secret                                                                                                                   |
| Arrival shaping paper         |                                up to 100x energy/request | Sequential Transformers baseline -> TGI plus regular arrivals                                | No independent gain                             | E                              | The headline is not versus SGLang and should never enter Arcten economics as 100x                                                                                                                     |

Primary sources:

- Lossless compression: https://arxiv.org/abs/2510.02676, https://arxiv.org/abs/2606.15789, https://arxiv.org/abs/2603.17435
- Cache and shared prefixes: https://arxiv.org/abs/2510.09665, https://arxiv.org/abs/2505.17694, https://arxiv.org/abs/2402.05099, https://arxiv.org/abs/2605.03375, https://arxiv.org/abs/2402.01869
- DSA/speculation: https://arxiv.org/abs/2607.24593, https://arxiv.org/abs/2607.12696, https://arxiv.org/abs/2603.17942, https://arxiv.org/abs/2605.15051
- MoE execution: https://arxiv.org/abs/2606.26607, https://arxiv.org/abs/2607.18002, https://arxiv.org/abs/2606.04101, https://arxiv.org/abs/2606.22541, https://arxiv.org/abs/2603.06350
- Task-level optimization: https://arxiv.org/abs/2606.17016, https://arxiv.org/abs/2607.15516, https://arxiv.org/abs/2602.02823
- Fleet control: https://arxiv.org/abs/2607.16892, https://arxiv.org/abs/2606.18600, https://arxiv.org/abs/2605.04357
- Energy baseline audit: https://arxiv.org/abs/2601.22362

## What can and cannot be multiplied

### Potentially complementary layers

1. **Task shaping:** remove unnecessary context or choose a cheaper model/output budget.
2. **Request reuse:** reuse prefix/KV state and preserve state around tool interruptions.
3. **Execution:** batch compatible requests, exploit shared-prefix decode, tune MTP, and select TP/EP.
4. **Model representation:** exact weight compression or a separately labeled lower-precision SKU.
5. **Hardware:** choose the cheapest topology that meets the model's memory and communication needs.
6. **Fleet:** use spot, reservations, cloud credits, and failover after the GPU-hours have been minimized.

These layers may compose, but the only valid combined gain is an end-to-end replay of the combined system.

### Overlapping families that must not be multiplied blindly

- IndexCache, MISA, and PIVOT all reduce DSA indexer work.
- MTP, EAGLE, EcoSpec, SPECTRE, and other speculative methods all target decode verification/drafting.
- LMCache, ordinary prefix caching, Tutti, and other KV tiers overlap on prefill/cache-hit work.
- ECF8, Shannon-bound compression, and ZipServ are alternative weight-compression/kernel designs.
- Chunked prefill, P/D disaggregation, ExpertPlex, and attention-FFN disaggregation are competing execution topologies.
- Quantization gains and newer-hardware gains often target the same memory/compute bottleneck.
- Spot savings apply to remaining GPU-hours; they do not improve tokens/second.

### Cost-per-accepted-task equation

For gateway optimizations, use:

```text
expected_cost_per_accepted_task =
    (inference_cost
     + cache/storage/network_cost
     + retry_cost
     + evaluation_cost
     + failure_reserve)
    / measured_task_success_probability
```

A 50% cheaper request that reduces task success from 90% to 60% is not a 50% task-level saving.

## Recommended R&D order

### P0: establish reality in two weeks

1. **Natural-MTP baseline.** Reproduce B200 and, if available, GB300 GLM-5.2 FP8 at concurrency 1/16/64/256 using real prompts and no simulated acceptance. Record input TPS, output TPS, acceptance length distribution, TTFT, TPOT, power, and raw dollar COGS separately.
2. **One-customer fanout benchmark.** Replay 16/64/256 branches from a shared 8K, 64K, and 128K prefix. Compare plain SGLang radix cache, distributed LMCache, and a CoDec/Hydragen feasibility prototype or trace model. This is the fastest route to beating Sail without many customers.
3. **Agent context benchmark.** Replay tool-calling sessions with normal prefix caching, LMCache, INFERCEPT-style pause handling, TokenPilot, and CAPC. Report exact token reduction, cache-hit change, quality pass rate, and cost per completed task.
4. **Real capacity quotes.** Collect executable quotes and availability for complete 8xB200, 4xGB300, 8xH200, and 8xH100 nodes, including interconnect, storage, startup, minimum rental, interruption, and egress. Do not compare single-GPU list prices when the model needs a whole topology.

### P1: highest-upside proprietary work

5. **GLM block-FP8 entropy study.** Measure per-tensor and per-128x128-block entropy of exponents, mantissas, scales, and exceptions. Determine whether a tile-addressable lossless representation can fit weights plus runtime and a useful KV budget inside 640 GB. Prototype one fused decompression-GEMM kernel before attempting a full engine.
6. **DSA/MTP joint optimization.** Reproduce PIVOT-Refine and EcoSpec on GLM-5.2, then benchmark them separately and together with natural MTP. Treat quality-match, target-distribution preservation, and bitwise identity as different claims.
7. **Shared-prefix DSA decode kernel.** Determine whether CoDec's single-read shared-prefix idea can be adapted to GLM's DSA-selected KV set and MTP query groups. This is more differentiated than another queue scheduler.

### P2: only after sustained load

8. **MoE topology controller.** Evaluate Moebius first on one node. Consider ExpertPlex/UltraEP/P-D work only when Arcten can keep at least 16-24 compatible GPUs useful.
9. **Multi-model heterogeneous fleet.** Add Coral-like placement and robust KV reservation only after traces show simultaneous model demand. Until then, a simple per-model controller is more reliable.

### Kill criteria

- Do not claim an exact FP8 improvement from a benchmark that changes precision, model, prompt, output budget, or attention candidate set.
- Kill any kernel direction that does not beat current SGLang end to end on GLM-shaped matrices and natural traffic, even if its microbenchmark wins.
- Kill any fleet optimization whose saving disappears after startup, interruption, idle tail, data movement, and fallback are priced.
- Do not use cloud credits to set durable public price floors. Treat them as a temporary subsidy for experiments and customer acquisition.
- Do not launch a broad catalog until at least one workload/model pair has measured positive unit economics.

## Standalone prompts for autonomous researchers

Each prompt below is self-contained. Send one prompt per researcher. Require machine-readable evidence tables in addition to prose so the results can be merged later.

### Prompt 1: Lossless GLM-5.2 FP8 compression and cheaper-hardware fit

```text
You are the systems researcher responsible for determining whether Arcten can serve the exact zai-org/GLM-5.2-FP8 checkpoint on materially cheaper hardware through lossless weight compression.

Company context:
- Arcten wants to be a low-cost inference provider for frontier open models.
- The initial reference model is GLM-5.2 FP8, approximately 753B parameters and a roughly 756 GB repository.
- Its config uses block FP8 E4M3 with 128x128 weight blocks, plus some unconverted tensors.
- The economic prize is not a small storage saving. It is fitting weights, runtime buffers, and a useful KV cache onto a cheaper topology such as 8xH100 80 GB instead of 8xB200/H200.
- Arcten must not change the checkpoint or market a lossy quantization as identical FP8.

Start with these primary sources:
- GLM config: https://huggingface.co/zai-org/GLM-5.2-FP8/raw/main/config.json
- ECF8: https://arxiv.org/abs/2510.02676
- Shannon-bound compression: https://arxiv.org/abs/2606.15789
- ZipServ: https://arxiv.org/abs/2603.17435

Tasks:
1. Audit every headline against the actual numeric format, model, GPU, batch, sequence length, and baseline.
2. Reconcile the contradictory hardware descriptions in ECF8's DeepSeek tables.
3. Compute exact fit budgets for 8xH100 80 GB, 8xH100 94 GB if a viable NVLink topology exists, 8xH200, 8xB200, and 4xGB300. Include non-weight tensors, CUDA/NCCL/runtime buffers, graph capture, scales, metadata, and KV headroom.
4. Measure or obtain shard-level entropy for GLM's E4M3 values, scales, exponents, mantissas, and exceptions. Do not extrapolate blindly from E5M2 or BF16.
5. Propose a tile-addressable codec and fused GEMM integration path. Estimate decompression instructions, shared-memory/register pressure, memory-bandwidth savings, and expected performance at batch 1/16/64.
6. Define an output-equivalence test: fixed prompts, seeds, sampling disabled, per-layer checks where practical, final token/logit comparisons, and acceptable numerical criteria.
7. Produce a go/no-go prototype plan starting with one representative GLM grouped-GEMM matrix.

Required output:
- A table of model bytes by tensor class before/after compression.
- A topology fit table with at least 15% safety headroom clearly shown.
- Predicted $/M input and output tokens at c1/c16/c64 using current executable node quotes.
- Best case, base case, and failure case.
- A list of assumptions that must be experimentally falsified.
- A conclusion of GO, TEST, or KILL.

Do not cite secondary summaries when primary papers, code, or model files exist. Do not use theoretical entropy as achieved compression. Do not call exact weights equivalent outputs without testing the fused kernel.
```

### Prompt 2: GLM DSA and MTP optimization audit

```text
You are optimizing the long-context decode path of zai-org/GLM-5.2-FP8 for Arcten.

Context:
- GLM uses DeepSeek Sparse Attention (DSA), 32 index heads, top-k 2048, 78 layers, and one MTP layer.
- Its config already shares index results across many layers and across MTP iterations. Do not count IndexCache as wholly incremental.
- Official SGLang B200/GB300 benchmark recipes force speculative acceptance with SGLANG_SIMULATE_ACC_LEN. Arcten needs natural-acceptance economics.
- The goal is lower real $/output-token without silently reducing quality.

Primary starting sources:
- GLM config: https://huggingface.co/zai-org/GLM-5.2-FP8/raw/main/config.json
- Official SGLang benchmark source: https://github.com/sgl-project/sglang/blob/87f9dc2dcda778d02ae0f4c91f473734f11d5570/docs_new/src/snippets/configs/zai-org/glm-5.2-benchmarks.jsx
- PIVOT: https://arxiv.org/abs/2607.24593
- IndexCache: https://arxiv.org/abs/2603.12201
- MISA: https://arxiv.org/abs/2605.07363
- EcoSpec: https://arxiv.org/abs/2607.12696
- Speculative-decoding load model: https://arxiv.org/abs/2605.15051

Tasks:
1. Build a bottleneck breakdown for prefill and decode at 8K/32K/128K/512K context and c1/c16/c64/c256.
2. Rerun MTP with natural acceptance on agent, coding, reasoning, dialogue, and random prompts. Report full acceptance-length distributions, not one mean.
3. Separate PIVOT-Reuse, PIVOT-Refine, IndexCache, and the existing GLM shared-index baseline. Explain which work overlaps.
4. Verify that PIVOT-Refine's candidate set can omit the true full-prefix top-k even though its candidate rescoring is exact. Measure top-k recall and downstream quality by context length.
5. Port or model EcoSpec on GLM. Verify target-distribution preservation and measure expert-footprint reduction.
6. Benchmark each technique alone and the sensible combinations. Never multiply paper maxima.
7. Convert measured changes into separate input, cached-input, and output COGS.

Required output:
- Reproducible commands, commit hashes, containers, and hardware topology.
- Kernel and end-to-end profiles with confidence intervals.
- Exactness/quality classification for every variant.
- A non-additive interaction matrix.
- A recommendation for ASAP, 1-minute, 5-minute, and flex configurations.
- GO/TEST/KILL decisions.
```

### Prompt 3: One-customer fanout and shared-prefix decode

```text
You are investigating the fastest way for Arcten to beat Sail's token economics before Arcten has many unrelated customers.

Hypothesis:
One RL, eval, synthetic-data, document-QA, or branching-agent customer can create c16-c256 concurrency and 80-99% shared prefixes. Standard prefix caching removes repeated prefill, but each decode request may still reread the same shared KV prefix. A shared-prefix decode kernel may remove that duplicate memory traffic.

Primary sources:
- CoDec: https://arxiv.org/abs/2505.17694
- Hydragen: https://arxiv.org/abs/2402.05099
- BatchLLM: https://arxiv.org/abs/2412.03594
- LMCache: https://arxiv.org/abs/2510.09665
- SGLang radix caching documentation/code

Tasks:
1. Define realistic workloads for RL rollouts, eval pass@k, synthetic data, document QA, self-consistency, and tree-search agents.
2. Replay c1/16/64/256 with 8K/64K/128K shared prefixes, varying shared ratio and branch depth.
3. Compare no cache, SGLang radix prefix cache, LMCache, and an implementation or faithful model of CoDec/Hydragen-style shared-prefix decode.
4. Audit CoDec's 3.8x claim: its vLLM version, Qwen3-4B default, A100 hardware, 120K prefix, and attention-only contribution. Determine what survives on GLM DSA and modern SGLang.
5. Determine whether DSA-selected KV indices remain sufficiently shared across branches to coalesce reads. Measure index-set overlap directly.
6. Include scheduling delay needed to form a useful branch batch and show completion-window compliance.
7. Convert results into cost per rollout, per eval sample, and per accepted result, not only cost per token.

Required output:
- A workload matrix and raw traces.
- Prefix-hit, shared-index-overlap, TTFT, TPOT, throughput, and $/M tables.
- End-to-end gains versus current SGLang, not old vLLM.
- The minimum single-customer volume/concurrency needed to beat each Sail tier.
- A product recommendation and one narrow design-partner profile.
```

### Prompt 4: Agent context lifecycle and token reduction

```text
You are designing Arcten's cost optimizer for long-running agents. The goal is to lower cost per successfully completed task even for one isolated customer, while making quality loss measurable and reversible.

Context:
- Agent sessions repeatedly resend system prompts, tool schemas, history, observations, and generated artifacts.
- Arbitrary context rewriting can invalidate prefix caches, so fewer logical tokens do not always mean lower billed or compute cost.
- Arcten's gateway may optimize prompts, but exact-model inference must remain a separate, unmodified mode.

Primary sources:
- TokenPilot: https://arxiv.org/abs/2606.17016
- CAPC: https://arxiv.org/abs/2607.15516
- LMCache: https://arxiv.org/abs/2510.09665
- INFERCEPT: https://arxiv.org/abs/2402.01869
- Tutti: https://arxiv.org/abs/2605.03375

Tasks:
1. Build representative traces for coding agents, deep research, browser agents, support agents, and tool-heavy workflows.
2. Compare vanilla resend, stable-prefix formatting, exact prefix caching, KV offload/resume, lifecycle eviction, tool-schema compression, and semantic context compaction.
3. Measure logical tokens, uncached tokens, cache-hit tokens, KV bytes, recompute, storage/network cost, and final task success.
4. Use customer-like acceptance tests: tests passed, citations verified, ticket resolved, document accepted, or task-specific checks. Do not use only an LLM judge.
5. Test failure recovery and rollback when a compressed context fails.
6. Report isolated and continuous modes separately.

Required output:
- Cost per accepted task with confidence intervals.
- Quality and cache-continuity tradeoff curves.
- A policy that chooses exact reuse, eviction, or compression per context segment.
- Clear API/observability fields needed to earn customer trust.
- A list of optimizations safe to enable by default and those requiring opt-in.
```

### Prompt 5: Hardware, precision, and topology frontier

```text
You are Arcten's hardware-economics researcher. Find the lowest executable raw COGS for GLM-5.2 across immediate and delayed service, without comparing incompatible products as identical.

Known reference:
- SGLang publishes GLM-5.2 results for B200 FP8, GB300 FP8, B200/B300 NVFP4, H20 W4AFP8, and MI355X FP8. Some recipes simulate MTP acceptance; H200/B300 FP8 measurements are pending.
- The FP8 checkpoint is roughly 756 GB and requires a topology, not a pile of unrelated single GPUs.

Primary source:
https://github.com/sgl-project/sglang/blob/87f9dc2dcda778d02ae0f4c91f473734f11d5570/docs_new/src/snippets/configs/zai-org/glm-5.2-benchmarks.jsx

Tasks:
1. Obtain current executable quotes for complete nodes/topologies: 8xH100 SXM, 8xH200 SXM, 8xB200, 4xGB300, 8xB300, and viable AMD alternatives.
2. Include NVLink/NVSwitch, InfiniBand, CPU RAM, local NVMe, model download/startup, minimum reservation, region, egress, interruption, and actual availability.
3. Recompute cost separately for input, cached input, and output at c1/16/64/256 using natural MTP acceptance.
4. Derive the maximum GB300 GPU-hour price that beats B200 at each concurrency. Current official throughput implies approximately 1.59x at c1, 1.61x at c16, 1.44x at c64, and 1.35x at c256.
5. Evaluate FP8 and NVFP4 as separate SKUs. Run broad reasoning, coding, tool-call, long-context, and logprob-drift tests; one AIME score is insufficient.
6. Test whether older/cheaper GPUs can win only after lossless compression or expert offload, and include the throughput penalty.

Required output:
- A dated quote/evidence CSV with direct provider links or written quotes.
- $/M token frontiers by workload and concurrency.
- A precision/SKU quality report.
- Capacity availability and interruption distributions.
- Immediate, 1-minute, 5-minute, and flex hardware recommendations.
- Sensitivity to utilization from 1% to 95%.
```

### Prompt 6: Frontier-MoE execution topology

```text
You are evaluating which recent frontier-MoE serving systems are useful to Arcten now versus only after scale.

Company context:
- Arcten starts small, has startup cloud credits, and wants simple operations.
- The flagship exact model is GLM-5.2 FP8.
- Completion windows can delay work, but delay is useful only if it creates better batching, cache reuse, topology utilization, or cheaper procurement.

Primary sources:
- ExpertPlex: https://arxiv.org/abs/2607.18002
- Moebius: https://arxiv.org/abs/2606.26607
- UltraEP: https://arxiv.org/abs/2606.04101
- ASAP prefill: https://arxiv.org/abs/2606.22541
- Attention-FFN disaggregation: https://arxiv.org/abs/2605.28302
- MoEless: https://arxiv.org/abs/2603.06350

Tasks:
1. Reconstruct every evaluation topology, model, workload, SLO, baseline, and utilization level.
2. For ExpertPlex, distinguish GLM-5.1 results versus MiniMax results and note where P/D baselines could not fit the same 24-GPU layout.
3. For MoEless, audit the memory-times-latency cost proxy, A6000 testbed, one-second batch emulation, and absence of real serverless pricing.
4. Model c1, one-node burst, 16-24 GPU sustained, and rack-scale regimes separately.
5. Determine which components can be adopted incrementally in SGLang and which require a new runtime or network topology.
6. Produce the traffic threshold at which each architecture pays for its added complexity.

Required output:
- A baseline-normalized comparison table.
- Minimum GPU count, interconnect, engineering scope, and expected gain.
- A staged recommendation: launch, one-node scale, multi-node scale, rack scale.
- Explicit reasons to reject impressive but inapplicable headline numbers.
```

### Prompt 7: Multi-cloud spot execution with exact recovery

```text
You are designing Arcten's delayed-completion capacity layer across AWS, Azure, GCP, and specialist GPU clouds.

Constraints:
- Arcten must not depend on retail API resale.
- Startup credits may be used for launch experiments but cannot define durable unit economics.
- GLM-5.2 needs tightly connected multi-GPU nodes. A cheap isolated GPU is not useful.
- The service must preserve accepted request state across preemption and meet a stated completion window.

Primary starting source:
- ShuntServe: https://arxiv.org/abs/2606.18600

Tasks:
1. Collect actual spot/preemptible prices and availability histories for complete viable nodes in each cloud, plus specialist providers.
2. Measure interruption warning, correlated node-pool failure, relaunch time, image/model load time, quota, and regional capacity.
3. Compare restart, request replay, KV checkpoint/migration, output-preserving migration, and reliable overflow.
4. Price all waste: partial generation, cold load, warm tail, storage, egress, fallback, and operator reserve.
5. Simulate Poisson, bursty, and deadline-queued traffic from zero requests through node saturation.
6. Optimize an admission rule that rejects work when no profitable route exists. Do not assume future batches.

Required output:
- Provider/topology evidence table.
- Completion probability and COGS by window.
- Break-even batch/concurrency thresholds.
- A minimal two-route launch design.
- A failure-mode table and an auditable request receipt schema.
```

### Prompt 8: Model and output-budget routing for the gateway

```text
You are researching Arcten's inference-optimization gateway. This is distinct from Arcten's exact open-model completion-window product.

Goal:
Use customer-owned API keys and/or Arcten-hosted open models to lower cost per accepted business outcome. The gateway may choose model, provider, context policy, reasoning effort, and maximum output length, but it must honor customer quality and latency constraints and show what changed.

Primary sources:
- R2-Router: https://arxiv.org/abs/2602.02823
- UCCI: https://arxiv.org/abs/2605.18796
- RLM-Cascade: https://arxiv.org/abs/2606.22840
- vLLM Semantic Router: https://vllm-sr.ai/

Tasks:
1. Select three narrow workflows with objective acceptance checks, such as code changes/tests, support resolution, structured document extraction, or verified research.
2. Build routing baselines: cheapest model, strongest model, commercial semantic router, confidence cascade, and joint model/output-budget router.
3. Include prompt-cache effects, retries, provider rate limits, and session pinning.
4. Train/calibrate only on historical customer traces; maintain held-out and time-shifted tests.
5. Measure cost per accepted task, regression rate, tail latency, and rollback frequency.
6. Specify guardrails, explainability fields, shadow mode, and automatic rollback.

Required output:
- A routing policy and evaluation protocol.
- Savings-quality Pareto curves, not a single average.
- Results by workflow and difficulty bucket.
- An observability schema showing original route, chosen route, estimated savings, actual savings, quality check, and fallback.
- A clear statement of what data could become an Arcten moat.
```

### Prompt 9: Non-additive integrated cost simulator

```text
You are the modeling lead for Arcten. Build a simulator that prevents the team from multiplying incompatible paper headlines.

Inputs must include:
- model/precision and tensor footprint;
- hardware topology and hourly cost;
- real prefill/decode throughput surfaces by input length, output length, and concurrency;
- natural speculative acceptance distributions;
- prefix and KV hit distributions;
- shared-prefix tree shape;
- request arrivals and completion windows;
- cold starts, warm tails, interruptions, retries, storage, network, and fallback;
- quality success probability for any approximate optimization.

Required scenarios:
1. One isolated 8K/1K GLM request.
2. One customer with c16, c64, and c256 independent requests.
3. One customer with c16, c64, and c256 branches from shared 8K/64K/128K prefixes.
4. Sequential tool-calling agents with pauses.
5. Mixed-model gateway traffic.

Tasks:
1. Model techniques as changes to measured resources, not scalar speedup multipliers.
2. Encode overlap families: DSA indexers, speculative decode, KV caching, weight compression, execution topology, and fleet procurement.
3. Calibrate to actual benchmark runs and emit uncertainty intervals.
4. Calculate input, cached-input, output, and accepted-task COGS.
5. Find the minimum demand shape and hardware price needed to beat each Sail GLM tier.
6. Add a sensitivity/tornado analysis showing which unknowns deserve experiments first.

Deliver code, tests, example configs, CSV outputs, and a concise decision memo. Every default must cite a benchmark or be labeled as an assumption.
```

### Prompt 10: Reproduction and red-team audit

```text
You are an adversarial reviewer. Your job is to prevent Arcten from building its business around a misleading benchmark.

Review these result families:
- 100x energy from arrival shaping;
- 84-95% cost reduction from MoEless;
- 150% throughput from ECF8;
- 3.8x TPOT from CoDec;
- 1.6x PIVOT end-to-end;
- 1.62x EcoSpec;
- 2.5x GLM goodput from ExpertPlex;
- 56-87% agent cost reduction from TokenPilot;
- 4-5x routing cost reduction from R2-Router.

For each claim:
1. Identify the exact numerator and denominator.
2. Record model, precision, hardware, batch/concurrency, context/output lengths, traffic, SLO, software versions, and quality metric.
3. Determine whether the baseline is current SGLang, an old engine, naive Transformers, a simulation, or a cost proxy.
4. Classify the gain as sparse-request, one-customer fanout, sustained fleet, or rack-scale only.
5. Classify exactness as model-preserving, distribution-preserving, quality-matched, or alternate SKU.
6. Locate code and reproduce the smallest decisive experiment where possible.
7. State the maximum defensible gain Arcten may place in an internal model and the much stricter wording suitable for customers.

Output a red/yellow/green evidence matrix. A negative result is valuable. Do not soften contradictions or fill missing evidence with assumptions.
```

### Prompt 11: Continuous literature scout for genuinely new gains

```text
You are Arcten's continuous inference-systems literature scout. Search primary research and official code released or materially revised in the last 12 months, prioritizing the last 90 days.

Arcten context:
- Exact open-model completion-window inference plus a quality-gated optimization gateway.
- Priority model: zai-org/GLM-5.2-FP8, a roughly 756 GB DSA MoE.
- Goal: beat Sail's public GLM prices with fewer customers, ideally through structural cost reductions rather than subsidies or retail API resale.

Search categories:
- lossless FP8/block-FP8 weight compression and fused GEMM;
- DSA/MLA indexer and attention kernels;
- MoE expert kernels, load balancing, TP/EP switching, and communication;
- speculative decoding under load;
- shared-prefix decode and agent KV lifecycle;
- cheap/heterogeneous/spot GPU serving with exact recovery;
- model/output/context routing with objective quality gates;
- new accelerators or topologies with measured dollars per token.

For every candidate, extract:
- release and revision date;
- primary paper and official code;
- claimed gain and exact baseline;
- model, precision, hardware, concurrency, context, output, and SLO;
- exactness/quality class;
- whether it helps c1, one-customer fanout, or only a large fleet;
- overlap with optimizations already present in GLM/SGLang;
- estimated engineering effort and nearest reproducible experiment.

Reject surveys as evidence for performance claims; use them only to discover primary work. Reject vendor marketing without reproducible measurements. Rank candidates by expected end-to-end COGS impact times probability of reproduction, divided by engineering weeks. Return the top five new experiments and explicitly state when nothing new beats the existing shortlist.
```

## Final decision rule

Arcten should not ask, "What paper has the largest speedup?" It should ask:

```text
Which measured change lowers end-to-end cost per accepted result
on our model, our traffic, our hardware quote, and our quality contract?
```

For the next engineering cycle, the best first bets are natural-MTP benchmarking, one-customer shared-prefix fanout, and the GLM block-FP8 entropy/fit study. They directly test whether Arcten can beat Sail before broad demand exists.
