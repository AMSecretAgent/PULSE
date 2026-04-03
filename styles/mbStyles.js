import { StyleSheet } from 'react-native';
import { C } from '../constants/colors';

export const mbStyles = StyleSheet.create({
  header:         { flexDirection: 'row', alignItems: 'center', padding: 16, paddingTop: 14, backgroundColor: C.bg1, borderBottomWidth: 1, borderBottomColor: C.border },
  title:          { fontSize: 20, fontWeight: '800', color: C.white, letterSpacing: -0.3 },
  date:           { fontSize: 11, color: C.muted, marginTop: 2 },
  greetBlock:     { borderRadius: 16, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: C.indigo + '30' },
  greetText:      { fontSize: 18, fontWeight: '700', color: C.white, lineHeight: 26 },
  tldrBlock:      { backgroundColor: 'rgba(91,79,232,.08)', borderWidth: 1, borderColor: 'rgba(91,79,232,.24)', borderRadius: 14, padding: 16, marginBottom: 18 },
  tldrText:       { fontSize: 14, color: 'rgba(238,240,255,.75)', lineHeight: 22 },
  storyCard:      { flexDirection: 'row', gap: 12, backgroundColor: 'rgba(255,255,255,.025)', borderWidth: 1, borderColor: C.border, borderRadius: 14, padding: 14, marginBottom: 10 },
  storyNum:       { width: 28, height: 28, borderRadius: 14, borderWidth: 1, justifyContent: 'center', alignItems: 'center', flexShrink: 0, marginTop: 2 },
  storyNumText:   { fontSize: 12, fontWeight: '800' },
  catPill:        { alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 9, paddingVertical: 3, borderWidth: 1, marginBottom: 6 },
  storyTitle:     { fontSize: 14, fontWeight: '600', color: C.white, lineHeight: 20, marginBottom: 5 },
  storySummary:   { fontSize: 12, color: 'rgba(238,240,255,.5)', lineHeight: 19 },
  importanceRow:  { flexDirection: 'row', alignItems: 'flex-start', gap: 5, marginTop: 7 },
  importanceText: { fontSize: 11, color: C.gold + 'cc', flex: 1, lineHeight: 17 },
  quoteBlock:     { backgroundColor: 'rgba(0,229,176,.05)', borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(0,229,176,.22)', borderRadius: 14, padding: 16, marginTop: 8 },
  quoteText:      { fontSize: 13, fontStyle: 'italic', color: C.cyan + 'bb', lineHeight: 21, textAlign: 'center' },
});