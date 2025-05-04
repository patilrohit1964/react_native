import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const GuestPicker = () => {
    return (
        <View className="flex flex-row items-center rounded-lg text-white text-base">
            <TouchableOpacity onPress={decrement}>

            </TouchableOpacity>
        </View>
    )
}

export default GuestPicker