---
title: "The Math Behind the Card Game Set"
date: 2024-10-24T16:00:00+03:00
categories:
  - blog
  - games
  - math
tags:
  - combinatorics
  - geometry
  - card-games
  - set
excerpt: "Part 2 of the series - Discover how the puzzle game Set is built on fascinating mathematical principles."
---

### The Math Behind the Card Game Set

The card game [Set][set] is a fast-paced puzzle game that challenges players to spot groups of three cards that form a "set". While the gameplay seems straightforward, it is built on deep mathematical principles rooted in combinatorics and geometry. Let's explore the math that makes Set both entertaining and complex.

---

#### The Structure of the Game

Each card in Set is defined by four features:

- **Shape**: Oval, squiggle, or diamond
- **Color**: Red, green, or purple
- **Number**: One, two, or three symbols
- **Shading**: Solid, striped, or open

There are $$3^4 = 81$$ unique cards, as each feature can take one of three possible values.

---

#### What Constitutes a Set?

A "set" is made up of three cards where, for each of the four features, the cards must either all share the same value or all have different values. For example, if one card has an oval shape, the other two cards must either also have an oval shape (same value) or one must have a squiggle and the other a diamond (different values).

---

#### Finite Geometry and Vector Spaces

The game's mathematical foundation comes from **finite geometry**. The 81 cards can be thought of as points in a four-dimensional vector space over the finite field $$ \mathbb{Z}_{3} $$, where each feature represents one dimension. In this space:

- The sum of each feature over all cards is zero.

Each feature in Set can take one of three values, which can be represented by $$ \{0, 1, 2\} $$ in the finite field $$ \mathbb{Z}_3 $$. Let's assume a "set", that is a collection of three cards, where each feature has the same value, or all three features have different values.

- The case of all three features having the same value is easy to understand. For example, if all three cards have the same shape, then the sum of the shape feature over all three cards is 0 in $$ \mathbb{Z}_3 $$, since $$ 3 \cdot x \equiv 0 \mod 3 $$.
- The case of all three features having different values is a bit more complex. For example, if the first card has an oval shape, the second card has a squiggle, and the third card has a diamond, then the sum of the shape feature over all three cards is 0 in $$ \mathbb{Z}_3 $$, since $$ 1 + 2 + 0 \equiv 3 \equiv 0 \mod 3 $$.

A "set" of three cards corresponds to a line within this space.

As we have just seen, for three cards represented by vectors $$ \mathbf{v}_1 $$, $$ \mathbf{v}_2 $$, and $$ \mathbf{v}_3 $$, the condition for a "set" is:

$$ \mathbf{v}_1 + \mathbf{v}_2 + \mathbf{v}_3 \equiv 0 \mod 3 $$.

This condition implies:

- $$ \mathbf{v}_1 + \mathbf{v}_2 \equiv -\mathbf{v}_3 \mod 3 $$
- By adding $$ \mathbf{v}_2 $$ to both sides: $$ \mathbf{v}_1 + 2\cdot\mathbf{v}_2 \equiv \mathbf{v}_2 - \mathbf{v}_3 \mod 3 $$
- Of course, $$ 2\cdot\mathbf{v}_2 = -\mathbf{v}_2 \mod 3 $$, so $$ \mathbf{v}_1 - \mathbf{v}_2 \equiv \mathbf{v}_2 - \mathbf{v}_3 \mod 3 $$

This shows that $$ \mathbf{v}_1 $$, $$ \mathbf{v}_2 $$, and $$ \mathbf{v}_3 $$ lie on the same line in the 4-dimensional space. Therefore, a "set" corresponds to a line in the affine space $$ \mathbb{Z}_3^4 $$.

- The number of unique sets is 1,080.

Note that every pair of cards has a unique card that completes the set. This means that the number of sets is equal to the number of ways to choose two cards from 81, which is $$ \binom{81}{2} = 3,240 $$. However, each set is counted three times, once for each configuration of the three cards that can complete it. Therefore, the number of unique sets is $$ \frac{3,240}{3} = 1,080 $$.

---

At its heart, Set is more than just a fun card game—it's a puzzle built on fascinating mathematical structures. Whether you're a math enthusiast or simply enjoy the gameplay, knowing the geometry and combinatorics behind it adds an extra layer of appreciation to every round.

[set]: https://en.wikipedia.org/wiki/Set_(card_game)
