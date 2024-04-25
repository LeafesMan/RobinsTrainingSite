import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, database } from "../firebase.ts";
import { useLocation } from 'react-router-dom';
import { getUserData, getAllUserData } from "../components/firestoreUtils.tsx";
import "../components/dashboard.css"
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

function Dashboard(): JSX.Element {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData | null>(null); // Initialize userData state
    const [allUserData, setAllUserData] = useState<UserData[] | null>()


    useEffect(() => {
        const fetchData = async () => {
            const userDataString = localStorage.getItem("userData");
            if (userDataString) {
                const userEmail = JSON.parse(userDataString);
                const userData = await getUserData(userEmail);
                const allUserData = await getAllUserData();
                setUserData(userData);
                setAllUserData(allUserData);
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
                            <div className="container">
                                <h2>Personal Data</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>No Fear Act Completion Progress</th>
                                            <th>No Fear Act Completion Date</th>
                                            <th>Records Management Completion Progress</th>
                                            <th>Records Management Completion Date</th>
                                            <th>STINFO Completion Progress</th>
                                            <th>STINFO Completion Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{userData.nofearProgress}</td>
                                            <td>{userData.nofearCompletionTime.seconds === 0 ? "Not Completed" : new Date(userData.nofearCompletionTime.seconds * 1000).toLocaleString()}</td>
                                            <td>{userData.recordsProgress}</td>
                                            <td>{userData.recordsCompletionTime.seconds === 0 ? "Not Completed" : new Date(userData.recordsCompletionTime.seconds * 1000).toLocaleString()}</td>
                                            <td>{userData.stinfoProgress}</td>
                                            <td>{userData.stinfoCompletionTime.seconds === 0 ? "Not Completed" : new Date(userData.stinfoCompletionTime.seconds * 1000).toLocaleString()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <br></br>

                            {userData.admin === true ? (
                                <div>
                                    <div className="container">
                                        <h2>All User's Data</h2>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Squadron</th>
                                                    <th>No Fear Act Completion Progress</th>
                                                    <th>No Fear Act Completion Date</th>
                                                    <th>Records Management Completion Progress</th>
                                                    <th>Records Management Completion Date</th>
                                                    <th>STINFO Completion Progress</th>
                                                    <th>STINFO Completion Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allUserData && allUserData.map((user, key) => (
                                                    <tr key={key}>
                                                        <td>{user.lastName}, {user.firstName}</td>
                                                        <td>{user.squadron}</td>
                                                        <td>{user.nofearProgress}</td>
                                                        <td>{user.nofearCompletionTime.seconds === 0 ? "Not Completed" : new Date(user.nofearCompletionTime.seconds * 1000).toLocaleString()}</td>
                                                        <td>{user.recordsProgress}</td>
                                                        <td>{user.recordsCompletionTime.seconds === 0 ? "Not Completed" : new Date(user.recordsCompletionTime.seconds * 1000).toLocaleString()}</td>
                                                        <td>{user.stinfoProgress}</td>
                                                        <td>{user.stinfoCompletionTime.seconds === 0 ? "Not Completed" : new Date(user.stinfoCompletionTime.seconds * 1000).toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
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
