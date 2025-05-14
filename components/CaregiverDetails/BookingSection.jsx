import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, ToastAndroid, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import { collection, addDoc } from 'firebase/firestore'; // Import addDoc and collection
import { db } from '../../config/FirebaseConfig';
import Reviews from './Reviews'; // Import the Reviews component
import { useUser } from '@clerk/clerk-react'

export default function BookingSection({ caregiver }) {
    const {user} =useUser();
    console.log(user.id);
    const router = useRouter();
    const [next7Days, setNext7Days] = useState([]);
    const [timeList, setTimeList] = useState([]);
    const [selectDate, setSelectDate] = useState();
    const [selectedTime, setSelectedTime] = useState();
    const [isModalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [bookingData, setBookingData] = useState(null); // New state for booking data

    useEffect(() => {
        getDays();
        getTime();
    }, []);

    const getDays = () => {
        const today = moment();
        const nextSevenDays = [];
        for (let i = 0; i < 7; i++) {
            const date = moment().add(i, 'days');
            nextSevenDays.push({
                date: date,
                day: date.format('ddd'),
                formattedDate: date.format('Do MMM'),
            });
        }
        setNext7Days(nextSevenDays);
    };

    const getTime = () => {
        const timeList = [];
        for (let i = 8; i <= 12; i++) {
            timeList.push({ time: `${i}:00 AM` });
            timeList.push({ time: `${i}:30 AM` });
        }
        for (let i = 1; i <= 12; i++) {
            timeList.push({ time: `${i}:00 PM` });
            timeList.push({ time: `${i}:30 PM` });
        }
        setTimeList(timeList);
    };

    const handleBooking = async () => {
        if (!username || !email || !phoneNumber || !address || !selectDate || !selectedTime) {
            ToastAndroid.show('Please fill in all details.', ToastAndroid.BOTTOM);
            return;
        }

        // Basic email validation
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            ToastAndroid.show('Please enter a valid email address.', ToastAndroid.BOTTOM);
            return;
        }

        try {
            const bookingData = {
                userId: user.id,
                username,
                email,
                phoneNumber,
                address,
                date: selectDate.format('Do MMM YYYY'),
                time: selectedTime,
                caregiverId: caregiver.id, 
                caregiverName: caregiver.name,
                status : 'Pending'
            };

            // Add the booking to the 'appoinment' collection
            await addDoc(collection(db, 'appoinment'), bookingData);

            ToastAndroid.show('Booking successfully added!', ToastAndroid.BOTTOM);
            setModalVisible(false);
            setBookingData(bookingData); // Set booking data for reviews
        } catch (error) {
            console.error('Error booking appointment:', error);
            ToastAndroid.show('Failed to book the appointment. Please try again.', ToastAndroid.BOTTOM);
        }
    };

    return (
        <View style={{ backgroundColor: "#fff" }}>
            <Text style={styles.sectionTitle}>Booking Appointment</Text>
            <Text style={styles.subTitle}>Day</Text>
            <FlatList
                data={next7Days}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelectDate(item.date)}
                        style={[styles.dayButton, selectDate && selectDate.isSame(item.date) ? { backgroundColor: Colors.PRIMARY } : null]}
                    >
                        <Text style={[styles.dayText, selectDate && selectDate.isSame(item.date) ? { color: '#fff' } : null]}>
                            {item.day}
                        </Text>
                        <Text style={[styles.dayTextBold, selectDate && selectDate.isSame(item.date) ? { color: '#fff' } : null]}>
                            {item.formattedDate}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <Text style={styles.subTitle}>Time</Text>
            <FlatList
                data={timeList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelectedTime(item.time)}
                        style={[styles.dayButton, selectedTime === item.time ? { backgroundColor: Colors.PRIMARY } : null]}
                    >
                        <Text style={[styles.timeText, selectedTime === item.time ? { color: '#fff' } : null]}>
                            {item.time}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity style={styles.bookButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.bookButtonText}>Book Appointment</Text>
            </TouchableOpacity>

            {/* Modal for booking details */}
            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>

                        {/* Added image */}
                        <Image
                            source={require('../../assets/images/3908990.jpg')} // Add your image path here
                            style={styles.image}
                        />

                        <Text style={styles.modalTitle}>Enter Your Details</Text>

                        <TextInput
                            placeholder="Username"
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            placeholder="Email"
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        <TextInput
                            placeholder="Phone Number"
                            style={styles.input}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                        />
                        <TextInput
                            placeholder="Address"
                            style={styles.input}
                            value={address}
                            onChangeText={setAddress}
                        />

                        <TouchableOpacity style={styles.submitButton} onPress={handleBooking}>
                            <Text style={styles.submitButtonText}>Submit Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Render the Reviews component and pass bookingData */}
            {bookingData && <Reviews caregiver={caregiver} bookingData={bookingData} />}
        </View>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        marginLeft: 10,
        marginTop: 10,
        fontSize: 18,
        color: Colors.light.grey3,
    },
    subTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 30,
        marginTop: 5,
        marginLeft: 10,
    },
    dayButton: {
        borderWidth: 1,
        borderRadius: 99,
        padding: 5,
        marginTop: 20,
        marginLeft: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginRight: 10,
        borderColor: Colors.light.grey2,
    },
    dayText: {
        fontFamily: 'outfit',
    },
    dayTextBold: {
        fontFamily: 'outfit-bold',
    },
    timeText: {
        fontFamily: 'outfit-bold',
    },
    bookButton: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'outfit-bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 15,
        borderRadius: 50,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 15,
        fontFamily: 'outfit-bold',
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: Colors.light.grey2,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'outfit-bold',
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
