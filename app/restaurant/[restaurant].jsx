import { useLocalSearchParams } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Platform, Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { db } from '../../config/firebaseConfig'


const Restaurant = () => {
    const { restaurant } = useLocalSearchParams();

    const [restoData, setResoData] = useState({});
    const [carouselData, setCarouselData] = useState({});
    const [slotsData, setSlotsData] = useState({});

    const getRestaurantData = async () => {
        try {
            const restaurantQuery = query(collection(db, "restaurants"), where("name", "==", restaurant));
            const restaurantSnapShot = await getDocs(restaurantQuery);
            if (restaurantSnapShot.empty()) {
                console.log("no matching restaurant found");
                return;
            }
            for (const doc of restaurantSnapShot.docs) {
                const restaurantData = doc.data();
                setResoData(restaurantData)
                const carouselQuery = query(collection(db, "carousel"), where("res_id", "==", doc.ref));
                const carouselSnapShot = await getDocs(carouselQuery);
                const carouselImages = [];
                if (carouselSnapShot.empty()) {
                    console.log("no matching carousel found");
                    return;
                }
                carouselSnapShot.forEach((carouselDoc) => {
                    carouselImages.push(carouselDoc.data());
                })
                setCarouselData(carouselImages);

                const slotsQuery = query(collection(db, "slots"), where("res_id", "==", doc.ref));
                const slotsSnapShot = await getDocs(slotsQuery);
                const slotsImages = [];
                if (slotsSnapShot.empty()) {
                    console.log("no matching slots found");
                    return;
                }
                slotsSnapShot.forEach((slotsDoc) => {
                    slotsImages.push(slotsDoc.data());
                })
                setSlotsData(slotsImages);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRestaurantData();
    }, [])

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