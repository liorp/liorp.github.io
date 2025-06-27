---
title: "The promised land - JavaScript scope"
date: 2024-01-28T08:00:00+03:00
categories:
  - blog
  - web-development
tags:
  - javascript
excerpt: "Sometimes all you need is just the right context"
---

In the course of my recent work on an endpoint tasked with fetching data from an external server, a peculiar bug surfaced. This external server occasionally threw errors, making the problem more elusive as it happened statistically, and not on every call. Join me as we explore the nuances of this intermittent challenge in asynchronous programming.

---

## The Premise

We all appreciate the speed that async programming brings to the table. However, as is often the case with powerful features, it comes with its own set of pitfalls. Let's dissect a seemingly innocuous piece of code:

```javascript
async function otherAsyncStuff() {
  const response = fetchSomething("/api/endpoint");
  const anotherResponse = fetchSomething("/api/another-endpoint");

  // Some more code
  const diskResult = await fetchSomething("/api/disk");

  const results = await Promise.all([response, anotherResponse]);
  return [results, diskResult];
}
```

Can you spot a problem here? If you can't, don't worry, I couldn't either. But it turns out that there is a problem here, and it's a big one.

## The Intricacies Unveiled

Let's zoom out and examine this code in a broader context:

```javascript
async function fetchSomething(someUrl, error = false) {
  console.log(someUrl);
  if (error) {
    throw new Error(`Something went wrong ${someUrl}`);
  } else {
    // Do work for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Work done", someUrl);
    return "some data";
  }
}

async function otherAsyncStuff() {
  const response = fetchSomething("/api/endpoint");
  const anotherResponse = fetchSomething("/api/another-endpoint", true);

  // Some more code
  const diskResult = await fetchSomething("/api/disk");

  const results = await Promise.all([response, anotherResponse]);
  return [results, diskResult];
}

async function asyncStuff() {
  try {
    const result = await otherAsyncStuff();
    return result;
  } catch (e) {
    console.log("error", e.message);
  }
}

function main() {
  console.log("Started running");
  asyncStuff().then(() => console.log("Finished running"));
  console.log("Doing other stuff");
}

main();
```

Let's break down the code step by step, bottom to top:

- The `main` function is nothing special. It just calls `asyncStuff` and prints some stuff to the console (think of `asyncStuff` as being your app's main loop).
- Then, `asyncStuff` awaits on `otherAsyncStuff` and catches any errors that might occur.
- `otherAsyncStuff` is where the trouble happens. It calls `fetchSomething` twice (think of `fetch` or `axios`), once with an error and once without.
- Then, it awaits on `fetchSomething` with the disk endpoint, and then awaits on `Promise.all` with the two previous calls.
- Finally, it returns the results.

Now, let's run this code and see what happens. We get the following output:

```text
Started running
/api/endpoint
/api/another-endpoint
/api/disk
Doing other stuff
/(abbreviated)/code.js:4
    throw new Error(`Something went wrong ${someUrl}`);
          ^

Error: Something went wrong /api/another-endpoint
    at fetchSomething (/(abbreviated)/code.js:4:11)
    at otherAsyncStuff (/(abbreviated)/code.js:15:27)
    at asyncStuff (/(abbreviated)/code.js:26:26)
    at main (/(abbreviated)/code.js:35:3)
    at Object.<anonymous> (/(abbreviated)/code.js:39:1)
    at Module._compile (node:internal/modules/cjs/loader:1376:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1435:10)
    at Module.load (node:internal/modules/cjs/loader:1207:32)
    at Module._load (node:internal/modules/cjs/loader:1023:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:135:12)

Node.js v21.1.0
```

Wait, what? Why did we get an error? We didn't even get to the `Promise.all` part! 🤨

---

## The Culprit: Async and Microtasks

Well, it turns out that the `const diskResult = await fetchSomething("/api/disk");` line is the culprit.

Here's the gist:

- When we `await` the disk call, JavaScript continues running previous calls to `fetchSomething` (as they are `promises`, which are [`microtasks`][microtasks]).
- The second call to `fetchSomething` throws an error, and since we didn't catch it until the next tick of the event loop, the program crashes.

"But we have a `try/catch` block in `asyncStuff`! Why didn't it catch the error?"

- When `anotherResponse` is executed, it happens in a different context without our `try/catch` safety net. The error is thrown, and the program crashes.

---

## The Fix: Taming Promises

So, how do we navigate this async maze without a crash? Wrap all calls to `fetchSomething` in the `Promise.all` call. That would look something like this:

```javascript
async function fetchSomething(someUrl, error = false) {
  console.log(someUrl);
  if (error) {
    throw new Error(`Something went wrong ${someUrl}`);
  } else {
    // Do work for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Work done", someUrl);
    return "some data";
  }
}

async function otherAsyncStuff() {
  const response = fetchSomething("/api/endpoint");
  const anotherResponse = fetchSomething("/api/another-endpoint", true);

  // Some more code
  const diskResult = fetchSomething("/api/disk");

  const results = await Promise.all([response, anotherResponse, diskResult]);
  return results;
}

async function asyncStuff() {
  try {
    const result = await otherAsyncStuff();
    return result;
  } catch (e) {
    console.log("error", e.message);
  }
}

function main() {
  console.log("Started running");
  asyncStuff().then(() => console.log("Finished running"));
  console.log("Doing other stuff");
}

main();
```

Now, all promises resolve in our original scope - the one adorned with the `try/catch` block. The error is caught, and the program survives unscathed.

To add a pinch of versatility, consider using `Promise.allSettled` instead of `Promise.all` to handle all of the promises, even if some promises are rejected.

---

I hope this journey through the async maze was as enlightening for you as it was for me. Happy coding, and may your promises always resolve in the right context!

## Further Reading

- [MDN - async function][MDN async function]

UPDATE [28.01.2024]: Thanks to [Eytan Schulman][eytansh] for several refinements to the article.

[microtasks]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth
[MDN async function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#async_functions_and_execution_order
[eytansh]: https://www.linkedin.com/in/eytanschulman?trk=blended-typeahead
