import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, getFirestore, doc } from "firebase/firestore";
import { Formik } from "formik";
import { useState } from "react";
import { Alert, Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signInSchema } from "../../utils/authSchema";
const Signin = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const auth = getAuth()
    const db = getFirestore()
    const handleSubmitBar = async (values, { resetForm }) => {
        try {
            setLoading(true)
            const userCredentials = await signInWithEmailAndPassword(auth, values.email, values.password);
            const userDoc = await getDoc(doc(db, "users", userCredentials.user.uid))
            if (userDoc.exists()) {
                await AsyncStorage.setItem("userEmail", values.email);
                router.push("/home")
            }
        } catch (error) {
            if (error?.code === "auth/invalid-credential") {
                Alert.alert("Sign-in Failed", "Invalid email or password. Please try again.");
            }
            else {
                Alert.alert("signin error", "an unexpected error occured");
            }
        } finally {
            resetForm();
            setLoading(false)
        };
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
                    <Image source={require("../../assets/images/dinetime.png")} resizeMode="cover" style={{ height: 250, width: 300 }} />
                    <Text className="text-lg text-center text-white font-bold mb-10">Let's get you started</Text>
                    <View className="w-5/6">
                        <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmitBar} validationSchema={signInSchema}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View className="w-full">
                                    <Text className='text-white my-2'>Email</Text>
                                    <TextInput
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        onChangeText={handleChange("email")}
                                        onBlur={handleBlur("email")}
                                        value={values.email}
                                        className="border border-white text-white rounded px-2"
                                    />

                                    {touched.email && errors.email ? <Text className="text-red-500 text-xs mb-2">{errors.email}</Text> : ""}
                                    <Text className="text-white my-2">Password</Text>
                                    <TextInput
                                        secureTextEntry
                                        onChangeText={handleChange("password")}
                                        onBlur={handleBlur("password")}
                                        value={values.password}
                                        className="border border-white text-white rounded px-2"
                                    />
                                    {/* touchable use for like a and button tag for navigating */}
                                    <TouchableOpacity onPress={handleSubmit} disabled={loading} className="p-2 my-8 bg-[#f49b33] rounded-lg">
                                        <Text className="text-xl font-semibold text-center">
                                            {loading ? "Loading..." : "Sign in"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Formik>
                        <View className="flex items-center justify-center">
                            <TouchableOpacity onPress={() => router.push("/signup")} className="flex flex-row items-center">
                                <Text className="text-white font-semibold">Create account? {" "}</Text>
                                <Text className="text-base font-semibold underline text-[#f49b33]">Sign up</Text>
                            </TouchableOpacity>
                            <Text className="text-center text-base font-semibold mb-4 text-white my-8">
                                <View className="border-b-2 border-[#f49b33] p-2 mb-3 w-24" />{" "}
                                or{" "}
                                <View className="border-b-2 border-[#f49b33] p-2 mb-3 w-24" />{" "}
                            </Text>
                            <TouchableOpacity className="flex flex-row justify-center mb-5 p-2 items-center" onPress={() => router.push("/home")}>
                                <Text className="text-white font-semibold">Be a</Text>
                                <Text className="text-base font-semibold underline text-[#f49b33]">{" "} Guest User</Text>
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

export default Signin