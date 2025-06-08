import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = () => {
  const [userEmail, setUserEmail] = useState();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const db = getFirestore()
  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail")
      setUserEmail(email)

    }
    fetchUserEmail()
  }, []);
  const fetchBookings = async () => {
    if (userEmail) {
      try {
        const bookingCollection = collection(db, "bookings")
        const bookingQuery = query(bookingCollection, where("email", "==", userEmail))
        const bookingSnapShot = await getDocs(bookingQuery)
        const bookingList = bookingSnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setBookings(bookingList)
      }
      catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchBookings();
  }, [userEmail]);
  return loading ? "" : (
    <SafeAreaView className="flex-1 bg-[#2b2b2b]">
      {
        userEmail ? (<FlatList
          onRefresh={fetchBookings}
          refreshing={loading}
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="p-4 border-b border-[#fb9b33]">
              <Text className="text-white">Date:{item.date}</Text>
              <Text className="text-white">Slot:{item.slot}</Text>
              <Text className="text-white">Guest:{item.guests}</Text>
              <Text className="text-white">Restaurant:{item.restaurant}</Text>
              <Text className="text-white">Email:{item.email}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white mb-4">Please Sign in to view your booking history</Text>
            <TouchableOpacity onPress={() => router.push("/signin")} className="flex flex-row items-center">
              <Text className="text-base font-semibold underline text-[#f49b33]">Sign up</Text>
            </TouchableOpacity>
          </View>
        )
      }
    </SafeAreaView>
  )
}

export default History