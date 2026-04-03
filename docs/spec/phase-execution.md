# Phase Execution

How to work through a phase plan from start to finish. Each task within a phase follows [task-execution.md](./task-execution.md).

---

## Phase Start Checklist

Before touching any code:

1. **Read the phase goal** — understand what "this phase is complete" looks like
2. **Read all tasks** — scan every task in the phase so you understand the full scope and any implicit dependencies between them
3. **Check prerequisites** — confirm any prior phases listed are fully done (all statuses `done`, full suite green)
4. **Clean state** — no uncommitted changes in the working directory; `pnpm nx run-many -t test` passes
5. **Smoke test current state** — do a quick manual check that the app works as expected before making any changes; this establishes a known-good baseline and makes regressions obvious

---

## Executing Tasks

### Work in order
Tasks within a phase are ordered intentionally. Later tasks often depend on earlier ones. Do not skip ahead or parallelize.

### One task at a time
Complete a task's full DoD — including tests and validation gates — before opening the next task. A task is not done until its status is updated to `done` and its commit is made.

### One concern per commit
Each completed task produces one focused commit. Avoid mixing a feature change with a refactor or config fix in the same commit. If writing a single commit message feels forced, the task scope is probably too broad — split it in the plan file.

### After each task
```bash
pnpm nx affected -t test    # must stay green throughout the phase
```

If tests go red after a task, fix them before moving on. Never carry a broken test into the next task.

---

## Handling Deviations

### Plan is wrong
If implementation reveals that a task's approach won't work as written, update the plan file first, then implement. Don't silently do something different from what the plan says. When the actual implementation differs meaningfully from the plan (even if the DoD is met), add a short `> **Note:**` to the task explaining what changed and why — this keeps the plan file useful as a history.

### Spec is wrong
If a spec file (architecture, instructions, etc.) turns out to be inaccurate, update the spec as part of the task that surfaces the issue. Spec and code must stay in sync.

### Unexpected scope
If a task turns out to require significantly more work than expected, split it into sub-tasks in the plan file. Don't silently expand a task or deliver a partial implementation marked as done.

### Blocked task
- Add a `> **Blocked:**` note in the task
- Do not start the next task
- Resolve the blocker (or create a new task to resolve it) before proceeding

---

## Phase Completion

When all tasks have status `done`:

1. **Run the full suite:**
   ```bash
   pnpm nx run-many -t typecheck
   pnpm nx run-many -t lint
   pnpm nx run-many -t test
   pnpm nx build web
   ```
2. **Verify in production mode** — dev mode hides certain classes of bugs (asset paths, base href issues, iframe CSP). Run `pnpm nx build web && pnpm nx start web` and confirm the phase goal holds against the built output, not just the dev server.
3. **Verify the phase goal** — re-read the phase goal statement and confirm it is genuinely met, not just technically
4. **Update spec docs** — if anything discovered during the phase changes the architecture, stack, or instructions, update the relevant spec file now
5. **Commit the phase file** — the final commit of the phase updates all task statuses to `done`

