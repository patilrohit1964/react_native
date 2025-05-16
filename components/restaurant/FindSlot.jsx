import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const FindSlot = ({ slots, selectedSlot, setSelectedSlot, selectedNumber, data }) => {
    const [slotVisible, setSlotVisible] = useState(false)
    const handlePress = () => {
        setSlotVisible(!slotVisible)
    }
    const handleSlotPress=(slot)=>{
        let prevSlot=selectSlot;
        if(prevSlot==slot){
            setSelectedSlot(null)
        }else{
            setSelectedSlot(slot)
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
                        <TouchableOpacity onPress={handlePress}>
                            <Text className="text-lg text-center text-white font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg">Book Slots</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <View>
                {slotVisible && (
                    <View className={'flex-wrap flex-row mx-2 p-2 bg-[#474747] rounded-lg'}>
                        {slots.map((el, index) => (
                            <TouchableOpacity key={index} className="text-white font-bold m-2 p-4 bg-[#f49b33] rounded-lg items-center justify-center" onPress={()=>handleSlotPress(el)}>
                                <Text className="text-white font-bold">{el}</Text>
                            </TouchableOpacity>

                        ))}
                    </View>
                )
                }
            </View>
        </View>
    )
}
export default FindSlot