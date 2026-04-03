import React from 'react';
import { View, Text, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { InfoBlock, FieldLabel, Body } from '../components/atoms';
import { C } from '../constants/colors';
import { styles } from '../styles/index';
import { mbStyles } from '../styles/mbStyles';

const HealthDetailScreen = React.memo(({ item }) => {
  const d = item.healthData;
  if (!d) return null;

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <View style={styles.litHeader}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.litCat, { color: item.cc }]}>HEALTHY LIFESTYLE</Text>
          <Text style={styles.litHeadline} numberOfLines={2}>{item.hl}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <ScrollView contentContainerStyle={{ padding: 18 }} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[item.cc + '25', item.cc + '08']}
          style={[mbStyles.greetBlock, { alignItems: 'center' }]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        >
          <Text style={{ fontSize: 50, marginBottom: 8 }}>{item.emoji}</Text>
          <Text style={[mbStyles.greetText, { textAlign: 'center' }]}>{item.hl}</Text>
        </LinearGradient>

        {d.sections?.map((sec, i) => (
          <InfoBlock key={i}>
            <FieldLabel color={[C.cyan, C.gold, C.indigo, C.rose, C.violet, C.cyan][i % 6]}>{sec.heading.toUpperCase()}</FieldLabel>
            <Body style={{ lineHeight: 22 }}>{sec.body}</Body>
          </InfoBlock>
        ))}

        {d.keyPoints?.length > 0 && (
          <View style={styles.questionBlock}>
            <FieldLabel color={C.cyan}>REMEMBER</FieldLabel>
            {d.keyPoints.map((p, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={[styles.bulletArrow, { color: item.cc }]}>→</Text>
                <Body style={{ flex: 1, fontSize: 13 }}>{p}</Body>
              </View>
            ))}
          </View>
        )}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
});

export default HealthDetailScreen;