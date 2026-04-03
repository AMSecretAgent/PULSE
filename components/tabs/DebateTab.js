import React from 'react';
import { View, Text } from 'react-native';
import Skeleton from '../Skeleton';
import { InfoBlock, FieldLabel, Body } from '../atoms';
import { C } from '../../constants/colors';
import { styles } from '../../styles/index';

const SC = { supportive: C.cyan, critical: C.rose, concerned: C.gold };

const DebateTab = React.memo(({ data }) => {
  if (!data) return (
    <>{[0, 1, 2].map(i => (
      <InfoBlock key={i}>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
          <Skeleton width={70} height={20} mb={0} />
          <Skeleton width={120} height={20} mb={0} />
        </View>
        <Skeleton mb={5} /><Skeleton width="85%" mb={0} />
      </InfoBlock>
    ))}</>
  );
  return (
    <>
      {data.sides?.map((s, i) => {
        const col = SC[s.stance] || '#888';
        return (
          <InfoBlock key={i}>
            <View style={styles.debateHeader}>
              <View style={[styles.debatePill, { backgroundColor: col + '18', borderColor: col + '35' }]}>
                <Text style={[styles.debatePillText, { color: col }]}>{s.stance}</Text>
              </View>
              <Text style={styles.debateName}>{s.name}</Text>
            </View>
            <Body>{s.arg}</Body>
          </InfoBlock>
        );
      })}
      {data.neutral && (
        <View style={styles.neutralBlock}>
          <FieldLabel color="rgba(238,240,255,0.3)">NEUTRAL SYNTHESIS</FieldLabel>
          <Body style={{ fontStyle: 'italic' }}>{data.neutral}</Body>
        </View>
      )}
    </>
  );
});

export default DebateTab;