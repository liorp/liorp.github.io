---
title: "Developer Tools"
date: 2021-06-05T18:40:00+03:00
categories:
  - blog
tags:
  - developer
  - tools
  - tips
published: false
---

No, this post is not going to be about the chrome developer tools (although you should totally read about it).

No, this post is about some developer tools I use to enhance my projects, and some tips 
I've collected along the way.

## Things I’ve learned
* Always use a linter and code styling for your own good. Don’t compromise. 

* [Comments aren’t always necessary][comments]. Use them with caution, aren’t read by compiler or almost anyone. Can get old. 

* Get rid of validation asap in your code,  so you can get to your happy flow in the end where everything is guaranteed to be good. For example I reviewed a code that could return 200, then 438 then 200. That means something is off and you should second guess your initial assumptions. 

* Someone else thought about it before you. [Use the open source community][github]. If you can’t find, code it and call it a startup. 

## Some tools

* Ngrok domain for testing
* Nut js for screen automations 
* Lice cap for screen recording gif

[comments]: https://youtu.be/ZsHMHukIlJY?t=488
[github]: https://www.github.com/