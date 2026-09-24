---
title: What a Completion Window Buys You
slug: what-a-completion-window-buys-you
published_date: 2026-07-15T00:00:00+00:00
tags: scheduling, inference, pricing
publish: true
make_discoverable: true
is_page: false
---

Most inference APIs expose one scheduling choice: run the request now. That is correct for a chat turn, but it is wasteful for work whose result will be consumed later.

A completion window tells the inference system how much scheduling flexibility a request has. The result should still return as soon as it is ready. The window is permission to schedule intelligently, not a reason to hold finished output.

## Why time can lower cost

Immediate requests sharply limit the available execution paths. Capacity must already be warm, the model must already be loaded, and the request has little room to recover from an interruption.

With more time, a scheduler can:

- combine compatible requests into denser batches;
- wait for appropriate capacity instead of taking the first available machine;
- start a worker only when queued work can use it efficiently;
- route around an interrupted or unhealthy worker;
- keep flexible work away from capacity reserved for interactive traffic.

None of these changes require a different model. They change when and where the selected model runs.

## A simple set of choices

Arcten uses four service tiers so applications can make the tradeoff explicitly.

| Tier     | Best fit                                                           |
| -------- | ------------------------------------------------------------------ |
| Now      | User-facing work that must begin immediately                       |
| Priority | Short agent steps that can tolerate a brief queue                  |
| Standard | Research, evaluation, and batch work that can wait several minutes |
| Flexible | Large background workloads optimized for the best available rate   |

The accepted token rate should be visible before execution and locked when the request is accepted. That keeps the application in control even when underlying capacity conditions change.

## The application should choose

An infrastructure provider cannot infer the value of latency from a prompt. The application knows whether a person is waiting, whether a job has a downstream deadline, and whether a lower price is worth more than an immediate start.

That makes the completion window part of the request contract. Interactive calls stay fast. Background calls carry their real scheduling tolerance. The same API can serve both without forcing every token to pay the immediate-latency premium.
