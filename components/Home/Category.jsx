import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import CategoryItem from './CategoryItem';
import { useRouter } from 'expo-router';

export default function Category({explore=false, OnCategorySelect}) {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter(); // Corrected: Added parentheses to call the hook

  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, 'Category'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList((prev) => [...prev, doc.data()]);
    });
  };

  const onCategoryPressHandler=(item)=>{
    if(!explore){
      router.push('/categorylist/' + item.name)
    }
    else{
        OnCategorySelect(item.name)
    }
  }

  return (
    <View>
      {!explore&&<View
        style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          
        }}
      >
        <Text
          style={{
            paddingLeft: 2,
            fontSize: 20,
            fontFamily: 'outfit-bold',
          }}
        >
          Explore Caregiver Categories
        </Text>
        <Text
          style={{
            color: Colors.PRIMARY,
            fontFamily: 'outfit-medium',
          }}
        >
          View All
        </Text>
      </View> }

      <FlatList
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft: 20 }}
        renderItem={({ item, index }) => (
          <CategoryItem
            category={item}
            key={index}
            onCategoryPress={() => onCategoryPressHandler(item)} // Corrected: Using router.push
          />
        )}
      />
    </View>
  );
}
