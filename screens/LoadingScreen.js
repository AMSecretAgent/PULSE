import React, { useRef, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { C } from '../constants/colors';
import { styles } from '../styles/index';

export default function LoadingScreen() {
  const dots = [
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
  ];

  useEffect(() => {
    dots.forEach((d, i) => {
      Animated.loop(Animated.sequence([
        Animated.delay(i * 200),
        Animated.timing(d, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(d, { toValue: 0.3, duration: 500, useNativeDriver: true }),
      ])).start();
    });
  }, []);

  return (
    <View style={styles.loadingScreen}>
      <Text style={styles.logo}>PULSE</Text>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 20, marginBottom: 12 }}>
        {dots.map((d, i) => (
          <Animated.View key={i} style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: C.indigo, opacity: d }} />
        ))}
      </View>
      <Text style={styles.loadingText}>Fetching live news...</Text>
    </View>
  );
}