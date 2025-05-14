import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import TodayAppointment from './../Home/TodayAppointment';
import { getDocs, limit, query,doc } from 'firebase/firestore';
import PopularCaregiverList from './PopularCaregiverList';
import CategoryItem from './CategoryItem';


export default function PopularCategory() {

  useEffect(() =>{
    GetCaregiverList();
  })

  const [caregivers, setCaregivers] =useState([]);

  const GetCaregiverList= async()=>{
    const q=query(collection(db,'CategoriList'),limit(10));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) =>{
      console.log(doc.data());
      setCaregivers(prev=>[...prev ,doc.data()])
    })
  }
  return (
  <View>
    <View style={{
      padding: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    }}>
      <Text style={{
        paddingLeft: 2,
        fontSize: 20,
        fontFamily: 'outfit-bold',
      }}>
        Upcommings Appointment...
      </Text>
      <TouchableOpacity>
        <Text style={{
          color: Colors.PRIMARY,
          fontFamily: 'outfit-medium',
        }}>
          View All
        </Text>
      </TouchableOpacity>
      
      {/* Display today's appointments */}
      
      
    </View>

<View>
  <TodayAppointment />
</View>

</View>
  );
}
