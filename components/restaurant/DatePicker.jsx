import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { Button, View, Platform } from 'react-native'

const DatePickers = ({ date, setDate }) => {
    const [show, setShow] = useState(false)

    const onChange = (event, selectedDate) => {
        setShow(false)
        if (selectedDate) {
            setDate(selectedDate)
        }
    }

    return (
        <View>
            <Button title="Open Picker" onPress={() => setShow(true)} />

            {show && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChange}
                    minimumDate={new Date()}
                    maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
                />
            )}
        </View>
    )
}

export default DatePickers
