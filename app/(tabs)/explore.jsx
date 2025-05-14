import { View, Text ,TextInput} from 'react-native'
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import Category from '../../components/Home/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import ExploreList from '../../components/Expole/ExploreList';

export default function Explore() {

  const [caregivers, setCaregivers] = useState([]);

  const GetCaregiverByCategory=async(category)=>{
    const q=query(collection(db,'CategoryList', where('category','==',category)))

    const querySnapshot=await getDocs(q);
    querySnapshot.forEach((doc)=>{
      console.log(doc.data())
      setCaregivers(prev=>[...prev,{id:doc.id,...doc.data()}]);
    })
  }
  return (
    <View style={{padding :20}}>
      <Text style={{fontFamily:'outfit-bold', fontSize:30,marginTop:30}}>Explor More</Text>

      {/**Search Bar */}

      <View style={{display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    marginTop: 10,
    borderWidth:1,
    borderColor:Colors.PRIMARY,
    borderRadius: 8,marginBottom:30}}>
        <Ionicons name="search" size={24} color={Colors.light.grey3} />
        <TextInput placeholder='Search....' style={{ fontFamily: 'outfit', fontSize: 16 }} />
      </View>

      {/**Category list */}
      
      <Category 
      explore={true}
      OnCategorySelect={(category)=> GetCaregiverByCategory(category)}
      />

      <ExploreList caregivers={caregivers} />

    </View>
  )
}