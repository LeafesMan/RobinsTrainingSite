import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, database } from "../firebase.ts";
import "../components/components.css"
import Navbar from "../components/Navbar";
import ResizeableBox from "../components/ResizeableBox";
import EmailPasswordForm from "../components/EmailPasswordForm";

function ForgotPassword() {
    const [emailData, setEmailData] = useState({ email: "" });
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = e.target;
        setEmailData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setShowError(false);

        try {
            await sendPasswordResetEmail(auth, emailData.email)
            console.log('Email successfully sent')
            navigate('/login');
        } catch (error) {
            setErrorMessage('Error when trying to send email reset: ' + errorMessage);
            setShowError(true);
        }
    }

    return (
        <>
            <Navbar />
            <ResizeableBox>
                <div>
                    <EmailPasswordForm
                        formType="forgotpassword"
                        title="Forgot Password"
                        errorMessage={errorMessage}
                        showError={showError}
                        formData={emailData}
                        onSubmit={handleSubmit}
                        onInputChange={handleChange}
                        onSelectChange={handleChange}
                    />
                </div>
            </ResizeableBox>
            <Link to="/signup" className="link">New Here? Sign Up</Link>
            <Link to="/signin" className="link"> Back To Sign In</Link>

        </>
    );
}

export default ForgotPassword;
