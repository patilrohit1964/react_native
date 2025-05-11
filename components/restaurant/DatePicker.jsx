import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react'
import { Platform, Touchable, TouchableOpacity } from 'react-native'
import { View } from 'react-native-web'

const DatePicker = ({ date, setDate }) => {
    const [show, setShow] = useState(false)
    const handlePress = () => {
        setShow(true)
    }
    const onChange = (event, selectDate) => {
        const currentDate = selectDate || date;
        setShow(false)
        setDate(currentDate)
    }
    return (
        <View className="flex flex-row">
            <TouchableOpacity onPress={handlePress}>
                {Platform.OS == "android" && <Text>{date.toLocaleDateString()}</Text>}
                {Platform.OS == "android" && show &&
                    (
                        <DateTimePicker value={date} mode="date" display="default" minimumDate={new Date()} maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))} accentColor={"#f49b33"} textColor="#f49b33" onChange={onChange} />
                    )
                }
                {
                    Platform.OS == "ios" && (
                        <DateTimePicker value={date} mode="date" display="default" minimumDate={new Date()} maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))} accentColor={"#f49b33"} textColor="#f49b33" onChange={onChange} />
                    )
                }
            </TouchableOpacity>
        </View>
    )
}

export default DatePicker;