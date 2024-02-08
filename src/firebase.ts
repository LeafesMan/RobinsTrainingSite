import { initializeApp } from "firebase/app";
import { DocumentReference, DocumentSnapshot, Timestamp, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";


// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCouB2oMT773ci5jjVGH1VhagbsnisEBPk",
  authDomain: "training-website-db2c4.firebaseapp.com",
  projectId: "training-website-db2c4",
  storageBucket: "training-website-db2c4.appspot.com",
  messagingSenderId: "526129435306",
  appId: "1:526129435306:web:c44fa449bcbd20f2e036d3"
};


export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth();
export const user = auth.currentUser;

// Call this component to navigate to signin page when not signed in
export function PrivatePage(){
  const navigate = useNavigate();
  if(user == null) navigate("/signin");
}

export async function GetDoc(path: string) : Promise<DocumentSnapshot>{
  const docRef : DocumentSnapshot = await getDoc(doc(database, path));

  return docRef;
} 
export async function SetDoc(data: object, path:string){
    const docRef = await setDoc(doc(database, path), data);
}
