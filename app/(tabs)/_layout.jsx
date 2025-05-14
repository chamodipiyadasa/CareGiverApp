
import React from 'react'
import {Tabs} from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from './../../constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:Colors.PRIMARY
    }}>
        <Tabs.Screen name='home'  
        options={{
            tabBarLabel:'Home',
            tabBarIcon:({color}) => <Ionicons name="home" 
            size={24} color={color} />
        }}
        />
        <Tabs.Screen name='explore' 
        options={{
            tabBarLabel:'Explopre',
            tabBarIcon:({color}) => <Ionicons name="search" 
            size={24} color={color} />
        }}/>
        <Tabs.Screen name='profile' 
        options={{
            tabBarLabel:'Profile',
            tabBarIcon:({color}) => <Ionicons name="people" 
            size={24} color={color} />
        }}/>

<Tabs.Screen name='appoinment' 
        options={{
            tabBarLabel:'Appointment',
            tabBarIcon:({color}) => <Ionicons name="book" 
            size={24} color={color} />
        }}/>

<Tabs.Screen name='CategoryListPage' 
        options={{
            tabBarLabel:'Category',
            tabBarIcon:({color}) => <MaterialIcons name="category"  size={24} color={color} />
        }}/>

    </Tabs>
  )
}