import React from 'react';
import { View, Text } from 'react-native';
import Skeleton from '../Skeleton';
import { FieldLabel, Body } from '../atoms';
import { C } from '../../constants/colors';
import { tlStyles } from '../../styles/tlStyles';

const TIMELINE_TYPE_META = {
  background:    { color: C.muted,   icon: '○', label: 'Background'    },
  escalation:    { color: C.gold,    icon: '◆', label: 'Escalation'    },
  turning_point: { color: C.rose,    icon: '★', label: 'Turning Point' },
  current:       { color: C.cyan,    icon: '●', label: 'Current'       },
};

const TimelineTab = React.memo(({ data }) => {
  if (!data) return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 18 }}>
        <Skeleton width={160} height={14} mb={0} />
      </View>
      {[0, 1, 2, 3, 4].map(i => (
        <View key={i} style={tlStyles.skeletonRow}>
          <View style={tlStyles.skeletonLine} />
          <View style={tlStyles.skeletonDot} />
          <View style={{ flex: 1 }}>
            <Skeleton width="35%" height={9} mb={8} />
            <Skeleton width="70%" height={12} mb={7} />
            <Skeleton mb={0} />
          </View>
        </View>
      ))}
    </>
  );

  return (
    <>
      {data.title && (
        <View style={tlStyles.titleRow}>
          <Text style={tlStyles.titleIcon}>⏱</Text>
          <FieldLabel color={C.indigo} style={{ marginBottom: 0, fontSize: 10 }}>
            {data.title?.toUpperCase()}
          </FieldLabel>
        </View>
      )}
      <View style={{ marginTop: 10 }}>
        {data.events?.map((ev, i) => {
          const meta   = TIMELINE_TYPE_META[ev.type] || TIMELINE_TYPE_META.background;
          const isLast = i === data.events.length - 1;
          return (
            <View key={i} style={tlStyles.eventRow}>
              <View style={tlStyles.rail}>
                {i > 0 && <View style={[tlStyles.railLine, { backgroundColor: meta.color + '30' }]} />}
                <View style={[tlStyles.railDot, { backgroundColor: meta.color, borderColor: meta.color + '55' }]}>
                  <Text style={[tlStyles.railIcon, { color: meta.color === C.muted ? 'rgba(238,240,255,0.45)' : C.bg }]}>{meta.icon}</Text>
                </View>
                {!isLast && <View style={[tlStyles.railLineBottom, { backgroundColor: meta.color + '30' }]} />}
              </View>
              <View style={[
                tlStyles.eventCard,
                { borderColor: meta.color + '28', backgroundColor: meta.color + '07' },
                isLast && { borderColor: meta.color + '55', backgroundColor: meta.color + '12' },
              ]}>
                <View style={tlStyles.eventMeta}>
                  <View style={[tlStyles.typePill, { backgroundColor: meta.color + '18', borderColor: meta.color + '35' }]}>
                    <Text style={[tlStyles.typeText, { color: meta.color }]}>{meta.label}</Text>
                  </View>
                  <Text style={tlStyles.period}>{ev.period}</Text>
                </View>
                <Text style={tlStyles.eventLabel}>{ev.label}</Text>
                <Body style={{ fontSize: 12 }}>{ev.desc}</Body>
              </View>
            </View>
          );
        })}
      </View>
      <View style={tlStyles.nowRow}>
        <View style={tlStyles.nowDot} />
        <Text style={tlStyles.nowText}>NOW</Text>
      </View>
    </>
  );
});

export default TimelineTab;