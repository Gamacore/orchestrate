# Arcten dashboard roadmap

This folder owns the dashboard application. Add a feature page in `src/routes/demo/<feature>/+page.svelte`, add its sidebar entry in `src/lib/dashboard/navigation.ts`, and keep shared dashboard code in `src/lib/dashboard/`.

## 1. Foundation — complete

- [x] Shared dashboard shell, sidebar, and workspace header.
- [x] Separate routes for Overview, Agents, Usage, Models, and API keys.
- [x] Static representative UI data for frontend work before services exist.
- [x] Demo destination planned for `dashboard.arcten.com/demo`.

## 2. Frontend flows

- [x] Agent list with representative run state, model window, and last-run metadata.
- [x] Agent detail page with current run summary and completion-window comparison.
- [x] New-agent form with a selectable completion window and an explicit demo-only state.
- [x] Agent edit page with editable frontend state and demo-only save affordance.
- [x] Request/job state, delivery estimate, retry, cancellation, and failure details. These express Arcten's core scheduling value and come before generic agent-builder UI.
- [x] Usage time range, breakdown, and completion-window comparison.
- [x] Model catalog and availability states.
- [x] Reusable empty, loading, error, and permission-denied state boundary, with interactive state previews on Requests.
- [x] Responsive mobile navigation and baseline navigation accessibility: visible keyboard focus and `aria-current` state.
- [ ] Full accessibility review, including keyboard testing and screen-reader announcements.

## 3. Accounts and workspaces

- [ ] Connect an authentication provider; replace the placeholder user in `+layout.svelte`.
- [ ] Add users, organizations/workspaces, memberships, roles, and environments.
- [ ] Protect dashboard routes with sessions while retaining an explicit demo mode.
- [ ] Add account settings, invitations, and sign-out.

## 4. Product API

- [ ] Replace demo agents with `GET /agents` plus create/update/delete mutations.
- [ ] Connect request events and aggregated usage/cost endpoints.
- [ ] Connect model catalog and inference route status.
- [ ] Create and revoke API keys. Reveal a secret only once after creation.
- [ ] Put each feature's transport code in a local client module, not a route component.

## 5. Production readiness

- [ ] Map `dashboard.arcten.com` to the dashboard deployment.
- [ ] Test organization-level authorization and permissions.
- [ ] Add audit logs, telemetry, error reporting, and end-to-end tests.

## Placeholders until backend work begins

Use explicit mock data or `DashboardPlaceholder` for unfinished data views. Do not claim an action completed or that account data is real until it is backed by an authenticated API.

## Implementation log

### Milestone 2 — Agents foundation

- Added a shared `mock-data.ts` module so the overview, agent list, and future views can consume the same representative agent and completion-window data without duplicating it.
- Replaced the Agents placeholder with a list route, an individual route (`/demo/agents/[id]`), and a new-agent route (`/demo/agents/new`).
- Kept interactions intentionally non-persistent: selecting a window changes local frontend state only, and create/edit actions are labelled as pending backend integration.

### Milestone 2 — Operations and analytics flows

- Added a Requests route with state filters plus frontend-only retry and cancellation transitions. The page includes queue status, completion window, submitted time, target delivery state, estimated cost, and failure detail.
- Replaced Usage and Models placeholders with interactive frontend views: range selection and completion-window spend breakdown for Usage, plus availability filtering and route-health states for Models.
- Added the agent edit route and connected it from agent detail. It follows the same transparent demo-only persistence policy as agent creation.
- Added a horizontally scrollable mobile navigation bar, `aria-current` for the active page, and visible keyboard focus styling for navigation links.

### Milestone 2 — Data states and accessibility

- Added `DashboardDataState`, a shared state boundary driven by a tagged union: `ready | loading | empty | error | forbidden`. A single discriminant prevents incompatible UI states from rendering together.
- Added an interactive Requests state preview so every async state can be reviewed before a backend exists.
- Added a skip link, focusable main-content target, table caption, pressed-state semantics for filters, request-specific action labels, status announcements, and retry/error messaging.

## Product assessment — September 2026

The current demo is a **6/10 visual UI**, **3/10 UX**, and **2/10 product-functionality** scaffold. Its shell, terminology, summary metrics, and recent-work table are useful starting points. Its main limitation is that only Overview contains product UI; most sections remain placeholders and actions have no outcome.

Compared with AI gateway and agent-operations dashboards, the most important missing capabilities are:

1. **Requests and completion windows** — queue state, target delivery time, selected window, expected cost, cancellation/retry, and failure reason. This is the first priority because Arcten sells lower-cost scheduled inference, not a generic agent builder.
2. **Agent and run detail** — model, route, inputs, timing, token counts, output/error, and child/task traces.
3. **Usage controls** — time range, workspace/agent/model/window filters, export, budgets, and alerts.
4. **Model and route operations** — live availability, price by window, health/capacity, and later private model deployments.
5. **Secure workspace controls** — organizations, roles, environments, scoped keys, one-time key reveal, and audit history.
6. **Quality signals** — traces, evaluations, regressions, and production anomaly detection once agent workloads are live.

The dashboard should prioritize Requests and Completion windows ahead of generic agent-building UI. Major peer patterns informing this order include model routing/fallbacks, usage/cost/errors, project-level budgets and keys, request observability, and trace/evaluation workflows.
