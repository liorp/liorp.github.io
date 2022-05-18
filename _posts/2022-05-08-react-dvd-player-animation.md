---
title: "React DVD player animation (or: will it touch the corner?)"
date: 2022-05-08T18:00:00+03:00
categories:
  - web development
  - frontend
tags:
  - react
  - typescript
  - dvd 
  - dvd-player
  - animation
excerpt: "Creating the iconic dvd animation in React. Will it touch the corner?"
---

## Intro

A great web app is measured by its easter eggs. Ever since [Moonlander (1973)][moonlander], easter eggs have gradually become more and more common in the software we write. And that's no surprise - over the years, it's gotten easier and easier to hide easter eggs in our code, and the bliss users have when they happen to wander upon such an egg is heavenly 👼  

Personally, I really like the iconic dvd player animation.[^1] For those who don't know this meme, I'll quote from [urban dictionary][urban-dvd]:
> refers to the animated screensaver commonly found on American DVD players, in which the DVD Video logo bounces to different parts of the screen and changes color. Online and in pop culture, people brag and joke about seeing the logo land perfectly in the corner of the screen.[^2]

In fact, it is so popular, that when you google "bouncing dvd logo", the google logo starts to bounce.

---

## Implementing
![dvd-animation](/assets/images/2022-05-08-react-dvd-player-animation/dvd-animation.gif)

I started to read about existing implementations and found out about this one:
[bouncing-dvd-logo][bouncing-dvd-logo]

So, starting to react-ify things up, I rewrote the code in TypeScript, and refactored it to use [`requestAnimationFrame`][useAnimationFrame] to get a smooth animation.

A weird bug that took me some time to solve was that my hooks were called twice - this is because of [`React.StrictMode`][react-strict-mode] , which helps you to spot side effects by intentionally double-invoking function component bodies, state updater functions (the first argument to setState), and functions passed to useState, useMemo, or useReducer. That was quite annoying and I just disabled it altogether (what's more, this only applies to development mode, and lifecycles will not be double-invoked in production mode).

I used [tsup][tsup] and [np][np] to streamline the component creation & uploading to npm. 

The code is available here: [react-dvd-player-animation][react-dvd-player-animation]

[^1]: I started writing this post on 5 June 2021... time flies.
[^2]: There's actually [some cool math][dvd-logo-math] behind this.

[moonlander]: https://en.wikipedia.org/wiki/Lunar_Lander_(video_game_genre)#Graphical_games
[urban-dvd]: https://knowyourmeme.com/memes/bouncing-dvd-logo
[dvd-logo-math]: http://prgreen.github.io/blog/2013/09/30/the-bouncing-dvd-logo-explained/
[bouncing-dvd-logo]: https://github.com/andrewchmr/BouncingDVDLogoReactSVG/
[tsup]: https://github.com/egoist/tsup
[np]: https://github.com/sindresorhus/np
[useAnimationFrame]: https://css-tricks.com/using-requestanimationframe-with-react-hooks/
[react-strict-mode]: https://reactjs.org/docs/strict-mode.html
[react-dvd-player-animation]: https://github.com/liorp/react-dvd-player-animation/