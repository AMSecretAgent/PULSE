import { C, GRADS } from '../constants/colors';

export function getCategoryMeta(category) {
  const map = {
    hot:             { cc: '#ff4d6d', gi: 0 },
    business:        { cc: '#f5a623', gi: 2 },
    sports:          { cc: '#00e5b0', gi: 1 },
    science:         { cc: '#5eadf5', gi: 0 },
    technology:      { cc: '#00e5b0', gi: 1 },
    bollywood:       { cc: '#a855f7', gi: 3 },
    general:         { cc: '#5b4fe8', gi: 0 },
    current_affairs: { cc: '#5eadf5', gi: 0 },
  };
  return map[category] || { cc: '#5b4fe8', gi: 0 };
}

export function buildStory(article, cat, cc, gi, page) {
  const cleanTitle = (article.title || '').replace(/\s[-–|]\s[^-–|]+$/, '').trim();
  const srcName    = article.source?.name || 'News';
  const topSrcs    = ['reuters', 'bbc', 'bloomberg', 'guardian', 'nytimes', 'wsj', 'economist'];
  const score      = topSrcs.some(s => srcName.toLowerCase().includes(s))
    ? 91 + Math.floor(Math.random() * 8)
    : 78 + Math.floor(Math.random() * 12);
  return {
    id:          `${gi}-${encodeURIComponent(article.url)}-${page}-${Math.random()}`,
    cat,
    cc,
    score,
    gradStart:   GRADS[gi][0],
    gradEnd:     GRADS[gi][1],
    hl:          cleanTitle,
    sm:          article.description || cleanTitle,
    src:         srcName,
    tm:          getTimeAgo(article.publishedAt),
    url:         article.url,
    image:       article.urlToImage || null,
    tags:        extractTags(cleanTitle, cat),
    gi,
    publishedAt: article.publishedAt,
  };
}

export function getTimeAgo(dateStr) {
  if (!dateStr) return 'recently';
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function extractTags(title, cat) {
  const stop = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','by','as','is','are','was','were','has','have','had','be','been','that','this','from','it','its','not','no','we','us']);
  const tags = title.split(/\s+/)
    .map(w => w.replace(/[^a-zA-Z]/g, ''))
    .filter(w => w.length > 3 && !stop.has(w.toLowerCase()))
    .slice(0, 4);
  if (tags.length < 2) tags.unshift(cat);
  return [...new Set(tags)].slice(0, 4);
}

export function generateSudoku() {
  return [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9],
  ];
}

export const SUDOKU_SOLUTION = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9],
];

export const VOCAB_WORDS = [
  { word: 'Ephemeral',      def: 'Lasting for a very short time',              options: ['Lasting for a very short time','Ancient and historic','Extremely large','Deeply spiritual'],             answer: 0 },
  { word: 'Perspicacious',  def: 'Having a ready insight; shrewd',              options: ['Overly cautious','Having a ready insight; shrewd','Easily frightened','Extremely loud'],                answer: 1 },
  { word: 'Sanguine',       def: 'Optimistic, especially in a difficult situation', options: ['Deeply pessimistic','Relating to blood','Optimistic, especially in a difficult situation','Bitter and resentful'], answer: 2 },
  { word: 'Loquacious',     def: 'Tending to talk a great deal',                options: ['Extremely shy','Fond of luxury','Very quiet','Tending to talk a great deal'],                           answer: 3 },
  { word: 'Tenacious',      def: 'Not readily letting go; persistent',          options: ['Not readily letting go; persistent','Lacking courage','Easily distracted','Overly generous'],           answer: 0 },
  { word: 'Obfuscate',      def: 'To make unclear or confusing',                options: ['To clarify completely','To make unclear or confusing','To celebrate loudly','To travel swiftly'],       answer: 1 },
  { word: 'Laconic',        def: 'Using few words; brief',                      options: ['Extremely energetic','Related to lakes','Using few words; brief','Lacking any colour'],                 answer: 2 },
  { word: 'Mellifluous',    def: 'Sweet or musical; pleasant to hear',          options: ['Extremely sour','Related to honey bees','Causing great sadness','Sweet or musical; pleasant to hear'], answer: 3 },
  { word: 'Perfidious',     def: 'Deceitful and untrustworthy',                 options: ['Deceitful and untrustworthy','Extremely perfect','Easily forgiven','Lacking any smell'],                answer: 0 },
  { word: 'Equanimity',     def: 'Mental calmness under pressure',              options: ['Extreme agitation','Equal distribution of money','Mental calmness under pressure','A type of exercise'], answer: 2 },
];

export const RIDDLES = [
  { q: 'I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?', a: 'An Echo' },
  { q: 'The more you take, the more you leave behind. What am I?', a: 'Footsteps' },
  { q: 'I have cities but no houses live there. I have mountains but no trees grow. I have water but no fish swim. I have roads but no cars drive. What am I?', a: 'A Map' },
  { q: 'What can run but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?', a: 'A River' },
  { q: 'I am always in front of you but can never be seen. What am I?', a: 'The Future' },
];