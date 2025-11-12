---
title: "Duff's Device"
date: 2025-11-11T00:00:00+03:00
categories:
  - blog
tags:
  - programming
  - optimization
  - c
excerpt: "When C Syntax Went Full Galaxy Brain."
header:
  overlay_image: /assets/images/2025-11-11-duffs-device/duffs-device-code.png
  overlay_filter: 0.5
  caption: "Code excerpt from GNU C Intro and Ref manual"
  actions:
    - label: "Get the code"
      url: "https://www.gnu.org/software/c-intro-and-ref/manual/html_node/Duffs-Device.html"
---

Every once in a while you stumble upon a piece of code that makes you question everything you thought you knew about programming.  
At first glance, it looks like someone had accidentally merged a `switch` statement with a `do/while` loop. Then you realize it actually compiles, and more importantly, it does something _really_ clever.

## The Original Problem

Tom Duff wrote this in 1983 while working on animation playback at Lucasfilm.[^1] He needed to copy pixel data to a memory-mapped device as fast as possible. Compilers back then weren't sophisticated enough to optimize tight loops automatically, so manual loop unrolling was still a viable optimization technique.

Here's the code:

```c
send(to, from, count)
    register short *to, *from;
    register count;
{
    register n = (count + 7) / 8;
    switch (count % 8) {
    case 0:  do { *to = *from++;
    case 7:       *to = *from++;
    case 6:       *to = *from++;
    case 5:       *to = *from++;
    case 4:       *to = *from++;
    case 3:       *to = *from++;
    case 2:       *to = *from++;
    case 1:       *to = *from++;
            } while (--n > 0);
    }
}
```

## The Inner Workings

The trick is combining loop unrolling with C's fall-through semantics. Instead of having a separate loop to handle the remainder when `count` isn't divisible by 8, Duff uses the `switch` statement to jump directly into the middle of the unrolled loop body.

The math works like this: `(count + 7) / 8` calculates how many groups of 8 we need to process, rounding up. The `switch (count % 8)` determines where to enter the loop body. If `count = 11`, then `count % 8 = 3`, so execution starts at `case 3`, copies three elements (cases 3, 2, 1), then falls through to complete the `do/while` iteration. The loop continues from `case 0`, processing full 8-element chunks until done.

---

What makes this work is that C allows `case` labels can appear inside other control flow structures, such as loop bodies, within a `switch` statement.[^3] The compiler treats `case` labels as regular labels that can be jumped to, which means you can enter a loop at an arbitrary point. This is perfectly valid C, though it violates most people's mental model of structured programming.

The performance benefit comes from reducing loop overhead. Each iteration of a normal loop involves checking the condition, incrementing counters, and branching. By unrolling eight iterations into one loop body, you eliminate seven of those checks. On 1980s hardware where branch misprediction penalties were significant and instruction caches were small, this mattered.

---

Duff himself noted in his original [USENET post][duffpost] that "It amazes me that after 10 years of writing C there are still little corners that I haven't explored fully."[^1] The technique became something of a legend in C programming circles, partly because it demonstrates how flexible C's control flow actually is.

Modern compilers handle loop unrolling automatically, often better than manual unrolling. The XFree86 project actually removed Duff's Device from their codebase and saw performance improve, because the compiler's automatic unrolling was more sophisticated.[^4] Today, this is more of a curiosity than a practical optimization.

## Pushing Even Further

But there's something interesting about how far you can push C's syntax. Consider this example from [Niall Cooling's article on switch statement abuse][switchabuse]:[^2]

```c
void process_message(int x)
{
    switch (x) {
      default:
        if (valid_command_message(x))
        case CMD1: case CMD2: case CMD3: case CMD4:
          process_command_msg(x);
        else if (valid_status_message(x))
        case STATUS1: case STATUS2: case STATUS3:
          process_status_msg(x);
        else
          report_error(x);
    }
}
```

This compiles too. The `default` case comes first, and `case` labels appear inside `if` statements. The control flow works because `case` labels are just jump targets—they don't create scope or block execution. When you hit a matching case, execution falls through to the labeled statement, regardless of what control structures surround it.

The C specification is surprisingly permissive about control flow. `switch`, `case`, `goto`, and fall-through semantics give you low-level control that most modern languages deliberately restrict. This flexibility is why C remains useful for systems programming, but it also means you can write code that's technically correct and completely unreadable.

---

Duff's Device sits in that interesting space between clever optimization and code that makes your colleagues question your judgment and good faith.  
It's a good example of understanding your tools deeply enough to use them in unexpected ways, even if those ways aren't always the right choice for production code.

The real lesson here isn't about loop unrolling—it's about how our mental models of programming languages are often simpler than what the language actually allows. C gives you direct access to the machine's control flow primitives, and sometimes that means code that looks wrong but works perfectly.

## Sources

[^1]: [Tom Duff's original 1983 USENET post][duffpost]
[^2]: [Abusing the C switch statement – Feabhas][switchabuse]
[^3]: [GNU C Manual: Duff's Device][gnuduff]
[^4]: [Hacker News discussion on Duff's Device][hnxfree86]

[duffpost]: https://www.lysator.liu.se/c/duffs-device.html#duffs-device
[switchabuse]: https://blog.feabhas.com/2017/02/abusing-c-switch-statement-beauty-eye-beholder/
[gnuduff]: https://www.gnu.org/software/c-intro-and-ref/manual/html_node/Duffs-Device.html
[duffswiki]: https://en.wikipedia.org/wiki/Duff%27s_device
[hnxfree86]: https://news.ycombinator.com/item?id=10175901
