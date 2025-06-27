---
title: "A short journey to a hyperreal space"
date: 2022-01-20T13:20:00+02:00
categories:
  - blog
  - math
tags:
  - hyperreal
excerpt: "When taking an infinitely small trip lasts forever"
---

I love books. And I also love math.

That's probably why I couldn't lay my hands off a book named "When Einstein Walked With Gödel: Excursions to the Edge of Thought" by Jim Holt.

The book is a collection of essays on many diverse themes such as science and philosophy; it also explores the works of prominent scientists such as Einstein and Turing.

One chapter that struck me with great awe discusses the idea of infinity, and its implementation in calculus.

<figure class="align-left">
  <img src="/assets/images/2022-01-20-hyperreals/einstein_godel.jpg" style="max-width:280px;" alt="Einstein walking with Gödel (Getty Images)">
  <figcaption>Einstein walking with Gödel<br/>(Getty Images)</figcaption>
</figure>

---

See, the most common way to treat calculus in college classes is the epsilon-delta method.

In fact, this modern idea of the limit of a function goes back to Bolzano who, in 1817, introduced the technique; however, his work was not known during his lifetime.

It wasn't until 1861[^1], when Weierstrass first introduced the epsilon-delta definition of limit in the form it is usually written today.

---

As I majored in math, I've taken my share of courses in calculus and set theory, and yet, this chapter managed to delight me with one particular method of formalizing infinitesimal calculus—the _hyperreals_.

But what exactly are hyperreals? They are a way of treating infinite and infinitesimal quantities.

They can be thought of as an extension of the real numbers $$\mathbb{R}$$ that contains numbers that are smaller than any real number, and numbers that are bigger than any other real number.

This way, we can make claims such as $$f(x+\Delta x)\approx f(x) + f'(x)\cdot\Delta x$$ (most famously seen in physics) mathematically rigorous.

In the 1960s, Abraham Robinson proved that the hyperreals were logically consistent if and only if the reals were. The book elaborates upon a beautiful proof for this claim, which I will try to reconstruct here.

<figure class="align-right">
  <img src="/assets/images/2022-01-20-hyperreals/robinson_abraham_1970.jpg" style="max-width:280px;" alt="Abraham Robinson, 1970 (Konrad Jacobs)">
  <figcaption>Abraham Robinson, 1970<br/>(Konrad Jacobs)</figcaption>
</figure>

---

We begin by introducing a quantity $$\epsilon$$ that is smaller than any other positive number.

We can actually rephrase that claim as infinite axioms of the type $$ \epsilon \leq x$$, where $$x$$ is a real number.

That way, the axioms of the hyperreals are the same axioms of the reals, with the addition of this $$\epsilon$$ creature.

Now, say we have a proof in the hyperreals that comes to a contradiction. It can be comprised of many (but finite) axioms of the hyperreals, and some corollaries that follow.

The fun part here is to notice that we are interested specifically in the axioms that regard $$\epsilon$$.

Remember that we spoke about the axioms $$ \epsilon \leq x$$? We take the minimal axiom in the sense of the one used in the proof that uses the minimal number $$x$$, say $$ \epsilon \leq \frac{1}{137}$$.

Now consider the same arguments, only that we substitute $$ \epsilon $$ with $$ \frac{1}{138} $$. _The axioms are still good_, since we took the minimal axiom.[^2]

So, what do we have here? We have (possibly a lot of) arguments about good old real numbers, that end in contradiction - so there must be a logical fallacy in the arguments!

And that, in a very general manner that is not quite accurate or precise, is why the hyperreals are a legitimate way of performing calculus.

It's actually quite nice to know that all the tricks in physics regarding "infinitely small" mass (or length, or time) can be understood as infinitesimal calculus!

This post was partially supported by [@WalachEyal], and I'd like to thank him for his support.

[^1]: And perhaps 1821, when Cauchy discussed limits, and defined continuity by saying that an infinitesimal change in x necessarily produces an infinitesimal change in y.
[^2]: This is done using the [transfer principle][tp]

[@WalachEyal]: https://twitter.com/walacheyal
[tp]: https://en.wikipedia.org/wiki/Transfer_principle
