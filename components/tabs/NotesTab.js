import React from 'react';
import { View } from 'react-native';
import Skeleton from '../Skeleton';
import { InfoBlock, FieldLabel, Body } from '../atoms';
import { C } from '../../constants/colors';
import { styles } from '../../styles/index';

const NotesTab = React.memo(({ data }) => {
  if (!data) return (
    <>
      <Skeleton height={44} mb={14} />
      <InfoBlock>
        <Skeleton width="28%" height={9} mb={10} />
        {[0, 1, 2, 3].map(i => (
          <View key={i} style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
            <Skeleton width={8} height={8} mb={0} />
            <Skeleton mb={0} />
          </View>
        ))}
      </InfoBlock>
    </>
  );

  return (
    <>
      <View style={styles.tldrBlock}>
        <Body style={styles.tldrText}>★  {data.tldr}</Body>
      </View>
      {data.facts?.length > 0 && (
        <InfoBlock>
          <FieldLabel>KEY FACTS</FieldLabel>
          {data.facts.map((f, i) => (
            <View key={i} style={styles.bulletRow}>
              <Body style={styles.bulletDiamond}>◆</Body>
              <Body style={{ flex: 1, fontSize: 12 }}>{f}</Body>
            </View>
          ))}
        </InfoBlock>
      )}
      {data.watch?.length > 0 && (
        <InfoBlock>
          <FieldLabel color={C.gold}>WATCH FOR</FieldLabel>
          {data.watch.map((w, i) => (
            <View key={i} style={styles.bulletRow}>
              <Body style={styles.bulletArrow}>→</Body>
              <Body style={{ flex: 1, fontSize: 12 }}>{w}</Body>
            </View>
          ))}
        </InfoBlock>
      )}
      {data.q && (
        <View style={styles.questionBlock}>
          <FieldLabel color={C.cyan}>TEST YOURSELF</FieldLabel>
          <Body style={{ fontStyle: 'italic', fontSize: 12 }}>{data.q}</Body>
        </View>
      )}
    </>
  );
});

export default NotesTab;