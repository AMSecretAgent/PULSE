import { GROQ_API_KEY } from '../constants/data';

export async function callAI(prompt) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 900,
      temperature: 0.7,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!response.ok) throw new Error(`Groq error: ${response.status}`);
  const data    = await response.json();
  const raw     = data.choices?.[0]?.message?.content || '{}';
  const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}

export const PROMPTS = {
  explain: (s) => `You are a senior intelligence analyst. Analyse this REAL current news story for a Gen Z audience.

Headline: "${s.hl}"
Description: "${s.sm}"
Source: ${s.src}

Return ONLY a valid JSON object, no extra text:
{"what":"2 clear sentences on exactly what happened","why":"2 sentences on root causes and background","next":"2 sentences on most likely near-term developments","importance":"1 powerful sentence on why this matters globally"}`,

  predict: (s) => `You are a geopolitical forecaster. Generate 3 distinct future scenarios for this REAL news event.

Headline: "${s.hl}"

Probabilities MUST sum to exactly 100. Return ONLY valid JSON, no extra text:
{"scenarios":[{"label":"scenario name under 5 words","prob":45,"type":"positive","desc":"2 sentences"},{"label":"name","prob":35,"type":"neutral","desc":"2 sentences"},{"label":"name","prob":20,"type":"negative","desc":"2 sentences"}]}`,

  debate: (s) => `You are a debate moderator. Present 3 real-world perspectives on this current news event plus a neutral synthesis.

Headline: "${s.hl}"

Return ONLY valid JSON, no extra text:
{"sides":[{"name":"perspective label","stance":"supportive","arg":"2 sentences"},{"name":"second perspective","stance":"critical","arg":"2 sentences"},{"name":"third perspective","stance":"concerned","arg":"2 sentences"}],"neutral":"2 sentences of balanced synthesis"}`,

  timeline: (s) => `You are a historical analyst. Create a chronological timeline of key events related to this news story.

Headline: "${s.hl}"
Context: "${s.sm}"

Produce 5–7 events in order from oldest to newest. Return ONLY valid JSON, no extra text:
{"title":"timeline title under 8 words","events":[{"period":"year or short timeframe","label":"short event title under 7 words","desc":"1–2 sentences","type":"background|escalation|turning_point|current"}]}`,

  visualize: (s) => `You are a visual analyst. Break this news story into a simple cause-and-effect flow.

Headline: "${s.hl}"
Context: "${s.sm}"

Produce 4–6 nodes. Return ONLY valid JSON, no extra text:
{"title":"diagram title under 6 words","nodes":[{"id":1,"label":"short label under 5 words","desc":"1 sentence elaboration","type":"cause|event|turning_point|effect|impact"}]}`,

  notes: (s) => `Create concise study notes for this REAL current news story.

Headline: "${s.hl}"
Context: "${s.sm}"

Return ONLY valid JSON, no extra text:
{"tldr":"1 sentence TL;DR","facts":["fact 1","fact 2","fact 3","fact 4"],"watch":["watch 1","watch 2","watch 3"],"q":"one challenging exam-style question"}`,
};

export async function fetchHoroscopeDetail(sign) {
  const prompt = `You are a professional astrologer. Generate today's detailed horoscope for ${sign}.

Return ONLY valid JSON, no extra text:
{
  "overall": "2 sentences of today's overall energy and theme for ${sign}",
  "love": "2 sentences about love and relationships today",
  "career": "2 sentences about career, work and finances today",
  "health": "2 sentences about health, energy and wellness today",
  "luckyNumber": "a single lucky number between 1 and 99",
  "luckyColor": "one lucky colour",
  "rating": "a number between 6 and 10 representing today's overall star rating",
  "advice": "one powerful sentence of daily advice"
}`;
  return callAI(prompt);
}