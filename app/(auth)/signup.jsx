import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { Formik } from "formik";
import { Alert, Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signUpSchema } from "../../utils/authSchema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default Signup = () => {

    const router = useRouter();
    const auth = getAuth()
    const [loading, setLoading] = useState(false)
    const db = getFirestore()
    const handleSubmitBar = async (values, { resetForm }) => {
        try {
            setLoading(true)
            const userCredentials = await createUserWithEmailAndPassword(auth, values.email, values.password);
            await setDoc(doc(db, "users", userCredentials.user.uid), {
                email: values.email,
                createdAt: serverTimestamp()
            })
            await AsyncStorage.setItem("userEmail", values.email);
            setLoading(false);
            router.push("/home")
            resetForm()
        } catch (error) {
            if (error?.code === "auth/email-already-in-use") {
                Alert.alert("SignUp Failed", "Email already in use. Please try again.");
            }
            else {
                Alert.alert("SignUp error", "an unexpected error occured");
            }
        } finally {
            resetForm()
            setLoading(false);
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
                    <Image source={require("../../assets/images/dinetime.png")} style={{ height: 200, width: 300 }} resizeMode="cover" />
                    <Text className="text-lg text-center text-white font-bold mb-10">Let's get you started</Text>
                    <View className="w-5/6">
                        <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmitBar} validationSchema={signUpSchema}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, resetForm }) => (
                                <View className="w-full">
                                    {/* <Text className='text-white my-2'>Name</Text>
                                <TextInput
                                    keyboardType="default"
                                    onChangeText={handleChange("name")}
                                    onBlur={handleBlur("name")}
                                    value={values.name}
                                    className="border border-white text-white rounded px-2"
                                />
                                {touched.name && errors.name ? (
                                    <Text className="text-red-500 text-xs mb-2">{errors.name}</Text>
                                ) : null} */}

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
                                    {touched.password && errors.password ? <Text className="text-red-500 text-xs mb-2">{errors.password}</Text> : ""}
                                    {/* touchable use for like a and button tag for navigating */}
                                    <TouchableOpacity onPress={handleSubmit} disabled={loading} className="p-2 my-8 bg-[#f49b33] rounded-lg">
                                        <Text className="text-xl font-semibold text-center">
                                            {loading ? "Loading..." : "Sign up"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Formik>
                        <View className="flex items-center justify-center">
                            <TouchableOpacity onPress={() => router.push("/signin")} className="flex flex-row items-center">
                                <Text className="text-white font-semibold">Already have account? {" "}</Text>
                                <Text className="text-base font-semibold underline text-[#f49b33]">Sign in</Text>
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
