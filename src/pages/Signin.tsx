import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EmailPasswordForm from "../components/EmailPasswordForm";
import Navbar from "../components/Navbar";
import ResizeableBox from "../components/ResizeableBox";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.ts";
import { FirebaseError } from "firebase/app";


function Signin(){
        
    // Vars
    const [signinData, setSigninData] = useState({password:"", email: ""});
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Generic Update State Function
    function HandleChange(e: React.ChangeEvent<HTMLInputElement>){
        setSigninData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }



    // Submit signin Form
    async function HandleSubmit(e : React.FormEvent){
        e.preventDefault();
        setShowError(false);
        

        //console.error("Before signInWithEmailAndPassword call"); // Add this line


        signInWithEmailAndPassword(auth, signinData.email, signinData.password)
        .then((userCred) =>{
            navigate("/");
        })
        .catch((error) => {
            setShowError(true);
            setErrorMessage("Email or password incorrect!");
            return;
        });

        
    }



    // React Component
    return  <>
                <Navbar/>
                <ResizeableBox>
                    <EmailPasswordForm title="Signin" errorMessage={errorMessage} showError={showError} formData={signinData} onSubmit={HandleSubmit} onChange={HandleChange}/>
                </ResizeableBox>
            </>;
}


export default Signin;