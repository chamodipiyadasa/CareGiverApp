import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import CaregiverListCard from '../../components/CaregiverList/CaregiverListCard';
import { Colors } from '../../constants/Colors';

export default function CaregiverListByCategory() {
const navigation=useNavigation();

const {category}= useLocalSearchParams();

const [caregiverList, setCaregiveryList] = useState([]);

const [loading,setLoading] = useState(false);

useEffect(()=>{
  navigation.setOptions({
    headerShown:true,
    headerTitle:category,
    
  })

getCaregiverList();

},[])

 /*
  * Used to get caregiver list by category
  */ 
 const getCaregiverList = async () => {
  setLoading(true);

  // Fetch caregivers from the database
  const q = query(
    collection(db, 'CategoryList'),
    where('category', '==', category),
    orderBy('totalrating', 'desc')
  );
  
  const querySnapshot = await getDocs(q);

  // Helper function to calculate average rating
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0; // No reviews, average is 0

    const total = reviews.reduce((sum, review) => sum + review.rating, 0); // Sum of ratings
    return total / reviews.length; // Average
  };

  // Prepare the new caregiver list
  const caregivers = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    
    // Calculate average rating if there are reviews
    const averageRating = calculateAverageRating(data.reviews || []);
    
    return {
      id: doc.id,
      ...data,
      averageRating // Add the average rating to the caregiver data
    };
  });

  

  // Update the state with the fetched caregivers
  setCaregiveryList(caregivers);

  setLoading(false);
};

  return (
    <View >
     {caregiverList?.length >0?
     <FlatList 
        onRefresh={getCaregiverList}
        refreshing={loading}
        data={caregiverList}
        renderItem={({item,index})=>(
          <CaregiverListCard 
          caregiver={item}
          key={index}
          
          />
        )}
      
      />:

      loading?<ActivityIndicator 

      style={{
        marginTop:'60%'
      }}
      size={'large'}
      color={Colors.PRIMARY}
      />:
      <Text
      style={{fontSize:20,
        fontFamily:'outfit-bold',
        color:Colors.light.grey3,
        textAlign:'center',
        marginTop:'50%'
      }}
      
      > No Caregivers Found</Text>}
    </View>
  )
}