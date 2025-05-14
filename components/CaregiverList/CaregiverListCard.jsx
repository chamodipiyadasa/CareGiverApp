import { View, Image, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function CaregiverListCard({ caregiver }) {

    const router = useRouter();
  
  return (

    <TouchableOpacity
  style={{
    padding: 10,
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    gap: 30
  }}
  onPress={() => router.push(`/caregiverdetails/${caregiver.id}`)}  // Navigate with caregiver.id
>
  <Image
    source={{ uri: caregiver.imageUrl }}
    style={{
      width: 120,
      height: 120,
      borderRadius: 15
    }}
  />
  <View>
    <Text style={{
      fontFamily: 'outfit-bold',
      fontSize: 20,
      color: Colors.PRIMARY
    }}>{caregiver.name}</Text>
    <Text style={{
      fontFamily: 'outfit',
    }}>{caregiver.cartifide}</Text>
    <Text style={{
      fontFamily: 'outfit',
    }}>{caregiver.age}</Text>
    <Text style={{
      fontFamily: 'outfit',
    }}>{caregiver.experiance}</Text>
    <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
      <Image 
        source={require('./../../assets/images/star.png')}
        style={{ width: 15, height: 15 }}
      />
      <Text style={{ fontFamily: 'outfit' }}>
        {caregiver.averageRating ? caregiver.averageRating.toFixed(2) : '0.00'}
      </Text>

    </View>
  </View>
</TouchableOpacity>

  );
}
