# Phase 04 — IntHub: Entity Model, API & Data

**Status:** `planned`

**Prerequisite:** Phase 03 complete.

---

## Goal

Build the foundation for all IntHub sub-apps: entity interfaces, an in-memory API wrapper, and the first dataset. IntHub is an Integration Hub for an MSSP company managing data pipelines, credentials, and health checks across many tools and services.

### Architecture

Three concerns, three package groups:

```
packages/
├── inthub-entities/          # Interfaces, types, enums, Database type — no logic, no data
├── inthub-api/               # makeApi(db) factory — query functions over any Database
├── inthub-data-inventory/    # Fake dataset for inventory sub-app (Phase 05)
├── inthub-data-credentials/  # (Phase 06)
├── inthub-data-healthchecks/ # (Phase 07)
└── inthub-data-provisioning/ # (Phase 08)
```

**Usage in sub-apps:**
```ts
import { makeApi } from '@rp-vibe-ideation/inthub-api';
import { database } from '@rp-vibe-ideation/inthub-data-inventory';
const api = makeApi(database);
const orgs = api.getOrgs();
```

### Entities

| Entity | Description |
|---|---|
| Provider | Tool/platform/cloud service (AWS, Qualys, DataDog, etc.) |
| Org | Tenant in IntHub (MSSP client) |
| ProviderAccount | Org's account/tenant within a Provider |
| CredentialType | Auth mechanism supported by a Provider (IAM Role, API Key, etc.) |
| Credential | Specific auth credential for a ProviderAccount, vault-referenced |
| ConfigSchema | JSON Schema defining valid Config shape for a Provider+purpose |
| Config | Schema-validated configuration blob on a ProviderAccount |
| IntegrationRuntime | Platform where pipelines execute (Astronomer, N8N, EKS) |
| IntegrationType | Template: source Provider + target Provider + runtime + version (e.g., different DAG IDs) |
| Integration | Concrete pipeline instance connecting two ProviderAccounts via an IntegrationType |
| Provisioning | Automated resource creation in a ProviderAccount (dashboards, monitors, etc.) |
| HealthCheck | Check definition for an entity type (credential-not-expired, account-reachable, etc.) |
| HealthCheckBinding | Per-instance check config (which entity, custom params) |
| HealthCheckRun | Single execution record of a HealthCheckBinding |
| ScheduledTask | Unified scheduler for periodic operations (integration runs, health checks, provisioning) |

### Key Relationships

```
Provider
 ├── CredentialType[]
 ├── ConfigSchema[]
 └── HealthCheck[] (provider-scoped)

IntegrationType
 ├── sourceProvider → Provider
 ├── targetProvider → Provider
 └── runtime → IntegrationRuntime

Org
 ├── ProviderAccount[]
 │    ├── Credential[] → CredentialType
 │    ├── Config[] → ConfigSchema
 │    └── Provisioning[]
 ├── Integration[] → IntegrationType, source/target ProviderAccount, Credentials
 └── ScheduledTask[] → targets any schedulable entity

HealthCheck → HealthCheckBinding[] → HealthCheckRun[]
```

---

## Tasks

| Task | Title | Status |
|---|---|---|
| [p4-001](p4-001.md) | Create `inthub-entities` lib — all interfaces, types, enums, Database type | `planned` |
| [p4-002](p4-002.md) | Create `inthub-api` lib — `makeApi()` factory and query functions | `planned` |
| [p4-003](p4-003.md) | Create `inthub-data-inventory` lib — fake dataset for 2–3 orgs | `planned` |
| [p4-004](p4-004.md) | Add unit tests for `inthub-api` | `planned` |
| [p4-005](p4-005.md) | Add unit tests for `inthub-data-inventory` (referential integrity) | `planned` |
