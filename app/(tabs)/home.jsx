import { View, Text, Platform, ScrollView, ImageBackground, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from 'expo-blur';
import { restaurants } from '../../store/restaurant';

const Home = () => {

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ marginRight: 16 }}>
      <Image
        resizeMode='cover'
        source={{ uri: item?.image }}
        style={{
          height: 120, // 👈 give height
          width: 180,  // 👈 give width
          borderRadius: 10,
          marginTop: 8,
          marginBottom: 8,
        }}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2b2b2b" }}>
      <View style={{ alignItems: 'center' }}>
        <View style={{
          backgroundColor: "#5f5f5f",
          width: '92%',
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 3,
          elevation: 5,
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{
              fontSize: 16,
              height: 40,
              paddingTop: Platform.OS === "ios" ? 8 : 10,
              color: "#fff",
              textAlignVertical: "center"
            }}>
              Welcome to
            </Text>
            <Image
              resizeMode='cover'
              style={{ width: 80, height: 50 }}
              source={require("../../assets/images/dinetime.png")}
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <ImageBackground
          resizeMode='cover'
          style={{ marginVertical: 16, width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}
          source={require("../../assets/images/homeBanner.png")}
        >
          <BlurView
            intensity={Platform.OS === "android" ? 100 : 50}
            tint="dark"
            style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', color: '#fff' }}>
              Dine with your sweet family
            </Text>
          </BlurView>
        </ImageBackground>

        <Text style={{ fontSize: 20, color: "#fff", paddingLeft: 16, marginBottom: 8 }}>Popular Restaurants</Text>

        {
          restaurants.length > 0 ? (
            <FlatList
              data={restaurants}
              renderItem={renderItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingLeft: 16 }}
            />
          ) : (
            <ActivityIndicator size="large" color="#fb9b33" />
          )
        }

      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;
