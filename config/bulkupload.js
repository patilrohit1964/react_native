import { collection, doc, setDoc } from "firebase/firestore";
import { carouselImages, restaurants, slots } from "../store/restaurant";
import { db } from "./firebaseConfig";

const restaurantData = slots;
export const uploadData = async () => {
  try {
    for (let i = 0; i < restaurantData.length; i++) {
      const restaurant = restaurantData[i];
      const docRef = doc(collection(db, "slots"), `slot_${i + 1}`);
      await setDoc(docRef, restaurant);
      console.log("data upload");
    }
  } catch (error) {
    console.log(error);
  }
};
