import { StyleSheet } from 'react-native';
import { C } from '../constants/colors';

export const tlStyles = StyleSheet.create({
  titleRow:       { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(91,79,232,0.18)' },
  titleIcon:      { fontSize: 14 },
  skeletonRow:    { flexDirection: 'row', marginBottom: 18, gap: 14, alignItems: 'flex-start' },
  skeletonLine:   { width: 2, height: '100%', backgroundColor: 'rgba(255,255,255,0.06)', position: 'absolute', left: 11, top: 0 },
  skeletonDot:    { width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.07)', flexShrink: 0 },
  eventRow:       { flexDirection: 'row', alignItems: 'stretch', marginBottom: 4, gap: 12 },
  rail:           { width: 26, alignItems: 'center', flexShrink: 0 },
  railLine:       { width: 2, flex: 1, minHeight: 12, borderRadius: 1 },
  railLineBottom: { width: 2, flex: 1, minHeight: 12, borderRadius: 1 },
  railDot:        { width: 26, height: 26, borderRadius: 13, borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  railIcon:       { fontSize: 10, fontWeight: '700' },
  eventCard:      { flex: 1, borderWidth: 1, borderRadius: 12, padding: 13, marginBottom: 10 },
  eventMeta:      { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 7, flexWrap: 'wrap' },
  typePill:       { borderRadius: 20, paddingHorizontal: 9, paddingVertical: 3, borderWidth: 1 },
  typeText:       { fontSize: 8, fontWeight: '700', letterSpacing: 0.8 },
  period:         { fontSize: 10, color: 'rgba(238,240,255,0.38)', fontVariant: ['tabular-nums'] },
  eventLabel:     { fontSize: 13, fontWeight: '600', color: C.white, lineHeight: 19, marginBottom: 5 },
  nowRow:         { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(0,229,176,0.2)' },
  nowDot:         { width: 10, height: 10, borderRadius: 5, backgroundColor: C.cyan },
  nowText:        { fontSize: 9, fontWeight: '700', letterSpacing: 2, color: C.cyan },
});