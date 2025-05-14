import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import Category from '../../components/Home/Category';
import PopularCategory from '../../components/Home/PopularCategory';

export default function Home() {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 1 }}>
      {/* Header */}
      <Header />

      {/* Slider */}
      <Slider />

      {/* Category */}
      <Category />

      {/* Popular Caregivers */}
      <PopularCategory />

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}
