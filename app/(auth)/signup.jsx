import { useRouter } from "expo-router";
import { Formik } from "formik";
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {

    const handleSubmitBar=(e)=>{
        
    }

    return (
        <SafeAreaView
            className={`bg-[#2b2b2b]`}
        >
            {/* statusbar use for our mobile info like: battery, signal, time and we can place anywhere */}
            <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
            {/* scroll view use for scrolling */}
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="flex m-2 items-center justify-center">
                    <Image source={require("../../assets/images/dinetime.png")} style={{ height: 300, width: 300 }} />
                    <Text className="text-lg text-center text-white font-bold mb-10">Let's get you started</Text>
                </View>
                <View className="w-5/6">
                    <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmitBar}>

                    </Formik>
                </View>
                <View className="flex-1">
                    <Image source={require("../../assets/images/Frame.png")} className="w-full h-full" resizeMode="contain" />
                </View>
                {/* touchable use for like a and button tag for navigating */}
                <TouchableOpacity onPress={() => router.push("/signup")} className="p-2 my-2 bg-[#f49b33] rounded-lg">
                    <Text className="text-xl font-semibold text-center">Sign Up</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Signup