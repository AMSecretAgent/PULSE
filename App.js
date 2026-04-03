import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BackHandler } from 'react-native';

import LiteScreen          from './screens/LiteScreen';
import LitScreen           from './screens/LitScreen';
import MorningBriefScreen  from './screens/MorningBriefScreen';
import BookmarksScreen     from './screens/BookmarksScreen';
import HoroscopeDetailScreen from './screens/HoroscopeDetailScreen';
import RecipeDetailScreen  from './screens/RecipeDetailScreen';
import StudyDetailScreen   from './screens/StudyDetailScreen';
import HealthDetailScreen  from './screens/HealthDetailScreen';
import SuccessDetailScreen from './screens/SuccessDetailScreen';
import PuzzleDetailScreen  from './screens/PuzzleDetailScreen';
import LoadingScreen       from './screens/LoadingScreen';
import ErrorScreen         from './screens/ErrorScreen';

import { fetchLiveNews }    from './services/newsService';
import { SPECIAL_CATEGORIES } from './constants/data';

export default function App() {
  const [categoryCache, setCategoryCache]   = useState({});
  const [categoryPages, setCategoryPages]   = useState({});
  const [stories, setStories]               = useState([]);
  const [newsState, setNewsState]           = useState('loading');
  const [refreshing, setRefreshing]         = useState(false);
  const [loadingMore, setLoadingMore]       = useState(false);
  const [activeCategory, setActiveCategory] = useState('general');
  const [screen, setScreen]                 = useState('lite');
  const [selected, setSelected]             = useState(null);
  const [bookmarks, setBookmarks]           = useState(new Set());
  const [aiCache, setAiCache]               = useState({});
  const [puzzleStreak, setPuzzleStreak]     = useState(0);

  const activeCategoryRef = useRef('general');
  activeCategoryRef.current = activeCategory;

  // ── Load news ──────────────────────────────────────────────────
  const loadNews = useCallback(async (isRefresh = false, category) => {
    const cat = category ?? activeCategoryRef.current;
    if (!isRefresh && categoryCache[cat]?.length > 0) {
      setStories(categoryCache[cat]);
      setNewsState('ready');
      return;
    }
    if (isRefresh) setRefreshing(true);
    else setNewsState('loading');
    try {
      const data = await fetchLiveNews(cat, 1);
      if (!data.length) throw new Error('No articles found');
      setCategoryCache(cache => ({ ...cache, [cat]: data }));
      setCategoryPages(pages => ({ ...pages, [cat]: 1 }));
      setStories(data);
      setNewsState('ready');
    } catch (err) {
      console.error('loadNews error:', err.message);
      setNewsState('error');
    } finally {
      setRefreshing(false);
    }
  }, [categoryCache]);

  const loadMoreNews = useCallback(async () => {
    if (loadingMore || newsState !== 'ready') return;
    if (SPECIAL_CATEGORIES.has(activeCategoryRef.current)) return;
    setLoadingMore(true);
    const cat = activeCategoryRef.current;
    const currentPage = categoryPages[cat] || 1;
    try {
      const nextPage = currentPage + 1;
      const data = await fetchLiveNews(cat, nextPage);
      if (data.length) {
        const newStories = [...(categoryCache[cat] || []), ...data];
        setCategoryCache(cache => ({ ...cache, [cat]: newStories }));
        setCategoryPages(pages => ({ ...pages, [cat]: nextPage }));
        setStories(newStories);
      }
    } catch (err) {
      console.error('loadMore error:', err.message);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, newsState, categoryCache, categoryPages]);

  const handleCategoryChange = useCallback((category) => {
    if (category === activeCategoryRef.current) return;
    setActiveCategory(category);
    activeCategoryRef.current = category;
    if (categoryCache[category]?.length > 0) {
      setStories(categoryCache[category]);
      setNewsState('ready');
      return;
    }
    setStories([]);
    setNewsState('loading');
    fetchLiveNews(category, 1).then(data => {
      setCategoryCache(cache => ({ ...cache, [category]: data }));
      setCategoryPages(pages => ({ ...pages, [category]: 1 }));
      setStories(data.length ? data : []);
      setNewsState(data.length ? 'ready' : 'error');
    }).catch(() => setNewsState('error'));
  }, [categoryCache]);

  useEffect(() => { loadNews(); }, []);

  // ── Hardware back button ───────────────────────────────────────
  useEffect(() => {
    const backAction = () => {
      if (screen !== 'lite') { setScreen('lite'); return true; }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [screen]);

  // ── Bookmark toggle ────────────────────────────────────────────
  const toggleBm = useCallback((id) => {
    setBookmarks(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);

  // ── Navigate to detail ─────────────────────────────────────────
  const handleGoDeep = useCallback((s) => {
    setSelected(s);
    const type = s.type;
    if      (type === 'horoscope')        setScreen('horoscope_detail');
    else if (type === 'recipe')           setScreen('recipe_detail');
    else if (type === 'study')            setScreen('study_detail');
    else if (type === 'healthy_lifestyle') setScreen('health_detail');
    else if (type === 'success_stories')  setScreen('success_detail');
    else if (type === 'puzzle')           setScreen('puzzle_detail');
    else                                  setScreen('lit');
  }, []);

  const handleStreakUpdate = useCallback(() => setPuzzleStreak(s => s + 1), []);
  const goBack = useCallback(() => setScreen('lite'), []);

  // ── Render ─────────────────────────────────────────────────────
  if (newsState === 'loading') return <LoadingScreen />;
  if (newsState === 'error')   return <ErrorScreen onRetry={() => loadNews()} />;

  return (
    <>
      {screen === 'lite' && (
        <LiteScreen
          stories={stories}
          bookmarks={bookmarks}
          onBookmark={toggleBm}
          onGoDeep={handleGoDeep}
          onShowBookmarks={() => setScreen('bookmarks')}
          onShowMorningBrief={() => setScreen('morning')}
          onRefresh={() => loadNews(true)}
          refreshing={refreshing}
          onLoadMore={loadMoreNews}
          loadingMore={loadingMore}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      )}
      {screen === 'morning' && <MorningBriefScreen />}
      {screen === 'bookmarks' && (
        <BookmarksScreen stories={stories} bookmarks={bookmarks} onGoDeep={handleGoDeep} />
      )}
      {screen === 'lit' && selected && (
        <LitScreen
          story={selected}
          bookmarks={bookmarks}
          onBookmark={toggleBm}
          aiCache={aiCache}
          setAiCache={setAiCache}
        />
      )}
      {screen === 'horoscope_detail' && selected && <HoroscopeDetailScreen item={selected} />}
      {screen === 'recipe_detail'    && selected && <RecipeDetailScreen    item={selected} />}
      {screen === 'study_detail'     && selected && <StudyDetailScreen     item={selected} />}
      {screen === 'health_detail'    && selected && <HealthDetailScreen    item={selected} />}
      {screen === 'success_detail'   && selected && <SuccessDetailScreen   item={selected} />}
      {screen === 'puzzle_detail'    && selected && (
        <PuzzleDetailScreen streak={puzzleStreak} onStreakUpdate={handleStreakUpdate} />
      )}
    </>
  );
}
