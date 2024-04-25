import { Timestamp, collection, doc, getDoc, getDocs} from 'firebase/firestore';
import { database, user } from '../firebase'; // Assuming you have initialized Firestore in a separate file

interface UserData {
  firstName: string;
  lastName: string;
  squadron: string;
  nofearCompletionTime: Timestamp;
  recordsCompletionTime: Timestamp;
  stinfoCompletionTime: Timestamp;
  nofearProgress: number;
  recordsProgress: number;
  stinfoProgress: number;
  admin: boolean;
}

async function getUserData(email: string): Promise<UserData | null> {
  try {
    const usersRef = collection(database, 'users');
    const docRef = doc(usersRef, email);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      console.log('No user found with the provided ID.');
      return null;
    } else {
      const userData = docSnapshot.data() as UserData;
      return userData;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

export { getUserData };

async function getAllUserData(): Promise<UserData[] | null> {
  try {
    const usersRef = collection(database, 'users');
    const querySnapshot = await getDocs(usersRef);

    const allUserData: UserData[] = []; // Initialize empty array

    querySnapshot.forEach((doc) => {
      allUserData.push(doc.data() as UserData); // Type cast and push to array
    });

    return allUserData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

export { getAllUserData };

