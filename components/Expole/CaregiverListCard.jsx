import { View, Text ,Image} from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors';

export default function CaregiverListCard({caregivers}) {
  return (
    <View style={{marginTop:10}}>
      <Image source={{uri:caregivers?.imageUrl}}
      
      style={{width:'100%', height:250, borderTopLeftRadius:15,borderTopRightRadius:15, marginTop:10}}/>

  <View>
    <Text style={{
      fontFamily: 'outfit-bold',
      fontSize: 20,
      color: Colors.PRIMARY
    }}>{caregivers.name}</Text>
    <Text style={{
      fontFamily: 'outfit',
    }}>{caregivers.cartifide}</Text>
    <Text style={{
      fontFamily: 'outfit',
    }}>{caregivers.age}</Text>
    <Text style={{
      fontFamily: 'outfit',
    }}>{caregivers.experiance}</Text>
    <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
      <Image 
        source={require('./../../assets/images/star.png')}
        style={{ width: 15, height: 15 }}
      />
      <Text style={{ fontFamily: 'outfit' }}>5</Text>
    </View>
  </View>
    </View>
  )
}