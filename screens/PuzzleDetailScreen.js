import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StatusBar, SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { InfoBlock, FieldLabel, Body } from '../components/atoms';
import { C } from '../constants/colors';
import { W } from '../constants/data';
import { generateSudoku, SUDOKU_SOLUTION, VOCAB_WORDS, RIDDLES } from '../utils/helpers';
import { styles } from '../styles/index';
import { mbStyles } from '../styles/mbStyles';
import { sudokuStyles } from '../styles/sudokuStyles';

// ─── SUDOKU ───────────────────────────────────────────────────────
const SudokuGame = React.memo(({ streak, onStreakUpdate }) => {
  const puzzle   = useMemo(() => generateSudoku(), []);
  const [board, setBoard]       = useState(() => puzzle.map(r => [...r]));
  const [selected, setSelected] = useState(null);
  const [errors, setErrors]     = useState(new Set());
  const [completed, setCompleted] = useState(false);

  const isOriginal = (r, c) => puzzle[r][c] !== 0;

  const handleCell = (r, c) => { if (!isOriginal(r, c)) setSelected([r, c]); };

  const handleNum = (num) => {
    if (!selected) return;
    const [r, c] = selected;
    if (isOriginal(r, c)) return;
    const nb = board.map(row => [...row]);
    nb[r][c] = num;
    setBoard(nb);
    const ne = new Set(errors);
    if (num !== 0 && SUDOKU_SOLUTION[r][c] !== num) ne.add(`${r}-${c}`);
    else ne.delete(`${r}-${c}`);
    setErrors(ne);
    const done = nb.every((row, ri) => row.every((cell, ci) => cell === SUDOKU_SOLUTION[ri][ci]));
    if (done) { setCompleted(true); onStreakUpdate(); }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <View style={styles.litHeader}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.litCat, { color: C.indigo }]}>PUZZLES  ·  SUDOKU</Text>
          <Text style={styles.litHeadline}>Daily Sudoku Challenge 🔢</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: C.gold, fontSize: 16, fontWeight: '800' }}>🔥 {streak}</Text>
          <Text style={{ color: C.muted, fontSize: 9, letterSpacing: 1 }}>STREAK</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <ScrollView contentContainerStyle={{ padding: 16, alignItems: 'center' }} showsVerticalScrollIndicator={false}>
        {completed && (
          <View style={[mbStyles.greetBlock, { alignItems: 'center', marginBottom: 16 }]}>
            <Text style={{ fontSize: 36, marginBottom: 8 }}>🎉</Text>
            <Text style={[mbStyles.greetText, { color: C.cyan }]}>Puzzle Solved!</Text>
            <Text style={{ color: C.muted, marginTop: 4 }}>Streak: {streak} days 🔥</Text>
          </View>
        )}
        <View style={sudokuStyles.grid}>
          {board.map((row, ri) => (
            <View key={ri} style={[sudokuStyles.row, ri === 2 || ri === 5 ? { borderBottomWidth: 2, borderBottomColor: 'rgba(91,79,232,0.6)' } : {}]}>
              {row.map((cell, ci) => {
                const isSel = selected && selected[0] === ri && selected[1] === ci;
                const isErr = errors.has(`${ri}-${ci}`);
                const orig  = isOriginal(ri, ci);
                return (
                  <TouchableOpacity key={ci} onPress={() => handleCell(ri, ci)} activeOpacity={0.7}
                    style={[
                      sudokuStyles.cell,
                      ci === 2 || ci === 5 ? { borderRightWidth: 2, borderRightColor: 'rgba(91,79,232,0.6)' } : {},
                      isSel && { backgroundColor: C.indigo + '35' },
                      isErr && { backgroundColor: C.rose + '20' },
                    ]}>
                    <Text style={[
                      sudokuStyles.cellText,
                      orig ? { color: C.white, fontWeight: '700' } : { color: C.indigo },
                      isErr && { color: C.rose },
                      cell === 0 && { opacity: 0 },
                    ]}>{cell || '·'}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
        <View style={sudokuStyles.numPad}>
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <TouchableOpacity key={n} onPress={() => handleNum(n)} style={sudokuStyles.numBtn} activeOpacity={0.7}>
              <Text style={sudokuStyles.numText}>{n}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => handleNum(0)} style={[sudokuStyles.numBtn, { backgroundColor: C.rose + '15' }]} activeOpacity={0.7}>
            <Text style={[sudokuStyles.numText, { color: C.rose }]}>⌫</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.loadingText, { fontSize: 11, marginTop: 8 }]}>Tap a cell, then tap a number to fill it in</Text>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
});

// ─── VOCAB GAME ──────────────────────────────────────────────────
const VocabGame = React.memo(({ streak, onStreakUpdate }) => {
  const [idx, setIdx]         = useState(0);
  const [score, setScore]     = useState(0);
  const [selected, setSelected] = useState(null);
  const [done, setDone]       = useState(false);

  const current = VOCAB_WORDS[idx];

  const handleAnswer = (optIdx) => {
    if (selected !== null) return;
    setSelected(optIdx);
    if (optIdx === current.answer) setScore(s => s + 1);
    setTimeout(() => {
      if (idx < VOCAB_WORDS.length - 1) { setIdx(i => i + 1); setSelected(null); }
      else { setDone(true); onStreakUpdate(); }
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <View style={styles.litHeader}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.litCat, { color: C.gold }]}>PUZZLES  ·  VOCABULARY</Text>
          <Text style={styles.litHeadline}>Vocabulary Challenge 📚</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: C.gold, fontSize: 16, fontWeight: '800' }}>🔥 {streak}</Text>
          <Text style={{ color: C.muted, fontSize: 9 }}>STREAK</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <ScrollView contentContainerStyle={{ padding: 18 }} showsVerticalScrollIndicator={false}>
        {done ? (
          <View style={{ alignItems: 'center', paddingTop: 40 }}>
            <Text style={{ fontSize: 50, marginBottom: 16 }}>🎓</Text>
            <Text style={[mbStyles.greetText, { textAlign: 'center', marginBottom: 8 }]}>Quiz Complete!</Text>
            <Text style={{ color: C.cyan, fontSize: 22, fontWeight: '800', marginBottom: 4 }}>{score}/{VOCAB_WORDS.length}</Text>
            <Text style={{ color: C.muted, marginBottom: 24 }}>{score >= 8 ? 'Excellent vocabulary!' : score >= 5 ? 'Good effort!' : 'Keep practising!'}</Text>
            <TouchableOpacity style={styles.retryBtnFull} onPress={() => { setIdx(0); setScore(0); setSelected(null); setDone(false); }}>
              <Text style={styles.retryBtnText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
              <Text style={{ color: C.muted, fontSize: 12 }}>Question {idx + 1} of {VOCAB_WORDS.length}</Text>
              <Text style={{ color: C.gold, fontSize: 12, fontWeight: '700' }}>Score: {score}</Text>
            </View>
            <View style={[styles.probBar, { height: 4, marginBottom: 20, backgroundColor: 'rgba(255,255,255,0.06)' }]}>
              <View style={[styles.probFill, { width: `${((idx) / VOCAB_WORDS.length) * 100}%`, backgroundColor: C.gold }]} />
            </View>
            <View style={[mbStyles.greetBlock, { alignItems: 'center', marginBottom: 24 }]}>
              <Text style={{ color: C.gold, fontSize: 10, fontWeight: '700', letterSpacing: 2, marginBottom: 8 }}>DEFINE THIS WORD</Text>
              <Text style={{ color: C.white, fontSize: 28, fontWeight: '800', letterSpacing: -0.5 }}>{current.word}</Text>
            </View>
            {current.options.map((opt, i) => {
              let bg = 'rgba(255,255,255,0.04)', border = C.border, textColor = C.muted;
              if (selected !== null) {
                if (i === current.answer)                         { bg = C.cyan + '18'; border = C.cyan; textColor = C.cyan; }
                else if (i === selected && selected !== current.answer) { bg = C.rose + '18'; border = C.rose; textColor = C.rose; }
              }
              return (
                <TouchableOpacity key={i} onPress={() => handleAnswer(i)} activeOpacity={0.8}
                  style={{ borderWidth: 1, borderColor: border, borderRadius: 12, padding: 14, marginBottom: 10, backgroundColor: bg }}>
                  <Text style={{ color: textColor, fontSize: 13, lineHeight: 20 }}>{opt}</Text>
                </TouchableOpacity>
              );
            })}
          </>
        )}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
});

// ─── BRAIN TEASERS ───────────────────────────────────────────────
const BrainTeaserGame = React.memo(({ streak, onStreakUpdate }) => {
  const [idx, setIdx]         = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone]       = useState(false);

  const handleNext = () => {
    if (idx < RIDDLES.length - 1) { setIdx(i => i + 1); setRevealed(false); }
    else { setDone(true); onStreakUpdate(); }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <View style={styles.litHeader}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.litCat, { color: C.rose }]}>PUZZLES  ·  BRAIN TEASERS</Text>
          <Text style={styles.litHeadline}>Mind-Bending Riddles 🧠</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: C.gold, fontSize: 16, fontWeight: '800' }}>🔥 {streak}</Text>
          <Text style={{ color: C.muted, fontSize: 9 }}>STREAK</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <ScrollView contentContainerStyle={{ padding: 18 }} showsVerticalScrollIndicator={false}>
        {done ? (
          <View style={{ alignItems: 'center', paddingTop: 40 }}>
            <Text style={{ fontSize: 50, marginBottom: 16 }}>🧠</Text>
            <Text style={[mbStyles.greetText, { textAlign: 'center', marginBottom: 8 }]}>All Riddles Done!</Text>
            <Text style={{ color: C.muted, marginBottom: 24, textAlign: 'center' }}>Your brain is razor sharp. Come back tomorrow!</Text>
            <TouchableOpacity style={styles.retryBtnFull} onPress={() => { setIdx(0); setRevealed(false); setDone(false); }}>
              <Text style={styles.retryBtnText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
              <Text style={{ color: C.muted, fontSize: 12 }}>Riddle {idx + 1} of {RIDDLES.length}</Text>
            </View>
            <View style={[styles.probBar, { height: 4, marginBottom: 20 }]}>
              <View style={[styles.probFill, { width: `${(idx / RIDDLES.length) * 100}%`, backgroundColor: C.rose }]} />
            </View>
            <View style={[mbStyles.greetBlock, { marginBottom: 20 }]}>
              <Text style={{ color: C.rose, fontSize: 10, fontWeight: '700', letterSpacing: 2, marginBottom: 10 }}>THE RIDDLE</Text>
              <Text style={{ color: C.white, fontSize: 16, lineHeight: 26, fontStyle: 'italic' }}>{RIDDLES[idx].q}</Text>
            </View>
            {!revealed ? (
              <TouchableOpacity onPress={() => setRevealed(true)} style={[styles.retryBtnFull, { backgroundColor: C.rose + 'cc' }]} activeOpacity={0.8}>
                <Text style={styles.retryBtnText}>Reveal Answer</Text>
              </TouchableOpacity>
            ) : (
              <>
                <View style={[styles.questionBlock, { marginBottom: 16 }]}>
                  <Text style={{ color: C.cyan, fontSize: 10, fontWeight: '700', letterSpacing: 2, marginBottom: 8 }}>ANSWER</Text>
                  <Text style={{ color: C.cyan, fontSize: 20, fontWeight: '800' }}>{RIDDLES[idx].a}</Text>
                </View>
                <TouchableOpacity onPress={handleNext} style={styles.retryBtnFull} activeOpacity={0.8}>
                  <Text style={styles.retryBtnText}>{idx < RIDDLES.length - 1 ? 'Next Riddle →' : 'Finish!'}</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
});

// ─── PUZZLE HUB (selector) ────────────────────────────────────────
const PuzzleDetailScreen = React.memo(({ streak, onStreakUpdate }) => {
  const [subGame, setSubGame] = useState(null);

  if (subGame === 'sudoku') return <SudokuGame streak={streak} onStreakUpdate={onStreakUpdate} />;
  if (subGame === 'vocab')  return <VocabGame  streak={streak} onStreakUpdate={onStreakUpdate} />;
  if (subGame === 'brain')  return <BrainTeaserGame streak={streak} onStreakUpdate={onStreakUpdate} />;

  const games = [
    { id: 'sudoku', label: 'Daily Sudoku',     desc: 'Fill the 9×9 grid with numbers 1-9',     emoji: '🔢', color: C.indigo },
    { id: 'vocab',  label: 'Vocabulary Quiz',  desc: '10 advanced English words to test',       emoji: '📚', color: C.gold  },
    { id: 'brain',  label: 'Brain Teasers',    desc: '5 mind-bending riddles',                  emoji: '🧠', color: C.rose  },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <View style={styles.litHeader}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.litCat, { color: C.cyan }]}>PUZZLES</Text>
          <Text style={styles.litHeadline}>Choose Your Challenge 🎮</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: C.gold, fontSize: 20, fontWeight: '800' }}>🔥{streak}</Text>
          <Text style={{ color: C.muted, fontSize: 9, letterSpacing: 1 }}>DAY STREAK</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <ScrollView contentContainerStyle={{ padding: 18 }} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[C.gold + '20', C.gold + '08']} style={[mbStyles.greetBlock, { alignItems: 'center', marginBottom: 24 }]}>
          <Text style={{ fontSize: 40, marginBottom: 8 }}>🔥</Text>
          <Text style={[mbStyles.greetText, { textAlign: 'center' }]}>Current Streak: {streak} Days</Text>
          <Text style={{ color: C.gold, fontSize: 12, marginTop: 4 }}>Complete a puzzle daily to keep your streak!</Text>
        </LinearGradient>

        {games.map(g => (
          <TouchableOpacity key={g.id} onPress={() => setSubGame(g.id)} activeOpacity={0.85}
            style={[mbStyles.storyCard, { borderLeftWidth: 3, borderLeftColor: g.color, marginBottom: 14 }]}>
            <Text style={{ fontSize: 32, marginRight: 4 }}>{g.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[mbStyles.storyTitle, { color: g.color, fontSize: 16 }]}>{g.label}</Text>
              <Text style={mbStyles.storySummary}>{g.desc}</Text>
              <View style={[mbStyles.catPill, { backgroundColor: g.color + '18', borderColor: g.color + '35', marginTop: 8 }]}>
                <Text style={{ color: g.color, fontSize: 10, fontWeight: '700' }}>Play Now →</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
});

export default PuzzleDetailScreen;