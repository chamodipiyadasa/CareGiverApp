import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/CaregiverDetails/Intro';
import ActionButton from '../../components/CaregiverDetails/ActionButton';
import About from '../../components/CaregiverDetails/About';
import BookingSection from '../../components/CaregiverDetails/BookingSection';
import Reviews from '../../components/CaregiverDetails/Reviews';

export default function CaregiverDetails() {
  const { caregiverid } = useLocalSearchParams();
  const [caregiverDetails, setCaregiverDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});

  useEffect(() => {
    GetCaregiverDetailsById();
  }, []);

  const GetCaregiverDetailsById = async () => {
    setLoading(true);
    const docRef = doc(db, 'CategoryList', caregiverid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCaregiverDetails({ id: docSnap.id, ...docSnap.data() });
      setLoading(false);
    } else {
      console.log('No Such document');
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator style={{ marginTop: '60%' }} size={'large'} color={Colors.PRIMARY} />
      ) : (
        <View>
          {/* Intro Section */}
          <Intro caregiver={caregiverDetails} />
          {/* Action Button */}
          <ActionButton caregiver={caregiverDetails} />
          {/* About Section */}
          <About caregiver={caregiverDetails} />
          {/**booking section */}
          <BookingSection caregiver={caregiverDetails} setBookingDetails={setBookingDetails} />
          {/**Rating Section */}
          <Reviews caregiver={caregiverDetails} bookingDetails={bookingDetails} />
        </View>
      )}
    </ScrollView>
  );
}