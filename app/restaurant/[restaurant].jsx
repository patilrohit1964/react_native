import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Platform, Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const Restaurant = () => {
    const { restaurant } = useLocalSearchParams();

    const [restoData, setResoData] = useState({});
    const [res, se] = useState({});
    const [dd, dde] = useState({});

    return (
        <SafeAreaView
            style={[
                { backgroundColor: "#2b2b2b" },
                Platform.OS == "android" && { paddingBottom: 55 },
                Platform.OS == "ios" && { paddingBottom: 20 },
            ]}>
            <ScrollView className="h-full">
                <View className="flex-1 my-2 p-2 items-center justify-center">
                    <Text className="text-xl text-[#f49b33] mr-2 font-semibold">{restaurant}</Text>
                </View>
                <View className="border-2 border-[#f49b33]" />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Restaurant