import { View, Text, FlatList, StyleSheet, ToastAndroid, TouchableOpacity, Modal, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { Colors } from '../../constants/Colors';

const AppointmentPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState(null);

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Fetch appointments from Firestore
    const fetchAppointments = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'appoinment'));
            const appointmentsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAppointments(appointmentsList);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            ToastAndroid.show('Failed to fetch appointments.', ToastAndroid.BOTTOM);
            setLoading(false);
        }
    };

    // Function to handle "View" button click
    const handleViewPress = (appointment) => {
        setCurrentAppointment(appointment); // Set the current appointment to show details
        setIsModalVisible(true); // Open the modal
    };

    const renderItem = ({ item }) => (
        <View style={styles.appointmentItem}>
            <Text style={{ marginBottom: 10, fontFamily: 'outfit-bold', fontSize: 20 }}>Dr. Dinuth Rashmika Weladagoda</Text>
            <Text style={styles.appointmentText}>Name: {item.username}</Text>
            <Text style={styles.appointmentText}>Email: {item.email}</Text>
            <Text style={styles.appointmentText}>Phone: {item.phoneNumber}</Text>
            <Text style={styles.appointmentText}>Address: {item.address}</Text>
            <Text style={styles.appointmentText}>Date: {item.date}</Text>
            <Text style={styles.appointmentText}>Time: {item.time}</Text>

            {/* View Button */}
            <TouchableOpacity style={styles.viewButton} onPress={() => handleViewPress(item)}>
                <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <Text style={styles.loadingText}>Loading appointments...</Text>
            ) : (
                <FlatList
                    data={appointments}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.appointmentList}
                />
            )}

            {/* Modal for viewing details */}
            <Modal visible={isModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Appointment Details</Text>
                        {currentAppointment && (
                            <>
                                <Text style={styles.modalText}>Name: {currentAppointment.username}</Text>
                                <Text style={styles.modalText}>Email: {currentAppointment.email}</Text>
                                <Text style={styles.modalText}>Phone: {currentAppointment.phoneNumber}</Text>
                                <Text style={styles.modalText}>Address: {currentAppointment.address}</Text>
                                <Text style={styles.modalText}>Date: {currentAppointment.date}</Text>
                                <Text style={styles.modalText}>Time: {currentAppointment.time}</Text>
                            </>
                        )}
                        <Button title="Close" onPress={() => setIsModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: -20,
        paddingHorizontal: 20,
        paddingVertical: -5,
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
    },
    appointmentList: {
        paddingBottom: 20,
    },
    appointmentItem: {
        backgroundColor: Colors.SECONDARY,
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginVertical: 12,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
    },
    appointmentText: {
        fontSize: 17,
        color: Colors.light.grey2,
        marginBottom: 8,
        lineHeight: 24,
        fontWeight: '500',
    },
    viewButton: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        alignItems: 'center',
    },
    viewButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 8,
    },
});

export default AppointmentPage;
