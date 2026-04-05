---
name: execute-task
description: Execute a specific task from the project plan. Invoke as /execute-task <task-id> (e.g. /execute-task p1-001).
argument-hint: <task-id>
disable-model-invocation: true
---

Execute task **$ARGUMENTS** following the project's task execution procedure.

## Step 1 — Load context

Read these files before doing anything else:
- `docs/spec/task-execution.md` — the execution procedure you must follow
- `docs/spec/instructions.md` — code quality rules and validation gates
- `docs/spec/architecture.md` — patterns to follow

Determine the task file from the task ID:
- `p1-xxx` → `docs/plan/phase-01/p1-xxx.md`
- `p2-xxx` → `docs/plan/phase-02/p2-xxx.md`
- `p3-xxx` → `docs/plan/phase-03/p3-xxx.md`

Read the task file and locate task **$ARGUMENTS**. Read its description, affected files, and every Definition of Done criterion in full.

## Step 2 — Read affected files

Read every file listed under **Files:** in the task before writing a single line of code. Never modify what you haven't read.

## Step 3 — Execute

Follow `docs/spec/task-execution.md` exactly:
- Work incrementally; run lint/typecheck/test after each logical change
- Stay in scope — do not fix unrelated issues inline
- Add unit tests for any new logic in the same commit (see Testing section in `docs/spec/instructions.md`)

## Step 4 — Validate

Run all validation gates before marking done:
```bash
pnpm nx lint web
pnpm nx build web
pnpm nx affected -t test
pnpm nx run-many -t typecheck
```

Verify every DoD criterion explicitly. Do not mark done if any criterion is unclear or untested.

## Step 5 — Complete

- Update the task's `**Status:**` from `new` to `done` in the task file
- Commit with the format:
  ```
  <type>(<scope>): <description>

  Task: $ARGUMENTS
  ```
- If anything in the plan or spec turned out to be wrong, update the relevant doc and add a `> **Note:**` to the task
