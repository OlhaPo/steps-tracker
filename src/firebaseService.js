import {
  getDoc,
  doc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

export const getRecordById = async (recordId) => {
  try {
    const recordRef = doc(db, "dailyRecord", recordId);
    const recordSnapshot = await getDoc(recordRef);

    if (recordSnapshot.exists()) {
      const recordData = recordSnapshot.data();
      return recordData;
    } else {
      console.log("No record found with ID:", recordId);
      return null;
    }
  } catch (error) {
    console.log("Error fetching record:", error);
    return null;
  }
};

export const fetchCollectionData = async () => {
  const collectionRef = collection(db, "dailyRecord");
  const q = query(collectionRef, orderBy("timestamp", "desc"));

  try {
    const querySnapshot = await getDocs(q);
    const fetchedData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return fetchedData;
    // setRecords(fetchedData);
  } catch (error) {
    console.error("Error fetching collection data: ", error);
  }
};
