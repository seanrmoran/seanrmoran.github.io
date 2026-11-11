---
layout: page
title: Roci Privacy Policy
permalink: /roci/privacy/
---

*Effective date: November 10, 2026*

## Overview

Roci is a personal planning tool built by Sean R. Moran for his own use. It runs entirely on the user's own computer. There is no Roci server, account, or cloud database.

## What Roci accesses

With your permission, Roci uses the Google Calendar API to:

- **Read** your calendars and events, so it knows when you are busy.
- **Create, update, and delete events that Roci itself created** (tagged as Roci blocks). Roci never edits or deletes events it did not create.

## Where your data is stored

- Calendar data and Roci's own project data are stored in a local database on your computer.
- Your Google sign-in token is stored in your computer's system keychain.
- Nothing is sent to a Roci server, because there isn't one.

## AI processing

To help plan, Roci may send the text of your projects and tasks, and the titles and times of relevant calendar events, to Anthropic's Claude through the Claude Code tool installed on your computer. That processing is governed by Anthropic's terms and privacy policy. Google user data is not used to train AI models by Roci.

## Sharing

Roci does not sell, rent, or share your data, does not show ads, and does not use your data for any purpose other than planning your own schedule.

Roci's use of information received from Google APIs adheres to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.

## Deleting your data

- Run `pnpm roci signout` to remove the stored Google token.
- Revoke Roci's access anytime at [myaccount.google.com/permissions](https://myaccount.google.com/permissions).
- Delete the local data folder (`~/.roci`) to remove everything else.

## Contact

Questions: [sean.r.moran@gmail.com](mailto:sean.r.moran@gmail.com)
