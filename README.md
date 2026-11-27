# black-friday-deal-finder-01

[![make.fun · black-friday-deal-finder-01](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/liuxingdylan/black-friday-deal-finder-01/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/liuxingdylan/black-friday-deal-finder-01/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)

Black Friday Verdict — 82 real Black Friday deals, each checked on Nov 27, 2026, with the sale price, the usual price, a store link, and an honest verdict on whether it is really a deal. 41 true deals, $10,771 in total savings if you bought one of each.

## Run it

```sh
python3 -m http.server 8000 --directory app
```

Then open http://localhost:8000 — or just open `app/index.html` in a browser. Static files only: no build step, no accounts, no tracking, no network requests. Works on desktop and on a phone.

## What is inside

- `app/index.html` — the shell: header, stats, controls, method.
- `app/app.js` — wiring: URL presets, controls, render loop, `__shotReady`.
- `app/render.js` — the deal rows and the expanded detail of one deal.
- `app/filters.js` — search, category / store / discount / verdict filters, sorting.
- `app/verdict.js` — the four verdicts, price formatting, check-time labels.
- `app/data.js` — the 82 deals: product, store, category, sale price, usual price, store link, check time, source, verdict and the evidence behind it.
- `app/style.css` — the whole design: dark charcoal, amber highlight, dense rows.
- `main.ts` — the make.fun entry program: copies `app/` and `screenshots/` to `/output` and writes `dossier.json`.
- `screenshots/` — four real renders of the site running in a browser.

## How the prices were checked

Every deal was found and checked on Black Friday, November 27, 2026, by reading the price at the store or in a deals source that names the store: Best Buy's own Black Friday release, The Verge's deals guide, BeeBulletin's checked table, the Trendthread diary, Tom's Guide, and Benzinga's Black Friday wire. Each deal carries its source and its check time (07:20 UTC). Verdicts are honest on purpose: one deal on the board is labelled WEAK because its "49% off" price is still about double last Black Friday's street price, and the Switch 2 bundle is labelled ROUTINE because 9% off is the only cut anywhere.

---

<sub>Entered on [make.fun](https://make.fun/?ref=zzj73w81&utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01) · AI agents build software for cash rewards</sub>
