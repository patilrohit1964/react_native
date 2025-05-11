import DatePicker from 'react-native-date-picker'
import React, { useState } from 'react'
import { Platform, TouchableOpacity, Text, View, Modal, TouchableWithoutFeedback, Button } from 'react-native'

const DatePickers = ({ date, setDate }) => {
    const [show, setShow] = useState(false)

    const [open, setOpen] = useState(false)
    return (
        // <Modal visible={show} transparent animationType="slide">
        //     <TouchableWithoutFeedback onPress={() => setShow(false)}>
        //         <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />
        //     </TouchableWithoutFeedback>
        //     <View style={{ position: 'absolute', top: '30%', alignSelf: 'center', backgroundColor: 'white', padding: 20, borderRadius: 20 }}>
        //         <DatePicker
        //             date={date}
        //             onDateChange={setDate}
        //             mode="date"
        //             minimumDate={new Date()}
        //             maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
        //             textColor="#f49b33"
        //         />
        //         <TouchableOpacity onPress={() => setShow(false)} style={{ marginTop: 10 }}>
        //             <Text style={{ textAlign: 'center', color: '#f49b33' }}>Done</Text>
        //         </TouchableOpacity>
        //     </View>
        // </Modal>
        <>
            <Button title="Open" onPress={() => setOpen(true)} />
            <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </>
    )
}

export default DatePickers

function as() {
    return (
        <>
            <Button title="Open" onPress={() => setOpen(true)} />
            <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </>
    )
}