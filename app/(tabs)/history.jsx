import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { collection, getFirestore, query, where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = () => {
  const [userEmail, setUserEmail] = useState();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState([]);
  const router = useRouter();
  const db = getFirestore()
  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail")
      setUserEmail(email)

    }
    fetchUserEmail()
  }, []);
  useEffect(() => {
    const fetchBookings = async () => {
      if (userEmail) {
        try {
          const bookingCollection = collection(db, "bookings")
          const bookingQuery = query(bookingCollection, where("email", "==", userEmail))
        }
        catch (error) {
          console.log(error)
        }
      }
    }
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-[#2b2b2b]">
      {
        userEmail ? (<FlatList></FlatList>) : ""
      }
    </SafeAreaView>
  )
}

export default History