# PULSE

Okay so the idea was simple I was tired of reading news and still not getting what's actually going on.

Every app just throws headlines at you. No context, no background, nothing. So I built PULSE.

---

## What it does

You open it, you get a live news feed. Standard stuff. But then you tap any story and it opens what I'm calling **LIT Mode** — and that's where it gets interesting.

It breaks the story down into 6 tabs:

- **Explain** — what actually happened, root cause, what's probably next
- **Predict** — 3 possible future scenarios with probability percentages
- **Debate** — same story, 3 completely different perspectives
- **Timeline** — how did we even get here
- **Visualize** — cause and effect as a flow diagram
- **Notes** — clean bullet notes like you'd make for an exam, plus a test question at the end

All of this is generated live using Groq's Llama 3.3 70B. Not pre-written, not cached; fresh every time for every story.

There's also a **Morning Brief**; one tap and it reads today's headlines and gives you a proper structured briefing.

And then I added some fun stuff like Horoscope, Recipes, Study tips, Success Stories, daily Sudoku, Vocab quiz, Brain teasers. Wanted it to be something you'd actually open every day, not just when there's breaking news.

---

## Built with

- React Native + Expo
- Groq API — Llama 3.3 70B
- NewsAPI
- No UI libraries, everything is custom

---


Make a `.env` file:
