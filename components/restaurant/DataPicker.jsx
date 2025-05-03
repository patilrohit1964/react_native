import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { Touchable, TouchableOpacity } from 'react-native'
import { View } from 'react-native-web'

const DataPicker = () => {
    const [show, setShow] = useState(false)
    const [date, setDate] = useState(new Date())
    const handlePress = () => {
        setShow(true)
    }
    return (
        <View>
            <TouchableOpacity onPress={handlePress}>
                <DateTimePickerAndroid value={date} mode="date" display="default" minimumDate={new Date()} maximumDate={new Date(new Date().setDate(new Date().getDate()))} />
            </TouchableOpacity>
        </View>
    )
}

export default DataPicker;