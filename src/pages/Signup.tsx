import { Timestamp } from "firebase/firestore";
import { SetDoc, GetDoc, auth } from "../firebase.ts";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import EmailPasswordForm from "../components/EmailPasswordForm.tsx";


function Signup() {
    const [signupData, setSignupData] = useState({
        password: "",
        email: "",
        squadron: "",
        firstName: "",
        lastName: ""
    });

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    setSignupData(prevState => ({
        ...prevState,
        [name]: value
    }));
}


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setShowError(false);

        try {
            if ((await GetDoc("users/" + signupData.email)).exists()) {
                setShowError(true);
                setErrorMessage("Email taken!");
                return;
            }
            if (!signupData.email.includes("@")) {
                setShowError(true);
                setErrorMessage("Email invalid!");
                return;
            }
            if (signupData.password.length < 8) {
                setShowError(true);
                setErrorMessage("Password must contain more than 7 characters!");
                return;
            }

            const userData = {
                admin: false,
                stinfoProgress: 0,
                stinfoCompletionTime: new Timestamp(0, 0),
                nofearProgress: 0,
                nofearCompletionTime: new Timestamp(0, 0),
                recordsProgress: 0,
                recordsCompletionTime: new Timestamp(0, 0),
                squadron: signupData.squadron,
                firstName: signupData.firstName,
                lastName: signupData.lastName
            };

            await createUserWithEmailAndPassword(auth, signupData.email, signupData.password);

            await SetDoc(userData, "users/" + signupData.email)
            
            console.log("SUCCESS: User created with email " + signupData.email);
            navigate("/signin");
        } catch (error) {
            console.error("Error in signup:", error);
            setShowError(true);
            setErrorMessage("An error occurred while signing up. Please try again later.");
        }
    }

    return (
        <>
            <EmailPasswordForm
                formType="signup"
                title="Signup"
                errorMessage={errorMessage}
                showError={showError}
                formData={signupData}
                onSubmit={handleSubmit}
                onInputChange={handleChange}
                onSelectChange={handleChange}
            />
            <hr className="short-hr"></hr>
            <Link to="/signin" className="link">Already have an account?</Link>
        </>
    );
}

export default Signup;
