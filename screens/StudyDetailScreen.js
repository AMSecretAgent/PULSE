import React from 'react';
import { View, Text, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { InfoBlock, FieldLabel, Body } from '../components/atoms';
import { C } from '../constants/colors';
import { styles } from '../styles/index';
import { mbStyles } from '../styles/mbStyles';

const StudyDetailScreen = React.memo(({ item }) => {
  const d = item.studyContent;
  if (!d) return null;

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <View style={styles.litHeader}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.litCat, { color: item.cc }]}>STUDY HUB</Text>
          <Text style={styles.litHeadline} numberOfLines={2}>{item.hl}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <ScrollView contentContainerStyle={{ padding: 18 }} showsVerticalScrollIndicator={false}>
        <View style={mbStyles.tldrBlock}>
          <FieldLabel color={C.indigo}>OVERVIEW</FieldLabel>
          <Text style={mbStyles.tldrText}>{d.intro}</Text>
        </View>

        {d.sections?.map((sec, i) => (
          <InfoBlock key={i}>
            <FieldLabel color={[C.indigo, C.cyan, C.gold, C.violet, C.rose][i % 5]}>{sec.heading.toUpperCase()}</FieldLabel>
            <Body style={{ lineHeight: 22 }}>{sec.body}</Body>
          </InfoBlock>
        ))}

        {d.keyTakeaways?.length > 0 && (
          <View style={styles.questionBlock}>
            <FieldLabel color={C.cyan}>KEY TAKEAWAYS</FieldLabel>
            {d.keyTakeaways.map((t, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={[styles.bulletDiamond, { color: C.cyan }]}>✓</Text>
                <Body style={{ flex: 1, fontSize: 13 }}>{t}</Body>
              </View>
            ))}
          </View>
        )}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
});

export default StudyDetailScreen;