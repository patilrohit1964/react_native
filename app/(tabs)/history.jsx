import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { getFirestore } from 'firebase/firestore';

const History = () => {
  const [userEmail, setUserEmail] = useState();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState([]);
  const router = useRouter();
  const db = getFirestore()
  useEffect(() => {
    const fetchUserEmail = async () => {

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