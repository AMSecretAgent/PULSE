# PULSE

I built this because I was tired of reading news and still having no idea what was actually going on.

Every app just shows you headlines. You read them, you scroll, you forget. No context, no background, no "why does this matter." I wanted something that actually respects your intelligence — so I built PULSE.

---

## The idea

PULSE is a real-time AI news app. You get a live feed of stories across 14 categories. But the actual thing is what happens when you tap a story.

It opens what I'm calling **LIT Mode** — and this is where it gets interesting. Instead of just reading the article, the AI breaks it down for you across 6 tabs:

- **Explain** — what actually happened, root cause, what's probably next
- **Predict** — 3 possible future scenarios with probability percentages
- **Debate** — same story, 3 completely different perspectives
- **Timeline** — how did we even get here, chronologically
- **Visualize** — cause and effect as a flow diagram
- **Notes** — clean bullet notes like you'd make for an exam, with a test question at the end

All of this is generated live using Groq's Llama 3.3 70B. Not pre-written. Not cached. Fresh every single time, for every story.

---

## Why this matters

News literacy is genuinely broken. People consume hundreds of headlines a week and retain almost none of it. Worse — without context, headlines are misleading by default. You don't know if something is escalating or resolving. You don't know the history. You don't know who benefits.

PULSE fixes that. It doesn't just tell you what happened — it helps you actually understand it.

---

## What else is in it

Beyond the news feed I also built:

- **Morning Brief** — one tap, the AI reads today's headlines and gives you a proper structured briefing. 5 stories, what to watch, a quote.
- **Horoscope** — AI-generated daily readings for all 12 signs
- **Recipes** — step-by-step with real photos
- **Study Hub** — evidence-based study techniques
- **Success Stories** — deep dives on people like Dhirubhai Ambani, Mary Kom, Sundar Pichai
- **Daily Puzzles** — Sudoku, vocabulary quiz, brain teasers with streak tracking

I wanted it to be something you'd actually open every day, not just when there's breaking news.

---

## Tech

- React Native + Expo
- Groq API — Llama 3.3 70B for all the AI
- NewsAPI for live news
- Everything custom, no UI libraries
- Modular folder structure — refactored from a single 2700-line file into clean screens, services, components, utils

---

## How to run it
```bash
git clone https://github.com/AMSecretAgent/PULSE.git
cd PULSE
npm install
Free keys at newsapi.org and console.groq.com
```bash
npx expo start
```

Scan the QR with Expo Go on your phone.

---
---

## Track

Submitted under **Hack 'N' Solve** at Devcation Delhi 2026.

Domain: AI / EdTech / Social Impact

---

Built by Akansha Mishra
```

Create a `.env` file in the root:
