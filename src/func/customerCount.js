import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function getCustomersCount() {
  const customersRef = collection(db, "Customers");
  try {
    // Get all documents in the Customers collection
    const querySnapshot = await getDocs(customersRef);
    // Return the number of documents + 1
    return querySnapshot.size + 1;
  } catch (error) {
    // return 0;
    console.log(error);
  }
}
