import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const FindSlot = ({ slots, selectedSlot, setSelectedSlot, selectedNumber, data }) => {
    const [slotVisible, setSlotVisible] = useState(false)
    const handlePress = () => {
        setSlotVisible(!slotVisible)
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
<View>
    {slots.map((el,index)=>(
        
    ))}
</View>
                )
                }
            </View>
        </View>
    )
}
export default FindSlot