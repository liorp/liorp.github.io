---
title: "Teaching AI Your Codebase: From Sub-Agents to Skills"
date: 2026-01-08T10:00:00+03:00
categories:
  - blog
  - software-engineering
  - ai
tags:
  - ai
  - programming
  - claude
  - frontend
  - react
  - developer-experience
excerpt: "How we evolved from orchestrating AI sub-agents to self-applying skills, and why a small structural change made all the difference."
---

AI coding assistants will happily write React components, design APIs, and refactor legacy code. They're remarkably good at it. But if you ask Claude to build the same feature twice, you'll likely get two completely different implementations, each valid on its own terms, neither matching how your team actually writes code.

Every engineering team accumulates conventions over time. How you structure data fetching, where types live, the naming patterns for hooks, whether you reach for Tailwind or SCSS modules. These decisions exist in the codebase itself, absorbed through months of code review and hallway conversations. Documentation captures some of it, but never enough.

AI assistants don't have access to any of that context. They start fresh every session, unaware that your team prefers Container/Presentation patterns or that all API responses should pass through Zod schemas before reaching components. The code they produce compiles and runs, but it feels foreign in your codebase.

Our frontend had grown complex over time. React Query for server state, a component library wrapping Ant Design, routing with protected routes and feature flags, internationalization across 18 locales. New developers needed weeks to internalize the patterns. AI assistants never internalized them at all.

We wanted to change that. What follows is how we tried, what broke, and what eventually worked.

---

## The Sub-Agent Era

Our first attempt was to create specialized "agents" for different parts of the frontend. I should demystify the term immediately: an agent was just a markdown file. Nothing more. Each file contained rules, templates, and checklists for one slice of the codebase, written in plain English.

The data agent described how to structure API calls, when to use React Query versus local state, how to define TypeScript types that distinguish backend responses from frontend models, and the file structure expected in each feature's data folder. The pages agent covered our Container/Presentation split. The components agent documented how we wrap Ant Design primitives and our prop naming conventions. We had agents for SCSS patterns, for custom hooks, for route constants, for i18n across 18 locales, for TypeScript strictness.

An orchestrator file attempted to tie these together, describing when each agent applied. Working on API calls? Consult the data agent. Building a new page? Start with pages, then components, then translations.

The content in these files was hard-won. The templates came from patterns we'd refined through hundreds of pull requests. The rules encoded real mistakes.

The trouble was everything that happened around that.

---

## Where It Broke Down

The agent approach forced an artificial separation that doesn't match how frontend development actually works. A competent developer doesn't context-switch between "data mode" and "styling mode" and "component mode." They hold all of it in their head simultaneously, because the layers inform each other. The shape of your API response influences your component props. Your component structure affects your styling approach.

Siloing Claude into separate agents broke that natural flow. You'd build a data layer with the data agent, then move to components, then realize the data structure needed adjustment. But now you're in "component mode" and the data expertise is gone. Going back meant manually re-invoking the data agent, re-establishing context, explaining what changed and why.

Worse, Claude often wouldn't invoke the right agent at all. You'd ask it to fix a styling issue and it would just... try to fix it, without the styling agent's knowledge of our SCSS conventions and design tokens. The agent files existed, but while working on small items or when refining an ongoing feature, Claude used to ignore them.

Course-correction became painful. If Claude went down a wrong path three steps into a feature, unwinding required you to figure out which agent's expertise was missing and manually inject it. The orchestration burden sat entirely on the user, which defeated much of the purpose.

---

## The Shift to Skills

The content of our agent files wasn't the problem. The orchestration model was. We needed Claude to apply the right expertise automatically, without us having to remember and invoke it.

Skills are still just markdown files. The structural change is small but significant: each file now includes frontmatter that describes when it should apply. The data skill specifies that it's relevant when working on API calls, React Query hooks, types, mutations, or files in a feature's data folder. The styles skill triggers on SCSS, design tokens, and styling concerns. The types skill activates whenever TypeScript strictness matters.

The actual improvement came from Claude's side. Skills are more lightweight than the old approach of spawning sub-agents. They're loaded just-in-time, as the task requires them, rather than establishing a separate agent context upfront. In practice, this performs substantially better. When you ask Claude to do something that matches a skill's purpose, it applies automatically. You don't invoke it. You don't coordinate an orchestrator. You ask Claude to fix a styling bug, and the styling expertise is simply there.

This changes how multi-domain work flows. Building a feature that touches data, components, pages, and translations no longer requires you to sequence agent invocations. Claude pulls in the relevant skills as the work demands them. When you hit a styling issue while working on a component, the styling knowledge is available without you switching contexts. When the component work reveals a problem in the data layer, that expertise surfaces too.

The files still contain the same hard-won templates and rules. What changed is how they reach Claude.

---

## How It Works In Practice

[A skill file](https://code.claude.com/docs/en/skills) starts with YAML frontmatter that describes its purpose and when it applies:

```yaml
---
name: data-layer
description: Use when working with API calls, React Query hooks,
  mutations, type definitions, or files in a feature's data folder.
---

# Data Layer Patterns

## Query Hook Structure
...templates and rules follow...
```

The `name` field identifies the skill (lowercase, hyphens allowed). The `description` field is what makes auto-discovery work—Claude reads these descriptions at startup and matches them against what you're asking for. Only the frontmatter loads initially; the full content stays on disk until a match triggers activation.

This two-phase loading keeps context lean. Claude doesn't carry all your skill content in memory at once. When a task matches a description, the relevant skill loads just-in-time. Multiple skills can activate for the same task if their descriptions all match.

Skills also support optional configuration. You can restrict which tools a skill can use (`allowed-tools: Read, Grep, Glob` for a read-only analysis skill), run them in isolated sub-agent context (`context: fork`), or control visibility in the slash menu (`user-invocable: false` for skills Claude should discover automatically but users shouldn't invoke directly). We haven't needed most of these—the defaults work well for domain knowledge skills.

The skill content itself mirrors what we had in the agent files: templates showing the expected file structure, rules about what patterns to follow and which to avoid, checklists for verification. A data skill template shows exactly how to structure a query hook, how to separate API types from frontend types, how to build query key factories. The styles skill covers our SCSS variable conventions and component styling patterns. The translations skill explains our i18n setup and lists all locale files that need updating.

What makes this work well is integration with broader workflows. We use a brainstorming skill for requirements exploration before implementation begins, which feeds naturally into domain skills when actual coding starts. A verification skill runs at the end to catch what slipped through. These external workflows compose with the domain skills rather than competing with them.

A planning skill handles coordination for larger features. When you're building something that spans multiple domains, it creates a structured sequence and tracks progress across skill boundaries. But even this coordination happens through the same lightweight, just-in-time mechanism. You describe what you want to build, and the planning skill activates because the task matches its trigger conditions.

---

## Results

Claude can now one-shot most features in our codebase. Not perfectly every time, but close enough that the review process catches edge cases rather than fundamental structural problems. The code that comes out follows our conventions because the relevant skill loaded automatically and guided the implementation.

The "wrong approach" errors dropped significantly. When Claude builds a data layer, it uses our query key factory pattern and our type separation between API and frontend models. When it touches styling, it reaches for our design tokens rather than inventing new values. When it adds user-facing strings, it updates the locale files rather than hardcoding text. These were all mistakes we used to catch in review and send back for revision.

We still have hard enforcers running underneath: linters, formatters, type checking. These remain our baseline, and they've become easier to maintain now that Claude produces code that mostly passes them on the first try. The skills handle the patterns that static analysis can't catch, while the tooling catches everything mechanical.

The skills also serve as onboarding documentation. New developers read them to understand our patterns. The difference from traditional docs is that these files are actively used, so they stay current. When we refine a pattern through pull request discussion, we update the skill. When we deprecate an approach, we remove it. The documentation evolves with the codebase because the documentation is part of how the codebase gets built.

We still review everything Claude produces. But the review conversations shifted from "this doesn't match our patterns" to "this edge case needs handling" or "this abstraction might be premature." The baseline quality improved enough that we spend review time on genuinely interesting questions.

---

## Conclusion

The barrier to doing this is lower than it might seem. A skill is a markdown file with some YAML frontmatter. You describe when it applies and what patterns to follow. The hard part is having patterns worth encoding, and most teams already do. The conventions exist in code review comments, in PR discussions, in the explanations senior developers give to junior ones.

Writing skills is a way of capturing that knowledge in a form that Claude can use. The files live in your repository, version controlled alongside the code they describe. When the patterns change, you update the skills. When new patterns emerge, you write new skills.

Our agent approach failed because it required us to orchestrate the AI. Skills succeed because they let Claude orchestrate itself. The same domain knowledge, expressed in nearly the same format, but loaded just-in-time based on what the task actually requires. Sometimes a small structural change makes all the difference.
