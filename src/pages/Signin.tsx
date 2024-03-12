import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EmailPasswordForm from "../components/EmailPasswordForm";
import Navbar from "../components/Navbar";
import ResizeableBox from "../components/ResizeableBox";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.ts";
import { FirebaseError } from "firebase/app";
import { collection, doc, getDoc } from "firebase/firestore";
import { database } from '../firebase'; //Import database


function Signin() {

    // Vars
    const [signinData, setSigninData] = useState({ password: "", email: ""});
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const userCol = collection(database, "users");

    const navigate = useNavigate();

    // Generic Update State Function
    function HandleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSigninData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }



    // Submit signin Form
    async function HandleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setShowError(false);


        //console.error("Before signInWithEmailAndPassword call"); // Add this line

        try {
            const userCredential = await signInWithEmailAndPassword(auth, signinData.email, signinData.password);
            const user = userCredential.user;
            const uid = user.uid; // Assuming UID is based on email

            // Fetch additional user data from Firestore based on UID
            /*const userDoc = await getDoc(doc(database, "users", uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const { firstName, lastName } = userData;

                // Update state with user's first and last name
                setSigninData(prevState => ({
                    ...prevState,
                    setSigninData.firstName: firstName,
                    lastName: lastName
                }));
            }*/

            navigate("/dashboard");
        } catch (error) {
            setShowError(true);
            setErrorMessage("Email or password incorrect!");
            return;
        }

    }



    // React Component
    return <>
        <Navbar />
        <ResizeableBox>
            <EmailPasswordForm  formType="login" title="Signin" errorMessage={errorMessage} showError={showError} formData={signinData} onSubmit={HandleSubmit} onChange={HandleChange} />
        </ResizeableBox>
    </>;
}


export default Signin;