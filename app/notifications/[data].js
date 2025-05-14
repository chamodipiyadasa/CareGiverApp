import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-react';

export default function Notifications() {
  const { user } = useUser();
  const userEmail = user.emailAddresses[0]?.emailAddress;
  console.log(userEmail);
  const [alerts, setAlerts] = useState([]); // State to hold alerts

  // Fetch alerts from Firestore where the user email matches the current user email
  const getAlerts = async () => {
    const q = query(
      collection(db, 'alert'),
      where('userEmail', '==', userEmail) // Use the user's email
    );

    const querySnapshot = await getDocs(q);
    const fetchedAlerts = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const alertData = {
          id: doc.id,
          ...doc.data(),
        };
        return alertData;
      })
    );

    console.log(fetchedAlerts)
    setAlerts(fetchedAlerts); // Update state with fetched alerts
  };

  useEffect(() => {
    getAlerts();
  }, []);

  // Render alert items with conditional card background color based on status
  const renderItem = ({ item }) => {
    // Determine the background color based on the status
    const cardBackgroundColor =
      item.status === 'Accepted'
        ? '#e6f9e6'  // Light green for accepted
        : item.status === 'Rejected'
        ? '#fde8e8'  // Light red for rejected
        : '#fff';   // Default white background for other statuses

    return (
      <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
        <Text style={styles.caregiverText}>
          {item.caregiverName || 'N/A'} {item.status || 'N/A'} <Text>your request</Text>
        </Text>
        <Text style={styles.dateText}>
          <Text>Appointment date: </Text>
          {item.appointmentCreatedAt}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={alerts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ width: '100%' }} // To use the full width for the FlatList
        contentContainerStyle={styles.flatListContent} // Add padding to FlatList
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 50,
  },
  flatListContent: {
    paddingHorizontal: 20, // Optional padding for FlatList content
  },
  card: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  caregiverText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#555',
  },
});
