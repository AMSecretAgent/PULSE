import React from 'react';
import { View, Text, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { InfoBlock, FieldLabel, Body } from '../components/atoms';
import { C } from '../constants/colors';
import { styles } from '../styles/index';
import { mbStyles } from '../styles/mbStyles';

const SuccessDetailScreen = React.memo(({ item }) => {
  const d = item.storyData;
  if (!d) return null;

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <View style={styles.litHeader}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.litCat, { color: item.cc }]}>SUCCESS STORIES</Text>
          <Text style={styles.litHeadline} numberOfLines={2}>{d.person}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <ScrollView contentContainerStyle={{ padding: 18 }} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[item.cc + '28', item.cc + '08']}
          style={[mbStyles.greetBlock, { marginBottom: 18 }]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        >
          <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: item.cc + '30', justifyContent: 'center', alignItems: 'center', marginBottom: 10, borderWidth: 2, borderColor: item.cc + '50' }}>
            <Text style={{ fontSize: 26 }}>👤</Text>
          </View>
          <Text style={[mbStyles.greetText]}>{d.person}</Text>
          <Text style={{ color: item.cc, fontSize: 11, fontWeight: '600', marginTop: 4 }}>{d.role}</Text>
        </LinearGradient>

        <View style={mbStyles.tldrBlock}>
          <Body>{d.intro}</Body>
        </View>

        <FieldLabel color={item.cc} style={{ marginBottom: 12, marginTop: 6 }}>THE JOURNEY</FieldLabel>
        {d.journey?.map((phase, i) => (
          <View key={i} style={[mbStyles.storyCard, { borderLeftWidth: 3, borderLeftColor: item.cc + '80' }]}>
            <View style={[mbStyles.storyNum, { backgroundColor: item.cc + '20', borderColor: item.cc + '50', width: 32, height: 32, borderRadius: 8 }]}>
              <Text style={{ color: item.cc, fontSize: 14 }}>{['①','②','③','④','⑤'][i]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[mbStyles.storyTitle, { color: item.cc }]}>{phase.phase}</Text>
              <Text style={mbStyles.storySummary}>{phase.text}</Text>
            </View>
          </View>
        ))}

        {d.lessons?.length > 0 && (
          <InfoBlock style={{ marginTop: 6 }}>
            <FieldLabel color={C.gold}>LESSONS TO CARRY</FieldLabel>
            {d.lessons.map((l, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletDiamond}>◆</Text>
                <Body style={{ flex: 1, fontSize: 13 }}>{l}</Body>
              </View>
            ))}
          </InfoBlock>
        )}

        {d.quote && (
          <View style={mbStyles.quoteBlock}>
            <Text style={mbStyles.quoteText}>{d.quote}</Text>
          </View>
        )}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
});

export default SuccessDetailScreen;