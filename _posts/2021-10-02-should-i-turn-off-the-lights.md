---
title: "Should I turn off the lights?"
date: 2021-10-02T18:41:00+03:00
categories:
  - blog
tags:
  - math
  - physics
  - environment
  - energy
  - light
---

## Let there be light 💡
As a kid, I learned a lot of environmental studies in my school (shout out to ["An Inconvenient Truth"][an-inconvenient-truth]).  
I can remember many classes watching old movies on VCR, and building models of the Earth, calculating naive calculations about energy efficiency and species extinctions.  
I'd like to think of this as an impetus to my choice to study physics and maths. I reckon that something about the rigor of the natural sciences and the precision of the calculations acquired during those early years really drove me in.

I talked to a friend the other day about the importance of turning off unused lights. My friend said that due to modern lighting being so efficient, it is a waster of time and energy to turn it off.  
Naturally, I thought it might be a fun [back-of-the-envelope][back-of-the-envelope] exercise to find out the exact cost of flipping a light switch versus leaving the light on.

---

## It all started with a switch 🎚

I started by figuring out how much energy does one need in order to flip a switch. According to [this website][calories-switch-click], 
> On average, 16.7 micromoles of ATP (Adenosine triphosphate) are consumed in moving one gram of muscle for one second. So, the total amount of ATP burned to move 11.7 grams of muscle in the index finger is approximately 195 micromoles (11.7g×16.7μ mol/g). There are 7.3 calories in one mole of ATP energy, so the number of calories burned in clicking the mouse equals about 1.42 = (7.3/1000) X 195.

So flipping a light switch on and off should be about 2.84 calories [^1], or about 12 Joules.

Now, let's take into account a regular LED light bulb.  
[Wikipedia][wikipedia-light-bulbs-comparison] tells us that an LED light bulb has a power of about 9 Watt, which means that every second it consumes 9 Joules.  
From this little calculation, it seems like unless you are going to leave the room for 1.3 seconds, you should turn off the light.  ⚡️

Furthermore, a traditional incan­descent light bulb has a power of about 60 Watt, which means that it consumes 60 Joules per second - so you'd need to leave the room for 0.2 seconds or less!

I've drawn a graph that shows the exact points at which leaving the light on becomes more expensive than to turn off the light, in terms of energy (from left to right- LED, CFL, Halogen, Incandescent):


<figure class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/2021-10-02-should-i-turn-off-the-lights/light-graph.png" alt="Efficiency of turning off the lights vs leaving the light open">
  <figcaption>Efficiency of turning off the lights vs leaving the light open</figcaption>
</figure> 
---

Go ahead and tell me in the comments what do you think of back-of-the-envelope calculations ✉️

[an-inconvenient-truth]: https://en.wikipedia.org/wiki/An_Inconvenient_Truth
[back-of-the-envelope]: https://en.wikipedia.org/wiki/Back-of-the-envelope_calculation
[calories-switch-click]: https://gadgets.ndtv.com/others/news/revealed-the-number-of-calories-you-burn-with-click-of-a-mouse-341940
[wikipedia-light-bulbs-comparison]: [https://en.wikipedia.org/wiki/LED_lamp#Comparison_table]
[^1]: Also, note that this value of 1.42 calories is heat calories and not the regular kCal, courtesy of your favorite ice cream 🍦