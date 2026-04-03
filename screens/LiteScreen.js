import React, { useRef, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, ActivityIndicator,
  StatusBar, SafeAreaView, RefreshControl, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FeedItem from '../components/FeedItem';
import CategoryBar from '../components/CategoryBar';
import PulseDot from '../components/ PulseDot';
import { C } from '../constants/colors';
import { H } from '../constants/data';
import { styles } from '../styles/index';
import { feedStyles } from '../styles/feedStyles';

const LiteScreen = React.memo(({
  stories, bookmarks, onBookmark, onGoDeep,
  onShowBookmarks, onShowMorningBrief,
  onRefresh, refreshing, onLoadMore, loadingMore,
  activeCategory, onCategoryChange,
}) => {
  const flatListRef = useRef(null);

  const renderItem = useCallback(({ item }) => (
    <FeedItem item={item} bookmarks={bookmarks} onBookmark={onBookmark} onGoDeep={onGoDeep} />
  ), [bookmarks, onBookmark, onGoDeep]);

  const keyExtractor = useCallback((item) => item.id, []);
  const getItemLayout = useCallback((_, index) => ({ length: H, offset: H * index, index }), []);

  const ListFooter = useCallback(() =>
    loadingMore ? (
      <View style={feedStyles.loadMoreFooter}>
        <ActivityIndicator color={C.indigo} size="large" />
        <Text style={[styles.loadingText, { marginTop: 12 }]}>Loading more stories...</Text>
      </View>
    ) : null
  , [loadingMore]);

  useEffect(() => {
    if (stories.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: false });
    }
  }, [activeCategory]);

  const TopBar = (
    <LinearGradient
      colors={['rgba(3,3,14,0.96)', 'rgba(3,3,14,0.80)', 'rgba(3,3,14,0.30)', 'transparent']}
      style={feedStyles.topBarGradient}
      pointerEvents="box-none"
    >
      <SafeAreaView pointerEvents="box-none">
        <View style={feedStyles.topBar} pointerEvents="box-none">
          <View style={styles.logoRow}>
            <Text style={styles.logo}>PULSE</Text>
            <PulseDot color={C.indigo} />
          </View>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            {refreshing && <ActivityIndicator size="small" color={C.cyan} />}
            <TouchableOpacity onPress={onShowMorningBrief} style={feedStyles.morningBriefBtn} activeOpacity={0.8}>
              <Text style={feedStyles.morningBriefBtnText}>☀  Brief</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onShowBookmarks} style={styles.savedBtn} activeOpacity={0.8}>
              <Text style={styles.savedBtnText}>{bookmarks.size > 0 ? `★ ${bookmarks.size}` : 'Saved'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View pointerEvents="box-none">
          <CategoryBar activeCategory={activeCategory} onSelect={onCategoryChange} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  if (!stories.length) return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {TopBar}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 14 }}>
        <ActivityIndicator color={C.indigo} size="large" />
        <Text style={styles.loadingText}>Loading stories…</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <FlatList
        ref={flatListRef}
        data={stories}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        pagingEnabled
        snapToInterval={H}
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        getItemLayout={getItemLayout}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.6}
        ListFooterComponent={ListFooter}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.indigo} />}
        removeClippedSubviews
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={2}
      />
      {TopBar}
    </View>
  );
});

export default LiteScreen;