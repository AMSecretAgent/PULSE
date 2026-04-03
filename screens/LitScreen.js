import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  ActivityIndicator, StatusBar, SafeAreaView,
} from 'react-native';
import PulseDot from '../components/ PulseDot';
import ExplainTab   from '../components/tabs/ExplainTab';
import PredictTab   from '../components/tabs/PredictTab';
import DebateTab    from '../components/tabs/DebateTab';
import TimelineTab  from '../components/tabs/TimelineTab';
import VisualizeTab from '../components/tabs/VisualizeTab';
import NotesTab     from '../components/tabs/NotesTab';
import { callAI, PROMPTS } from '../services/aiService';
import { C } from '../constants/colors';
import { LIT_TABS } from '../constants/data';
import { styles } from '../styles/index';

const LitScreen = React.memo(({ story, bookmarks, onBookmark, aiCache, setAiCache }) => {
  const [activeTab, setActiveTab] = useState('explain');
  const saved       = bookmarks.has(story.id);
  const storyCache  = aiCache[story.id] || {};
  const [tabStatus, setTabStatus] = useState(() => {
    const status = {};
    LIT_TABS.forEach(tab => { status[tab.id] = storyCache[tab.id] ? 'done' : null; });
    return status;
  });

  const loadTab = useCallback(async (tab) => {
    if (storyCache[tab] || tabStatus[tab] === 'loading') return;
    setTabStatus(s => ({ ...s, [tab]: 'loading' }));
    try {
      const r = await callAI(PROMPTS[tab](story));
      setAiCache(cache => ({ ...cache, [story.id]: { ...(cache[story.id] || {}), [tab]: r } }));
      setTabStatus(s => ({ ...s, [tab]: 'done' }));
    } catch {
      setTabStatus(s => ({ ...s, [tab]: 'error' }));
    }
  }, [story, storyCache, tabStatus, setAiCache]);

  useEffect(() => {
    if (!storyCache.explain)   loadTab('explain');
    setTimeout(() => { if (!storyCache.timeline) loadTab('timeline'); }, 500);
  }, []);

  const renderContent = () => {
    if (tabStatus[activeTab] === 'error') return (
      <View style={styles.errorBlock}>
        <Text style={styles.errorText}>Analysis failed — check Groq key or internet.</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => {
          setTabStatus(s => ({ ...s, [activeTab]: null }));
          setAiCache(cache => {
            const newCache = { ...cache };
            if (newCache[story.id]) delete newCache[story.id][activeTab];
            return newCache;
          });
          loadTab(activeTab);
        }}>
          <Text style={styles.retryText}>Retry ↻</Text>
        </TouchableOpacity>
      </View>
    );
    const props = { data: storyCache[activeTab] };
    switch (activeTab) {
      case 'explain':   return <ExplainTab   {...props} />;
      case 'predict':   return <PredictTab   {...props} />;
      case 'debate':    return <DebateTab    {...props} />;
      case 'timeline':  return <TimelineTab  {...props} />;
      case 'visualize': return <VisualizeTab {...props} />;
      case 'notes':     return <NotesTab     {...props} />;
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <View style={styles.litHeader}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.litCat, { color: story.cc }]}>{story.cat}  ·  LIT MODE</Text>
          <Text style={styles.litHeadline} numberOfLines={2}>{story.hl}</Text>
        </View>
        <TouchableOpacity onPress={() => onBookmark(story.id)} style={styles.bmIconBtn}>
          <Text style={[styles.bmIcon, saved && { color: C.indigo }]}>{saved ? '★' : '☆'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sourceStrip}>
        <PulseDot color={C.cyan} size={6} />
        <Text style={styles.sourceText}>
          {story.src}  ·  {story.tm}  ·  Live  ·  {story.score}% confidence
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabBar}
        contentContainerStyle={{ paddingHorizontal: 14, paddingVertical: 10, gap: 8 }}
      >
        {LIT_TABS.map(t => {
          const active    = activeTab === t.id;
          const isLoading = tabStatus[t.id] === 'loading';
          const hasData   = !!storyCache[t.id];
          return (
            <TouchableOpacity key={t.id}
              onPress={() => { setActiveTab(t.id); if (!storyCache[t.id] && !isLoading) loadTab(t.id); }}
              activeOpacity={0.8}
              style={[styles.tabBtn, active && { backgroundColor: t.color + '22', borderColor: t.color + '60' }]}
            >
              <Text style={[styles.tabBtnText, { color: active ? t.color : C.muted }]}>{t.label}</Text>
              {isLoading && <ActivityIndicator size="small" color={t.color} style={{ marginLeft: 5 }} />}
              {hasData && !isLoading && <Text style={[{ fontSize: 10, marginLeft: 4 }, { color: t.color }]}>●</Text>}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.divider} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        {renderContent()}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
});

export default LitScreen;