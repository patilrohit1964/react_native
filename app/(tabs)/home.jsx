import { View, Text, Platform, ScrollView, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from 'react-native';
import { BlurView } from 'expo-blur';
const Home = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#2b2b2b" }}>
      <View className='flex items-center'>
        <View className="bg-[#5f5f5f] w-11/12 rounded-lg shadow-lg justify-between items-center">
          <View className="flex flow-row">
            {/* using platform we can do conditionally styling */}
            <Text className={`text-base h-10 pt-[${Platform.OS === "ios" ? 8 : 10}] align-middle text-white`}>{" "}Welcome to {" "}</Text>
            <Image resizeMode='cover' className="w-20 h-12" source={require("../../assets/images/dinetime.png")} />
          </View>
        </View>
      </View>
      <ScrollView>
        <ImageBackground resizeMode='cover' className="my-4 w-full h-52 items-center justify-center" source={require("../../assets/images/homeBanner.png")}>
          <BlurView intensity={Platform.OS == "android" && 100} tint="dark">
            <Text className='text-center text-3xl font-bold text-white'>Dine wit your sweet family</Text>
          </BlurView>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView >
  )
}

export default Home