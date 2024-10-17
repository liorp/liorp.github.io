---
title: "The Math Behind the Card Game Dobble"
date: 2024-10-16T16:00:00+03:00
categories:
  - blog
  - games
  - math
tags:
  - combinatorics
  - geometry
  - card-games
  - dobble
excerpt: "Part 1 of the series - Discover how does the fast-paced card game Dobble ensure that every pair of cards shares exactly one symbol."
---

### The Math Behind the Card Game Dobble

Recently, at a company gathering fun day, I found myself rediscovering an old favorite: [Dobble][dobble]. While the quick pace and competitive spirit made for an enjoyable break, I started thinking about what makes this game tick. As we raced to spot matching symbols, I realized there must be more to the game’s design than meets the eye. This renewed my curiosity, leading me to explore the mathematical principles behind the game that ensure every pair of cards always has exactly one symbol in common. Here’s a peek into the fascinating math behind Dobble.

#### How Dobble Works

Dobble is a card game that challenges players to find a matching symbol between any two cards. The clever design ensures that each pair of cards shares exactly one symbol, no matter which cards are chosen. This seemingly simple setup is based on the principles of [**finite geometry**][finite-geometry] and [**combinatorics**][combinatorics], specifically [**projective planes**][projective-planes].

In Dobble, each card features a set of symbols, and the key to the game’s design is that any two cards share exactly one symbol in common. At first thought this may seem as a coincidence, but in fact it is the result of some careful and beautiful mathematical construction.

#### How Dobble _Really_ Works

The underlying math in Dobble comes from the field of **finite projective planes**. A projective plane is a structure in which:

- There are a set number of points (symbols) and lines (cards),
- Every line contains the same number of points,
- Any two lines share exactly one point.

A **projective plane of order $$ n $$** is a special arrangement where:

- There are $$ n^2 + n + 1 $$ points (symbols),
- There are $$ n^2 + n + 1 $$ lines (cards),
- Each line (card) contains exactly $$ n + 1 $$ points (symbols),
- Each point (symbol) appears on $$ n + 1 $$ lines (cards),
- Any two lines (cards) intersect at exactly one point (symbol).

In Dobble, the order $$ n = 7 $$, and this order determines the number of cards, symbols, and the rule that any two cards share exactly one symbol.

This arrangement ensures that for any two cards, there will always be exactly one shared symbol. The particular projective plane used for Dobble is often based on **order 7** geometry.

#### Construction of Dobble Cards

The cards in Dobble are constructed using a projective plane of order 7, which results in the following:

- There are $$7^2 + 7 + 1 = 57$$ unique cards,
- Each card contains $$7 + 1 = 8$$ symbols,
- Every pair of cards shares exactly 1 symbol.

<figure class="align-right">
  <img src="/assets/images/2024-10-16-math-behind-children-games-part-1/projective-dobble.svg" style="max-width:280px;" alt="Dobble projective plane">
  <figcaption>The image shows a set of Dobble cards, each featuring multiple symbols. The key mathematical feature is that any two cards share exactly one symbol, a property based on the finite projective plane of order 7 used in the game’s design.</figcaption>
</figure>

This arrangement is what makes the game work so seamlessly. Without this mathematical structure, it would be extremely difficult to ensure that all cards share one, and only one, symbol with every other card.

---

Dobble is more than just a fun and fast-paced card game—it’s a brilliant example of how mathematics can be applied to create engaging and entertaining experiences. The game’s unique structure is a direct result of the beautiful interplay between finite geometry and combinatorics. So, the next time you sit down to play Dobble, remember that the seemingly simple task of spotting matching symbols is backed bysuch a fascinating and intricate mathematical design!

In the next part of this series, we’ll delve into the mechaincs of another popular card game - Set. Stay tuned!

[finite-geometry]: https://en.wikipedia.org/wiki/Finite_geometry
[combinatorics]: https://en.wikipedia.org/wiki/Combinatorics
[projective-planes]: https://en.wikipedia.org/wiki/Projective_plane
[dobble]: https://en.wikipedia.org/wiki/Dobble
