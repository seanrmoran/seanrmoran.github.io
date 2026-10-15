---
layout: post
title: "Building an NBA Playoff Predictor"
date: 2026-06-12
category: Projects
---

I built an [NBA Playoff Predictor](/nbaplayoffpredictor/) this spring. I wanted a way to explore how the rest of the season might play out: who makes the playoffs, which matchups matter, and how much one win or one injured player can change the picture. It turned into a fun combination of basketball research, statistics, and building something you can actually play with.

The site lets you follow all 30 teams, explore possible playoff brackets, compare matchups, and see the reasoning behind individual game predictions. You can also flip upcoming game results to estimate how they would change the standings. That last feature is a quick estimate; the full simulation runs separately each night.

A few numbers behind it:

- **10,000 simulated seasons per update.** Each run plays out the remaining schedule, breaks ties, and works through the play-in tournament and playoff bracket. The result is a range of possible outcomes for each team.
- **26 inputs for game predictions.** The model combines team strength and recent performance with injuries, rest, travel, matchup statistics, and betting-market probabilities. Even time zones and Denver's altitude get a say.
- **11,504 games across 10 seasons in the historical backtest.** The project's recorded results were about **69% accuracy**. That's historical testing, of course; predicting the next game is the harder part.
- **149 historical playoff series used to calibrate uncertainty.** A model can be reasonably good at individual games and still become much too confident when it strings together four rounds of playoff predictions.

I started with a weighted model that was easy to inspect, then moved to XGBoost, which learns relationships among the inputs from historical games. I built a separate playoff model to account for things like home court, seeding, defensive strength, and playoff experience. How much should a veteran roster matter? Should a hot final few weeks outweigh the full season? Those questions sent me back through years of NBA results.

One useful lesson was that uncertainty needs to carry through the whole bracket. I added variation in team strength between simulations, so a team could be better or worse than its season averages suggested throughout a playoff run. That helped keep the championship odds from piling up too heavily on one favorite.

The plumbing is fairly simple: Python collects NBA statistics and ESPN injury reports, runs the models, and writes the results to JSON. A nightly job on my computer publishes those files to GitHub Pages. The frontend is plain HTML, CSS, and JavaScript, with charts when you want to dig into a team. All the expensive calculations happen ahead of time, so exploring the site is fast.

I like projects where building the tool gives me a reason to learn more about the subject. This one certainly did. [Try it here](/nbaplayoffpredictor/).

**Edit, October 15, 2026:** What an amazing Knicks playoff run. [They went 16–3 with a record +14.9 points per game scoring margin](https://www.nba.com/news/5-stats-that-define-new-york-knicks-championship-run). My [April 15 snapshot](https://github.com/seanrmoran/seanrmoran.github.io/blob/0fa906a935726d77a9dc05862413126372d23ad2/nbaplayoffpredictor/data/main.json) gave them just a **7.1% chance of winning the title**. My model got it wrong, and [it had plenty of company](https://theanalyst.com/articles/nba-playoffs-predictions-chances-for-preventing-okc-thunder-repeat). A low probability isn't an impossibility, but watching them do it was a pretty great reminder of how much these models can miss. More to learn!
