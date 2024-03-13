import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../firebase.ts";
import { getUserData } from '../components/firestoreUtils';
import SignIn from './Signin.tsx'; // Renamed Sigin to SignIn for consistency

interface User {
    firstName: string;
}

function Dashboard(): JSX.Element {
    const [errorMessage, setErrorMessage] = useState<string>(""); // State for error message
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null); // Specify the type for user

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                // User is signed in
                const userData = await getUserData(userAuth.uid);
                setUser(userData);
            } else {
                // User is signed out
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            // Optionally, you can add some feedback to the user upon successful sign-out
            console.log("User signed out successfully");
        } catch (error: any) {
            // Handle sign-out error
            console.error("Sign out error:", error.message);
            setErrorMessage("Failed to sign out. Please try again later.");
        }
    };

    return (
        <>
            <Navbar />
            <div>
                {user ? (
                    <div>
                        <h1>Welcome, {user.firstName}</h1>
                        <button onClick={handleSignOut}>Sign out</button>
                    </div>
                ) : (
                    null
                )}
                {errorMessage && <p>{errorMessage}</p>} {/* Display error message if present */}
            </div>
        </>
    );
}

export default Dashboard;
