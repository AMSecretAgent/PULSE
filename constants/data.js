import { Dimensions } from 'react-native';
import { C } from './colors';

export const NEWS_API_KEY = Constants.expoConfig.extra.NEWS_API_KEY;
export const GROQ_API_KEY = Constants.expoConfig.extra.GROQ_API_KEY;

export const { width: W, height: H } = Dimensions.get('window');

export const NEWS_QUERIES = [
  { q: 'geopolitics OR war OR conflict OR UN OR NATO',               cat: 'GEOPOLITICS', cc: '#5eadf5', gi: 0 },
  { q: 'artificial intelligence OR AI OR tech OR OpenAI OR Google',  cat: 'TECH & AI',   cc: '#00e5b0', gi: 1 },
  { q: 'economy OR inflation OR Federal Reserve OR stock market',     cat: 'ECONOMY',     cc: '#f5a623', gi: 2 },
  { q: 'India OR Modi OR BJP OR Indian economy',                      cat: 'INDIA',       cc: '#a855f7', gi: 3 },
  { q: 'climate change OR environment OR carbon OR renewable energy', cat: 'CLIMATE',     cc: '#ff4d6d', gi: 4 },
];

export const AGENTS = [
  { id: 'collector',  label: 'Collector Agent',  sub: 'NewsAPI · Reuters · BBC · Bloomberg', color: C.cyan,    wave: 0 },
  { id: 'factcheck',  label: 'Fact-Check Agent', sub: 'Cross-source verification',           color: '#5eadf5', wave: 0 },
  { id: 'entity',     label: 'Entity Agent',     sub: 'People · Orgs · Locations',           color: C.gold,    wave: 1 },
  { id: 'summariser', label: 'Summariser Agent', sub: 'Groq Llama 3.3 · fast brief',         color: C.violet,  wave: 1 },
  { id: 'timeline',   label: 'Timeline Agent',   sub: 'RAG → chronological history',          color: C.indigo,  wave: 2 },
  { id: 'predictor',  label: 'Predictor Agent',  sub: '3 future scenario models',             color: C.cyan,    wave: 2 },
  { id: 'debater',    label: 'Debate Agent',     sub: 'Multi-perspective synthesis',           color: C.rose,    wave: 3 },
];

export const FEED_CATEGORIES = [
  { id: 'general',           label: 'General'           },
  { id: 'hot',               label: 'Hot'               },
  { id: 'current_affairs',   label: 'Current Affairs'   },
  { id: 'business',          label: 'Business'          },
  { id: 'sports',            label: 'Sports'            },
  { id: 'science',           label: 'Science'           },
  { id: 'technology',        label: 'Tech'              },
  { id: 'bollywood',         label: 'Bollywood'         },
  { id: 'horoscope',         label: 'Horoscope'         },
  { id: 'study',             label: 'Study'             },
  { id: 'recipes',           label: 'Recipes'           },
  { id: 'healthy_lifestyle', label: 'Healthy Lifestyle' },
  { id: 'success_stories',   label: 'Success Stories'   },
  { id: 'puzzles',           label: 'Puzzles'           },
];

export const SPECIAL_CATEGORIES = new Set([
  'horoscope', 'study', 'recipes', 'healthy_lifestyle', 'success_stories', 'puzzles',
]);

export const LIT_TABS = [
  { id: 'explain',   label: 'Explain',   color: C.indigo  },
  { id: 'predict',   label: 'Predict',   color: C.cyan    },
  { id: 'debate',    label: 'Debate',    color: C.gold    },
  { id: 'timeline',  label: 'Timeline',  color: '#5eadf5' },
  { id: 'visualize', label: 'Visualize', color: C.violet  },
  { id: 'notes',     label: 'Notes',     color: C.violet  },
];