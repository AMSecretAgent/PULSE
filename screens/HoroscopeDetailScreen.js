import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  ActivityIndicator, StatusBar, SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { InfoBlock, FieldLabel, Body } from '../components/atoms';
import { fetchHoroscopeDetail } from '../services/aiService';
import { C } from '../constants/colors';
import { styles } from '../styles/index';
import { mbStyles } from '../styles/mbStyles';

const HoroscopeDetailScreen = React.memo(({ item }) => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const z = item.zodiacData;

  const load = useCallback(async () => {
    setLoading(true); setError(false);
    try {
      const result = await fetchHoroscopeDetail(z.name);
      setData(result);
    } catch { setError(true); }
    finally { setLoading(false); }
  }, [z.name]);

  useEffect(() => { load(); }, []);

  const stars = data ? parseInt(data.rating) || 8 : 0;

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <View style={styles.litHeader}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.litCat, { color: z.color }]}>HOROSCOPE  ·  {z.dates.toUpperCase()}</Text>
          <Text style={styles.litHeadline}>{z.emoji} {z.name} · Today's Reading</Text>
        </View>
      </View>
      <View style={styles.divider} />

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
          <Text style={{ fontSize: 50 }}>{z.emoji}</Text>
          <ActivityIndicator size="large" color={z.color} />
          <Text style={styles.loadingText}>Reading the stars for {z.name}…</Text>
        </View>
      ) : error ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 }}>
          <Text style={[styles.errorText, { marginBottom: 20 }]}>Could not load horoscope.</Text>
          <TouchableOpacity style={styles.retryBtnFull} onPress={load}>
            <Text style={styles.retryBtnText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 18 }} showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={[z.color + '30', z.color + '10']}
            style={[mbStyles.greetBlock, { alignItems: 'center' }]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          >
            <Text style={{ fontSize: 56, marginBottom: 10 }}>{z.emoji}</Text>
            <Text style={[mbStyles.greetText, { textAlign: 'center' }]}>{z.name}</Text>
            <Text style={{ color: z.color, fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginTop: 4 }}>
              {z.element.toUpperCase()} SIGN  ·  {z.dates.toUpperCase()}
            </Text>
            {data?.rating && (
              <View style={{ flexDirection: 'row', gap: 4, marginTop: 12 }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <Text key={i} style={{ fontSize: 14, color: i < stars ? z.color : 'rgba(255,255,255,0.15)' }}>★</Text>
                ))}
              </View>
            )}
          </LinearGradient>

          {data?.overall && (
            <InfoBlock>
              <FieldLabel color={z.color}>TODAY'S ENERGY</FieldLabel>
              <Body>{data.overall}</Body>
            </InfoBlock>
          )}

          {[
            { key: 'love',   label: '❤ LOVE & RELATIONSHIPS', color: C.rose },
            { key: 'career', label: '💼 CAREER & FINANCES',   color: C.gold },
            { key: 'health', label: '🌿 HEALTH & WELLNESS',   color: C.cyan },
          ].map(f => data?.[f.key] ? (
            <InfoBlock key={f.key}>
              <FieldLabel color={f.color}>{f.label}</FieldLabel>
              <Body>{data[f.key]}</Body>
            </InfoBlock>
          ) : null)}

          {(data?.luckyNumber || data?.luckyColor) && (
            <View style={[styles.infoBlock, { flexDirection: 'row', gap: 12 }]}>
              <View style={{ flex: 1, alignItems: 'center', padding: 8 }}>
                <Text style={{ fontSize: 28, fontWeight: '800', color: z.color }}>{data?.luckyNumber}</Text>
                <Text style={{ fontSize: 9, color: C.muted, fontWeight: '700', letterSpacing: 1.2, marginTop: 4 }}>LUCKY NUMBER</Text>
              </View>
              <View style={{ width: 1, backgroundColor: C.border }} />
              <View style={{ flex: 1, alignItems: 'center', padding: 8 }}>
                <Text style={{ fontSize: 22, fontWeight: '700', color: z.color }}>{data?.luckyColor}</Text>
                <Text style={{ fontSize: 9, color: C.muted, fontWeight: '700', letterSpacing: 1.2, marginTop: 6 }}>LUCKY COLOUR</Text>
              </View>
            </View>
          )}

          {data?.advice && (
            <View style={mbStyles.quoteBlock}>
              <Text style={mbStyles.quoteText}>"{data.advice}"</Text>
            </View>
          )}
          <View style={{ height: 50 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
});

export default HoroscopeDetailScreen;