import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { useUser } from '@clerk/clerk-react'

export default function UserIntro() {
    const {user} =useUser();
  return (
    <View style={{display:'flex',justifyContent:'center',alignItems:'center', marginTop:110}}>
      <Image  source={{uri:user?.imageUrl}}
      
      style={{width:200,
        height:200,
        borderRadius:99
      }}/>

      <Text style={{fontFamily:"outfit-bold", fontSize:30}} >{user?.fullName}</Text>
      <Text style={{fontFamily:"outfit", fontSize:20}}>{user?.primaryEmailAddress.emailAddress}</Text>
    </View>
  )
}