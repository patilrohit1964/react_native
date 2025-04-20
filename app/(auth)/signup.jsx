import { useRouter } from "expo-router";
import { Formik } from "formik";
import { Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {

    const handleSubmitBar = (e) => {

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
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
                            <View className="w-full">
                                <Text>Email</Text>
                                <TextInput keyboardType="email-address" onChange={handleChange("email")} onBlur={handleBlur("email")} value={values.email} className="h-10 border border-white text-white rounded px-2" />
                                {touched.email && errors.email && <Text className="text-red-500 text-xs mb-2">{errors.email}</Text>}
                                <Text>Password</Text>
                                <TextInput secureTextEntry onChange={handleChange("password")} onBlur={handleBlur("password")} value={values.password} className="h-10 border border-white text-white rounded px-2" />
                                {touched.password && errors.password && <Text className="text-red-500 text-xs mb-2">{errors.password}</Text>}
                            </View>
                        }}
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