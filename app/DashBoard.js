import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

const DashBoard = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    
    navigation.navigate('DashBoard');
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
          placeholder="Enter your username"
          placeholderTextColor="#666"
          style={tw`w-full bg-white border border-gray-800 rounded-lg py-2 px-3 text-gray-800`}
        />
      </View>
      
      <View style={tw`w-60% mt-3`}>
        <Text style={tw`text-sm font-medium text-gray-800`}>Matric Number</Text>
        <TextInput
          placeholder="Enter your Matric Number"
          placeholderTextColor="#666"
          style={tw`w-full bg-white border border-gray-800 rounded-lg py-2 px-3 text-gray-800`}
        />
      </View>

      <View style={tw`flex-row mt-4 justify-center`}>
        <TouchableOpacity onPress={() => {
          // Handle fingerprint authentication here
          console.log('Fingerprint authentication');
        }}>
          <Entypo name="fingerprint" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={tw`bg-gray-800 px-4 py-2 rounded-md mx-2`} 
          onPress={() => {
            // Handle face scan authentication here
            console.log('Face scan authentication');
          }}
        >
          <Text style={tw`text-white text-lg`}>Face Scan</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`mt-4`}>
        <Text style={tw`text-red-600 text-center`}>
          You're not eligible to login.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={tw`text-indigo-800 text-center`}>Kindly register</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={tw`bg-gray-800 px-4 py-2 rounded-md mt-6`} 
        onPress={() => navigation.navigate('DashBoard')}
      >
        <Text style={tw`text-white text-lg`}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashBoard;
