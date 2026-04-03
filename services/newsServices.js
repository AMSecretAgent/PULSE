import { NEWS_API_KEY } from '../constants/data';
import { SPECIAL_CATEGORIES, NEWS_QUERIES } from '../constants/data';
import { generateSpecialContent } from './contentGenerators';
import { getCategoryMeta, buildStory } from '../utils/helpers';

export async function fetchLiveNews(category = 'general', page = 1) {
  const stories = [];

  if (SPECIAL_CATEGORIES.has(category)) {
    return generateSpecialContent(category);
  }

  let fetchUrl;

  if (category === 'current_affairs') {
    fetchUrl =
      `https://newsapi.org/v2/everything?` +
      `q=UPSC+OR+government+exam+OR+civil+services+OR+India+policy+OR+constitution+OR+parliament&` +
      `language=en&sortBy=publishedAt&pageSize=20&page=${page}&apiKey=${NEWS_API_KEY}`;
  } else if (category === 'hot') {
    fetchUrl =
      `https://newsapi.org/v2/top-headlines?` +
      `country=us&pageSize=20&page=${page}&apiKey=${NEWS_API_KEY}`;
  } else if (category === 'bollywood') {
    fetchUrl =
      `https://newsapi.org/v2/everything?` +
      `q=bollywood&language=en&sortBy=publishedAt` +
      `&pageSize=20&page=${page}&apiKey=${NEWS_API_KEY}`;
  } else if (category === 'general') {
    const multiResults = await Promise.allSettled(
      NEWS_QUERIES.map(async ({ q, cat, cc, gi }) => {
        const url =
          `https://newsapi.org/v2/everything?` +
          `q=${encodeURIComponent(q)}&language=en&sortBy=publishedAt` +
          `&pageSize=10&page=${page}&apiKey=${NEWS_API_KEY}`;
        const res  = await fetch(url);
        const data = await res.json();
        if (data.status !== 'ok' || !data.articles?.length) return [];
        return data.articles
          .filter(a => a.title && a.description && a.title !== '[Removed]' && a.description !== '[Removed]')
          .map(a => buildStory(a, cat, cc, gi, page));
      })
    );
    multiResults.forEach(r => { if (r.status === 'fulfilled') stories.push(...r.value); });
    stories.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    for (let i = stories.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [stories[i], stories[j]] = [stories[j], stories[i]];
    }
    return stories;
  } else {
    fetchUrl =
      `https://newsapi.org/v2/top-headlines?` +
      `category=${category}&language=en&pageSize=20` +
      `&page=${page}&apiKey=${NEWS_API_KEY}`;
  }

  try {
    const res  = await fetch(fetchUrl);
    const data = await res.json();
    if (data.status !== 'ok' || !data.articles?.length) return [];
    const { cc, gi } = getCategoryMeta(category);
    data.articles.forEach(article => {
      if (
        !article.title ||
        !article.description ||
        article.title === '[Removed]' ||
        article.description === '[Removed]'
      ) return;
      stories.push(buildStory(article, category.toUpperCase(), cc, gi, page));
    });
  } catch (err) {
    console.log(`News fetch failed for ${category}:`, err.message);
  }

  return stories;
}