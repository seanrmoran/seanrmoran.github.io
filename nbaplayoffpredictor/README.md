# NBA Playoff Predictor

Interactive NBA playoff projections powered by Monte Carlo simulation and machine learning.

**Live:** https://www.seanrmoran.com/nbaplayoffpredictor/

## What this is

A single-page application that shows projected NBA playoff seedings, bracket simulations, game predictions, and what-if analysis. Data updates nightly at ~10:30 PM PT during the NBA season.

## How predictions work

An 8-factor model evaluates every remaining game (net rating, home court, fatigue, injuries, tanking, recent form). The season is simulated 10,000 times with official NBA tiebreaker rules to produce probability distributions for each team's final seed.

Backtested on 11,504 games across 10 seasons: 69.0% accuracy, 0.199 Brier score.

## Site features

- **Playoffs tab** -- projected matchups for both conferences with season series
- **Bracket tab** -- step-through playoff bracket simulation with animations
- **Games tab** -- daily schedule with predictions, upset tracking, and season accuracy
- **Standings tab** -- current and projected standings with playoff/play-in probabilities
- **Team detail** -- seed distributions, win projections, schedule with what-if analysis
- **Matchup preview** -- head-to-head stats and position-by-position starter comparison
- **Team search** -- find any team instantly from the nav bar

## Files

```
index.html              Entire site (HTML + CSS + JS, single file)
data/
  main.json             Standings, matchups, bracket simulation
  games.json            Schedule with predictions and significance rankings
  teams.json            Team list for dropdowns
  teams/{ABR}.json      Per-team detail (30 files)
  meta.json             Timestamps and model metadata
  accuracy.json         Season accuracy stats and calibration data
  live.json             Live scores (updated during games)
```

## Technical notes

- Vanilla HTML/CSS/JS, no framework, no build step
- Plotly.js lazy-loaded for charts (only when viewing team detail)
- Hash-based routing for deep links (`#team/BOS`, `#matchup/BOS/LAL`)
- Live score polling every 30 seconds on the Games tab
- Dark mode only, responsive down to 375px

Built by [Sean Moran](https://www.seanrmoran.com). Not affiliated with the NBA.
