import { View, Text, Image } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function Intro({ caregiver }) {
    const router = useRouter();

    // Add a fallback caregiver object if it's undefined
    const defaultCaregiver = { name: 'Unknown', address: 'Unknown', imageUrl: '' };
    const caregiverData = caregiver || defaultCaregiver;

    return (
        <View>
            <View style={{
                position: 'absolute',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                padding: 20,
                marginTop: 30
            }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back-circle" size={40} color="#fff" />
                </TouchableOpacity>
                <Ionicons name="heart-outline" size={40} color="#fff" />
            </View>

            <Image
                source={{ uri: caregiverData?.imageUrl }} // Use caregiverData
                style={{
                    width: '100%',
                    height: 340
                }}
            />

            <View style={{ padding: 20, marginTop: -20, backgroundColor: "#fff", borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                <Text style={{ fontSize: 26, fontFamily: 'outfit-bold' }}> {caregiverData.name} </Text>
                <Text style={{ fontSize: 18, fontFamily: 'outfit' }}> {caregiverData.address} </Text>
                <Text style={{ fontSize: 18, fontFamily: 'outfit' ,color:Colors.light.grey3}}> {caregiverData.age} </Text>
                <Text style={{ fontSize: 18, fontFamily: 'outfit' ,color:Colors.light.grey3}}> {caregiverData.cartifide} </Text>
                <Text style={{ fontSize: 18, fontFamily: 'outfit',color:Colors.light.grey3 }}> {caregiverData.phone} </Text>
            </View>
        </View>
    );
}
