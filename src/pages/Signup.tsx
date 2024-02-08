import { Timestamp } from "firebase/firestore";
import { SetDoc, GetDoc, auth } from "../firebase.ts";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import EmailPasswordForm from "../components/EmailPasswordForm.tsx";

function Signup(){
    // Vars
    const [signupData, setSignupData] = useState({password:"", email: ""});
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Generic Update State Function
    function HandleChange(e: React.ChangeEvent<HTMLInputElement>){
        setSignupData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }



    // Submit Signup Form
    async function HandleSubmit(e : React.FormEvent){
        e.preventDefault();

        setShowError(false);
        
        // Bad input and error handling
        if((await GetDoc("users/" + signupData.email)).exists()){
            setShowError(true);
            setErrorMessage("Email taken!");
            return;
        }
        if(!signupData.email.includes("@")){
            setShowError(true);
            setErrorMessage("Email invalid!");
            return;
        }
        if(signupData.password.length < 8){
            setShowError(true);
            setErrorMessage("Password must contain more than 7 characters!");
            return;
        }


        // Create User Doc
        const userData = {
            admin: false,
            stinfoProgress: 0,
            stinfoCompletionTime: new Timestamp(0,0),
            nofearProgress: 0,
            nofearCompletionTime: new Timestamp(0,0),
            recordsProgress: 0,
            recordsCompletionTime: new Timestamp(0,0),
    
        }
        SetDoc(userData, "users/" + signupData.email);
        
    

        // Create User password
        createUserWithEmailAndPassword(auth, signupData.email, signupData.password)
        .then((userCredential) => {})
        .catch((error) => {
            console.error("User creation failed: " + error.message);
        });
    

        console.log("SUCCESS: User created with email " +  signupData["email"])
        
        navigate("/signin");
    }



    // React Component
    return <>
        <EmailPasswordForm title="Signup" errorMessage={errorMessage} showError={showError} formData={signupData} onSubmit={HandleSubmit} onChange={HandleChange}/>
    </>;
}


export default Signup;