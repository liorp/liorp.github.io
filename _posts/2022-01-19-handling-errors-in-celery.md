---
title: "Handling Errors in Celery"
date: 2022-01-19T17:11:00+02:00
categories:
  - blog
tags:
  - celery
  - python
  - rabbitmq
  - errors
  - queue
---

Error handling is one of the most important features a framework can offer in order to have a great DX.  
Some of the implementations can be a really bad DX 👀, or they can be really fun, like in Celery.  
You see, there are two things that can go wrong when you send a task to a Celery worker:

1. Connection issues with the broker and Message Queue.
2. Exceptions raised on the worker.

---

# Connection issues
The first issue can be solved by defining `retry` and `retry_policy`, say like this (kudos to [this article][autoretry]):
```python
from tasks.celery import app

app.send_task(
    "foo.task",
    retry=True,
    retry_policy=dict(
        max_retries=3,
        interval_start=3,
        interval_step=1,
        interval_max=6
    )
)
```

*It does not protect you against exceptions that the task raises - this is only useful for connection failures*. Yet, I find this a really good first line of defense against transport error.  
Of course, further info about this can be found in the [Celery docs][Celery docs].  

---

# Task issues

This kind of errors can be solved in two ways:
1. By calling `self.retry()` upon a task failure, manually.
2. [Automatic retry for known exceptions][Automatic retry for known exceptions]. This is useful when you know that an ephermal error might occur during task execution.  
A basic implementation of this looks something like this:
```python
@app.task(autoretry_for=(FailWhaleError,),
          retry_kwargs={'max_retries': 5})
def refresh_timeline(user):
    return twitter.refresh_timeline(user)
```

_Golden Tip 🎫_
It is helpful to set `CELERY_ACKS_LATE = True` in your global celery app settings.
This means that the messages will be acknowledged *after* the task has been executed, and not before, which is the default behavior of Celery.  
This way, if a worker crashes, the message will still be in the queue.

This post is adapted from an [answer][answer] I wrote on stackoverflow.

[^1]: Though I admit that sometimes I mishap and look on the keyboard, and when I do that, I'm looking at you, "\|" 🙄
[^2]: Shout out to stackoverflow!
[Celery docs]: https://docs.celeryproject.org/en/latest/userguide/calling.html#retry-policy
[autoretry][autoretry]: https://coderbook.com/@marcus/how-to-automatically-retry-failed-tasks-with-celery/
[Automatic retry for known exceptions][Automatic retry for known exceptions]: https://docs.celeryproject.org/en/stable/userguide/tasks.html#Task.retry_backoff
[answer][answer]: https://stackoverflow.com/a/70391418/938227