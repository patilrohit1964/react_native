import { useRouter } from "expo-router";
import { Formik } from "formik";
import { Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import validationsSchema from "../../utils/signupSchema";

const Signup = () => {

    const router = useRouter();

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
                    <Image source={require("../../assets/images/dinetime.png")} style={{ height: 250, width: 300 }} />
                    <Text className="text-lg text-center text-white font-bold mb-10">Let's get you started</Text>
                    <View className="w-5/6">
                        <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmitBar} validationSchema={validationsSchema}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View className="w-full">
                                    <Text className='text-white my-2'>Email</Text>
                                    <TextInput keyboardType="email-address" onChange={handleChange("email")} onBlur={handleBlur("email")} value={values.email} className="border border-white text-white rounded px-2" />
                                    {touched.email && errors.email && <Text className="text-red-500 text-xs mb-2">{errors.email}</Text>}
                                    <Text className="text-white my-2">Password</Text>
                                    <TextInput secureTextEntry onChange={handleChange("password")} onBlur={handleBlur("password")} value={values.password} className="border border-white text-white rounded px-2" />
                                    {touched.password && errors.password && <Text className="text-red-500 text-xs mb-2">{errors.password}</Text>}
                                    {/* touchable use for like a and button tag for navigating */}
                                    <TouchableOpacity onPress={handleSubmit} className="p-2 my-8 bg-[#f49b33] rounded-lg">
                                        <Text className="text-xl font-semibold text-center">Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Formik>
                        <View className="flex items-center justify-center">
                            <TouchableOpacity onPress={() => router.push("/signin")} className="flex flex-row items-center">
                                <Text className="text-white font-semibold">Already a User? {" "}</Text>
                                <Text className="text-base font-semibold underline text-[#f49b33]">Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex-1">
                        <Image source={require("../../assets/images/Frame.png")} className="w-full h-full" resizeMode="contain" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Signup