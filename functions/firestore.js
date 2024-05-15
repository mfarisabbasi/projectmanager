import db from "../config/firestore";
import { collection, onSnapshot, query } from "firebase/firestore";

export const getRealtimeDocs = (collectionName, setItems) => {
  const q = query(collection(db, collectionName));

  return new Promise((resolve, reject) => {
    onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        resolve(data);
        console.log(data);
        setItems(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
