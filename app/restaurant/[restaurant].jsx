import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, Linking, Platform, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DatePickers from '../../components/restaurant/DatePicker'
import FindSlot from '../../components/restaurant/FindSlot'
import GuestPicker from '../../components/restaurant/GuestPicker'
import { db } from '../../config/firebaseConfig'


export default Restaurant = () => {
    const { restaurant } = useLocalSearchParams();
    const flatListRef = useRef(null);
    const windowWidth = Dimensions.get("window").width;
    const [restoData, setResoData] = useState({});
    const [date, setDate] = useState(new Date())
    const [currentIndex, setCurrentIndex] = useState(0);
    const [carouselData, setCarouselData] = useState({});
    const [slotsData, setSlotsData] = useState({});
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedNumber, setSelectedNumber] = useState(2)
    const handleNextImages = () => {
        if (currentIndex < carouselData[0]?.images.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }
        if (currentIndex == carouselData[0]?.images.length - 1) {
            const nextIndex = 0;
            setCurrentIndex(nextIndex);
            flatListRef.current.scrollToIndex({ index: nextIndex, animated: true })
        }
    }
    const handlePrevImages = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setCurrentIndex(prevIndex);
            flatListRef.current.scrollToIndex({ index: prevIndex, animated: true });
        }
        if (currentIndex == 0) {
            const prevIndex = carouselData[0]?.images.length - 1;
            setCurrentIndex(prevIndex);
            flatListRef.current.scrollToIndex({ index: prevIndex, animated: true })
        }
    }
    const carouselItem = ({ item }) => {

        return (
            <View style={{ width: windowWidth - 2 }} className="h-64 relative">
                <View style={{ position: "absolute", top: "50%", backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 50, padding: 5, zIndex: 10, right: "6%" }}>
                    <Ionicons onPress={handleNextImages} name='arrow-forward' size={24} color={"white"} />
                </View>
                <View style={{ position: "absolute", top: "50%", backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 50, padding: 5, zIndex: 10, left: "2%" }}>
                    <Ionicons onPress={handlePrevImages} name='arrow-back' size={24} color={"white"} />
                </View>
                <View style={{ position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", left: "50%", transform: [{ translateX: -50 }], zIndex: 10, bottom: 15 }}>
                    {
                        carouselData[0].images?.map((_, idx) => {
                            <View key={idx} className={`bg-white h-2 w-2 ${idx === currentIndex && "h-3 w-3"} p-1 mx-1 rounded-full`} />
                        })
                    }
                </View>
                <Image source={{ uri: item }} style={{ opacity: 0.5, backgroundColor: "black", marginRight: 20, marginLeft: 5, borderRadius: 25 }} className="h-64" />
            </View >
        )
    }

    const getRestaurantData = async () => {
        try {
            const restaurantQuery = query(collection(db, "restaurants"), where("name", "==", restaurant));
            const restaurantSnapShot = await getDocs(restaurantQuery);
            if (restaurantSnapShot.empty) {
                console.log("no matching restaurant found");
                return;
            }
            for (const doc of restaurantSnapShot.docs) {
                const restaurantData = doc.data();
                setResoData(restaurantData)
                const carouselQuery = query(collection(db, "carousel"), where("res_id", "==", doc.ref));
                const carouselSnapShot = await getDocs(carouselQuery);
                const carouselImages = [];
                if (carouselSnapShot.empty) {
                    console.log("no matching carousel found");
                    return;
                }
                carouselSnapShot.forEach((carouselDoc) => {
                    carouselImages.push(carouselDoc.data());
                })
                setCarouselData(carouselImages);

                const slotsQuery = query(collection(db, "slots"), where("ref_id", "==", doc.ref));
                const slotsSnapShot = await getDocs(slotsQuery);
                const slotsImages = [];
                if (carouselSnapShot.empty) {
                    console.log("no matching slots found");
                    return;
                }
                slotsSnapShot.forEach((slotsDoc) => {
                    slotsImages.push(slotsDoc.data());
                })
                setSlotsData(slotsImages[0]?.slot);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleLocation = async () => {
        const url = "";
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url)
        } else {
            console.log("don't know to open url")
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
                    <View className="border-2 border-[#f49b33]" />
                </View>
                <View className="h-64 max-w-[98%] mx-2 rounded-[25px]">
                    <FlatList
                        ref={flatListRef}
                        data={carouselData[0]?.images}
                        renderItem={carouselItem}
                        horizontal
                        scrollEnabled={false}
                        style={{ borderRadius: 25 }}
                    >
                    </FlatList>
                </View>
                <View className="flex-1 flex-row mt-2 p-2">
                    <Ionicons name="location-sharp" size={24} color={"#f49b33"} />
                    <Text className="max-w-[75%] text-white">
                        {restoData?.address || " "}
                    </Text>
                    <Text onPress={handleLocation} className="underline flex items-center text-[#f49b33] italic font-semibold justify-center">
                        Get Direction
                    </Text>
                </View>
                <View className="flex-1 flex-row mt-2 p-2">
                    <Ionicons name="location-sharp" size={20} color={"#f49b33"} />
                    <Text className="max-w-[75%] text-white">
                        {restoData?.opening}-{restoData?.closing}
                    </Text>
                </View>
                <View className="flex-1 border m-2 p-2 border-[#f49b33] rounded-lg">
                    <View className={'flex-1 flex-row m-2 p-2 justify-end items-center'}>
                        <View className="flex-1 flex-row">
                            <Ionicons name='calender' size={20} color={'#f49b33'} />
                            <Text className="text-white mx-2 text-base">
                                Select Booking Date
                            </Text>
                        </View>
                        <DatePickers date={date} setDate={setDate} />
                    </View>
                    <View className={'flex-1 flex-row m-2 p-2 bg-[#474747] rounded-lg justify-end items-center'}>
                        <View className="flex-1 flex-row">
                            <Ionicons name='people' size={20} color={'#f49b33'} />
                            <Text className="text-white mx-2 text-base">
                                Select Numbers of Guests
                            </Text>
                        </View>
                        <GuestPicker slectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} />
                    </View>
                </View>
                <View>
                    <FindSlot slots={slotsData} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedNumber={selectedNumber} data={date} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

// export default Restaurant; 