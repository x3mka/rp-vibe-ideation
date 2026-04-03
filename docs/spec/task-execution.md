# Task Execution

How to execute a single task from a phase plan. See [phase-execution.md](./phase-execution.md) for the outer loop.

---

## Before You Start

1. **Read the task in full** — description, affected files, and every DoD criterion
2. **Read the affected files** — understand existing code before changing it; never modify what you haven't read
3. **Understand the DoD concretely** — if any criterion is ambiguous, resolve it before writing a line of code
4. **Check the codebase is clean** — no uncommitted changes; all tests passing from the previous task

---

## During Execution

### Work incrementally
Make one logical change at a time. After each change, run the relevant check (lint, typecheck, or test) rather than waiting until the end. Catching a mistake early costs far less than untangling a broken build across five files.

### Stay in scope
If you notice an unrelated issue, do not fix it inline. Create a new task in the relevant phase file and continue. Mixing concerns makes commits harder to understand and DoD harder to verify.

### Follow the spec
Refer to [instructions.md](./instructions.md) for code quality rules and [architecture.md](./architecture.md) for patterns. Don't invent new patterns for problems that already have a documented solution.

### Adding tests
Every task that introduces logic should include unit tests as part of the same commit — not as a follow-up. See the Testing section in [instructions.md](./instructions.md) for what to test and what to skip.

---

## Completing a Task

### Verify every DoD criterion
Go through each bullet point in the task's **Definition of done** explicitly. Do not mark a task done if any criterion is unclear, untested, or only "probably fine".

### Run validation gates
Before marking done, run the full set from [instructions.md](./instructions.md):

```bash
pnpm nx lint web
pnpm nx build web
pnpm nx affected -t test
pnpm nx run-many -t typecheck
```

### Update task status
Change the task's `**Status:**` field in the phase plan file from `new` to `done`.

### Commit
One commit per completed task, covering exactly one concern. If the commit message requires "and" to describe what changed, the task scope is too broad — split it in the plan file before committing. Message format:

```
<type>(<scope>): <short description>

Task: <task-id>
```

Example:
```
feat(ideation-registry): update IdeationApp interface to url-based model

Task: P1-001
```

---

## When Blocked

- Do not leave code half-done. Revert to a clean state rather than committing broken work.
- Do not skip a DoD criterion and mark the task done anyway.
- Add a `> **Blocked:**` note to the task in the phase file describing the blocker.
- If the blocker reveals a gap in the spec or plan, update the relevant doc first, then resume.

---

## Scope Discipline

| Situation | Action |
|---|---|
| Noticed a bug unrelated to the task | Add a new task to the phase file; do not fix inline |
| Spec and implementation diverge | Update the spec first, then implement |
| Task is larger than expected | Split it into two tasks in the plan; do not silently expand the current one |
| A DoD criterion turns out to be impossible | Flag it explicitly — update the task, do not pretend it was met |
