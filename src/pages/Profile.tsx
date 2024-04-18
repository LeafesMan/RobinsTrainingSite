import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, database } from "../firebase.ts";
import { useLocation } from 'react-router-dom';
import { getUserData } from "../components/firestoreUtils.tsx";
import "../components/profile.css"
import { Timestamp } from "firebase/firestore";

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

function Profile() {
    const [userData, setUserData] = useState<UserData | null>(null); 
    const [email, setEmail] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const userDataString = localStorage.getItem("userData");
            if (userDataString) {
                const userEmail = JSON.parse(userDataString);
                setEmail(userEmail)
                const userData = await getUserData(userEmail);
                setUserData(userData);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <div>
                <h1>Edit My User Profile</h1>
            </div>
            <div>
                {userData ? (
                    <>
                        <div style={{ textAlign: 'center' }}>
                            <h2>Name: {userData.firstName} {userData.lastName}</h2>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <h2>Email: {email}</h2>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <h2>Squadron: {userData.squadron}</h2>
                        </div>
                    </>

                ) : (
                    <div className="text">
                        <p>Sign In To Access User Profile</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default Profile;