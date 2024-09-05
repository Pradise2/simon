import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useRoute } from '@react-navigation/native';

const Dashboard = () => {
  const route = useRoute();
  const { username, matricNumber } = route.params || {};

  return (
    <View style={tw`flex-1 bg-indigo-900 items-center justify-center`}>
      <View style={tw`w-full px-4`}>
        <View style={tw`items-center mb-6`}>
          <Image
            source={require('../images/futalogo.png')}
            style={tw`h-30 w-50`} // Adjusted image size
          />
          <Text style={tw`text-2xl text-center mb-2 font-bold text-white`}>DASHBOARD</Text>
        </View>

        <View style={tw`w-full bg-white rounded-lg p-6 shadow-md`}>
          <View style={tw`flex flex-col items-center mb-4`}>
            <Image
              style={tw`w-16 h-16 rounded-full mb-2`}
              source={require('../images/boy.png')}
              accessibilityLabel="User Profile"
            />
             <View style={tw`items-center`}>
              <Text style={tw`text-xl font-bold text-black`}>{username || 'User'}</Text>
              <Text style={tw`text-gray-500`}>{matricNumber || 'Matric Number'}</Text>
            </View>
          </View>

          <View>
            <Text style={tw`text-xl text-center font-semibold text-black mb-4`}>Select Courses for Exams</Text>
            <View style={tw`flex flex-row flex-wrap justify-between`}>
              <TouchableOpacity style={tw`bg-gray-300 p-4 rounded-lg w-[48%] items-center mb-4`}>
                <Image
                  source={require('../images/exam.png')}
                  style={tw`h-6 w-6 mb-2`}
                  accessibilityLabel="CPE 510 syllabus icon"
                />
                <Text style={tw`text-gray-700`}>CPE 510</Text>
              </TouchableOpacity>

              <TouchableOpacity style={tw`bg-gray-300 p-4 rounded-lg w-[48%] items-center mb-4`}>
                <Image
                  source={require('../images/exam.png')}
                  style={tw`h-6 w-6 mb-2`}
                  accessibilityLabel="CPE 522 syllabus icon"
                />
                <Text style={tw`text-gray-700`}>CPE 522</Text>
              </TouchableOpacity>

              <TouchableOpacity style={tw`bg-gray-300 p-4 rounded-lg w-[48%] items-center mb-4`}>
                <Image
                   source={require('../images/exam.png')}
                   style={tw`h-6 w-6 mb-2`}
                  accessibilityLabel="CPE 502 syllabus icon"
                />
                <Text style={tw`text-gray-700`}>CPE 502</Text>
              </TouchableOpacity>

              <TouchableOpacity style={tw`bg-gray-300 p-4 rounded-lg w-[48%] items-center mb-4`}>
                <Image
                   source={require('../images/exam.png')}
                   style={tw`h-6 w-6 mb-2`}
                  accessibilityLabel="CPE 512 syllabus icon"
                />
                <Text style={tw`text-gray-700`}>CPE 512</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;
