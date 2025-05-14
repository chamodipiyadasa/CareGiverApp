// BookingForm.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { db } from '../../config/FirebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const BookingForm = () => {
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [caregiverType, setCaregiverType] = useState('Baby Caregiver');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = async () => {
    try {
      // Create the booking document
      const bookingDoc = await addDoc(collection(db, 'bookings'), {
        fullName,
        location,
        phoneNumber,
        caregiverType,
        date: date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
      });

      // Notify caregivers
      await notifyCaregivers(bookingDoc.id); // Call notify function

      Alert.alert('Success', 'Booking submitted successfully!');
      // Clear form fields
      setFullName('');
      setLocation('');
      setPhoneNumber('');
      setCaregiverType('Baby Caregiver');
      setDate(new Date());
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'Error submitting booking.');
    }
  };

  const notifyCaregivers = async (bookingId) => {
    // Fetch caregivers based on location and caregiver type
    const caregiversRef = collection(db, 'caregivers');
    const q = query(caregiversRef, where('location', '==', location), where('type', '==', caregiverType));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // Here you would send a notification to the caregiver.
      // This is just a placeholder; implement your notification logic
      console.log(`Notify ${doc.data().name}: New booking ID ${bookingId}`);
    });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
      
      <Text style={styles.title}>Emergency Booking</Text>

      
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={caregiverType}
          style={styles.picker}
          onValueChange={(itemValue) => setCaregiverType(itemValue)}
        >
          <Picker.Item label="Baby Caregiver" value="Baby Caregiver" />
          <Picker.Item label="Adult Caregiver" value="Adult Caregiver" />
          <Picker.Item label="Nurse" value="Nurse" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>{date.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    padding: 10,
    marginTop:10,
    backgroundColor: '#f7f9fc',
  },
  input: {
    height: 50,
    borderColor: '#00796b',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#00796b',
    height: 50,
    paddingTop: 10,
    fontSize: 20,
    fontFamily:'outfit-bold',
    borderRadius: 10,
    color: '#fff',
  },
  pickerContainer: {
    borderColor: '#00796b',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  dateInput: {
    height: 50,
    borderColor: '#00796b',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    lineHeight: 50,
  },
  button: {
    height: 50,
    backgroundColor: '#00796b',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily:'outfit-bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
},
closeButtonText: {
    fontSize: 18,
    color: '#000',
},
});

export default BookingForm;
