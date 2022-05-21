---
title: "Machine Learning Optimization Algorithms Survey Part 2"
date: 2022-06-12T18:40:00+03:00
categories:
  - machine learning
  - deep learning
tags:
  - ml
  - dl
  - ai
  - optimization
  - algorithms
excerpt: "Some results on common machine learning optimization algorithms"
---

This post was inspired by an assignment submitted in the course Optimization by [Yiftach Neumann][yn] and I.  
In the first part, we described common optimization concerns in machine learning. Then, we introduced the three widely used optimization methods - Momentum, RMSProp and ADAM.  
In this second (and last) part, we implement the aforementioned algorithms, show simulations and compare them.

---

# Algorithms, Implementations and Evaluation

We provide implementation of the aforementioned algorithms in the python notebook:
<script src="https://gist.github.com/liorp/289bb4a6e8ea7fd5de22ba2e3fd5accd.js"></script>

## Evaluation

<figure class="align-right">
  <img src="/assets/images/2022-06-12-machine-learning-optimization-algorithms-part-two/hyperparametrs-tuning.png" style="max-width:280px;" alt="The dramatic effects of the hyper-paramaters on the optimizer behaviour">
  <figcaption>The dramatic effects of the hyper-paramaters <br/> on the optimizer behaviour</figcaption>
</figure> 

We can evaluate our algorithm by observing how well it performs the optimization on various functions. Optimizers usually have hyper-parameters, such as learning rate. Those hyper-parameters have dramatic effect on the optimizer behaviour, as clearly seen in the figure to the right.

For this reason, in our work we will compare optimizers after having tuned the optimizer hyper-parameters - we made an exhaustive search of $$\sim50$$ different values for each parameter, and chose the parameters that yielded the best value in the smallest number of iterations. The search was computationally expensive and might not be feasible over large data-sets, thus the results shown might be better than those seen in practice. Indeed, it is possible that while using the best hyper-parameters some algorithms perform similarly, but in most cases one is superior to another. Alas, it is still the best comparison method available in order to give each optimizer a fair try.

### Low Dimensional Functions

<figure class="align-right">
  <img src="/assets/images/2022-06-12-machine-learning-optimization-algorithms-part-two/hard-1d.png" style="max-width:280px;" alt="The dramatic effects of the hyper-paramaters on the optimizer behaviour">
  <figcaption>Hard Polynomial illustration</figcaption>
</figure> 

We implemented 3 simple and complex functions over $$\mathbb{R}$$ or $$\mathbb{R}^{2}$$:
1. Cubic Function $$\left(x^{2}\right)$$, 
2. "Mean Squared Error" $$\left(x-y\right)^{2}$$, and 
3. "Hard Polynomial" $$\left(x^{2}-3\sin\left(x\right)x+1\right)$$ , which is drawn in the figure to the right.

We then ran every optimizer on each of these functions, starting at different initial points. As mentioned before, all optimizers' hyper-parameters were tuned. The results are detailed in Appendix A.


<figure class="align-left">
  <img src="/assets/images/2022-06-12-machine-learning-optimization-algorithms-part-two/Optimizers_vs_cubic.png" style="max-width:280px;" alt="Optimizers result on cubic function">
  <figcaption>Optimizers result on cubic function</figcaption>
</figure> 

The results were quite surprising. On the simpler functions (Cubic and MSE), all of the optimizers converged to the global minimum. RMSProp and ADAM found an insignificantly lower spot, albeit at the price of a much larger number of iterations. Thus, we can assert that, on simple convex functions, Gradient Descent and Momentum will converge faster, without loss in performance.

<figure class="align-right">
  <img src="/assets/images/2022-06-12-machine-learning-optimization-algorithms-part-two/Optimizers_vs_hard-1d.png" style="max-width:280px;" alt="Optimizers result on Hard Polynomial">
  <figcaption>Optimizers result on Hard Polynomial</figcaption>
</figure> 

On the more challenging function, "Hard Polynomial", there was a clear advantage to Momentum. On simple initial points, for example $$f\left(2\right)$$, all of the optimizers reached the global minimum. But on points farther up the slope of the function, such as $$f\left(401\right)$$, it was the only algorithm that consistently converged to the global minimum, with a reasonable number of iterations. Gradient Descent, with proper choice of learning rate, performed nicely as well, for most of the initial points.

It is also clear that near the minimum point, ADAM and RMSProp converge slowly, a behaviour that was consistent in all of the functions and initial points, highlighting the importance of learning rate decay methods.

### High Dimensional Cubic Functions

Next, we compared the optimizers on high dimensional cubic function, for example $$x_{1}^{2}+x_{2}^{4}+...+x_{n}^{2}$$. These functions are interesting because one of the main motivations behind Momentum, RMSProp and ADAM is to allow different change in each dimension, in order to suppress oscillations in dimensions that have steeper slope - as this behaviour allows for fewer oscillations and better learning rate overall.

The results does not reflect the intuition: Gradient Descent has the lowest number of iterations by far, and ADAM consistently converges the slowest. With respect to performance, ADAM still converges to a lower point than the rest of the optimizers. Momentum has superior results than Gradient Descent, albeit with a small increase in iterations number, and RMSProp performs the worst with a very large number of iterations. For the full table of results, please refer to the appendix.


<figure class="align-right">
  <img src="/assets/images/2022-06-12-machine-learning-optimization-algorithms-part-two/Optimizers_Vs_High_Dim_Polynomial.png" style="max-width:280px;" alt="Optimizers result on High Dimensional Polynomial">
  <figcaption>Optimizers result on <br/> High Dimensional Polynomial</figcaption>
</figure> 

One of the main theoretic advantages of RMSProp and ADAM is the ability to choose a larger learning rate, while reducing oscillations in dimensions with steeper slopes. We specifically choose these functions to highlight that behaviour. Alas, the plot above clearly shows that Momentum and drop much faster towards the local minima, which raises questions about the correctness of this theoretical assumption. It is possible that ADAM popularity in the Deep Learning domain is due to another advantage that plays a role in the structure of loss functions surfaces over the unique data-sets of a particular deep learning domain.

### High Dimensional Hard Polygon

<figure class="align-left">
  <img src="/assets/images/2022-06-12-machine-learning-optimization-algorithms-part-two/Hard_High_Dim.png" style="max-width:280px;" alt="Hard High Dimensional Polynomial Plot">
  <figcaption>Hard High Dimensional Polynomial Plot</figcaption>
</figure> 

We implemented a function that is highly challenging for optimizers, as seen from the plot to the left:

The Function is defined as $$x_{1}^{2}+x_{2}^{2}x_{1}\cos\left(x_{2}\right)+\ldots+x_{n}^{2}x_{1}cos(x_{n})+2n$$. In many cases, the optimizers got lost in a "bottom-less pit", or missed a local minima and yielded very poor results.

Its shape over $$\mathbb{R}^{2}$$ indicates how complicated this function is over higher dimensional domains. Alas, the hyper-parameters search proved itself and the optimizers dealt with the complexity, even in higher dimensions such as 5,6, and 12.

<figure class="align-right">
  <img src="/assets/images/2022-06-12-machine-learning-optimization-algorithms-part-two/Optimizers_vs_Hard_High_dim.png" style="max-width:280px;" alt="Optimizers result on Hard High Dimensional Polynomial Plot">
  <figcaption>Optimizers result on <br/> Hard High Dimensional Polynomial Plot</figcaption>
</figure> 

For all the initial points we checked, ADAM performed the best by a large margin and with a good number of iterations.

# Conclusion

We implemented 4 optimizers that are highly popular within the Machine Learning community, and tested them on simple and complex functions, in order to test their performances in a sterile environment, which is perhaps simpler than the usual real data-set loss-function setting, and thus to gain insights about their behaviour.

It was clear that in simple convex functions, the simpler Gradient Descent and Momentum performed best. The theoretical ability of ADAM and RMSProp to use high learning rate while avoiding oscillations did not came into effect even in a setting that was supposed to give it a clear advantage. Yet, on a really complicated function, Adam consistently performed best in terms of converging to a lower minima while keeping low iterations number. This suggests that ADAM performs best over complicated functions, which may explain why it is so successful in the Deep Learning real-practice domain. Our work also highlighted the importance of hyper-parameter tuning when using optimizers, and the importance of learning rate decay methods.

# Bibliography

[Adam Optimization Algorithm (C2W2L08)](https://www.youtube.com/watch?v=JXQT_vxqwIs)  

[How to implement an Adam Optimizer from Scratch](https://towardsdatascience.com/how-to-implement-an-adam-optimizer-from-scratch-76e7b217f1cc)  

[Introduction to optimizers](https://algorithmia.com/blog/introduction-to-optimizers)  

[An Overview of Machine Learning Optimization Techniques](https://serokell.io/blog/ml-optimization)  

[A Survey of Optimization Methods from a Machine Learning Perspective](https://arxiv.org/pdf/1906.06821.pdf)  

[Python notebook of gradient descent](https://github.com/falaktheoptimist/gradient_descent_optimizers/blob/master/Optimizers%20Linear%20Regression%20example.ipynb)  

[ADAM: A METHOD FOR STOCHASTIC OPTIMIZATION](https://arxiv.org/pdf/1412.6980.pdf)  

Barzilai, Jonathan; Borwein, Jonathan M. (1988). Two-Point Step Size Gradient Methods. IMA Journal of Numerical Analysis. 8 (1): 141. doi:10.1093/imanum/8.1.141.  

Fletcher, R. (2005). On the BarzilaiBorwein Method. In Qi, L.; Teo, K.; Yang, X. (eds.). Optimization and Control with Applications. Applied Optimization. Vol. 96. Boston: Springer. pp. 235. ISBN 0-387-24254-6.  

# Appendix

## 1-Dimensional experiments results

<details>
<summary>Expand results</summary>

$$\begin{array}{llllrr}
  &  Optimizer  &  Function  &  Initial Point  &  Iterations  &  Best value \\
  &  Gradient Descent  &  MSE Function  &  [18, 4]  &  21  &  2.620029e-07 \\
 1  &  Momentum  &  MSE Function  &  [18, 4]  &  20  &  1.403648e-08 \\
 2  &  RMSProp  &  MSE Function  &  [18, 4]  &  341  &  3.489831e-14 \\
 3  &  Adam  &  MSE Function  &  [18, 4]  &  30  &  2.987380e-12 \\
 4  &  Gradient Descent  &  Cubic  &  [18, 4]  &  45  &  1.496296e-06 \\
 5  &  Momentum  &  Cubic  &  [18, 4]  &  26  &  2.393724e-08 \\
 6  &  RMSProp  &  Cubic  &  [18, 4]  &  709  &  3.311519e-16 \\
 7  &  Adam  &  Cubic  &  [18, 4]  &  18001  &  1.168258e-11 \\
 8  &  Gradient Descent  &  HardPolynomial1D  &  [18, 4]  &  16  &  -3.246496e+00 \\
 9  &  Momentum  &  HardPolynomial1D  &  [18, 4]  &  16  &  -3.246496e+00 \\
 10  &  RMSProp  &  HardPolynomial1D  &  [18, 4]  &  127  &  1.486928e+02 \\
 11  &  Adam  &  HardPolynomial1D  &  [18, 4]  &  83  &  1.486928e+02 \\
 12  &  Gradient Descent  &  MSE Function  &  [2, 2]  &  2  &  0.000000e+00 \\
 13  &  Momentum  &  MSE Function  &  [2, 2]  &  2  &  0.000000e+00 \\
 14  &  RMSProp  &  MSE Function  &  [2, 2]  &  2  &  0.000000e+00 \\
 15  &  Adam  &  MSE Function  &  [2, 2]  &  2  &  0.000000e+00 \\
 16  &  Gradient Descent  &  Cubic  &  [2, 2]  &  36  &  1.330229e-06 \\
 17  &  Momentum  &  Cubic  &  [2, 2]  &  31  &  1.846644e-08 \\
 18  &  RMSProp  &  Cubic  &  [2, 2]  &  70  &  2.028435e-13 \\
 19  &  Adam  &  Cubic  &  [2, 2]  &  52  &  2.893457e-13 \\
 20  &  Gradient Descent  &  HardPolynomial1D  &  [2, 2]  &  9  &  -3.246496e+00 \\
 21  &  Momentum  &  HardPolynomial1D  &  [2, 2]  &  35  &  -3.246496e+00 \\
 22  &  RMSProp  &  HardPolynomial1D  &  [2, 2]  &  13  &  -3.246496e+00 \\
 23  &  Adam  &  HardPolynomial1D  &  [2, 2]  &  14  &  -3.246496e+00 \\
 24  &  Gradient Descent  &  MSE Function  &  [401, 80]  &  28  &  2.223064e-07 \\
 25  &  Momentum  &  MSE Function  &  [401, 80]  &  19  &  1.063252e-10 \\
 26  &  RMSProp  &  MSE Function  &  [401, 80]  &  2159  &  1.707649e-16 \\
 27  &  Adam  &  MSE Function  &  [401, 80]  &  21158  &  3.094246e-12 \\
 28  &  Gradient Descent  &  Cubic  &  [401, 80]  &  61  &  1.261586e-06 \\
 29  &  Momentum  &  Cubic  &  [401, 80]  &  87  &  9.115933e-09 \\
 30  &  RMSProp  &  Cubic  &  [401, 80]  &  6402  &  1.979757e-13 \\
 31  &  Adam  &  Cubic  &  [401, 80]  &  28316  &  8.635178e-14 \\
 32  &  Gradient Descent  &  HardPolynomial1D  &  [401, 80]  &  10  &  1.121905e+03 \\
 33  &  Momentum  &  HardPolynomial1D  &  [401, 80]  &  19  &  -3.111811e+00 \\
 34  &  RMSProp  &  HardPolynomial1D  &  [401, 80]  &  853  &  1.564684e+05 \\
 35  &  Adam  &  HardPolynomial1D  &  [401, 80]  &  113  &  1.564684e+05 \\
 36  &  Gradient Descent  &  MSE Function  &  [21, 30]  &  20  &  3.007686e-07 \\
 37  &  Momentum  &  MSE Function  &  [21, 30]  &  20  &  5.798074e-09 \\
 38  &  RMSProp  &  MSE Function  &  [21, 30]  &  72  &  1.879161e-13 \\
 39  &  Adam  &  MSE Function  &  [21, 30]  &  4510  &  2.225155e-13 \\
 40  &  Gradient Descent  &  Cubic  &  [21, 30]  &  45  &  1.307246e-06 \\
 41  &  Momentum  &  Cubic  &  [21, 30]  &  56  &  5.088261e-08 \\
 42  &  RMSProp  &  Cubic  &  [21, 30]  &  251  &  1.410593e-14 \\
 43  &  Adam  &  Cubic  &  [21, 30]  &  2781  &  4.496246e-12 \\
 44  &  Gradient Descent  &  HardPolynomial1D  &  [21, 30]  &  16  &  -3.246496e+00 \\
 45  &  Momentum  &  HardPolynomial1D  &  [21, 30]  &  15  &  -3.246496e+00 \\
 46  &  RMSProp  &  HardPolynomial1D  &  [21, 30]  &  1269  &  3.426327e+02 \\
 47  &  Adam  &  HardPolynomial1D  &  [21, 30]  &  127  &  3.426327e+02 \\
\end{array}$$
</details>

## High Dimensional Polynomial experiments results

<details>
<summary>Expand results</summary>

$$\begin{array}{llllrr}
  &  Optimizer  &  Function  &  Initial Point  &  Iterations  &  Best value \\
  &  Gradient Descent  &  CubicHighDim  &  [1.0, 2.0, -1.0, -1.0, -0.5]  &  181  &  9.071830e-05 \\
 1  &  Momentum  &  CubicHighDim  &  [1.0, 2.0, -1.0, -1.0, -0.5]  &  181  &  9.054223e-05 \\
 2  &  RMSProp  &  CubicHighDim  &  [1.0, 2.0, -1.0, -1.0, -0.5]  &  464  &  1.510101e-05 \\
 3  &  Adam  &  CubicHighDim  &  [1.0, 2.0, -1.0, -1.0, -0.5]  &  262  &  6.777227e-07 \\
 4  &  Gradient Descent  &  CubicHighDim  &  [2, 3, 1, -3]  &  70  &  5.431170e-05 \\
 5  &  Momentum  &  CubicHighDim  &  [2, 3, 1, -3]  &  126  &  8.545883e-06 \\
 6  &  RMSProp  &  CubicHighDim  &  [2, 3, 1, -3]  &  701  &  1.002870e-05 \\
 7  &  Adam  &  CubicHighDim  &  [2, 3, 1, -3]  &  423  &  2.020599e-07 \\
 8  &  Gradient Descent  &  CubicHighDim  &  [2, 5, 1, 3]  &  563  &  2.832441e-04 \\
 9  &  Momentum  &  CubicHighDim  &  [2, 5, 1, 3]  &  401  &  2.065021e-04 \\
 10  &  RMSProp  &  CubicHighDim  &  [2, 5, 1, 3]  &  1170  &  1.050377e-05 \\
 11  &  Adam  &  CubicHighDim  &  [2, 5, 1, 3]  &  649  &  2.780142e-08 \\
\end{array}$$
</details>

## Hard High Dimensional Polynom experiments results

<details>
<summary>Expand results</summary>

$$\begin{array}{llllrr}
  &  Optimizer  &  Function  &  Initial Point  &  Iterations  &  Best value \\
  &  Gradient Descent  &  HardHighDimPolynomial  &  [4, 2]  &  665  &  -10.148805 \\
 1  &  Momentum  &  HardHighDimPolynomial  &  [4, 2]  &  664  &  -10.148835 \\
 2  &  RMSProp  &  HardHighDimPolynomial  &  [4, 2]  &  21748  &  -10.148838 \\
 3  &  Adam  &  HardHighDimPolynomial  &  [4, 2]  &  21740  &  -10.148838 \\
 4  &  Gradient Descent  &  HardHighDimPolynomial  &  [4, 2]  &  665  &  -10.148805 \\
 5  &  Momentum  &  HardHighDimPolynomial  &  [4, 2]  &  664  &  -10.148835 \\
 6  &  RMSProp  &  HardHighDimPolynomial  &  [4, 2]  &  21748  &  -10.148838 \\
 7  &  Adam  &  HardHighDimPolynomial  &  [4, 2]  &  21740  &  -10.148838 \\
 8  &  Gradient Descent  &  HardHighDimPolynomial  &  [4, 2]  &  665  &  -10.148805 \\
 9  &  Momentum  &  HardHighDimPolynomial  &  [4, 2]  &  664  &  -10.148835 \\
 10  &  RMSProp  &  HardHighDimPolynomial  &  [4, 2]  &  21748  &  -10.148838 \\
 11  &  Adam  &  HardHighDimPolynomial  &  [4, 2]  &  21740  &  -10.148838 \\
 0  &  Gradient Descent  &  HardHighDimPolynomial  &  [1.0, 1.0, -1.0, -1.0, -0.5]  &  45  &  8.000002 \\
 1  &  Momentum  &  HardHighDimPolynomial  &  [1.0, 1.0, -1.0, -1.0, -0.5]  &  529470  &  7.799021 \\
 2  &  RMSProp  &  HardHighDimPolynomial  &  [1.0, 1.0, -1.0, -1.0, -0.5]  &  8803  &  7.915109 \\
 3  &  Adam  &  HardHighDimPolynomial  &  [1.0, 1.0, -1.0, -1.0, -0.5]  &  60  &  7.246363 \\
 4  &  Gradient Descent  &  HardHighDimPolynomial  &  [2.0, 1.0, -0.3, -0.5, 1.0, 1.0]  &  44  &  -15.735499 \\
 5  &  Momentum  &  HardHighDimPolynomial  &  [2.0, 1.0, -0.3, -0.5, 1.0, 1.0]  &  1465  &  -36.136942 \\
 6  &  RMSProp  &  HardHighDimPolynomial  &  [2.0, 1.0, -0.3, -0.5, 1.0, 1.0]  &  78  &  8.387890 \\
 7  &  Adam  &  HardHighDimPolynomial  &  [2.0, 1.0, -0.3, -0.5, 1.0, 1.0]  &  298  &  -53.330368 \\
 8  &  Gradient Descent  &  HardHighDimPolynomial  &  [1, 2, -1, 4, 1, 1, 2]  &  4  &  0.440541 \\
 9  &  Momentum  &  HardHighDimPolynomial  &  [1, 2, -1, 4, 1, 1, 2]  &  7  &  0.451408 \\
 10  &  RMSProp  &  HardHighDimPolynomial  &  [1, 2, -1, 4, 1, 1, 2]  &  21  &  0.723678 \\
 11  &  Adam  &  HardHighDimPolynomial  &  [1, 2, -1, 4, 1, 1, 2]  &  877  &  0.700001 \\
 0  &  Gradient Descent  &  HardHighDimPolynomial  &  [2.0, 1.0, -1.0, -1.0, 0.5,\\
  &   &   &  -1.0, 1.0, -1.1, 1...  &  6  &  23.832798 \\
 1  &  Momentum  &  HardHighDimPolynomial  &  [2.0, 1.0, -1.0, -1.0, 0.5,\\
  &   &   &  -1.0, 1.0, -1.1, 1...  &  10  &  22.907006 \\
 2  &  RMSProp  &  HardHighDimPolynomial  &  [2.0, 1.0, -1.0, -1.0, 0.5,\\
  &   &   &  -1.0, 1.0, -1.1, 1...  &  70  &  -33.255454 \\
 3  &  Adam  &  HardHighDimPolynomial  &  [2.0, 1.0, -1.0, -1.0, 0.5,\\
  &   &   &  -1.0, 1.0, -1.1, 1...  &  65  &  -152.651030 \\
\end{array}$$
</details>

[yn]: https://www.linkedin.com/in/yiftach-neuman-4a58a1192/