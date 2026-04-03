import React from 'react';
import { View } from 'react-native';
import Skeleton from '../Skeleton';
import { InfoBlock, FieldLabel, Body } from '../atoms';
import { C } from '../../constants/colors';
import { styles } from '../../styles/index';

const ExplainTab = React.memo(({ data }) => {
  if (!data) return (
    <>{[0, 1, 2].map(i => (
      <InfoBlock key={i}>
        <Skeleton width="40%" height={9} mb={10} />
        <Skeleton mb={6} /><Skeleton width="86%" mb={0} />
      </InfoBlock>
    ))}</>
  );
  return (
    <>
      {[
        { key: 'what', label: 'WHAT HAPPENED', color: C.indigo },
        { key: 'why',  label: 'ROOT CAUSES',   color: C.cyan   },
        { key: 'next', label: "WHAT'S NEXT",   color: C.gold   },
      ].filter(f => data[f.key]).map(f => (
        <InfoBlock key={f.key}>
          <FieldLabel color={f.color}>{f.label}</FieldLabel>
          <Body>{data[f.key]}</Body>
        </InfoBlock>
      ))}
      {data.importance && (
        <View style={styles.importanceBlock}>
          <Body style={styles.importanceText}>⚡  {data.importance}</Body>
        </View>
      )}
    </>
  );
});

export default ExplainTab;