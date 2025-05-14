import { View, StyleSheet, Image, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import lg from '../assets/images/loginimage.png';
import * as Animatable from 'react-native-animatable';
import { Icon, Button, SocialIcon} from 'react-native-elements'; // Add Header here
import {  parameters } from '../constants/Colors';
import {useWarmUpBrowser} from '../hooks/useWarmUpBrowser'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo';


WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {  // Make sure to pass navigation as a prop
  useWarmUpBrowser();

  const {startOAuthFlow} = useOAuth({strategy: "oauth_google"});

  const onPress = React.useCallback(async () =>{
    try {
        const { createdSessionId, signIn, signUp, setActive} =
        await startOAuthFlow();

        if(createdSessionId){
            setActive({ session: createdSessionId}) ;
        }else{
            // use signIn or signUp for next steps such as MFA
        }

    } catch (error) {
        console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header1}>
        <Image source={lg} style={styles.image} />
        <Text style={styles.headerText1}>LOGIN TO YOUR ACCOUNT</Text>
      </View>

      <View>
        <View style={{ marginTop: 20 }}>
          <TextInput
            style={styles.TextInput1}
            placeholder='Email'
            placeholderTextColor="#86939e"
            
          />
        </View>

        <View style={styles.TextInputContainer}>
          <Animatable.View >
            <Icon
              name='lock'
              iconStyle={{ color: '#86939e' }}
              type='material'
            />
          </Animatable.View>

          <TextInput
            style={styles.TextInputPassword}
            placeholder='Password'
            placeholderTextColor="#86939e"
          />

          <Animatable.View >
            <Icon
              name='visibility-off'
              iconStyle={{ color: '#86939e', marginRight: 20 }}
              type='material'
            />
          </Animatable.View>
        </View>

        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <Button
            title='SIGN IN'
            buttonStyle={parameters.styleButton}
            titleStyle={parameters.buttonTitle}
            onPress={() => console.log('Sign In pressed')}  // Replace with form submit handler
          />
        </View>
      </View>

      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Text style={{ color: "#bdc6cf", textDecorationLine: "underline" }}>Forgot Password?</Text>
      </View>

      <View style={{ alignItems: "center", marginTop: 10, marginBottom: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>OR</Text>
      </View>
      
<TouchableOpacity  onPress={onPress}
style={{ marginHorizontal: 10, marginTop: 5 }}>
      
        <SocialIcon
          title='Sign in with Google'
          button
          type="google"
          style={styles.SocialIcon}
           // Add Google sign-in logic here
        />
      
</TouchableOpacity>

<TouchableOpacity  onPress={onPress}
style={{ marginHorizontal: 10, marginTop: 5 }}>
      
        <SocialIcon
          title='Sign in with Facebook'
          button
          type="facebook"
          style={styles.SocialIcon}
           // Add Google sign-in logic here
        />
      
</TouchableOpacity>

      <View style={{ alignItems: "center", marginTop: 20}}>
        <Text style={{ color: "#5e6977", textDecorationLine: "underline" }}>
          Don't have an account? Sign Up
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header1: {
    alignItems: 'center',
  },
  image: {
    marginTop: 40,
    width: 300,
    height: 300,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  headerText1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
  },
  TextInput1: {
    borderWidth: 1,
    borderColor: "#86939e",
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    height: 50,
    paddingLeft: 20,
    fontSize: 16,
  },
  TextInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#86939e",
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    height: 50,
    paddingLeft: 10,
  },
  TextInputPassword: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
  SocialIcon: {
    borderRadius: 12,
    height: 50,
  },
});
