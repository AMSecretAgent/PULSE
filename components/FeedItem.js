import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PulseDot from './ PulseDot';
import { C } from '../constants/colors';
import { feedStyles } from '../styles/feedStyles';

const FeedItem = React.memo(({ item, bookmarks, onBookmark, onGoDeep }) => {
  const saved = bookmarks.has(item.id);
  const [imgErr, setImgErr] = useState(false);
  const showImage = item.image && !imgErr;

  const actionLabel =
    item.type === 'horoscope'        ? 'View Reading'  :
    item.type === 'recipe'           ? 'View Recipe'   :
    item.type === 'puzzle'           ? 'Play Now'      :
    'Go Deep  ·  Lit Mode';

  return (
    <View style={feedStyles.container}>
      {showImage ? (
        <Image
          source={{ uri: item.image }}
          style={feedStyles.heroImage}
          resizeMode="cover"
          onError={() => setImgErr(true)}
        />
      ) : (
        <LinearGradient
          colors={[item.gradStart, item.gradEnd, '#020210']}
          style={feedStyles.heroImage}
          start={{ x: 0.3, y: 0 }} end={{ x: 0.7, y: 1 }}
        >
          {item.emoji && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 80, opacity: 0.3 }}>{item.emoji}</Text>
            </View>
          )}
        </LinearGradient>
      )}

      <LinearGradient
        colors={['transparent', 'rgba(3,3,14,0.55)', 'rgba(3,3,14,0.92)', C.bg]}
        style={feedStyles.fadeOverlay}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
      />

      <View style={feedStyles.content}>
        <View style={feedStyles.liveBadge}>
          <PulseDot
            color={item.type === 'puzzle' ? C.gold : item.type === 'recipe' ? C.cyan : C.rose}
            size={5}
          />
          <Text style={[feedStyles.liveBadgeText, {
            color: item.type === 'puzzle'    ? C.gold   :
                   item.type === 'recipe'    ? C.cyan   :
                   item.type === 'horoscope' ? C.violet : C.rose,
          }]}>
            {item.type === 'puzzle'    ? 'INTERACTIVE' :
             item.type === 'recipe'    ? 'RECIPE'      :
             item.type === 'horoscope' ? 'ASTROLOGY'   : 'LIVE'}
          </Text>
        </View>

        <View style={feedStyles.metaRow}>
          <View style={[feedStyles.catBadge, { backgroundColor: item.cc + '22', borderColor: item.cc + '60' }]}>
            <Text style={[feedStyles.catText, { color: item.cc }]}>{item.cat}</Text>
          </View>
          <View style={feedStyles.scoreBarWrap}>
            <View style={[feedStyles.scoreFill, { width: `${item.score}%`, backgroundColor: item.cc }]} />
          </View>
          <Text style={feedStyles.scoreLabel}>{item.score}%</Text>
          <Text style={feedStyles.srcLabel}>{item.src}  ·  {item.tm}</Text>
        </View>

        <Text style={feedStyles.headline} numberOfLines={3}>{item.hl}</Text>
        <Text style={feedStyles.summary} numberOfLines={2}>{item.sm}</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 16 }}
          contentContainerStyle={{ gap: 7 }}
        >
          {item.tags?.map(t => (
            <View key={t} style={feedStyles.tagPill}>
              <Text style={feedStyles.tagPillText}>{t}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={feedStyles.actionRow}>
          <TouchableOpacity
            onPress={() => onBookmark(item.id)}
            activeOpacity={0.8}
            style={[feedStyles.saveBtn, saved && { backgroundColor: C.indigo + '28', borderColor: C.indigo + '65' }]}
          >
            <Text style={[feedStyles.saveBtnText, saved && { color: C.indigo }]}>
              {saved ? '★  Saved' : '☆  Save'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onGoDeep(item)} activeOpacity={0.85} style={feedStyles.deepBtn}>
            <LinearGradient
              colors={[item.cc + '60', item.cc + '30']}
              style={feedStyles.deepBtnGrad}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            >
              <PulseDot color={item.cc} />
              <Text style={[feedStyles.deepBtnText, { color: item.cc + 'ee' }]}>{actionLabel}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}, (prev, next) =>
  prev.item.id === next.item.id &&
  prev.bookmarks.has(prev.item.id) === next.bookmarks.has(next.item.id)
);

export default FeedItem;