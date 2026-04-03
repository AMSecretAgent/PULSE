import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  ActivityIndicator, StatusBar, SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { InfoBlock, FieldLabel, Body } from '../components/atoms';
import { callAI } from '../services/aiService';
import { NEWS_API_KEY } from '../constants/data';
import { C } from '../constants/colors';
import { styles } from '../styles/index';
import { mbStyles } from '../styles/mbStyles';

const MorningBriefScreen = React.memo(() => {
  const [state, setState] = useState('loading');
  const [brief, setBrief] = useState(null);

  const loadBrief = useCallback(async () => {
    setState('loading');
    try {
      const url  = `https://newsapi.org/v2/top-headlines?language=en&pageSize=10&apiKey=${NEWS_API_KEY}`;
      const res  = await fetch(url);
      const data = await res.json();
      if (data.status !== 'ok') throw new Error('Headlines fetch failed');
      const headlines = data.articles
        .filter(a => a.title && a.title !== '[Removed]')
        .slice(0, 10)
        .map(a => `• ${a.title} (${a.source?.name || ''})`)
        .join('\n');
      const result = await callAI(
        `You are a world-class morning news briefing editor for a Gen Z global audience.
Based on these top headlines from today, create a concise, engaging morning brief.

Headlines:
${headlines}

Return ONLY valid JSON, no extra text or markdown:
{
  "greeting": "short punchy welcome line (no date, under 12 words)",
  "tldr": "2-3 sentence overview of the single most important story today",
  "stories": [
    {"title": "story title under 10 words", "summary": "2 clear sentences", "category": "TECH/GEOPOLITICS/ECONOMY/CLIMATE/etc", "importance": "1 sentence on global impact"},
    {"title": "...", "summary": "...", "category": "...", "importance": "..."},
    {"title": "...", "summary": "...", "category": "...", "importance": "..."},
    {"title": "...", "summary": "...", "category": "...", "importance": "..."},
    {"title": "...", "summary": "...", "category": "...", "importance": "..."}
  ],
  "watchToday": ["thing to watch 1", "thing to watch 2", "thing to watch 3"],
  "quote": "a short thought-provoking quote relevant to today's biggest story"
}`
      );
      setBrief(result);
      setState('ready');
    } catch (err) {
      console.error('Morning brief error:', err);
      setState('error');
    }
  }, []);

  useEffect(() => { loadBrief(); }, []);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const catColor = useCallback((cat = '') => {
    const c = cat.toUpperCase();
    if (c.includes('GEO') || c.includes('WAR') || c.includes('POLIT')) return '#5eadf5';
    if (c.includes('TECH') || c.includes('AI'))   return C.cyan;
    if (c.includes('ECON') || c.includes('MARK')) return C.gold;
    if (c.includes('INDIA'))  return C.violet;
    if (c.includes('CLIM') || c.includes('ENV'))  return C.rose;
    return C.indigo;
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <View style={mbStyles.header}>
        <View style={{ flex: 1 }}>
          <Text style={mbStyles.title}>Morning Brief</Text>
          <Text style={mbStyles.date}>{today}</Text>
        </View>
        <View style={[styles.catBadge, { backgroundColor: C.gold + '1e', borderColor: C.gold + '50' }]}>
          <Text style={[styles.catText, { color: C.gold }]}>☀ DAILY</Text>
        </View>
      </View>
      <View style={styles.divider} />

      {state === 'loading' && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
          <ActivityIndicator size="large" color={C.indigo} />
          <Text style={styles.loadingText}>AI is reading today's news…</Text>
          <Text style={[styles.loadingText, { fontSize: 11, color: C.faint }]}>Powered by Groq Llama 3.3 70B</Text>
        </View>
      )}

      {state === 'error' && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 }}>
          <Text style={[styles.errorText, { marginBottom: 20 }]}>Could not generate morning brief.</Text>
          <TouchableOpacity style={styles.retryBtnFull} onPress={loadBrief}>
            <Text style={styles.retryBtnText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      )}

      {state === 'ready' && brief && (
        <ScrollView contentContainerStyle={{ padding: 18 }} showsVerticalScrollIndicator={false}>
          <LinearGradient colors={[C.indigo + '22', C.cyan + '10']} style={mbStyles.greetBlock} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Text style={mbStyles.greetText}>{brief.greeting || 'Good morning!'}</Text>
          </LinearGradient>

          <View style={mbStyles.tldrBlock}>
            <FieldLabel color={C.indigo}>TODAY'S TOP STORY</FieldLabel>
            <Text style={mbStyles.tldrText}>{brief.tldr}</Text>
          </View>

          <FieldLabel color={C.cyan} style={{ marginBottom: 10, marginTop: 4 }}>5 STORIES YOU NEED TO KNOW</FieldLabel>
          {brief.stories?.map((s, i) => {
            const col = catColor(s.category);
            return (
              <View key={i} style={mbStyles.storyCard}>
                <View style={[mbStyles.storyNum, { backgroundColor: col + '20', borderColor: col + '50' }]}>
                  <Text style={[mbStyles.storyNumText, { color: col }]}>{i + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={[mbStyles.catPill, { backgroundColor: col + '18', borderColor: col + '35' }]}>
                    <Text style={[styles.fieldLabel, { color: col, marginBottom: 0 }]}>{(s.category || 'NEWS').toUpperCase()}</Text>
                  </View>
                  <Text style={mbStyles.storyTitle}>{s.title}</Text>
                  <Text style={mbStyles.storySummary}>{s.summary}</Text>
                  {s.importance && (
                    <View style={mbStyles.importanceRow}>
                      <Text style={{ color: C.gold, fontSize: 10, marginTop: 1 }}>⚡</Text>
                      <Text style={mbStyles.importanceText}>{s.importance}</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}

          {brief.watchToday?.length > 0 && (
            <InfoBlock style={{ marginTop: 6 }}>
              <FieldLabel color={C.rose}>WATCH TODAY</FieldLabel>
              {brief.watchToday.map((w, i) => (
                <View key={i} style={styles.bulletRow}>
                  <Body style={styles.bulletArrow}>→</Body>
                  <Body style={{ flex: 1, fontSize: 12 }}>{w}</Body>
                </View>
              ))}
            </InfoBlock>
          )}

          {brief.quote && (
            <View style={mbStyles.quoteBlock}>
              <Text style={mbStyles.quoteText}>"{brief.quote}"</Text>
            </View>
          )}
          <View style={{ height: 50 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
});

export default MorningBriefScreen;