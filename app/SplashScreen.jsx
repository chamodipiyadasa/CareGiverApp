import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import lg from './../assets/images/5207292.jpg';
import { Colors } from '@/constants/Colors';

export default function SplashScreen({ onGetStarted }) {
  // Create animated value for the button's Y position
  const buttonY = useRef(new Animated.Value(-200)).current; // Start the button above the screen

  useEffect(() => {
    // Trigger the button drop-down animation when the page loads
    Animated.timing(buttonY, {
      toValue: 0,  // Final position at the bottom of the screen
      duration: 1500,  // Animation duration (1.5 seconds)
      useNativeDriver: true,  // Use native driver for better performance
    }).start();  // Start the animation
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Welcome to CareLink</Text>
        <Image
          source={lg}
          style={styles.image}
        />
        <Text style={styles.title}>Let’s take good care of your health at home</Text>
        
        {/* Animated button that drops down */}
        <Animated.View style={{ transform: [{ translateY: buttonY }] }}>
          <TouchableOpacity
            style={styles.button}
            onPress={onGetStarted}  // Call the function passed from RootLayout
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    height: '90%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    color: Colors.PRIMARY,
    fontSize: 30,
    fontFamily: 'outfit',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 100,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    color: Colors.light.grey3,
    fontSize: 30,
    fontFamily: 'outfit',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#00bfa5',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop: 100,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
});
