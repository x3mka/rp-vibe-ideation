# Phase 04 — IntHub: Entity Model & Glossary

**Status:** `planned`

**Prerequisite:** Phase 03 complete.

---

## Goal

Define the IntHub (Integration Hub) data model — all entity interfaces, types, enums, and fake data for 2–3 orgs. IntHub is a centralized inventory of integrations, credentials, and health checks for an MSSP that collects data from many tools and services.

This phase produces a shared TypeScript library (`packages/inthub-entities`) and the glossary document. No UI yet.

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

### Key relationships

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
| | | |
