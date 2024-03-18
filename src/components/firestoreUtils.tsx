import { collection, doc, getDoc } from 'firebase/firestore';
import { database } from '../firebase'; // Assuming you have initialized Firestore in a separate file

interface UserData {
  firstName: string;
  lastName: string;
  squadron: string;
  nofearCompletionTime: string;
  recordsCompletionTime: string;
  stinfoCompletionTime: string;
  nofearProgress: number;
  recordsProgress: number;
  stinfoProgress: number;
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
