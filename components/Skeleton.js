import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const Skeleton = React.memo(({ width = '100%', height = 12, mb = 8 }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 950, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 950, useNativeDriver: true }),
      ])
    ).start();
    return () => anim.stopAnimation();
  }, []);

  return (
    <Animated.View style={{
      width, height, backgroundColor: '#fff',
      opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0.04, 0.13] }),
      borderRadius: 5, marginBottom: mb,
    }} />
  );
});

export default Skeleton;