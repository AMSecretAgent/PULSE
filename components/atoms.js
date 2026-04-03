import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/index';
import { C } from '../constants/colors';

export const InfoBlock = ({ children, style }) => (
  <View style={[styles.infoBlock, style]}>{children}</View>
);

export const FieldLabel = ({ children, color = C.indigo, style }) => (
  <Text style={[styles.fieldLabel, { color }, style]}>{children}</Text>
);

export const Body = ({ children, style }) => (
  <Text style={[styles.bodyText, style]}>{children}</Text>
);