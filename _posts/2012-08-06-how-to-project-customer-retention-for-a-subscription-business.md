---
layout: post
title: "How to Project Customer Retention for a Subscription Business"
date: 2012-08-06
category: Venture Capital
---

*My original post [here on Lightspeed's blog](https://lsvp.wordpress.com/2012/08/06/how-to-project-customer-retention-for-a-subscription-business/).*

We've posted before about how to estimate lifetime value ("LTV") [for an ecommerce business](http://lsvp.wordpress.com/2012/06/15/how-to-estimate-lifetime-value-for-an-ecommerce-business-sample-cohort-analysis/) and [for a subscription business](http://lsvp.wordpress.com/2010/07/19/how-to-estimate-lifetime-value/), and have provided a sample cohort analysis for each ([ecommerce](https://docs.google.com/spreadsheet/ccc?key=0AnVV-5PRmDIKdFVIeXBodmdOOVhrWmszbWF1T0oyRFE#gid=0) and [subscription](https://docs.google.com/spreadsheet/ccc?key=0AnVV-5PRmDIKdHcwQWlvd3F3MDFodXNvamcxZjZ3VlE&hl=en#gid=0)). This is one of the most important factors in understanding unit economics.

Recently, [Eric Liaw](http://www.ivp.com/team/investment-professionals/eric-liaw) sent us a very interesting [May 2006 paper](http://www.brucehardie.com/papers/021/sbg_2006-05-30.pdf) entitled "How to Project Customer Retention", authored by marketing professors [Peter Fader](https://marketing.wharton.upenn.edu/profile/193/) (Wharton) and [Bruce Hardie](https://www.london.edu/facultyandresearch/faculty/search.do?uid=bhardie) (London Business School) and [published](https://marketing.wharton.upenn.edu/files/?whdmsaction=public:main.file&fileID=327) in the Journal of Interactive Marketing in 2007. In it, the professors explain how previous attempts to project retention rates using line-fitting regression models failed, even after introducing quadratic or exponential functions. Since we had advocated essentially using an exponential line fit for subscription LTV estimation, we figured it was worth reading. The authors show that exponential form fitting is too conservative and underestimates actual retention rates.

Professors Fader and Hardie decide to start from scratch with a simple assumption: what if each customer has a fixed probability of renewing his or her contract at the end of each period? So if I'm a big movie fan, let's say I'm 80% likely to renew Netflix each month, but you're caught up on Breaking Bad and only 30% likely to renew each month going forward. Probability varies by customer, but each customer's rate remains constant over time.

It turns out that, based on probability theory, this simple assumption implies that the distribution of renewal rates can be characterized by a statistical model. Over time, the difference in each individual's probability to renew suggests that individuals with lower renewal probabilities will generally drop out before those with higher probabilities. Incidentally, this also explains why incremental retention may appear to improve over time, when it's actually a likely side effect of the remaining customer mix.

After some mathematical gymnastics, the authors unveil the model they've derived: the shifted-beta-geometric distribution. The authors tested the model by using the first seven years of data from a given sample to project renewal rates at the end of the final five years in the sample. The model proved to be quite accurate, within 3% of actuals, and much better than linear or exponential form fitting.

A few quick caveats: this model is appropriate only when the data reflects a discrete renewal period, such as a defined monthly or annual cycle. Also, the model should be reserved for projecting behavior in contractual settings, such as subscription renewals and other observable customer exit points, rather than ecommerce or other businesses where the customer can remain dormant for long periods between orders.

**We've uploaded a spreadsheet [here](https://drive.google.com/file/d/0B_zDUMncVtZTYTJtc2NPRF9CZ2M/view?usp=sharing), along with directions for how to use it yourself.**

Hope this is helpful. We look forward to hearing from you regardless, but especially if:

1. You use the model and have any feedback on results
2. Your company uses any other methods to capture, analyze, and project customer retention
3. Your innovative company achieves valuable unit economics. As previously mentioned, we like to see LTV / Customer Acquisition Cost > 2.5 and payback periods under 12 months.

If you found this post useful, follow us [@lightspeedvp](https://twitter.com/lightspeedvp) on Twitter.
