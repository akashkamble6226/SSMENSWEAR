import { collection, getDocs , onSnapshot} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const useAllIncompletOrders = () => {
  const [allInCompletOrdersData, setAllIncompletOrdersData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "Customers"));
  //       const data = querySnapshot.docs.map((doc) => doc.data());
  //       setAllIncompletOrdersData(data);
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setLoadingData(false);
  //     }
  //   };

  //   fetchData();
  // }, [querySnapshot.docs.length]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Customers"),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setAllIncompletOrdersData(data);
        setLoadingData(false);
      },
      (err) => {
        setError(err);
        setLoadingData(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { allInCompletOrdersData, loadingData, error };
};

export default useAllIncompletOrders;
