import { collection, doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailPasswordForm from "../components/EmailPasswordForm";
import Navbar from "../components/Navbar";
import ResizeableBox from "../components/ResizeableBox";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../firebase.ts"; //Import database

function Signin() {
  const [signinData, setSigninData] = useState({ password: "", email: "" });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function HandleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSigninData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function HandleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowError(false);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signinData.email,
        signinData.password
      );
      const user = userCredential.user;

      // Fetch user data from Firestore based on their email
      const userDoc = await getDoc(doc(database, 'users', signinData.email));
      if (userDoc.exists()) {
        // User data found, save it to local storage
        const userData = signinData.email;
        localStorage.setItem("userData", JSON.stringify(userData));
        console.log(userData)

        // Navigate to another page
        navigate("/dashboard");
      } else {
        // No user data found
        console.log("No user data found!");
      }
    } catch (error) {
      setShowError(true);
      setErrorMessage("Email or password incorrect!");
      return;
    }
  }

  return (
    <>
      <Navbar />
      <ResizeableBox>
        <EmailPasswordForm
          formType="login"
          title="Sign In"
          errorMessage={errorMessage}
          showError={showError}
          formData={signinData}
          onSubmit={HandleSubmit}
          onChange={HandleChange}
        />
      </ResizeableBox>
    </>
  );
}

export default Signin;
