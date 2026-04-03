import { StyleSheet } from 'react-native';
import { C } from '../constants/colors';

export const vizStyles = StyleSheet.create({
  titleRow:       { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(168,85,247,0.18)' },
  titleIcon:      { fontSize: 14 },
  skeletonNode:   { width: '80%', alignSelf: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: 16 },
  arrow:          { textAlign: 'center', fontSize: 18, color: 'rgba(255,255,255,0.15)', marginVertical: 2 },
  flowContainer:  { alignItems: 'center' },
  nodeCard:       { width: '90%', borderWidth: 1, borderRadius: 16, padding: 16, position: 'relative', overflow: 'hidden' },
  accentLine:     { position: 'absolute', top: 0, left: 0, width: 3, bottom: 0, borderTopLeftRadius: 16, borderBottomLeftRadius: 16, opacity: 0.7 },
  nodeHeader:     { marginBottom: 9 },
  typePill:       { alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, borderWidth: 1 },
  typeText:       { fontSize: 8, fontWeight: '700', letterSpacing: 1 },
  nodeLabel:      { fontSize: 14, fontWeight: '700', lineHeight: 20, marginBottom: 6, paddingLeft: 6 },
  nodeDesc:       { fontSize: 12, color: 'rgba(238,240,255,0.48)', lineHeight: 19, paddingLeft: 6 },
  arrowContainer: { alignItems: 'center', paddingVertical: 2, gap: 0 },
  arrowStem:      { width: 2, height: 14, borderRadius: 1 },
  arrowHead:      { fontSize: 12, marginTop: -2 },
  legend:         { marginTop: 18, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 12 },
  legendTitle:    { fontSize: 8, fontWeight: '700', letterSpacing: 1.5, color: 'rgba(238,240,255,0.28)', marginBottom: 10 },
  legendRow:      { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  legendItem:     { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot:      { width: 7, height: 7, borderRadius: 3.5 },
  legendText:     { fontSize: 9, fontWeight: '600', letterSpacing: 0.5, textTransform: 'capitalize' },
});