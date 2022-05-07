---
title: "Enabling RabbitMQ's Quorum Queues in Celery"
date: 2021-09-16T18:19:00+03:00
categories:
  - blog
tags:
  - celery
  - rabbitmq
  - quorum
  - queue
  - python
  - microservice
excerpt: "What to do when your rabbit doesn't want to eat its veggies"
---

### Intro
When I was first introduced to the concept of parallel work, I was told the following explanation:  
You have publishers that publish tasks, subscribers that consume messages, and a broker mechanism that is responsible to suck in the tasks from the publishers and send them to subscribers that will actually perform the tasks, optionally returning an answer to the publishers.  
This is called work queues, as illustrated here (one publisher and many consumers, from RabbitMQ's official docs):  

<figure class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/2021-09-15-enabling-rabbitmq-quorum-queues-in-celery/rabbitmq-work-queue.png" alt="RabbitMQ work queues">
  <figcaption>RabbitMQ work queues</figcaption>
</figure> 

A common implementation of this configuration is done with [celery][celery] for pub/sub and [RabbitMQ][rabbitmq] for the broker; from now on I'm going to talk about this configuration in particular
(it is also recommended that you have a basic understanding of queueing with RabbitMQ and celery from this point forward).

---

### Real World Catastrophy
Well, this sounds really good in theory, but in practice there are many points of failure involved when deploying such a system.  
One of the most common points of failure is data safety with regard to broker downtime.  

The equation is simple: if we have only one node, and it is down (whether it may be for a brief time power loss, a network error or for many other cases), then we have no way of sending and receiving messages.  
Furthermore, we can have multiple nodes (for multiple exchanges and bindings)- yet still the actual queue resides on a single node, so if the node is down, the queue is down.  

Trust me - if you're writing a microservice that's handling some work, that's really not good for its uptime 🥺

---

### Minimizing Dependencies
Enter RabbitMQ's [Mirrored Queues][rabbitmq-mirrored-queues].  
Up until recently, this was the default way of having a cluster of RabbitMQ nodes operate even when nodes go down. Yet, quoting from RabbitMQ's documentation on Quorum Queues:
> Classic mirrored queues in RabbitMQ have technical limitations that makes it difficult to provide comprehensible guarantees and clear failure handling semantics. Certain failure scenarios can result in mirrored queues confirming messages too early, potentially resulting in a data loss.

---

### Quorum Queues to the rescue!
So what should we do? Enter [Quorum Queues][rabbitmq-quorum-queues].  
Quorum Queues are based on a consensus algorithm named [Raft][raft], and they are considered the next version of high availablity queues.  
🪓 RabbitMQ even says that Mirrored Queues will be removed in a future release 🪓

At this point you're probably saying to yourself: "You got me big L, I want to have quorum queues!"  
Well, apparently [they are not supported out of the box][celery-quorum-ticket] in celery (September 2021, update: May 2022).  
If you follow the celery instructions and naively define a queue with type quorum, you'll actually get an `amqp.exceptions.AMQPNotImplementedError: Basic.consume: (540) NOT_IMPLEMENTED - queue 'add_queue' in vhost '/' does not support global qos` 😵


<figure class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/2021-09-15-enabling-rabbitmq-quorum-queues-in-celery/celery-global-qos-error.png" alt='Getting a really nasty error when forcing queue_arguments={"x-queue-type": "quorum"}'>
  <figcaption>Getting a really nasty error when forcing queue_arguments={"x-queue-type": "quorum"}</figcaption>
</figure> 

This stems from the fact that celery sets a global QoS (in simple terms, this means that the message prefetch count is global for all the consumers of the queue).

---

### The "Hack"
But... you can still have them.
By hooking into the bootsteps of the celery worker, you can force it to have a per-consumer QoS, in this manner: 
{% highlight python linenos %}
class NoChannelGlobalQoS(bootsteps.StartStopStep):
    requires = {'celery.worker.consumer.tasks:Tasks'}  # Required for the step to be run after Tasks has been run

    def start(self, c):
        # In this context, `c` is the consumer (celery worker)
        qos_global = False

        # This is where we enforce per-client QoS, the rest is just copypaste from celery
        # Note that we set to prefetching size to be 0, so the exact value of `c.initial_prefetch_count` is not important
        c.connection.default_channel.basic_qos(
            0, c.initial_prefetch_count, qos_global,
        )

        def set_prefetch_count(prefetch_count):
            return c.task_consumer.qos(
                prefetch_count=prefetch_count,
                apply_global=qos_global,
            )
        c.qos = QoS(set_prefetch_count, c.initial_prefetch_count)


app.steps['consumer'].add(NoChannelGlobalQoS)
{% endhighlight %}

Inspired by [this observation][asgavar-comment] by [@Asgavar][asgavar], it is possible to run quorum queues in celery!

An example project can be found [here][quorum-queues-with-celery].

Go ahead and tell me in the comments if it worked for you 🤠

UPDATE [01.05.2022]: Thanks to [Ilai Shai][ilsh] for several refinments to the celery code.

[celery]: https://docs.celeryproject.org/en/stable/
[rabbitmq]: https://pypi.org/project/cryptography/
[rabbitmq-mirrored-queues]: https://www.rabbitmq.com/ha.html
[rabbitmq-quorum-queues]: https://www.rabbitmq.com/quorum-queues.html
[raft]: https://raft.github.io/
[celery-quorum-ticket]: https://github.com/celery/celery/issues/6067
[asgavar]: https://github.com/Asgavar
[asgavar-comment]: https://github.com/celery/celery/issues/6067#issuecomment-724001426
[quorum-queues-with-celery]: https://github.com/liorp/quorum_queues_with_celery
[ilsh]: https://www.linkedin.com/in/ilai-shai