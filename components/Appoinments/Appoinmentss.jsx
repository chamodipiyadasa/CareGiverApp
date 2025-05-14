import { View, Text, FlatList, StyleSheet, ToastAndroid, TouchableOpacity, TextInput, Modal, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import the date-time picker

const AppointmentPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false); // To toggle the date picker
    const [showTimePicker, setShowTimePicker] = useState(false); // To toggle the time picker

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Fetch appointments from Firestore
    const fetchAppointments = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'appoinment'));
            const appointmentsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAppointments(appointmentsList);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            ToastAndroid.show('Failed to fetch appointments.', ToastAndroid.BOTTOM);
            setLoading(false);
        }
    };

    // Delete an appointment from Firestore
    const deleteAppointment = async (id) => {
        try {
            await deleteDoc(doc(db, 'appoinment', id));
            setAppointments(appointments.filter((item) => item.id !== id));
            ToastAndroid.show('Appointment deleted successfully.', ToastAndroid.BOTTOM);
        } catch (error) {
            console.error('Error deleting appointment:', error);
            ToastAndroid.show('Failed to delete appointment.', ToastAndroid.BOTTOM);
        }
    };

    // Handle updating appointment in Firestore
    const updateAppointment = async () => {
        try {
            const appointmentRef = doc(db, 'appoinment', currentAppointment.id);
            await updateDoc(appointmentRef, { ...currentAppointment });
            setIsModalVisible(false);
            ToastAndroid.show('Appointment updated successfully.', ToastAndroid.BOTTOM);
            fetchAppointments(); // Refresh appointments after update
        } catch (error) {
            console.error('Error updating appointment:', error);
            ToastAndroid.show('Failed to update appointment.', ToastAndroid.BOTTOM);
        }
    };

    const handleEdit = (appointment) => {
        setCurrentAppointment(appointment);
        setIsModalVisible(true); // Show modal with form
    };

    // Date and time picker handlers
    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setCurrentAppointment({ ...currentAppointment, date: selectedDate.toDateString() });
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            const timeString = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setCurrentAppointment({ ...currentAppointment, time: timeString });
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.appointmentItem}>
            <Text style={styles.appointmentText}>Name: {item.username}</Text>
            <Text style={styles.appointmentText}>Email: {item.email}</Text>
            <Text style={styles.appointmentText}>Phone: {item.phoneNumber}</Text>
            <Text style={styles.appointmentText}>Address: {item.address}</Text>
            <Text style={styles.appointmentText}>Date: {item.date}</Text>
            <Text style={styles.appointmentText}>Time: {item.time}</Text>
            <Text style={styles.appointmentText}>Status: {item.status}</Text>

            {/* Edit button */}
            <TouchableOpacity 
                style={styles.editButton} 
                onPress={() => handleEdit(item)}
            >
                <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>

            {/* Delete button */}
            <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => deleteAppointment(item.id)}
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Appointments</Text>
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

            {/* Modal for editing appointment */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Appointment</Text>

                        {/* Form fields */}
                        <TextInput
                            style={styles.input}
                            value={currentAppointment?.username}
                            onChangeText={(text) => setCurrentAppointment({ ...currentAppointment, username: text })}
                            placeholder="Name"
                        />
                        <TextInput
                            style={styles.input}
                            value={currentAppointment?.email}
                            onChangeText={(text) => setCurrentAppointment({ ...currentAppointment, email: text })}
                            placeholder="Email"
                        />
                        <TextInput
                            style={styles.input}
                            value={currentAppointment?.phoneNumber}
                            onChangeText={(text) => setCurrentAppointment({ ...currentAppointment, phoneNumber: text })}
                            placeholder="Phone Number"
                        />
                        <TextInput
                            style={styles.input}
                            value={currentAppointment?.address}
                            onChangeText={(text) => setCurrentAppointment({ ...currentAppointment, address: text })}
                            placeholder="Address"
                        />

                        {/* Date picker */}
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)}
                            style={styles.datePickerButton}
                        >
                            <Text style={styles.datePickerText}>
                                {currentAppointment?.date || "Select Date"}
                            </Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}

                        {/* Time picker */}
                        <TouchableOpacity
                            onPress={() => setShowTimePicker(true)}
                            style={styles.datePickerButton}
                        >
                            <Text style={styles.datePickerText}>
                                {currentAppointment?.time || "Select Time"}
                            </Text>
                        </TouchableOpacity>
                        {showTimePicker && (
                            <DateTimePicker
                                value={new Date()}
                                mode="time"
                                display="default"
                                onChange={handleTimeChange}
                            />
                        )}

                        {/* Custom Update button */}
                        <TouchableOpacity style={styles.updateButton} onPress={updateAppointment}>
                            <Text style={styles.updateButtonText}>Update</Text>
                        </TouchableOpacity>

                        {/* Custom Cancel button */}
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    title: {
        textAlign: 'center',
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#00796b',
        height: 50,
        paddingTop: 10,
        fontSize: 20,
        fontFamily: 'outfit-bold',
        borderRadius: 10,
        color: '#fff',
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
    },
    appointmentList: {
        paddingBottom: 20,
    },
    appointmentItem: {
        backgroundColor: Colors.backgroundColor,
        paddingVertical: 30,
        paddingHorizontal: 25,
        marginVertical: 12,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: Colors.light.grey4,
    },
    appointmentText: {
        fontSize: 17,
        color: Colors.light.grey3,
        marginBottom: 8,
        lineHeight: 24,
        fontWeight: '500',
    },
    editButton: {
        backgroundColor: Colors.PRIMARY, // Edit button color
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 20,
    },
    deleteButton: {
        backgroundColor: '#cd6155', // Delete button color
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    updateButton: {
        backgroundColor: '#28a745', // Green color for update
        paddingVertical: 12,
        borderRadius: 8,
        marginVertical: 10,
    },
    updateButtonText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 18,
    },
    cancelButton: {
        backgroundColor: '#dc3545', // Red color for cancel
        paddingVertical: 12,
        borderRadius: 8,
    },
    cancelButtonText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 18,
    },

    datePickerButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    datePickerText: {
        fontSize: 16,
        color: '#333',
    },
});

export default AppointmentPage;