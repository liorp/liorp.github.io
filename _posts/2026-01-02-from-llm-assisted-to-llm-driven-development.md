---
title: "From LLM-Assisted Coding to LLM-Driven Development"
date: 2026-01-02T10:00:00+02:00
categories:
  - blog
  - software-engineering
  - ai
tags:
  - ai
  - programming
  - software-engineering
  - llm
  - claude
excerpt: "Reflections on a year of working with AI agents in production, and how the nature of the work has quietly shifted."
---

About a year ago, I adopted [Claude Code](https://claude.ai/code) as my primary mode of development - not for side projects, but for my main job. 
Initially, the experience mirrored what most others reported with AI coding tools: accelerated iteration, less time devoted to boilerplate, fewer consultations with Stack Overflow. Valuable, yet not transformative.

What I hadn't anticipated was where I'd find myself a year later: spending all of my time in the terminal, guiding ~5 agents working on different critical tasks across the product, writing 0 code myself.

What follows is my attempt to document that shift while it's still fresh - a snapshot of how the work has changed. Not the tools. The craft itself.

## When AI Was Just Helping

Early on, AI sat politely in the background. It completed functions, suggested refactors, and explained unfamiliar APIs. 
I still made all the important decisions independently: architecture, structure, trade-offs. Nothing fundamental had shifted. I was still a developer who just happened to work faster.

## When Agents Stopped Waiting for Instructions

The shift happened gradually, facilitated in large part by ever-expanding context windows. Once agents could hold an entire repository in memory, they began planning multi-step changes and opening pull requests on their own, and my role started to evolve. I was no longer writing code line-by-line; instead, I found myself reviewing diffs, guiding direction, and fixing misunderstandings.

The surprising part wasn't that agents made mistakes, but that those mistakes typically stemmed from *my own lack of precision*. The bottleneck was no longer implementation - it was articulation.

Here's a concrete example. Early on, I'd prompt something like "refactor the table infrastructure." The agent would make reasonable (and some unreasonable) guesses, touch the wrong files, and I'd spend time undoing damage. 
Now I write: "We're rewriting the table module. URL search params are the single source of truth for filters, search, sorting, and pagination. Sync state bidirectionally. Follow industry best practices." Same intent, radically different output. Claude Code's brainstorming mode helps here too - transforming rough ideas into structured plans before any code gets written.

## The Moment I Stopped "Coding"

Eventually, I noticed a pattern in my days: rewriting prompts more often than functions, refining instructions more often than tests, codifying rules rather than applying patches. When something went wrong, the fix wasn't a better loop or a more elegant abstraction, but reshaping how the agent *thought* about the problem next time.

I had crossed a threshold. I was no longer writing code alongside an AI - I was orchestrating work at a different level entirely. The code still mattered, but it was no longer where the thinking happened. Andrej Karpathy [recently described](https://x.com/karpathy/status/2004607146781278521) this as a "magnitude 9 earthquake rocking the profession" - a "powerful alien tool" handed out without a manual, where everyone has to figure out how to hold it and operate it. He's right. And once in a while, when you hold it just right, a powerful beam erupts and melts your problem.


There's a tendency to dismiss this as "prompt engineering," as if it's a shallow trick. In practice, it's closer to system design. You define boundaries as rigid prompts. You encode assumptions. You decide what *must not* happen. You turn tribal knowledge into explicit rules.

Every failure teaches you something, and once you encode it, you don't have to remember it again. That knowledge compounds.

## Where This Is Going

If agents continue to improve - and there's no reason to think they won't - I see a progression along four axes: speed, autonomy, stakes, and verification infrastructure.

The **chariot stage** is already behind us. That was early adoption: reviewing every diff manually, lightweight verification (CLAUDE.md files, linting rules, pre-commit hooks). Speed already left every human developer in the dust, but you stayed close to the ground, handling mistakes and debugging yourself.

Now we're in the **car stage**. Speed has increased significantly. Agents navigate more independently while you set the destination. You review with other agents, make them debug failures, intervening at critical points rather than inspecting every line. CI/CD pipelines aren't optional - they're load-bearing infrastructure. Automated testing, integration checks before any merge. 
You trust the pavement but still need to know when to brake.

Eventually, the **airplane stage** arrives. Speed is orders of magnitude higher. Autonomy is near-complete - driven by a single prompt, agents write, debate, improve, and execute complex flight plans with minimal intervention. Stakes become existential: production systems, financial software, medical devices. Verification requires redundancy at every layer: multiple verification systems, rollback mechanisms, orchestration layers coordinating agents in formation. 
You're not the pilot; you're the one who designed the flight plan, the safety systems, the no-fly zones.

The direction is clear. Trust often lags behind capability, and some domains will stay at car level for regulatory or liability reasons long after the technology is ready. But the trajectory is there.

---

The job isn't disappearing - it's shifting upward. The skills that matter more by the day are shifting to become philosophical - clarity of thought, precision in language, deep understanding of the problem domain, and knowing which constraints actually matter.

Typing speed and syntax knowledge still help, [but they're no longer the core of the craft](https://wisprflow.ai).

## IDEs Are Dead. Long Live the Terminal.

I didn't set out to stop writing code; I followed where the leverage led. And over the past year, that leverage moved away from implementation and toward intent.

The IDE - that familiar environment of syntax highlighting, autocomplete, and file trees - served us well for decades. But when your primary job becomes directing agents rather than typing characters, the IDE becomes overhead. What you need is a command center: multiple agents running in parallel, streaming their progress, ready for your intervention or approval. That's the terminal.

Going back now would be like writing assembly after using a compiler. Not wrong for every task - but for most work, unnecessary. The craft is still there. It just lives at a higher level now. And the terminal, that ancient interface we thought we'd outgrown, turns out to be exactly what this new era demands 