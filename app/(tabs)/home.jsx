import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/dinetime.png";
import banner from "../../assets/images/homeBanner.png";
import { db } from "../../config/firebaseConfig";
// import { collection, getDocs, query } from "firebase/firestore";
// import { db } from "../../config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);
  const temp = async () => {
    // const value = await AsyncStorage.getItem("isGuest");
    const value = await AsyncStorage.getItem("userEmail");
  };


  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => router.push(`/restaurant/${item.name}`)}
        className="bg-[#5f5f5f] max-h-64 max-w-xs flex justify-center rounded-lg p-4 mx-4 shadow-md"
      >
        <Image
          resizeMode="cover"
          source={{ uri: item.image }}
          className="h-28 mt-2 mb-1 rounded-lg"
        />
        <Text className="text-white text-lg font-bold mb-2">{item.name}</Text>
        <Text className="text-white text-base mb-2">{item.address}</Text>
        <Text className="text-white text-base mb-2">
          Open: {item.opening} - Close: {item.closing}
        </Text>
      </TouchableOpacity>
    )
  };

  const getRestaurants = async () => {
    const q = query(collection(db, "restaurants"));
    const res = await getDocs(q);
    const restaurantList = [];
    res.forEach((doc) => {
      restaurantList.push(doc.data());
    });

    setRestaurants(restaurantList);
  };

  useEffect(() => {
    getRestaurants();
    temp();
  }, [])
  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#2b2b2b" },
        Platform.OS == "android" && { paddingBottom: 55 },
        Platform.OS == "ios" && { paddingBottom: 20 },
      ]}
    >
      <View className="flex items-center">
        <View className="bg-[#5f5f5f] w-11/12 rounded-lg shadow-lg justify-between items-center flex flex-row p-2">
          <View className="flex flex-row w-full items-center justify-center ">
            <Text
              className={`text-base h-10
                ${Platform.OS == "ios" ? "pt-[8px]" : "pt-1"}
               align-middle text-white`}
            >
              {" "}
              Welcome to{" "}
            </Text>
            <Image resizeMode="cover" className={"w-20 h-12"} source={logo} />
          </View>
        </View>
      </View>
      <ScrollView stickyHeaderIndices={[0]}>
        {/* image bg for bg image */}
        <ImageBackground
          resizeMode="cover"
          className="mb-4 w-full bg-[#2b2b2b] h-52 items-center justify-center"
          source={banner}
        >
          {/* blur view use for bluring */}
          <BlurView
            intensity={Platform.OS === "android" ? 100 : 25}
            tint="dark"
            className="w-full p-4 shadow-lg"
          >
            <Text className="text-center text-3xl font-bold text-white">
              Dine with your loved ones
            </Text>
          </BlurView>
        </ImageBackground>
        <View className="p-4 bg-[#2b2b2b] flex-row items-center">
          <Text className="text-3xl text-white mr-2 font-semibold">
            Special Discount %
          </Text>
        </View>
        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ padding: 16 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        ) : (
          <ActivityIndicator animating color={"#fb9b33"} />
          // this is work like loader
        )}
        <View className="p-4 bg-[#2b2b2b] flex-row items-center">
          <Text className="text-3xl text-[#fb9b33] mr-2 font-semibold">
            Our Restaurants
          </Text>
        </View>
        {restaurants.length > 0 ? (
          // flat list help to slider carousel like
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ padding: 16 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        ) : (
          <ActivityIndicator animating color={"#fb9b33"} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}