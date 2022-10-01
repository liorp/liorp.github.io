---
title: "Machine Learning Optimization Algorithms Survey Part 1"
date: 2022-06-05T18:40:00+03:00
categories:
  - machine-learning
  - deep-learning
tags:
  - ml
  - dl
  - ai
  - optimization
  - algorithms
excerpt: "Some theoretical background on common machine learning optimization algorithms"
---

Not too long ago I took a class in optimization, and as a final assignment our group decided to survey common machine learning optimization techniques. [^1]
This post is inspired by that assignment.  
In this first part, we describe common optimization concerns in machine learning. Then, we introduce the three widely used optimization methods - Momentum, RMSProp and ADAM.  
In the next part, we implement the aforementioned algorithms, show simulations and compare them.

---

# Problem

As machine learning evolve, a major subset of problems can be solved by these methods. In order to provide an efficient solution, optimization methods have become a paramount need.

As such, it has attracted much attention of researchers. A lot of work on solving optimization problems or improving optimization methods in machine learning has been proposed successively.

## Optimization Problems in Supervised Learning

For supervised learning, the goal is to find an optimal mapping function $$f\left(x\right)$$ to minimize the loss function of the training samples, $$\min_{\theta}\frac{1}{N}\sum\limits _{i=1}^{N}L\left(y^{i},f\left(x^{i},\theta\right)\right)$$

where $$N$$ is the number of training samples, $$\theta$$ is the parameter of the mapping function, $$x_{i}$$ is the feature vector of the $$i$$th samples, $$y_{i}$$ is the corresponding label, and $$L$$ is the loss function.

There are many kinds of loss functions in supervised learning. Yet, for regression problems, the simplest way is using the square of Euclidean distance as the loss function, $$L\left(y^{i},f\left(x^{i},\theta\right)\right)=\frac{1}{2}\left(y^{\left(i\right)}-f_{\theta}\left(x^{\left(i\right)}\right)\right)^{2}$$

# Gradient Descent - What It Is

## Gradient Descent

The gradient descent method is the earliest and most common optimization method. The idea of the gradient descent method is that variables update repeatedly in the (opposite) direction of the gradients of the objective function. The update is performed to gradually converge to the optimal value of the objective function. The learning rate $$\eta$$ determines the step size in each iteration, and thus influences the number of iterations to reach the optimal value.

We follow the formal expression of gradient descent as given in \[A Survey of Optimization Methods from a Machine Learning Perspective\], and vectorize the equations wherever we can.

In the paper's linear regression example, all the training data are used in each iteration step, so the gradient descent method is also called the batch gradient descent.

If the number of samples is $$N$$ and the dimension of $$x$$ is $$D$$, the computation complexity for each iteration will be $$O\left(ND\right)$$.

$$L\left(\theta\right)=\frac{1}{2N}\sum\limits _{i=1}^{N}\left(y^{\left(i\right)}-f_{\theta}\left(x^{\left(i\right)}\right)\right)^{2} \\ $$

$$f_{\theta}\left(x^{\left(i\right)}\right)=\sum\limits _{j=1}^{D}\theta_{j}x_{j}^{\left(i\right)}=\vec{\theta}\cdot x^{\left(i\right)} \\ $$

$$\frac{\partial L}{\partial\theta_{j}}=-\frac{1}{N}\sum\limits _{i=1}^{N}\left(y^{\left(i\right)}-f_{\theta}\left(x^{\left(i\right)}\right)\right)\cdot x_{j}^{\left(i\right)} \\ $$

$$\theta_{j}\left(t+1\right)=\theta_{j}\left(t\right)-\eta\cdot\frac{\partial L}{\partial\theta_{j}}\left(\theta_{j}\left(t\right)\right)=\theta_{j}\left(t\right)+\eta\cdot\frac{1}{N}\cdot\sum\limits _{i=1}^{N}\left(y^{\left(i\right)}-f_{\theta}\left(x^{\left(i\right)}\right)\right)\cdot x_{j}^{\left(i\right)} \\ $$

# Accelerating Gradient Descent

## Stochastic Gradient Descent

Since the batch gradient descent has high computational complexity in each iteration for large-scale data and does not allow online update, stochastic gradient descent (SGD) was proposed. The idea of stochastic gradient descent is using only one sample randomly to update the gradient per iteration, instead of directly calculating the exact value of the gradient. This gives us an estimate of the real gradient.

Since SGD uses only one sample per iteration, the computation complexity for each iteration is $$O(D)$$ where $$D$$ is the number of features. The update rate for each iteration of SGD is much faster than that of batch gradient descent when the number of samples $$N$$ is large. SGD increases the overall optimization efficiency at the expense of more iterations, but the increased iteration number is insignificant compared with the high computation complexity caused by large numbers of samples. It is possible to use only thousands of samples overall to get the optimal solution even when the sample size is hundreds of thousands. **Therefore, compared with batch methods, SGD can effectively reduce the computational complexity and accelerate convergence.**

In practice, many algorithm use a version of SGD that uses more than one sample, but not all the samples. This is known as mini-batch gradient descent.

The equations for SGD (and for mini-batch) are the same equations for Gradient Descent, but $$N$$ is replaced by $$m$$, where $$1\leq m<N$$.

## Momentum Gradient Descent

This method takes inspiration from the concept of momentum in the mechanics of physics, which simulates the inertia of objects.

The idea of applying momentum in SGD is to preserve the influence of the previous update direction on the next iteration to a certain degree. **The momentum method can speed up the convergence when dealing with high curvature, small but consistent gradients, or noisy gradients.**

Another way to look at this algorithm is by viewing it as an implementation of exponentially weighed averages of the gradients.

The equation for the update is
$$v_{j}\left(t+1\right)=-\eta\cdot\frac{\partial L}{\partial\theta_{j}}\left(\theta_{j}\left(t\right)\right)+v_{j}\left(t\right)\cdot\alpha \\ $$

Where $$\alpha$$ is the momentum factor. Many experiments have empirically verified the most appropriate setting for the momentum factor is $$0.9$$. Sometime $$\eta$$ is chosen to be $$1-\alpha$$, seen as storing an exponentially decaying average of past gradients.

If the current gradient is parallel to the previous velocity $$v_{j}\left(t\right)$$, the previous velocity can speed up this search. The proper momentum plays a role in accelerating the convergence when the learning rate is small. If the derivative decays to 0, it will continue to update $$v$$ to reach equilibrium and will be attenuated by friction.

Further optimizing this, Nesterov Accelerated Gradient Descent uses the gradient of the future position instead of the current position,

$$v_{j}\left(t+1\right)=-\eta\cdot\frac{\partial L}{\partial\theta_{j}}\left(\theta_{j}\left(t\right)+v_{j}\left(t\right)\cdot\alpha\right)+v_{j}\left(t\right)\cdot\alpha \\ $$

so it includes more gradient information.

## RMSProp

Like momentum gradient descent, this method incorporates previous values of the gradient in the calculation.

It is an unpublished extension, first described in Geoffrey Hinton's lecture notes for his Coursera course on neural networks.[^2]

It is related to another extension to gradient descent called Adaptive Gradient, or AdaGrad.

**AdaGrad is designed to specifically explore the idea of automatically tailoring the step size (learning rate) for each parameter in the search space, and works well with sparse gradients.** This is achieved by first calculating a step size for a given dimension, then using the calculated step size to make a movement in that dimension using the partial derivative. This process is then repeated for each dimension in the search space.

AdaGrad calculates the step size for each parameter by first summing the partial derivatives for the parameter seen so far during the search, then dividing the initial step size hyper-parameter by the square root of the sum of the squared partial derivatives, while RMSProp maintains a decaying average of squared gradients.

$$g_{t}=\frac{\partial L}{\partial\theta}\left(\theta\left(t\right)\right) \\ $$

$$v_{t}=\beta v_{t-1}+\left(1-\beta\right)g_{t}^{2} \\ $$

$$\theta_{t+1}=\theta_{t}-\eta\frac{g_{t}}{\sqrt{v_{t}}+\epsilon} \\ $$

Where we add $$\epsilon$$ in the denominator in order to ensure numerical stability, i.e. avoid dividing by $$0$$.

## Adaptive moment estimation (ADAM)

ADAM is another advanced SGD method, which introduces an adaptive learning rate for each parameter. It combines the adaptive learning rate and momentum methods. In addition to storing an exponentially decaying average of past squared gradients $$V_{t}$$, like RMSProp, ADAM also keeps an exponentially decaying average of past gradients $$m_{t}$$, similar to the momentum method:

$$g_{t}=\frac{\partial L}{\partial\theta}\left(\theta\left(t\right)\right) \\ $$

$$v_{t}=\beta_{1}v_{t-1}+\left(1-\beta_{1}\right)g_{t} \\ $$

$$s_{t}=\beta_{2}s_{t-1}+\left(1-\beta_{2}\right)\left(g_{t}\right)^{2} \\ $$

where $$\beta_{1}$$ and $$\beta_{2}$$ are exponential decay rates. The final update formula for the parameter $$\theta$$ is $$\theta_{t+1}=\theta_{t}-\eta\frac{v_{t}}{\sqrt{s_{t}}+\epsilon}$$

Now it can be seen clearly that the formulas above incorporate RMSProp and Momentum Gradient Descent into a single formula.

The default values of $$\beta_{1}$$, $$\beta_{2}$$, and $$\epsilon$$ are suggested to set to $$0.9$$, $$0.999$$, and $$10^{-18}$$, respectively. ADAM works well in practice and compares favorably to other adaptive learning rate algorithms.

[^1]: This post was inspired by an assignment submitted in the course Optimization by [Yiftach Neumann][yn] and I. We got an A+ on this paper, so I felt confident enough to upload it as a post 😜
[^2]: Lecture 6e "RMSProp: Divide the gradient by a running average of its recent magnitude"

[yn]: https://www.linkedin.com/in/yiftach-neuman-4a58a1192/
