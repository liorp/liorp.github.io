---
title: "The Brownies Problem"
date: 2022-10-01T13:00:00+03:00
categories:
  - blog
  - math
tags:
  - fibonacci
  - recurrence
  - combinatorics
excerpt: "Brownies + Fibonacci = Combinatorics"
---

Quite an interesting problem popped up on my Twitter feed the other day:

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">Here&#39;s a neat puzzle:<br><br>We buy 12 éclairs from a bakery.<br><br>Each éclair measures 1 x 2. And they all go into a 12 x 2 box.<br><br>In how many ways can the baker arrange the éclairs in the box? Two possible ways are shown in the picture below.<br><br>Solution coming tomorrow! <a href="https://t.co/1ekGIkUiBD">pic.twitter.com/1ekGIkUiBD</a></p>&mdash; Ramanujan&#39;s Dosa (@RamanujansDosa) <a href="https://twitter.com/RamanujansDosa/status/1568192618743439360?ref_src=twsrc%5Etfw">September 9, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Take a few minutes and try to devise a solution to this problem.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/lp-EO5I60KA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

OK, let's get down to business and solve this!

I immediately thought about this problem as arranging two types of balls in a row — say, green and red. The green balls would be synonymous with horizontally laid couples of brownies, and the red would be synonymous with the rest, vertically laid, single brownies.

In this case, only these configurations are possible:[^1]

| Green | Red |
| ----- | --- |
| 0     | 12  |
| 1     | 10  |
| 2     | 8   |
| 3     | 6   |
| 4     | 4   |
| 5     | 2   |
| 6     | 0   |

For each configuration, multiple possible arrangements can be made.

- When we have 0 green balls, there's only 1 possible arrangement.
- When there's a single green ball, there are 11 possible arrangements.
- When there are 2 green balls, we need to choose 2 locations for them from 10 possible locations, which is $$ 10 \choose 2 $$.

This leads us to the general formula for the number of arrangements per a single configuration:

$$ \#green+\#red \choose \#green \\ $$

Of course, we need to sum this over the possible configurations, and so we end up with the following formula for the number of available possible arrangements:

$$ \#Arrangements = \sum\limits\_{i=0}^{6} {12-i \choose i} = 233 \\ $$

This can also be generalized to the case where we have $$n$$ éclairs in total:[^2]

$$ a*{n+1} = \sum\limits*{i\geq0}^{} {n-i \choose i} \\ $$

The solution given in the tweet is a bit more elegant, in my opinion. In essence, it decomposes the problem recursively to the number of available arrangements for fewer brownies. It all boils down to the well-known formula for Fibonacci numbers:

$$ a*{n+1} = a*{n} + a\_{n-1} \\ $$

where $$a_{n+1}$$ is the number of possible arrangements for $$n+1$$ brownies.

Thus, we can actually deduce the following formula for Fibonacci numbers:

$$ \frac{1}{\sqrt{5}}\left[\left(\frac{1+\sqrt{5}}{2}\right)^{n+1} -\left(\frac{1-\sqrt{5}}{2}\right)^{n+1}\right] = a*{n} + a*{n-1} = a*{n+1} = \sum\limits*{i\geq0}^{} {n-i \choose i} \\ $$

---

I just love it when two different subjects pop into solutions of problems — more so when it gives out a formula that binds them together! 🤩

[^1]: A simple way to verify the validity of these configurations would be to notice that $$2 \times \#green + \#red = 12$$
[^2]: Where we take $$ \binom{n}{k} = 0 $$ if $$ k>n $$
