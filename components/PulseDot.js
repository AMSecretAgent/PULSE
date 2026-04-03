import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { C } from '../constants/colors';

const PulseDot = React.memo(({ color = C.cyan, size = 7 }) => {
  const anim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(anim, { toValue: 0.4, duration: 900, useNativeDriver: true }),
    ])).start();
    return () => anim.stopAnimation();
  }, []);

  return (
    <Animated.View style={{
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: color, opacity: anim,
    }} />
  );
});

export default PulseDot;