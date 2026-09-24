---
title: Evidence that Forge Code Cheated on Terminal Bench
slug: evidence-that-forge-code-cheated-on-terminal-bench
published_date: 2026-04-22T00:00:00+00:00
tags: benchmarks, agents, evaluation
publish: true
make_discoverable: false
is_page: false
---

> We reviewed ForgeCode's leaderboard runs on Terminal Bench 2.0 and found repeated references to an injected `AGENTS.md` file. In multiple cases, the agent explicitly used commands like `ls`, `cat`, and `head` to reveal that file and its contents. The visible contents are not generic boilerplate; they include **per-task solution guidance**, **helper scripts**, and **previous-run guidance**.

## Why we looked

We were benchmarking Chopin, our autonomous coding agent powering our autonomous research, on Terminal Bench 2.0. During a review
of the leaderboard's top ForgeCode runs, we repeatedly observed ForgeCode's agent referencing an `AGENTS.md` file that was not part
of the original tasks.

That is the narrow issue here. The question is not whether agents are allowed to have prompts. Every serious agent does. The question is whether Forge is feeding hidden task-specific guidance, prior-run memory, or answer-adjacent context into benchmark runs in a way that changes what the score actually means.

## The main claim

From the public logs, the `AGENTS.md` injected by ForgeCode looks tailored to the active task. In some cases, it includes prior-run failures, instructions for future runs, and information that sits uncomfortably close to the expected answer.

If that is what Forge is doing, then these are not clean from-scratch benchmark solves. They are benchmark runs with hidden task memory baked in, and the resulting leaderboard scores should not be read the same way.

At worst this is blatant cheating in order to maximize evaluation scores. At best this is gray area "gaming the benchmark" in a way that was not intended.

## Evidence

Across Forge's Claude 4.6 submission, `AGENTS.md` is mentioned 264 times across 98 of 445 runs, spanning 27 of 89 tasks. More importantly, there are runs where the agent directly runs `cat` on the `AGENTS.md` file, showing us its exact contents.

### 1. Task: vulnerable-secret

- [Leaderboard run](https://www.tbench.ai/leaderboard/terminal-bench/2.0/forge/unknown/claude-opus-4-6%40Anthropic/568760a9b221bd2efc27dc592833c1d2d99949b20995ba1321a3aa1567e6ba20/9b327297-39f9-4ffe-9c58-6a34d5e5fcf1)
- [Archived logs](/bench-logs/9b327297-39f9-4ffe-9c58-6a34d5e5fcf1.tar.gz)

This is the most blatant example. ForgeCode instantly solves the task without reading any files into context or exploring the task/project environment at all. We'll provide excerpts, but you can also directly read the agent logs yourself.

Here is the prompt for the `vulnerable-secret` task:

```text
The program is available as an executable. You may need to interact with it in
various ways to discover how to access the secret information.

Analyze the following program that contains a secret key. The goal is to extract this secret key and save it to `/app/results.txt`.

The program is available as an executable. You may need to interact with it in various ways to discover how to access the secret information.

The secret key is in the format `FLAG{...}`

The task is complete when you have successfully extracted the secret key and written it to `/app/results.txt`.
```

The task prompt does not tell the agent that the bug is a buffer overflow. It does not mention a `solve.py` helper. It does not hand over a vulnerability class or an exploit path. And yet the run opens with the agent already knowing all of that.

Yet here is how ForgeCode opens the run:

```text
⏺ [22:52:17] Initialize d2989eed-1243-48ed-b98b-ac9f8dcb46e3
Let me follow the project guidelines closely. I need to exploit a buffer overflow in /app/vulnerable to extract a FLAG. The guidelines provide a clear solve.py script to use.
```

Before touching the binary, the agent already knows:

- the exact vulnerability type: buffer overflow
- that `AGENTS.md` points it to a `solve.py` script

Later in the same archived run, Forge verifies that no intermediate files remain and the verifier explicitly treats `dump.txt` and `solve.py` as the kinds of artifacts that could have been left behind:

```text
│ 3     │ No intermediate files left │ ... │ ls /app/ │ pending │
│       │ (dump.txt, solve.py, etc.) │     │          │         │
```

That is hard to explain away as ordinary prompting. The public prompt does not mention `solve.py` (it isn't in the task), and the run still behaves as if a task-specific exploit script was already available through Forge's hidden guidance.
In other runs, the agent also removes `solve.py` and related artifacts explicitly, which points in the same direction: this was not just generic problem solving from the public task prompt. Context from past runs, including a solution script, was injected into the environment.

### 2. Task: filter-js-from-html

- [Leaderboard run](https://www.tbench.ai/leaderboard/terminal-bench/2.0/forge/unknown/claude-opus-4-6%40Anthropic/885bb73e2797a54d5de860c25f481b5a60e2b91c0de30acaca9560603e9e1ff8/3db805ad-3c4e-429e-8efa-887b12e42de8)
- [Archived logs](/bench-logs/3db805ad-3c4e-429e-8efa-887b12e42de8.tar.gz)

This is the cleanest direct read of the injected guidance file. In this run, ForgeCode agent runs `cat` on the `AGENTS.md` file, revealing it's contents to be task-specific guidance.

```text
⏺ [19:33:23] Execute [/bin/sh] ls /app/AGENTS.md && cat /app/AGENTS.md
/app/AGENTS.md
# Task: Filter JavaScript from HTML Robustly Against Adversarial Inputs

Implement an HTML sanitizer that blocks the benchmark's XSS payload batches, not just obvious script tags or straightforward event handlers.

## Failure Observed in Trial `filter-js-from-html__bXrfv5B`

That run failed with reward `0.0` because the sanitizer still missed multiple XSS cases. The verifier reported 5 failed batches of attack vectors.

## What Actually Goes Wrong

Regex-like or shallow tag stripping is not enough for adversarial HTML:
- malformed tags
- obfuscated attributes
- parser differentials
- nested/foreign-content tricks
- unusual encodings and broken markup

A sanitizer can look correct on normal samples and still fail badly on the benchmark.

## Future-Run Guidance

### 1. Do not rely on regex-only sanitization

Prefer a parser/DOM-based approach with explicit allowlisting and reconstruction.

### 2. Test malformed and adversarial HTML, not just normal snippets

The verifier is specifically trying to break simplistic sanitizers.

### 3. Validate against the real batch harness

Run the official test set before finalizing; passing a few handcrafted samples is not enough.

## Pitfalls to Avoid

- regex removal of `<script>` only
- naive `on*` stripping without parser-aware normalization
- assuming browser parsing matches your sanitizer parsing
```

This is not a generic system prompt. It is a task-specific writeup with prior failure analysis, future-run guidance, and pitfalls to avoid. It even names a failed trial, `filter-js-from-html__bXrfv5B`, that is not one of the five submission attempts in that leaderboard run.

### 3. Task: mteb-leaderboard

- [Leaderboard run](https://www.tbench.ai/leaderboard/terminal-bench/2.0/forge/unknown/claude-opus-4-6%40Anthropic/8c2f8d63470a11b27a25e2630e407a5eb9e9fbeda599d3df7f9bc5f2f7aeff20/854b92f5-f9c9-4acd-9b49-b3a86f0d847c)
- [Archived logs](/bench-logs/854b92f5-f9c9-4acd-9b49-b3a86f0d847c.tar.gz)

This one is a greater infraction: the injected file contains not just guidance, but the previously wrong answer and the **expected correct answer**.

```text
Let me verify the project guidance file to be thorough:
⏺ [21:52:49] Execute [/bin/sh] ls /app/AGENTS.md 2>/dev/null && head -20 /app/AGENTS.md || echo "File not found"
/app/AGENTS.md
# Task: Recover the Correct Historical MTEB Leaderboard Answer

Write the exact expected leaderboard/model answer using an authoritative historical source, not a guess from uncertain reconstruction.

## Failure Observed in Trial `mteb-leaderboard__d7qWeYP`

That run failed with reward `0.0` because it wrote the wrong final answer to `result.txt`: `jealk/TTC-L2V-supervised-2`
instead of the expected `GritLM/GritLM-7B`.

## What Actually Goes Wrong

The failure mode is not formatting; it is incorrect historical retrieval.
```

That is not "better general reasoning." It is the benchmark telling the agent what the last answer was and what the correct answer should have been.

### 4. Task: tune-mjcf

- [Leaderboard run](https://www.tbench.ai/leaderboard/terminal-bench/2.0/forge/unknown/claude-opus-4-6%40Anthropic/0014600ed83c316bbc3b495879f147f234d06578281af02817c9955794d4ebef/3ca3006f-a8a0-473e-b294-b922dfb57f1c)
- [Archived logs](/bench-logs/3ca3006f-a8a0-473e-b294-b922dfb57f1c.tar.gz)

This example is different. The main tell is that ForgeCode starts with the exact fix before reading the file it is supposed to reason about.

Here is the prompt for the task:

```text
Can you tune this MuJoCo model file (mjcf) such that it takes 60% of the original time or less to simulate the same scene for a total of two simulation seconds?
The same full physics state should be reached within atol=1e-5 without NaN or Inf.
The initial model is at /app/model_ref.xml and should remain unchanged. Tuned mjcf should be saved as /app/model.xml.
The /app/eval.py script can help you iterate.
The tuned model should also pass the correctness test (hint: changing physical properties of the bodies will break them).
There is no need to look for plugins and we will use a fresh MuJoCo installation to test your model.xml.
```

And here is how ForgeCode's agent opens:

```text
Let me follow the guidelines precisely.
I need to create model.xml with solver="PGS" added to model_ref.xml, then verify with eval.py.
```

Despite the task instructions providing a path to `model_ref.xml`, the agent never reads that file into context. No `cat`. No `head`. No read tool call. It still knows the exact edit.

Then, during verification, it reveals that `AGENTS.md` is sitting in `/app`:

```sh
⏺ [21:37:12] Execute [/bin/sh] ls /app
AGENTS.md
eval.py
model.xml
model_ref.xml
```

The task environment Dockerfile only copies `/app/eval.py` and `/app/model_ref.xml`. Thus `AGENTS.md` did not come from the benchmark task. It came from Forge's harness.

```dockerfile
FROM python:3.13-slim-bookworm
WORKDIR /app
RUN pip install --no-cache-dir mujoco==3.3.5
COPY src/eval.py /app/eval.py
COPY src/model_ref.xml /app/model_ref.xml
```

## Why this matters

Terminal Bench is a good benchmark. Its value is that it measures whether an agent can robustly complete autonomous tasks without a human in the loop. That is exactly why this matters: if a run includes hidden task-specific memory, prior-trial notes, helper scripts, or solution-adjacent instructions, then the resulting score is no longer measuring a clean autonomous solve from the task inputs alone.

Once that happens, leaderboard numbers stop being directly comparable. They become a mix of agent capability, harness design, and benchmark gaming. The problem is not Terminal Bench itself. The problem is that the veracity of any evaluation is limited by the honesty of the system being submitted and the people submitting it.

We have submitted these runs and the supporting evidence to the Terminal Bench leaderboard moderators and asked that they be taken down pending clarification.

More broadly, this is the familiar lesson of benchmarks: once a leaderboard matters, people will optimize for it. Sometimes that optimization is legitimate. Sometimes it is cheating. Either way, benchmark results are only as trustworthy as the honesty behind the run.
