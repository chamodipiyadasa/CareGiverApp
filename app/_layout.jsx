import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';

const tokenCache = {
  async getToken(key) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("Error getting token", error);
      return null;
    }
  },

  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error("Error saving token", error);
    }
  }
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf')
  });

  const [showLogin, setShowLogin] = useState(false); // Track whether to show login screen

  if (!fontsLoaded) {
    return null; // Return null or a loading component while fonts are loading
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      {/* If the user is signed in, show the main app */}
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(Tabs)" />
        </Stack>
      </SignedIn>

      {/* If the user is signed out, first show SplashScreen, then show LoginScreen when Get Started is clicked */}
      <SignedOut>
        {!showLogin ? (
          <SplashScreen onGetStarted={() => setShowLogin(true)} />
        ) : (
          <LoginScreen />
        )}
      </SignedOut>
    </ClerkProvider>
  );
}
