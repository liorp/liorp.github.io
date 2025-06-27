---
title: "Hackathon Part 2, or building a CTF management system"
date: 2021-05-14T16:37:00+03:00
categories:
  - web-development
  - fullstack
tags:
  - react
  - typescript
  - material-ui
  - python
  - django
  - djangorestframework
  - drf
excerpt: Designing a hackathon system
---

Recently, I decided to design a hackathon from A to Z.

Besides creating the stages themselves (which I will delve into in another blog post, I hope), I couldn't find any open source software to manage the hackathon itself (which will be discussed, you guessed it, in yet another blog post).

Some details:

- Frontend: React 17 (Typescript)
- Backend: Django 3.2 & DRF (Python 3.9)
- User auth system (I didn't get to implementing social auth)

Available here: [hack_a_track][hack_a_track]

---

🚨 UPDATE! 🚨<br>
I did eventually find one: [CTFd][ctfd].<br>
It seems like a much more serious effort than my system, but since I'd already written mine, I decided to share it anyway!

[ctfd]: https://ctfd.io
[hack_a_track]: https://github.com/liorp/hack_a_track
