import { View, Text, FlatList,ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import CategoryItem from '../../components/Home/CategoryItem';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function CategoryListPage() {
  const [categoryList, setCategoryList] = useState([]);
  const [numColumns, setNumColumns] = useState(2); // Set initial number of columns
  const router = useRouter(); 
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    setLoading(true);
    setCategoryList([]);
    const q = query(collection(db, 'Category'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setCategoryList((prev) => [...prev, doc.data()]);
      setLoading(false);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      {loading?<ActivityIndicator 

style={{
  marginTop:'60%'
}}
size={'large'}
color={Colors.PRIMARY}
/>: <Text
        style={{
          fontSize: 24,
          fontFamily: 'outfit-bold',
          marginBottom: 20,
          color: '#fff',
          textAlign: 'center',
          backgroundColor: '#00796b',
          padding: 10,
          borderRadius: 10,
          marginTop:80
        }}
      >
        Explore Caregivers Categories
      </Text>}

      {/* Added a unique key that includes numColumns */}
      <FlatList
        data={categoryList}
        numColumns={numColumns}
        key={numColumns}  
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              margin: 10,
              backgroundColor: '#fff',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
              elevation: 3,
            }}
          >
            <CategoryItem
              category={item}
              key={index}
              onCategoryPress={() => router.push('/categorylist/' + item.name)}
            />
          </View>
        )}
      />
    </View>
  );
}
