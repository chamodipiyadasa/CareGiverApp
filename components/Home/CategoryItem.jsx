import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors'; // Keep this import for your color constants

export default function CategoryItem({ category, onCategoryPress }) {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)}>
      <View
        style={{
          width: 80, // Set fixed width
          height: 100, // Set fixed height
          padding: 15,
          backgroundColor: Colors.SECONDARY,
          borderRadius: 10,
          marginRight: 15,
          alignItems: 'center', // Center content horizontally
          justifyContent: 'center', // Center content vertically
        }}
      >
        <Image
          source={{ uri: category.icon }}
          style={{
            width: 40,
            height: 40,
            marginBottom: 10, // Add margin to separate from text
          }}
        />
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'outfit-medium',
            textAlign: 'center',
            flexWrap: 'wrap', // Allow text to wrap into multiple lines
          }}
          numberOfLines={2} // Ensure it only shows 2 lines max
          ellipsizeMode="tail" // Show "..." if the text overflows
        >
          {category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
