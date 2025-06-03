import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router';
import { signOut, getAuth } from 'firebase/auth'
const Profile = () => {

    const [userEmail, setUserEmail] = useState(null);
    const router = useRouter()
    const auth = getAuth()
    const handleLogout = async () => {
        try {
            await signOut(auth);
            await AsyncStorage.removeItem("userEmail")
            setUserEmail(null)
            Alert.alert("Logged Out", "You have been logged out")
            router.push("/signin")
        } catch (error) {
            Alert.alert("Logged Error", "Error while logging out")
        }
    }
    const handleSignup = () => {
        router.push("/signup");
    }
    useEffect(() => {
        const fetchUserEmail = async () => {
            const email = await AsyncStorage.getItem("userEmail")
            setUserEmail(email)
        }
        fetchUserEmail();
    }, [])

    return (
        <View className="flex-1 justify-center items-center bg-[#2b2b2b]">
            <Text className="text-xl text-[#f49b33] font-semibold mb-6">User Profile</Text>
            {
                userEmail ? (
                    <>
                        <Text className="text-white text-lg mb-6">Email: {userEmail}</Text>
                        <TouchableOpacity onPress={handleLogout} className="flex flex-row items-center">
                            <Text className="text-base font-semibold underline text-[#f49b33]">Logout</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity onPress={handleSignup} className="flex flex-row items-center">
                            <Text className="text-base font-semibold underline text-[#f49b33]">Sign Up</Text>
                        </TouchableOpacity>
                    </>)
            }
        </View>
    )
}

export default Profile