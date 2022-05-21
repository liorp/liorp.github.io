---
title: "JavaScript Scope (and the Event Loop)"
date: 2022-05-21T18:00:00+03:00
categories:
  - frontend
  - javascript
tags:
  - js
  - scope
  - event loop
excerpt: "The event loop, the scope, look at this post that I wrote!"
---
I'll admit it straightforward- I sometimes enter [stackoverflow][stackoverflow] and look at the questions posted; I just enjoy to give back to the community my humble share back. 😇  
Sometimes, a question in [stackoverflow][stackoverflow] rises from the deep to shed some light on a subject in programming that I know well, or at least thought I knew well - and makes me second guess my knowledge and understanding of the subject.

Recently, [a question of this kind][stackq] caught my eye; in essence, it seems that the enquirer was trying to implement some [react][react]-esque [`useEffect`][useEffect] hook, but he stumbled across trouble with the famous [JavaScript scope][jsscope].

---

# The JavaScript scope
But what is the JavaScript [scope][jsscope]? Quoting from the holy bible of the web developer, the MDN:
> [The scope is] The current context of execution. The context in which values and expressions are "visible" or can be referenced. If a variable or other expression is not "in the current scope," then it is unavailable for use. Scopes can also be layered in a hierarchy, so that child scopes have access to parent scopes, but not vice versa.

Furthermore, in other parts of the program, the same variable name may refer to a different entity (a different binding), or to nothing (unbound). [^1]

Armed with this knowledge, let's look at the code in question:  
<iframe src="https://stackblitz.com/edit/js-jplnzf?embed=1&file=index.js"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="stackoverflow-useeffect-question"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

When run, it prints:
```js
"before", {
  age: 0
}
"after", {
  age: 0
}
"replicaUseEffect", {
  age: 0
}
```

At this point, some of my JavaScript alarm bells started to ring 🔔 - why does `after()` print `{age: 0}`? Didn't we increase the value?

Furthermore, when appending another call to `foo()`, it results in this:  
```js
"before", {
  age: 0
}
"after", {
  age: 0
}
"before", {
  age: 1
}
"after", {
  age: 1
}
"replicaUseEffect", {
  age: 1
}
"replicaUseEffect", {
  age: 1
}
```

Which seems rather odd - the second call to `replicaUseEffect()` prints the same `{age: 1}` value! 🔔

Let's take a closer look at this code, and read it line-by-line:
```js
let state = {
    age: 0
};
let getState = () => {
     let setState = () => {
        state = {
            age: state.age + 1
        }
    }
    return {
        state,
        setState
    }
}

function foo() {
    let {
        state:st,
        setState
    } = getState();
    replicaUseEffect = () => {
        console.log("replicaUseEffect", st);
    }
    console.log("before", st);

    setState()
    console.log("after", st);


    setTimeout(() => replicaUseEffect(), 1000)
};
foo();
foo();
```

Well, the first three lines define a global `state` variable (using [`let`][letmdn], of course, so we could reassign to it).  
Next, we have the function `getState`. This function defined a `setState` function that reassigns state with an incremented by one `age`. 

Aha! This solves my first mystery alarm bell  🔔: why does `after()` print `{age: 0}`? Didn't we increase the value?  
Indeed, we increased the value, but we also **reassigned** `state`. Remember - `foo()` sees a reference to the old `state` variable.  
If we had run `getState();` again before logging `state` again, we would have gotten the updated value.

But the mystery of the `setTimeout` call remains. To solve it, let's continue our quest.

We have arrived at the function `foo()`.  
This function calls `getState()` and reassigns its results as `{state:st, setState}`.  
Then, a function named `replicaUseEffect` is defined as a simple `console.log` of the `st` value.  
Note that `replicaUseEffect` is defined without `const` or `let`.  
`foo()` then prints `st`, calls `setState()` (which reassigns to the global `state`, remember?), and then prints again `st` (which wasn't changed).  
Then it calls `setTimeout` with `replicaUseEffect` and a delay of one second.

Finally, we call `foo()` twice. It seems that second time we run `replicaUseEffect()`, it somehow makes the first invocation log the second value of `st`:  
```js
"replicaUseEffect", {
  age: 1
}
"replicaUseEffect", {
  age: 1
}
```

---

# The JavaScript event loop
Of course, that is not true - there's no way that we could make our first invocation to "peek" into the future and see the next value of `st`... unless we make it so.  
In order to understand what's happening here, we should remember that by calling `setTimeout`, we "push" our function to the message queue[^2]: we're telling js that we want to run this code after the event loop has finished evaluating the current function; the code is called from an execution context separate from the function from which `setTimeout` was called. [^3]

Now, before we untangle this mess, note that when we call `foo()`, we are actually reassigning `replicaUseEffect`: 
```js
replicaUseEffect = () => {
    console.log("replicaUseEffect", st);
}
```
By not using `let`, `const`, or `var`, we've defined `replicaUseEffect` on the global object (in the browser, it is the `window` object). Then, we reassign to it, so when `replicaUseEffect` - the callback of `setTimeout` - is actually called (at least 1 second since our function has finished executing), it is replaced by another version of it - because we reassigned it.  
And although its code is exactly the same, it lives in a different closure, which has the `st` local variable of the second execution context of `foo`.

When `replicaUseEffect` is defined as a local variable, this problem vanishes: 
```js
let state = {
    age: 0
};
let getState = () => {
     let setState = () => {
        state = {
            age: state.age + 1
        }
    }
    return {
        state,
        setState
    }
}

function foo() {
    let {
        state:st,
        setState
    } = getState();
    const replicaUseEffect = () => {
        console.log("replicaUseEffect", st);
    }
    console.log("before", st);

    setState()
    console.log("after", st);


    setTimeout(() => replicaUseEffect(), 1000)
};
foo();
foo();
```

This indeed prints `{age: 0}` and then `{age: 1}`:  
```js
"before", {
  age: 0
}
"after", {
  age: 0
}
"before", {
  age: 1
}
"after", {
  age: 1
}
"replicaUseEffect", {
  age: 0
}
"replicaUseEffect", {
  age: 1
}
```

---

To sum it up, this post talked about some very delicate subjects in js: the [event loop][elmdn] and the [scope][jsscope].  
Indeed, the scope can be intimidating and complicated at first sight - which, with this question in mind, reminds us to use `let` and `const`.
The event loop also has its proper place in the list of things that are unclear at first when starting to code in js.

I encourage everyone who enjoyed this article to read some more about the [event loop][elmdn] and the [scope][jsscope] in [mdn][mdn].

[^1]: This is based on [wikipedia][scopewiki]
[^2]: While this is based on [mdn][elmdn]
[^3]: And this is also based on [mdn][settimeoutmdn]



[stackoverflow]: https://stackoverflow.com
[stackq]: https://stackoverflow.com/questions/72220553/calling-function-second-time-affects-variable-from-first-invocation#72220553
[react]: https://reactjs.org
[useEffect]: https://reactjs.org/docs/hooks-effect.html
[jsscope]: https://developer.mozilla.org/en-US/docs/Glossary/Scope
[scopewiki]: https://en.wikipedia.org/wiki/Scope_(computer_science)
[letmdn]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
[elmdn]: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
[settimeoutmdn]: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
[mdn]: https://developer.mozilla.org/en-US/