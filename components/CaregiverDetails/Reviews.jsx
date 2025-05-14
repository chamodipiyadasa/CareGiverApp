import { View, Text, TextInput, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { Rating } from 'react-native-elements';
import { Colors } from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';

export default function Reviews({ caregiver, bookingData }) {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState('');
  const [user] = useState({
    fullName: 'John Doe',  // Example user, replace with real user data if available
    imageUrl: 'https://example.com/user-image.jpg'  // Example image URL, replace with actual user data
  });

  const onSubmit = async () => {
    try {
      const docRef = doc(db, 'CategoryList', caregiver?.id);

      // Helper function to calculate average rating
      const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return 0; // No reviews, average is 0
    
        const total = reviews.reduce((sum, review) => sum + review.rating, 0); // Sum of ratings
        const newTotal = total + rating;
        console.log(newTotal)
        console.log(reviews.length+1)
        console.log(newTotal / (reviews.length+1))
        return newTotal / (reviews.length+1); // Average
      };

      const averageRating = calculateAverageRating(caregiver.reviews || []);
      

      // Adding booking details to the review
      await updateDoc(docRef, {
        totalrating: averageRating,
        reviews: arrayUnion({
          rating: rating,
          comment: userInput,
          userName: user?.fullName,
          userImage: user?.imageUrl,
          date : new Date().toISOString(),
        })
      });

      ToastAndroid.show('Comment Added Successfully!', ToastAndroid.BOTTOM);
    } catch (error) {
      console.error('Error adding review:', error);
      ToastAndroid.show('Failed to add comment. Please try again.', ToastAndroid.BOTTOM);
    }
  };

  return (
    <View style={{ padding: 10, backgroundColor: '#fff' }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>Reviews</Text>

      <View>
        <Rating
          showRating={false}
          imageSize={20}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />

        <TextInput
          placeholder='Write Your Comment'
          placeholderTextColor='black'
          onChangeText={(value) => setUserInput(value)}
          numberOfLines={4}
          multiline
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.light.grey1,
            color: Colors.light.grey3,
            textAlignVertical: 'top',
            height: 100,
          }}
        />

        <TouchableOpacity
          disabled={!userInput}
          onPress={onSubmit}
          style={{
            marginTop: 20,
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: Colors.PRIMARY,
            paddingVertical: 15,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'outfit-bold' }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
