import { useRouter } from "expo-router";
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const handleGuest = async () => {
    await AsyncStorage.setItem("isGuest", "true")
    router.push("/home")
  }
  return (
    // {/* safe area use for adjust height of mobile */ }
    <SafeAreaView
      className={`bg-[#2b2b2b]`}
    >
      {/* statusbar use for our mobile info like: battery, signal, time and we can place anywhere */}
      <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
      {/* scroll view use for scrolling */}
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex m-2 items-center justify-center">
          <Image source={require("../assets/images/dinetime.png")} style={{ height: 300, width: 300 }} resizeMode="cover" />
          <View className="w-3/4">
            {/* touchable use for like a and button tag for navigating */}
            <TouchableOpacity onPress={() => router.push("/signup")} className="p-2 my-2 bg-[#f49b33] rounded-lg">
              <Text className="text-xl font-semibold text-center">Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGuest} className="p-2 my-2 bg-[#2b2b2b] border border-[#f49b33] rounded-lg max-w-fit">
              <Text className="text-lg font-semibold text-center text-[#f49b33]">Guest User</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-center text-base font-semibold my-4 text-white">
              <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" />
              {" "}or{" "}
              <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" />
            </Text>
            <TouchableOpacity onPress={() => router.push("/signin")} className="flex flex-row items-center">
              <Text className="text-white font-semibold">Already a User? {" "}</Text>
              <Text className="text-base font-semibold underline text-[#f49b33]">Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1">
          <Image source={require("../assets/images/Frame.png")} className="w-full h-full" resizeMode="contain" />
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}
