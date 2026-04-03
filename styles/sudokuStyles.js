import { StyleSheet } from 'react-native';
import { C } from '../constants/colors';
import { W } from '../constants/data';

export const sudokuStyles = StyleSheet.create({
  grid: {
    borderWidth: 2,
    borderColor: 'rgba(91,79,232,0.6)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 24,
  },
  row: { flexDirection: 'row' },
  cell: {
    width: (W - 32) / 9,
    height: (W - 32) / 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  cellText:  { fontSize: 16, fontWeight: '600' },
  numPad:    { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 12 },
  numBtn:    { width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(91,79,232,0.15)', borderWidth: 1, borderColor: 'rgba(91,79,232,0.4)', justifyContent: 'center', alignItems: 'center' },
  numText:   { fontSize: 18, fontWeight: '700', color: C.indigo },
});