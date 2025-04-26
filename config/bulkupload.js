import { collection, doc, setDoc } from "firebase/firestore";
import { restaurants } from "../store/restaurant";
import { db } from "./firebaseConfig";

const restaurantData = restaurants;
const uploadData = async () => {
  try {
    for (let i = 0; i < restaurantData.length; i++) {
      const restaurant = restaurantData[i];
      const docRef = doc(collection(db, "restaurants"), `restaurants_${i + 1}`);
      await setDoc(docRef, restaurant);
      console.log("data upload");
    }
  } catch (error) {
    console.log(error);
  }
};
