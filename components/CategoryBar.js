import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { FEED_CATEGORIES } from '../constants/data';
import { feedStyles } from '../styles/feedStyles';

const CategoryBar = React.memo(({ activeCategory, onSelect }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={feedStyles.catBarScroll}
    contentContainerStyle={feedStyles.catBarContent}
    keyboardShouldPersistTaps="handled"
  >
    {FEED_CATEGORIES.map(cat => {
      const isActive = activeCategory === cat.id;
      return (
        <TouchableOpacity
          key={cat.id}
          onPress={() => onSelect(cat.id)}
          activeOpacity={0.75}
          style={[feedStyles.catChip, isActive ? feedStyles.catChipActive : feedStyles.catChipInactive]}
        >
          <Text style={[feedStyles.catChipText, isActive ? feedStyles.catChipTextActive : feedStyles.catChipTextInactive]}>
            {cat.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
));

export default CategoryBar;