import { View, Text, Image, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Ebook from '../Emarbooking/EmarBook'; // Import your BookingForm component
import { useRouter } from 'expo-router';

export default function Header() {
  const router = useRouter();
  const { user } = useUser();
  
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

  const handleEmergencyClick = () => {
    setModalVisible(true); // Open the modal when the Emergency button is clicked
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close the modal
  };

  const goToNotifications = (data) => {
    router.push('/notifications/' + data);
  }

  return (
    <View style={{ padding: 20, paddingTop: 40, backgroundColor: Colors.PRIMARY, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginVertical: 20
      }}>
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 45, height: 45, borderRadius: 99 }}
        />

        <View>
          <Text style={{ color: '#fff' }}>Welcome,👋</Text>
          <Text style={{ fontSize: 19, fontFamily: 'outfit-medium', color: '#fff' }}>{user?.fullName}</Text>
        </View>

        {/* Bell Icon and Emergency Button Container */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
          {/* Emergency Button */}
          <TouchableOpacity
            onPress={handleEmergencyClick} // Open modal on press
            style={styles.emergencyButton}
          >
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>Emergency</Text>
          </TouchableOpacity>

          {/* Bell Icon */}
          
          <TouchableOpacity
            onPress={() => goToNotifications()}
          >  
          <Ionicons name="notifications" size={24} color="#fff"/>
          </TouchableOpacity>
          
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color={Colors.light.grey3} />
        <TextInput placeholder='Search....' style={{ fontFamily: 'outfit', fontSize: 16 }} />
      </View>

      {/* Modal for Emergency Booking Form */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal} // Close the modal when the back button is pressed
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Button (X) */}
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>

            {/* Content of the modal */}
            <Ebook />

            {/* Cancel Button */}
            <TouchableOpacity onPress={handleCloseModal} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  emergencyButton: {
    backgroundColor: 'red',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 15,
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    marginTop: 10,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    position: 'relative', // For the close button
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: 'red',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
