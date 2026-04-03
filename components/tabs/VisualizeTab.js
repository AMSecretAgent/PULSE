import React from 'react';
import { View, Text } from 'react-native';
import Skeleton from '../Skeleton';
import { FieldLabel } from '../atoms';
import { C } from '../../constants/colors';
import { vizStyles } from '../../styles/vizStyles';

const VIZ_TYPE_META = {
  cause:         { color: C.rose,    icon: '⚡', borderStyle: 'solid'  },
  event:         { color: '#5eadf5', icon: '◆', borderStyle: 'solid'  },
  turning_point: { color: C.gold,    icon: '★', borderStyle: 'solid'  },
  effect:        { color: C.violet,  icon: '→', borderStyle: 'dashed' },
  impact:        { color: C.cyan,    icon: '●', borderStyle: 'solid'  },
};

const VisualizeTab = React.memo(({ data }) => {
  if (!data) return (
    <>
      <View style={{ alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <Skeleton width="50%" height={14} mb={6} />
        <Text style={{ color: C.faint, fontSize: 22 }}>↓</Text>
        {[0, 1, 2, 3].map(i => (
          <React.Fragment key={i}>
            <View style={[vizStyles.skeletonNode]}>
              <Skeleton width="45%" height={11} mb={8} />
              <Skeleton mb={0} />
            </View>
            {i < 3 && <Text style={vizStyles.arrow}>↓</Text>}
          </React.Fragment>
        ))}
      </View>
    </>
  );

  return (
    <>
      {data.title && (
        <View style={vizStyles.titleRow}>
          <Text style={vizStyles.titleIcon}>⬡</Text>
          <FieldLabel color={C.violet} style={{ marginBottom: 0, fontSize: 10 }}>
            {data.title?.toUpperCase()}
          </FieldLabel>
        </View>
      )}
      <View style={vizStyles.flowContainer}>
        {data.nodes?.map((node, i) => {
          const meta   = VIZ_TYPE_META[node.type] || VIZ_TYPE_META.event;
          const isLast = i === data.nodes.length - 1;
          return (
            <React.Fragment key={node.id ?? i}>
              <View style={[vizStyles.nodeCard, { borderColor: meta.color + '55', backgroundColor: meta.color + '0d', borderStyle: meta.borderStyle }]}>
                <View style={vizStyles.nodeHeader}>
                  <View style={[vizStyles.typePill, { backgroundColor: meta.color + '1a', borderColor: meta.color + '40' }]}>
                    <Text style={[vizStyles.typeText, { color: meta.color }]}>
                      {meta.icon}  {(node.type || 'event').replace('_', ' ').toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text style={[vizStyles.nodeLabel, { color: meta.color === C.cyan ? C.cyan : C.white }]}>{node.label}</Text>
                {node.desc && <Text style={vizStyles.nodeDesc}>{node.desc}</Text>}
                <View style={[vizStyles.accentLine, { backgroundColor: meta.color }]} />
              </View>
              {!isLast && (
                <View style={vizStyles.arrowContainer}>
                  <View style={[vizStyles.arrowStem, { backgroundColor: meta.color + '40' }]} />
                  <Text style={[vizStyles.arrowHead, { color: meta.color + '90' }]}>▼</Text>
                </View>
              )}
            </React.Fragment>
          );
        })}
      </View>
      <View style={vizStyles.legend}>
        <Text style={vizStyles.legendTitle}>LEGEND</Text>
        <View style={vizStyles.legendRow}>
          {Object.entries(VIZ_TYPE_META).map(([type, meta]) => (
            <View key={type} style={vizStyles.legendItem}>
              <View style={[vizStyles.legendDot, { backgroundColor: meta.color }]} />
              <Text style={[vizStyles.legendText, { color: meta.color }]}>{type.replace('_', ' ')}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
});

export default VisualizeTab;