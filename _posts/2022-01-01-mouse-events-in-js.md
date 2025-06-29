---
title: "Mouse Events in JS 🐁"
date: 2022-01-01T17:11:00+02:00
categories:
  - web-development
  - frontend
  - javascript
tags:
  - react
  - mouseevents
  - mouse
  - js
  - onmouseenter
  - onmouseleave
  - onmouseout
  - onmouseover
excerpt: "Of mice and events"
---

Recently, I had a nasty issue regarding an autocomplete component that refused to render its options properly.
When you hovered on the component, it flickered like NYE fireworks in Times Square 🎆

Turns out the problem was created by using `onmouseover` on a parent element of the autocomplete component.
When I changed it to `onmouseenter`, the problem was solved!

...and this was odd enough to make me wonder about mouse events in JS.

---

Of course, I'm not talking about your everyday `onclick`. That's cool - everyone knows to just put some event handler there and go on.

Nope, I'm talking about these four, highly similar events, that when used without care can cause _a lot_ of unnecessary renders[^1].

The fantastic four (© Marvel) are:

| Event          | Description                                                                                 | Used for                                                                      |
| -------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `onmouseenter` | Occurs when the pointer is moved onto an element                                            | When you care about entering **the whole element**, not for entering children |
| `onmouseleave` | Occurs when the pointer is moved out of an element                                          | When you care about exiting **the whole element**, not for exiting children   |
| `onmouseover`  | Occurs when the pointer is moved onto an element, or onto one of its children               | When you care about entering the element, and **also for entering children**  |
| `onmouseout`   | Occurs when a user moves the mouse pointer out of an element, or out of one of its children | When you care about exiting the element, and **also for exiting children**    |

Note the slight difference between these two sets of events:

- `onmouseenter` and `onmouseleave` occur on the element itself.
- `onmouseout` and `onmouseover` occur on the element _or one of its children_.

This means that `onmouseenter` and `onmouseleave` do not bubble up—they do not propagate up the document hierarchy, hence they're used when you care about the element as a whole.

This codesandbox should make things more graphic:

<iframe src="https://codesandbox.io/embed/mouse-events-js-demo-cq5i5?fontsize=14&theme=light"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="mouse-events-js-demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

Note how many times that box of `onmouseover` changes! In React, this would cost us in multiple renderings that we might not need.

I hope this short article helped clear up some confusion about these particular mouse events in JavaScript, and made you think a little the next time you need to implement mouse tracking of some sort.

Happy new year everyone, and always remember — "a `mouseevent` a day keeps the render count at bay" 🌈

[^1]: I use React, so I natively talk about renderings. But this also applies to vanilla JS.
