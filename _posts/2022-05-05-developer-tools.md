---
title: "Developer Tools"
date: 2022-05-05T21:20:00+03:00
categories:
  - development
tags:
  - developer
  - tools
  - tips
excerpt: "A curated list of some of my favorite developer tools"
---

This post is not going to be about the chrome developer tools (although you should totally read about it).

No, this post is about some developer tools I found along the way, which I use to enhance my projects. 

First, let's start with some not quite common tips, that no one tells you about when you begin.

# Things I’ve learned

* It's going to be tough. Embrace.

* Learn [how to use the computer without a mouse][nomouse]. This is where I put a shameless self plug to another blog post of yours truly, about going mouse-free.

* Always use a linter and a code styling (formatter) for your own good. Don’t compromise.  
Personally, I use [black][black] with python, and [prettier][prettier] and [eslint][eslint] with javascript (and don't forget to [mix them up][integrating-eslint-prettier]).

* [Comments aren't always necessary][comments-lecture]. 
Use them with caution[^1], as 
  1. They aren’t read by compiler or almost anyone, and
  2. They get old.

* Get rid of validation as soon as possible in your code, so you can get to your happy flow.
Your happy flow is where everything is guaranteed to be good.  
For example, I reviewed a code that could return 200, then 438 then 200. This means that something is off and you should second guess your initial assumptions. 

* Think through your abstractions - avoid [leaky abstractions][leaky-abstraction]. For example, Ruby on Rails (along with some other web frameworks) implements a hack: it tries to route HEAD requests to the same place as it would route GET requests. Then it runs the controller code, and just omits the response body.
This is one hell of a leaking abstraction - [and it made one hell of a security headache over at GitHub][github-oauth].

* Someone else thought about it before you. [Use the open source community][github].  
If you really can’t find what you're looking for, code it and call it a startup. 

# Some useful tools

* [render][render] for deploying apps
* [koyeb][koyeb] for deploying apps
* [ngrok] domain for testing
* [nutjs] for automations 
* [LICEcap][licecap] for screen recording gif
* [Figma][figma] for design
* [tsup][tsup] for creating (small) react components
* [np][np] for publishing npm packages
* [obsidian][obsidian] for your second brain thoughts and ideas
* [lottiefiles][lottiefiles] for lightweight, scalable animations
* [undraw][undraw] for free, open-source, high-quality svg drawings

[^1]: A great stack-overflow [blog post][comments-tips] about writing comments, and the mythical [Code Tells You How, Comments Tell You Why][comments-post].

[nomouse]: {% post_url 2022-01-09-hashtag-nomouse %}
[black]: https://github.com/psf/black
[prettier]: https://prettier.io
[eslint]: https://eslint.org
[integrating-eslint-prettier]: https://prettier.io/docs/en/integrating-with-linters.html
[comments-lecture]: https://youtu.be/ZsHMHukIlJY?t=488
[comments-post]: https://blog.codinghorror.com/code-tells-you-how-comments-tell-you-why/
[comments-tips]: https://stackoverflow.blog/2021/12/23/best-practices-for-writing-code-comments/
[github]: https://www.github.com
[ngrok]: https://ngrok.com
[nutjs]: https://nutjs.dev
[licecap]: https://www.cockos.com/licecap/
[figma]: https://www.figma.com
[render]: https://render.com
[tsup]: https://github.com/egoist/tsup
[np]: https://github.com/sindresorhuws/np
[koyeb]: https://www.koyeb.com/pricing
[obsidian]: https://obsidian.md
[lottiefiles]: http://lottiefiles.com
[undraw]: https://undraw.co/illustrations
[leaky-abstraction]: https://en.wikipedia.org/wiki/Leaky_abstraction
[github-oauth]: https://blog.teddykatz.com/2019/11/05/github-oauth-bypass.html