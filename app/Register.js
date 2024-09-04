import * as LocalAuthentication from 'expo-local-authentication';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import tw from 'twrnc';
import supabase from './supabaseClient';
import CryptoJS from 'crypto-js';
import * as Device from 'expo-device';

const Register = () => {
  const [username, setUsername] = useState('');
  const [matricNumber, setMatricNumber] = useState('');
  const [isFingerprintScanned, setIsFingerprintScanned] = useState(false);
  const [fingerprintHash, setFingerprintHash] = useState('');

  const handleFingerprintScan = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate',
        });

        if (result.success) {
          // Create a unique fingerprint hash by combining user data and device info
          const uniqueString = `${Device.osName}-${Device.osBuildId}`;
          const hashedFingerprint = CryptoJS.SHA256(uniqueString).toString();
          setFingerprintHash(hashedFingerprint);
          setIsFingerprintScanned(true);
          console.log ('device name', Device.osName )
          console.log ('device os', Device.osBuildId )
          Alert.alert('Fingerprint Scanned Successfully');
        } else {
          Alert.alert('Fingerprint Scan Failed');
        }
      } else {
        Alert.alert('Biometric authentication is not available');
      }
    } catch (error) {
      Alert.alert('Fingerprint Scan Failed', error.message);
    }
  };

  const handleSubmit = async () => {
    // Regular expression to match the format 3letter/2number/4number (e.g., abc/12/3456)
    const matricNumberPattern = /^[a-zA-Z]{3}\/\d{2}\/\d{4}$/;

    if (username && matricNumber && isFingerprintScanned) {
        // Check if the matric number follows the required format
        if (!matricNumberPattern.test(matricNumber)) {
            Alert.alert('Error', 'Matric Number must be in the format cpe/18/6698');
            return;
        }

        try {
            console.log('Submitting:', { username, matricNumber, fingerprintHash });
    
            const { data, error } = await supabase
                .from('students')
                .insert([{ username, matricnumber: matricNumber, fingerprintHash }]);
    
            if (error) {
                console.log('Supabase Error:', error);
                Alert.alert('Registration Error', 'Fingerprint Already present');
            } else {
                console.log('Supabase Response:', data);
                Alert.alert('Registration Successful');
                setUsername('');
                setMatricNumber('');
                setIsFingerprintScanned(false);
            }
        } catch (err) {
            console.log('Catch Error:', err);
            Alert.alert('Registration Failed', err.message);
        }
    } else {
        Alert.alert('Error', 'Please complete all fields and scan your fingerprint');
    }
};


  return (
    <View style={tw`flex-1 bg-gray-100 items-center justify-center`}>
      <Image
        source={require('../images/futalogo.png')}
        style={tw`h-40 w-50 mb-3 mt-2`}
      />
      <Text style={tw`text-2xl mb-7 font-bold text-gray-800`}>User Registration</Text>
      <View style={tw`w-60%`}>
        <Text style={tw`text-sm font-medium text-gray-800`}>Username</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          placeholderTextColor="#666"
          style={tw`w-full bg-white border border-gray-800 rounded-lg py-2 px-3 text-gray-800`}
        />
      </View>
      <View style={tw`w-60% mt-3`}>
        <Text style={tw`text-sm font-medium text-gray-800`}>Matric Number</Text>
        <TextInput
          value={matricNumber}
          onChangeText={setMatricNumber}
          placeholder="Enter your Matric Number"
          placeholderTextColor="#666"
          style={tw`w-full bg-white border border-gray-800 rounded-lg py-2 px-3 text-gray-800`}
        />
      </View>
      <TouchableOpacity
        style={tw`bg-blue-500 rounded-lg py-3 mt-5 w-60% flex-row items-center justify-center`}
        onPress={handleFingerprintScan}
      >
        <Text style={tw`text-white text-lg`}>Scan Fingerprint</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`bg-gray-800 rounded-lg py-3 mt-10 w-47% flex-row items-center justify-center`}
        onPress={handleSubmit}
      >
        <Text style={tw`text-white text-lg`}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
