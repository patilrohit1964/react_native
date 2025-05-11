import DatePicker from 'react-native-date-picker'
import React, { useState } from 'react'
import { Platform, TouchableOpacity, Text, View, Modal } from 'react-native'

const DatePickers = ({ date, setDate }) => {
    const [show, setShow] = useState(false)

    return (
        <View className="flex flex-row items-center">
            <TouchableOpacity onPress={() => setShow(true)}>
                <Text style={{ color: '#f49b33' }}>{date.toDateString()}</Text>
            </TouchableOpacity>

            {/* Show modal with DatePicker */}
            <Modal visible={show} transparent={true} animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 20 }}>
                        <DatePicker
                            date={date}
                            onDateChange={setDate}
                            mode="date"
                            minimumDate={new Date()}
                            maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
                            textColor="#f49b33"
                        />
                        <TouchableOpacity onPress={() => setShow(false)} style={{ marginTop: 10 }}>
                            <Text style={{ textAlign: 'center', color: '#f49b33' }}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default DatePickers
