import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CaregiverListCard from './CaregiverListCard'

export default function ExploreList({caregivers}) {
  return (
    <View>
      <FlatList  
        data={caregivers}
        renderItem={({item,index})=>(
            <View>
                <CaregiverListCard 
                key={index}
                caregivers={item} />
            </View>
        )}
      />
    </View>
  )
}