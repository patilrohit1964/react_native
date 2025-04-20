import { useRouter } from 'expo-router'
import React from 'react'

import { Text, TouchableOpacity, View } from 'react-native'

const Testing = () => {
    const router = useRouter();
    return (
        <View>
            <Text>Hello testing</Text>
        </View>
    )
}

export default Testing