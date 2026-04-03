import React, { useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StatusBar, SafeAreaView,
} from 'react-native';
import { C } from '../constants/colors';
import { styles } from '../styles/index';

const BookmarksScreen = React.memo(({ stories, bookmarks, onGoDeep }) => {
  const saved = useMemo(() => stories.filter(s => bookmarks.has(s.id)), [stories, bookmarks]);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <View style={styles.bmHeader}>
        <View style={{ marginLeft: 4 }}>
          <Text style={styles.bmTitle}>Saved</Text>
          <Text style={styles.bmSub}>{saved.length} stories  ·  tap to go deep</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        {saved.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>☆</Text>
            <Text style={styles.emptyTitle}>Nothing saved yet</Text>
            <Text style={styles.emptyBody}>Save stories from the feed to analyse them deeply</Text>
          </View>
        ) : (
          saved.map(s => (
            <TouchableOpacity key={s.id} onPress={() => onGoDeep(s)} activeOpacity={0.82}
              style={[styles.bmCard, { borderLeftColor: s.cc }]}>
              <Text style={[styles.bmCat, { color: s.cc }]}>{s.cat}</Text>
              <Text style={styles.bmHl} numberOfLines={2}>{s.hl}</Text>
              <View style={styles.bmMeta}>
                <Text style={styles.bmSrc}>{s.src}  ·  {s.tm}</Text>
                <View style={[styles.bmDeepBtn, { borderColor: C.indigo + '50' }]}>
                  <Text style={[styles.bmDeepBtnText, { color: C.indigo }]}>Open →</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
});

export default BookmarksScreen;