import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, database } from "../firebase.ts";
import { useLocation } from 'react-router-dom';
import { getUserData } from "../components/firestoreUtils.tsx";
import "../components/dashboard.css"

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
    admin: boolean;
}

function Dashboard(): JSX.Element {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData | null>(null); // Initialize userData state


    useEffect(() => {
        const fetchData = async () => {
            const userDataString = localStorage.getItem("userData");
            if (userDataString) {
                const userEmail = JSON.parse(userDataString);
                const userData = await getUserData(userEmail);
                setUserData(userData);
            }
        };

        fetchData(); // Fetch user data when component mounts
    }, []); // Empty dependency array to run effect only once

    return (
        <>
            <Navbar />
            <div>
                {userData ? (
                    <>
                        <h1>Welcome, {userData.firstName}</h1>
                        <div style={{ textAlign: 'center' }}>
                            <p>STINFO Progress: {userData.stinfoProgress}%</p>
                            <p>No Fears Act Progress: {userData.nofearProgress}%</p>
                            <p>Records Management Progress: {userData.recordsProgress}%</p>

                            {userData.admin === true ? (
                                <p>You're an admin!</p>
                            ) : (
                                <p>You're a regular user.</p>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text">
                        <p>Please log in to access the dashboard page</p>
                    </div>
                )}

            </div>
        </>
    );
}

export default Dashboard;
