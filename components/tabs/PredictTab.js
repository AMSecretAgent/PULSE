import React from 'react';
import { View, Text } from 'react-native';
import Skeleton from '../Skeleton';
import { Body } from '../atoms';
import { C } from '../../constants/colors';
import { styles } from '../../styles/index';

const OC = { positive: C.cyan, neutral: C.gold, negative: C.rose };

const PredictTab = React.memo(({ data }) => {
  if (!data) return (
    <>{[0, 1, 2].map(i => (
      <View key={i} style={[styles.scenarioCard, { borderLeftColor: 'rgba(255,255,255,0.12)' }]}>
        <Skeleton width="55%" height={13} mb={9} />
        <Skeleton mb={5} /><Skeleton width="80%" mb={0} />
      </View>
    ))}</>
  );
  return (
    <>{data.scenarios?.map((s, i) => {
      const col = OC[s.type] || '#888';
      return (
        <View key={i} style={[styles.scenarioCard, { borderLeftColor: col, borderColor: col + '28' }]}>
          <View style={styles.scenarioHeader}>
            <Text style={styles.scenarioLabel}>{s.label}</Text>
            <Text style={[styles.scenarioProb, { color: col }]}>{s.prob}%</Text>
          </View>
          <View style={styles.probBar}>
            <View style={[styles.probFill, { width: `${s.prob}%`, backgroundColor: col }]} />
          </View>
          <Body style={{ fontSize: 12 }}>{s.desc}</Body>
        </View>
      );
    })}</>
  );
});

export default PredictTab;