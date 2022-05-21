---
title: "Simple solid inspired reactivity"
date: 2022-06-01T18:00:00+03:00
categories:
  - frontend
  - javascript
tags:
  - js
  - scope
  - solid
  - reactivity
excerpt: "Reactivity doesn't have to be radioactive ☢️"
header:
  overlay_image: /assets/images/2022-06-01-simple-solid-inspired-reactivity/solidjs.png
---

It seems like every now and then there's a new js framework that rises to take the world by storm. Whether it's [jQuery][jquery], [angularjs][angularjs], or [react][react], every js developer has that fond memory of the first js framework that got them into the world wide web world.  

Nowadays, it seems that [all][tweet1] [the][tweet2] [hype][tweet3] is going towards [solid][solidjs].
On the surface, solid looks similar to react, but its core mechanics are different. These differences make Solid incredibly fast and, in my opinion, less prone to some of the errors that react developers often stumble upon in their apps.

So I decided to take the plunge and check out the [no virtual dom][novdom] hype.  
The [solid in 100 seconds video] [100secsolid] is quite neat, but I felt I needed some more, so I read [this article][introsolid][^1] about intro to solid for react developers I watched the [advanced intro][solid10min].

First of all, my mind was blown: everything feels a lot more intuitive, and more importantly, reactive. 
A lot of the code I'm used to from react simply ceased to be, things like `useCallback` and `useRef`.
This is caused by solid's reactivity. But wait, what's reactivity?  

---
# Reactivity

Well, in order to explain reactivity, first we need to remember how js usually works. When we write something like: 
```js
let price = 5
let quantity = 2
let total = quantity * price
console.log(total)
```
We expect that 10 will be printed in the console. But if we change something, perhaps `quantity`, we don't expect that `total` would change:
```js
let price = 5
let quantity = 2
let total = quantity * price
console.log(total)
quantity = 3
console.log(total)
```

Total should still be 10. But, we can make this code reactive - which means that when we change `quantity` or `price`, `total` will change automatically.
This sort of magic comes to life with the help of the virtual dom in react. When we use hooks, we are literally hooking into the react virtual dom lifecycle:
<iframe src="https://codesandbox.io/embed/react-reactivity-demo-mn1hn0?fontsize=14&module=%2Fsrc%2FApp.jsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-reactivity-demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

But when we want to do the same in solid, we notice a few changes:
<iframe src="https://codesandbox.io/embed/solidjs-reactivity-demo-s5d9ly?fontsize=14&module=%2Fsrc%2FApp.jsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="solidjs-reactivity-demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

There's no dependency array in `createEffect` - solid already knows to re run this when `price` or `quantity` changes![^2]
In fact, we can move the effect and the state outside the component:
```js
const [count, setCount] = createSignal(0);

createEffect(() => {
    document.title = `The current count is: ${count()}`;
});
function Counter() {
  return (
    <div>
      <p>The current count is: {count()}</p>
      <button onClick={() => setCount((x) => x + 1)}>Plus</button>
    </div>
  );
}
```
We can do this because solid's reactive primitives themselves, and not the components, are what solid is built on and where the "magic" actually happens. 🤯  
In fact, solid proudly describes its components as "vanishing components" - they are only run once, and then they disappear (this is also why you can't do early returns in solid components).  
This is why, in solid, components are helpful for code organization and cease to exist once the initial render occurs.

---
# Reactivity, Round 2

But how exactly is this implemented? Well, solid has quite an extensive [repo on github][solidrepo], but in their [advanced intro][solid10min] (a.k.a solidjs in 10 minutes) they explain a simplified version of their implementation of reactivity in a way that I found to be truly beautiful and mesmerizing. 🤯

---

It all starts with a simple state, similiar to react's own `useState`. Let's call this `createSignal`, and implement a basic read and write: 
```js
export function createSignal(value) {
    const read = () => {
        return value;
    }
    const write = (nextValue) => {
        value = nextValue
    }
    return [read, write]
}

export function createEffect(fn) {
    fn();
}
```
Cool - this indeed gives us a basic ability to read and write to a value, but it is not reactive; an effect won't be re-run if we change a value!  

In order for reactivity to work we need a way to keep track of any effect that observes this signal.
To do that, let's maintain a global stack called `context` which let us to keep track of the effect that is currently running, and a function to get the current effect we're running in:
```js
const context = [];

function getCurrentEffect() {
    return context[context.length - 1]
}
```

That's *almost* ready.  
All that's left is to update this context, so we modify our `createEffect` function:
```js
export function createEffect(fn) {
    const execute = () => {
        context.push(execute);
        fn();
        context.pop();
    }
    execute();
}
```
This makes sure that the effect is pushing itself to the context for the state  - so the state could tell it to update when it's changed. For that to work we also need to modify our `createSignal` from before:
```js
export function createSignal(value) {
    const subscribers = new Set();

    const read = () => {
        const current = getCurrentEffect();
        if (current) subscribers.add(current)
        return value;
    }
    const write = (nextValue) => {
        value = nextValue
        for (const s of subscribers) {
            s();
        }
    }
    return [read, write]
}
```
So now when we call `write`, it tells each subscriber (each effect) to re-run.  
The code now looks like this:
<iframe src="https://codesandbox.io/embed/simple-reactivity-demo-nfy1ub?fontsize=14&module=%2Fsrc%2Findex.js&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="simple-reactivity-demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Of course, there are quite a few holes in this basic implementation, including what would happen if the effect fails, or that there's no batching of updates, but for our basic purposes this suffices.  

---

I hope that this simple exercise of implementing reactivity in js excited you as it blew my mind - I mean, look at how by just using the old plain stack we managed to inject reactivity in our code. 🤯

[^1]: This article was inspired in part by [this excellent post][introsolid]
[^2]: Albeit, this comes at a certain price: namely, [`state()` is now a function][solidcreatesignal] - it's a getter!

 [jquery]: https://jquery.com
 [angularjs]: https://angularjs.org
 [react]: https://reactjs.org
 [solidjs]: https://www.solidjs.com
 [tweet1]: https://twitter.com/davidkpiano/status/1526600072837873666?s=21&t=erwA58b9RqruDQxOc12tQw
 [tweet2]: https://twitter.com/jarredsumner/status/1527272957017325570?s=21&t=erwA58b9RqruDQxOc12tQw
 [tweet3]: https://twitter.com/thekitze/status/1526529762004459520?s=21&t=erwA58b9RqruDQxOc12tQw
 [introsolid]: https://non-traditional.dev/an-intro-to-solidjs-for-react-developers
 [100secsolid]: https://www.youtube.com/watch?v=hw3Bx5vxKl0
 [solid10min]: https://www.youtube.com/watch?v=J70HXl1KhWE
 [solidrepo]: https://github.com/solidjs/solid
 [novdom]: https://svelte.dev/blog/virtual-dom-is-pure-overhead
 [solidcreatesignal]: https://www.solidjs.com/docs/latest#createsignal