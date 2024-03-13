// firestoreUtils.js
import { DocumentReference, DocumentSnapshot, Timestamp, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { database } from '../firebase';

export const getUserData = async (userId: string): Promise<any> => {
    const userRef = doc(database, 'users', userId);
    const docSnap: DocumentSnapshot = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  };
