import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Colors } from '../../assets/colors'

const TabLayout = () => {
    return (
        <Tabs screenOptions={{
            headerShown: false, //if you don't want show header
            tabBarActiveTintColor: Colors.PRIMARY, // tab active color which you want
            tabBarInactiveTintColor: Colors.dark.text, //tab color
            tabBarStyle: {
                backgroundColor: Colors.SECONDARY, //tab bg color
                paddingBottom: 14, //tab padding margin 
                height: 75 //tab height
            },
            tabBarLabelStyle: {
                fontSize: 12, //tab text size
                fontWeight: "bold" //tab font styling
            },
        }}>
            <Tabs.Screen name='home' options={{
                title: "Home", tabBarIcon: ({ color }) => (
                    <Ionicons name='home' size={24} color={color} />
                )
            }}></Tabs.Screen>
            <Tabs.Screen name='history' options={{
                title: "History", tabBarIcon: ({ color }) => (
                    <Ionicons name='time' size={24} color={color} />
                )
            }}></Tabs.Screen>
            <Tabs.Screen name='profile' options={{
                title: "Profile", tabBarIcon: ({ color }) => (
                    <Ionicons name='person-sharm' size={24} color={color} />
                )
            }}></Tabs.Screen>
        </Tabs>
    )
}

export default TabLayout