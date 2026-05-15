# Phase 05 — IntHub: Inventory (Stage 1)

**Status:** `in-progress`

**Prerequisite:** Phase 04 complete.

---

## Goal

Build a React+Vite sub-app (`ideations/inthub-inventory`) that provides a read-only inventory view of the IntHub data model. All data is fake/hardcoded from the `inthub-data-inventory` package, queried via `inthub-api`.

This is an **admin/operations tool** — all entities are shown globally across all orgs, with an Org column where relevant. No per-org filtering or org switcher.

### Layout

Mirrors `dashboard-app-1`: collapsible shadcn sidebar (SidebarProvider pattern) with two nav sections:

- **Main**: Orgs, Provider Accounts, Credentials, Integrations
- **Dictionaries**: Providers, Credential Types, Integration Types, Integration Runtimes

### Features

- Sidebar with IntHub branding header, Main section, Dictionaries section, NavUser footer
- Read-only list/table pages for all 8 entity views
- Status badges color-coded by enum value
- Sidebar collapses to icon mode
- Registered in ideation-registry at `/apps/inthub-inventory` (dev: `http://localhost:4204`)

---

## Tasks

| Task | Title | Status |
|---|---|---|
| [p5-001](p5-001.md) | Scaffold `ideations/inthub-inventory` — Nx generator, base path, port, copy target, registry entry | `done` |
| [p5-002](p5-002.md) | Layout foundation — copy shadcn UI components + add Table/Badge, Tailwind setup, bare `App` skeleton | `done` |
| [p5-003](p5-003.md) | `AppSidebar` — IntHub branding header, NavMain, NavDictionaries, NavUser | `done` |
| [p5-004](p5-004.md) | Providers page — list all providers with category badge | `done` |
| [p5-005](p5-005.md) | Credential Types page — list all credential types with provider join | `done` |
| [p5-006](p5-006.md) | Integration Types page — list all integration types with source/target/runtime | `done` |
| [p5-007](p5-007.md) | Integration Runtimes page — list all runtimes with type and status badges | `done` |
| [p5-008](p5-008.md) | Orgs page — list all orgs with status badge and provider account count | `done` |
| [p5-009](p5-009.md) | Provider Accounts page — list all provider accounts with org, provider, status | `done` |
| [p5-010](p5-010.md) | Credentials page — list all credentials with status badge and expiry | `done` |
| [p5-011](p5-011.md) | Integrations page — list all integrations with org, type, accounts, status | `done` |
| [p5-012](p5-012.md) | Wire navigation + breadcrumbs, add smoke test, verify `pnpm nx build web` | `done` |
| [p5-013](p5-013.md) | Adjust `inthub-data-inventory` dataset — replace Snowflake/Splunk with ClickHouse/Sentinel, update runtime URLs, remap all integration targets | `done` |
| [p5-014](p5-014.md) | Org switcher above Main section — remove Orgs page, add org dropdown, filter Provider Accounts / Credentials / Integrations by selected org | `done` |
| [p5-015](p5-015.md) | Rename inthub-inventory → inthub-v1, inthub-data-inventory → inthub-data, remove sidebar IntHub header | `planned` |
