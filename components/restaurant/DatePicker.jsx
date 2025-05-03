import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { Platform, Touchable, TouchableOpacity } from 'react-native'
import { View } from 'react-native-web'

const DatePicker = () => {
    const [show, setShow] = useState(false)
    const [date, setDate] = useState(new Date())
    const handlePress = () => {
        setShow(true)
    }
    return (
        <View>
            <TouchableOpacity onPress={handlePress}>
                {Platform.OS == "android" && <Text>{date.toLocaleDateString()}</Text>}
                {Platform.OS == "android" && show &&
                    (
                        <DateTimePickerAndroid value={date} mode="date" display="default" minimumDate={new Date()} maximumDate={new Date(new Date().setDate(new Date().getDate()))} accentColor={"#f49b33"} textColor="#f49b33" />
                    )
                }
                {
                    Platform.OS == "ios" && (
                        <DateTimePickerAndroid value={date} mode="date" display="default" minimumDate={new Date()} maximumDate={new Date(new Date().setDate(new Date().getDate()))} accentColor={"#f49b33"} textColor="#f49b33" />
                    )
                }
            </TouchableOpacity>
        </View>
    )
}

export default DatePicker;