import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, database } from "../firebase.ts";
import { useLocation } from 'react-router-dom';
import { getUserData } from "../components/FirestoreUtils.tsx";
import "../components/certs.css"

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

function Certs() {
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
                <h1>Certificates</h1>
            </div>
            <div>
                {userData ? (
                    <>
                        <div style={{ textAlign: 'center' }}>
                            <h2>Name: {userData.firstName} {userData.lastName}</h2>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <h2>Your Achieved Certificates</h2>
                        </div>
                    </>

                ) : (
                    <div className="text">
                        <p>Sign In To Access Your Certifcates</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default Certs;