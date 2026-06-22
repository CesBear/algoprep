# AlgoPrep Content Review Rubric

Used by `content-judge` to score the output of `ts-algo-expert`, `faang-interviewer`, `algo-teacher`, and `system-design-expert` after they review a topic. Each dimension is scored 1-5. A dimension is `n/a` if no reviewer covered it.

## 1. Correctness (owned by ts-algo-expert)
| Score | Meaning |
|---|---|
| 5 | Every solution traced/run, all complexity claims verified, no bugs found |
| 4 | Solutions correct, complexity claims correct, only minor idiom nitpicks |
| 3 | At least one low-severity bug or imprecise complexity claim |
| 2 | A medium-severity correctness bug, or multiple imprecise claims |
| 1 | A high-severity bug (wrong answer on a valid input) shipped |

## 2. Real-world fidelity (owned by faang-interviewer, system-design-expert)
| Score | Meaning |
|---|---|
| 5 | Every interview-frequency/company claim carries a confidence tag and checks out |
| 4 | Mostly tagged and sourced; one minor untagged claim |
| 3 | Several claims untagged but plausible; no outright fabrication |
| 2 | A claim presented as fact that the judge could not verify and isn't labeled opinion |
| 1 | Fabricated/hallucinated claim presented as verified fact |

## 3. Pedagogical clarity (owned by algo-teacher)
| Score | Meaning |
|---|---|
| 5 | Intuition precedes mechanism, a worked example exists, common misconceptions named |
| 4 | Clear and learnable, missing one of: worked example / misconception callout |
| 3 | Technically followable but jumps straight to code/table with no "why" |
| 2 | Jargon-dense or assumes knowledge not yet introduced on the page |
| 1 | Actively confusing or likely to build a wrong mental model |

## 4. Completeness (owned by all four, judged collectively)
| Score | Meaning |
|---|---|
| 5 | Topic's commonly-tested ground is covered; no glaring gaps flagged by any reviewer |
| 4 | One reasonable gap noted, non-blocking |
| 3 | A few gaps, none severe |
| 2 | A commonly-tested pattern/problem for this topic is missing entirely |
| 1 | Topic is superficial relative to what real interviews cover |

## Verdict mapping
- All dimensions >= 4 -> `ship`
- Any dimension == 3, none below -> `minor-polish` / `revise`
- Any dimension <= 2 -> `needs-rework` (don't ship until addressed)
- Correctness == 1 is always blocking regardless of other scores.

## Judge's spot-check obligation
The judge must verify at least one "high" severity finding per submitted report against the real file before trusting that report's scores. A report that doesn't survive spot-checking should be scored on what *is* verifiable, not taken at face value.
