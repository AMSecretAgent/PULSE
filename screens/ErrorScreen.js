import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { C } from '../constants/colors';
import { styles } from '../styles/index';

export default function ErrorScreen({ onRetry }) {
  return (
    <View style={styles.loadingScreen}>
      <Text style={styles.logo}>PULSE</Text>
      <Text style={[styles.loadingText, { color: C.rose, marginTop: 20, marginBottom: 6 }]}>
        Could not load news
      </Text>
      <Text style={[styles.loadingText, { fontSize: 11, marginBottom: 20 }]}>
        Check your NewsAPI key and internet
      </Text>
      <TouchableOpacity onPress={onRetry} style={styles.retryBtnFull}>
        <Text style={styles.retryBtnText}>Tap to Retry</Text>
      </TouchableOpacity>
    </View>
  );
}