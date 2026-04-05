---
name: execute-phase
description: Execute all tasks in a project phase in order. Invoke as /execute-phase <number> (e.g. /execute-phase 01).
argument-hint: <phase-number>
disable-model-invocation: true
---

Execute **Phase $ARGUMENTS** following the project's phase execution procedure.

## Step 1 — Load context

Read these files before doing anything else:
- `docs/spec/phase-execution.md` — the phase execution procedure you must follow
- `docs/spec/task-execution.md` — the per-task execution procedure
- `docs/spec/instructions.md` — code quality rules, validation gates, git workflow
- `docs/spec/architecture.md` — patterns and decisions
- `docs/plan/phase-$ARGUMENTS/index.md` — the phase goal, prerequisites, and all tasks

## Step 2 — Phase start checklist

Before touching any code, complete every item from `docs/spec/phase-execution.md`:

1. Confirm the phase goal is clear
2. Scan all tasks to understand full scope and dependencies
3. Verify prerequisites (prior phases done, suite green)
4. Confirm clean git state — no uncommitted changes
5. Manual smoke test of current working state

## Step 3 — Execute tasks in order

For each task in `docs/plan/phase-$ARGUMENTS/index.md` with status `new`, in order:

1. Treat it as a call to `/execute-task <task-id>` — follow `docs/spec/task-execution.md` fully
2. After the task commit, run `pnpm nx affected -t test` — fix any failures before moving to the next task
3. Do not start the next task until the current task's status is `done` and tests are green

## Step 4 — Phase completion

When all tasks have status `done`:

1. Run the full suite:
   ```bash
   pnpm nx run-many -t typecheck
   pnpm nx run-many -t lint
   pnpm nx run-many -t test
   pnpm nx build web
   ```
2. Verify in production mode: `pnpm nx build web && pnpm nx start web` — confirm the phase goal holds against built output
3. Re-read the phase goal statement and confirm it is genuinely met
4. Update any spec docs that turned out to be inaccurate during execution
5. Final commit: update all task statuses to `done` in the relevant task files under `docs/plan/phase-$ARGUMENTS/`
