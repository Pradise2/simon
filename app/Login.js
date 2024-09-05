import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import supabase from './supabaseClient';
import * as LocalAuthentication from 'expo-local-authentication';
import CryptoJS from 'crypto-js';
import * as Device from 'expo-device';

const Login = () => {
  const [username, setUsername] = useState('');
  const [matricNumber, setMatricNumber] = useState('');
  const [isFingerprintScanned, setIsFingerprintScanned] = useState(false);
  const [fingerprintHash, setFingerprintHash] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const navigation = useNavigation();

  const handleFingerprintScan = async () => {
    console.log("Starting fingerprint scan...");
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate',
        });

        if (result.success) {
          const uniqueString = `${Device.osName}-${Device.osBuildId}`;
          const hashedFingerprint = CryptoJS.SHA256(uniqueString).toString();
          
          setFingerprintHash(hashedFingerprint);
          setIsFingerprintScanned(true);
          console.log("Fingerprint scan successful, hash:", hashedFingerprint);
        } else {
          Alert.alert('Fingerprint Scan Failed');
        }
      } else {
        Alert.alert('Biometric authentication is not available');
      }
    } catch (error) {
      console.log("Fingerprint scan error:", error);
      Alert.alert('Fingerprint Scan Failed', error.message);
    }
  };

  const handleLogin = async () => {
    console.log("Login attempt with:", {
      username,
      matricNumber,
      fingerprintHash,
    });
  
    if (username && matricNumber && fingerprintHash) {
      try {
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .eq('username', username)
          .eq('matricnumber', matricNumber)
          .eq('fingerprintHash', fingerprintHash);
  
        console.log("Supabase response:", { data, error });
  
        if (error) {
          console.error("Supabase error:", error.message);
          Alert.alert('Error', "An error occurred while trying to login.");
        } else if (data.length === 0) {
          setLoginFailed(true); // Show error message if no matching record is found
        } else {
          setLoginFailed(false);
          // Pass username and matric number to the Dashboard
          navigation.navigate('DashBoard', {
            username: data[0].username,
            matricNumber: data[0].matricnumber,
          });
        }
      } catch (err) {
        console.log('Login Error:', err);
        Alert.alert('Login Failed', err.message);
      }
    } else {
      Alert.alert('Error', 'Please enter your credentials and scan your fingerprint');
    }
  };
  

  return (
    <View style={tw`flex-1 bg-gray-100 items-center justify-center`}>
      <Image
        source={require('../images/futalogo.png')}
        style={tw`h-40 w-50`} // Adjusted image size
      />
      <Text style={tw`text-2xl mb-4 font-bold text-gray-800`}>Login</Text>
      
      <View style={tw`w-60%`}>
        <Text style={tw`text-sm font-medium text-gray-800`}>Username</Text>
        <TextInput
          value={username}
          onChangeText={text => {
            setUsername(text);
            console.log("Username set to:", text);
          }} 
          placeholder="Enter your username"
          placeholderTextColor="#666"
          style={tw`w-full bg-white border border-gray-800 rounded-lg py-2 px-3 text-gray-800`}
        />
      </View>
      
      <View style={tw`w-60% mt-3`}>
        <Text style={tw`text-sm font-medium text-gray-800`}>Matric Number</Text>
        <TextInput
          value={matricNumber}
          onChangeText={text => {
            setMatricNumber(text);
            console.log("Matric number set to:", text);
          }}
          placeholder="Enter your Matric Number"
          placeholderTextColor="#666"
          style={tw`w-full bg-white border border-gray-800 rounded-lg py-2 px-3 text-gray-800`}
        />
      </View>

      <View style={tw`flex-row mt-4 justify-center`}>
        <TouchableOpacity
          style={tw`bg-blue-500 rounded-lg py-3 mt-5 w-60% flex-row items-center justify-center`}
          onPress={handleFingerprintScan}
        >
          <Text style={tw`text-white text-lg`}>Scan Fingerprint</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={tw`bg-gray-800 px-4 py-2 rounded-md mt-6`} 
        onPress={handleLogin}
      >
        <Text style={tw`text-white text-lg`}>Login</Text>
      </TouchableOpacity>

      {loginFailed && (
        <View style={tw`mt-4`}>
          <Text style={tw`text-red-600 text-center`}>
            You're not eligible to login.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={tw`text-indigo-800 text-center`}>Kindly register</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Login;
