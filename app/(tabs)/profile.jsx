import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = () => {

    const [userEmail, setUserEmail] = useState(null)
    const handleLogout = () => {

    }
    const handleSubmit = () => {

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
            <Text>User Profile</Text>
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
                        <TouchableOpacity onPress={handleSubmit} className="flex flex-row items-center">
                            <Text className="text-base font-semibold underline text-[#f49b33]">Sign Up</Text>
                        </TouchableOpacity>
                    </>)
            }
        </View>
    )
}

export default Profile