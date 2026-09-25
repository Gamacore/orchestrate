# Arcten dashboard roadmap

This folder owns the dashboard application. Add a feature page in `src/routes/demo/<feature>/+page.svelte`, add its sidebar entry in `src/lib/dashboard/navigation.ts`, and keep shared dashboard code in `src/lib/dashboard/`.

## 1. Foundation — complete

- [x] Shared dashboard shell, sidebar, and workspace header.
- [x] Separate routes for Overview, Agents, Usage, Models, and API keys.
- [x] Static representative UI data for frontend work before services exist.
- [x] Demo destination planned for `dashboard.arcten.com/demo`.

## 2. Frontend flows

- [ ] Agent list, detail, create, and edit pages.
- [ ] Usage time range, breakdown, and completion-window comparison.
- [ ] Model catalog and availability states.
- [ ] Empty, loading, error, and permission-denied states.
- [ ] Responsive mobile navigation and accessibility review.

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
