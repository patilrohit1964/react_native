import { View, Text, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { addDoc, collection, doc } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'
import { Formik } from 'formik'
import { validationSchema } from '../../utils/getFormSchema'

const FindSlot = ({ slots, selectedSlot, setSelectedSlot, selectedNumber, date, restaurant }) => {
    const [slotVisible, setSlotVisible] = useState(false)
    const [modalVisible, setmodalVisible] = useState(false)
    const [formVisible, setFormVisible] = useState(false)
    const handlePress = () => {
        setSlotVisible(!slotVisible)
    }
    const handleSlotPress = (slot) => {
        let prevSlot = selectedSlot;
        if (prevSlot == slot) {
            setSelectedSlot(null);
        } else {
            setSelectedSlot(slot);
        }
    }
    const handleBooking = async () => {
        const userEmail = await AsyncStorage.getItem("userEmail")
        const guestStatus = await AsyncStorage.getItem("isGuest")
        if (userEmail) {
            try {
                await addDoc(collection(db, "bookings"), {
                    email: userEmail,
                    slot: selectedSlot,
                    date: date.toISOString(),
                    guests: selectedNumber,
                    restaurant: restaurant
                })
                alert("Booking Successfully Done!")
            } catch (error) {
                console.log(error)
            }
        } else if (guestStatus == "true") {
            setFormVisible(true)
            setmodalVisible(true)
        }
    }
    return (
        <View className="flex-1">
            <View className={`flex ${selectedSlot != null && "flex-row"}`}>
                <View className={`${selectedSlot != null && 'flex-1'}`}>
                    <TouchableOpacity onPress={handlePress}>
                        <Text className="text-lg text-center font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg">Find Slots</Text>
                    </TouchableOpacity>
                </View>
                {selectedSlot != null && (
                    <View className="flex-1">
                        <TouchableOpacity onPress={handleBooking}>
                            <Text className="text-lg text-center text-white font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg">
                                Book Slot
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <View>
                {slotVisible && (
                    <View className={'flex-wrap flex-row mx-2 p-2 bg-[#474747] rounded-lg'}>
                        {slots.map((slot, index) => (
                            <TouchableOpacity key={index} className={`text-white font-bold m-2 p-4 bg-[#f49b33] rounded-lg items-center justify-center ${selectedSlot && selectedSlot !== slot ? "opacity-50" : ""}`} onPress={() => handleSlotPress(slot)} disabled={
                                selectedSlot == slot || selectedSlot == null ? false : true
                            }
                            >
                                <Text className="text-white font-bold">{slot}</Text>
                            </TouchableOpacity>

                        ))}
                    </View>
                )
                }
            </View>
            <Modal visible={modalVisible} transparent={true} animationType="slide" style={{
                flex: 1,
                justifyContent: "flex-end",
                margin: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
            }}>
                <View className="flex-1 bg-[#000000]">
                    <View>
                        {formVisible ? (
                            <Formik initialValues={{ fullName: "", phoneNumber: "" }} onSubmit={handleSubmitBar} validationSchema={validationSchema}>
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, resetForm }) => (
                                    <View className="w-full">
                                        <Text className='text-white my-2'>Name</Text>
                                        <TextInput
                                            keyboardType="text"
                                            onChangeText={handleChange("fullName")}
                                            onBlur={handleBlur("fullName")}
                                            value={values.fullName}
                                            className="border border-white text-white rounded px-2"
                                        />

                                        {touched.fullName && errors.fullName ? <Text className="text-red-500 text-xs mb-2">{errors.fullName}</Text> : ""}
                                        <Text className="text-white my-2">Phone Number</Text>
                                        <TextInput
                                            onChangeText={handleChange("phoneNumber")}
                                            onBlur={handleBlur("phoneNumber")}
                                            value={values.phoneNumber}
                                            className="border border-white text-white rounded px-2"
                                        />
                                        {touched.phoneNumber && errors.phoneNumber ? <Text className="text-red-500 text-xs mb-2">{errors.phoneNumber}</Text> : ""}
                                        {/* touchable use for like a and button tag for navigating */}
                                        <TouchableOpacity onPress={handleSubmit} disabled={loading} className="p-2 my-8 bg-[#f49b33] rounded-lg">
                                            <Text className="text-xl font-semibold text-center">
                                                {loading ? "Loading..." : "Sign up"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </Formik>
                        ) : <View>Table Book</View>}
                    </View>
                </View>
            </Modal>
        </View>
    )
}
export default FindSlot