---
description: Run AlgoPrep's content-review subagents in parallel on one topic, then judge/score the results
argument-hint: <topic-slug, e.g. arrays, recursion, system-design>
---

Topic slug: $1

If `$1` is empty, list the 15 valid topic slugs (the folder names under `app/(dashboard)/`, also visible in `components/Sidebar.tsx`) and ask which one to review. Stop there.

Otherwise:

1. Confirm `app/(dashboard)/$1/page.tsx` exists. If not, tell the user and stop — don't guess a close match.

2. **In a single message, invoke the following subagents in parallel** (multiple Agent tool calls in one response, not sequential turns):
   - If `$1` is `system-design`: run `system-design-expert` (give it `app/(dashboard)/system-design/page.tsx` and `lib/design-scenarios.ts`) and `algo-teacher` (give it the page file).
   - Otherwise: run `ts-algo-expert` (give it `app/(dashboard)/$1/page.tsx` and `lib/solutions/$1.ts`), `faang-interviewer` (give it the page file), and `algo-teacher` (give it the page file).

   Each agent's prompt must state the exact file path(s) to read and remind it to follow the output contract defined in its own `.claude/agents/*.md` definition.

3. Once all parallel agents have returned, make one more Agent call to `content-judge`. Pass it: the topic slug, and the full verbatim text of every report collected in step 2. Remind it where the rubric (`.claude/eval/rubric.md`) and log (`.claude/eval/scoring-log.json`) live, per its own instructions — it should append one entry and report back the scores.

4. Summarize for the user in this shape, don't dump the raw reports unless asked:
   ```
   ## <topic> — review summary
   Verdicts: ts-algo-expert=<x>  faang-interviewer=<x>  algo-teacher=<x>  judge=<x>
   ## Top issues (ranked by severity, deduped across reports)
   1. ...
   ## Logged
   Appended to .claude/eval/scoring-log.json
   ```

5. If the user then asks to fix issues, use the relevant expert agent's `Edit` capability (or do it yourself) rather than re-running the whole pipeline.
