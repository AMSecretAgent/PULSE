import React from 'react';
import { View, Text, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { InfoBlock, FieldLabel, Body } from '../components/atoms';
import { C } from '../constants/colors';
import { styles } from '../styles/index';
import { mbStyles } from '../styles/mbStyles';

const RecipeDetailScreen = React.memo(({ item }) => {
  const r = item.recipeData;
  if (!r) return null;

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <View style={styles.litHeader}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.litCat, { color: item.cc }]}>RECIPES  ·  {r.difficulty?.toUpperCase()}</Text>
          <Text style={styles.litHeadline} numberOfLines={2}>{item.hl}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <ScrollView contentContainerStyle={{ padding: 18 }} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[item.cc + '25', item.cc + '08']}
          style={[mbStyles.greetBlock, { alignItems: 'center', marginBottom: 18 }]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        >
          <Text style={{ fontSize: 64, marginBottom: 8 }}>{item.emoji}</Text>
          <Text style={[mbStyles.greetText, { textAlign: 'center' }]}>{item.hl}</Text>
          <View style={{ flexDirection: 'row', gap: 16, marginTop: 12 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: item.cc, fontWeight: '700', fontSize: 14 }}>{r.cookTime}</Text>
              <Text style={{ color: C.muted, fontSize: 9, letterSpacing: 1 }}>COOK TIME</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: item.cc, fontWeight: '700', fontSize: 14 }}>{r.servings}</Text>
              <Text style={{ color: C.muted, fontSize: 9, letterSpacing: 1 }}>SERVINGS</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: item.cc, fontWeight: '700', fontSize: 14 }}>{r.difficulty}</Text>
              <Text style={{ color: C.muted, fontSize: 9, letterSpacing: 1 }}>DIFFICULTY</Text>
            </View>
          </View>
        </LinearGradient>

        <InfoBlock>
          <FieldLabel color={item.cc}>INGREDIENTS</FieldLabel>
          {r.ingredients?.map((ing, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={[styles.bulletDiamond, { color: item.cc }]}>◆</Text>
              <Body style={{ flex: 1, fontSize: 13 }}>{ing}</Body>
            </View>
          ))}
        </InfoBlock>

        <FieldLabel color={C.cyan} style={{ marginBottom: 10, marginTop: 4 }}>STEP-BY-STEP INSTRUCTIONS</FieldLabel>
        {r.steps?.map((step, i) => (
          <View key={i} style={[mbStyles.storyCard, { borderLeftWidth: 3, borderLeftColor: item.cc + '80' }]}>
            <View style={[mbStyles.storyNum, { backgroundColor: item.cc + '20', borderColor: item.cc + '50' }]}>
              <Text style={[mbStyles.storyNumText, { color: item.cc }]}>{step.num}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={mbStyles.storyTitle}>{step.title}</Text>
              <Text style={mbStyles.storySummary}>{step.instruction}</Text>
            </View>
          </View>
        ))}

        {r.tips && (
          <View style={mbStyles.quoteBlock}>
            <FieldLabel color={C.gold} style={{ marginBottom: 8 }}>💡 PRO TIP</FieldLabel>
            <Text style={[mbStyles.quoteText, { fontStyle: 'normal', color: C.gold + 'cc' }]}>{r.tips}</Text>
          </View>
        )}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
});

export default RecipeDetailScreen;