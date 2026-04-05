<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax


<!-- nx configuration end-->

# Project Spec & Execution

This project has structured documentation under `docs/`. Always consult the relevant spec before making changes.

## Key spec files

- @docs/spec/architecture.md — monorepo structure, patterns, ADRs
- @docs/spec/instructions.md — code quality rules, registry contract, validation gates, git workflow
- @docs/spec/contributing.md — how to add a sub-app (base path, copy target, registration, tests)
- @docs/spec/stack.md — tech stack and Nx command reference

## Execution

Use these skills to execute planned work:

- `/execute-task <id>` — execute a single task (e.g. `/execute-task p1-001`)
- `/execute-phase <n>` — execute all tasks in a phase in order (e.g. `/execute-phase 01`)

Both skills load the relevant plan file and spec docs automatically and follow the documented procedures in `docs/spec/task-execution.md` and `docs/spec/phase-execution.md`.