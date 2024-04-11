import { useNavigate } from 'react-router-dom';
import './components.css'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.ts';
import { useLocation } from 'react-router-dom';
import { getUserData } from "../components/FirestoreUtils.tsx";
import { useState, useEffect } from "react";


interface UserData {
    firstName: string;
    lastName: string;
    squadron: string;
    // Add other properties as needed
}

function Navbar() {

    const navigate = useNavigate();

    const userDataString = localStorage.getItem("userData");
    const [userData, setUserData] = useState<UserData | null>(null); // Initialize userData state

    // Parse the retrieved data if necessary
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

    const [showDropdown, setShowDropdown] = useState(false);

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };


    return <div className='navbar'>
        <div className='floatLeft libutton' onClick={() => navigate("/stinfo")}> STINFO</div>
        <div className='floatLeft libutton' onClick={() => navigate("/nofear")}> No Fear Act</div>
        <div className='floatLeft libutton' onClick={() => navigate("/records")}> Records Management</div>

        <div>
            {userData ? (
                <div className='floatRight libutton' onClick={() => { localStorage.clear(); signOut(auth); navigate("/signin"); }}> Sign Out</div>
            ) : (
                <div className='floatRight libutton' onClick={() => { localStorage.clear(); signOut(auth); navigate("/signin"); }}> Sign In </div>
            )}
        </div>
        <div className='floatRight libutton' onClick={toggleDropdown}>
            {userData ? (
                userData.firstName
            ) : (
                'Profile'
            )}
            {showDropdown && (
                <div className='dropdown-content'>
                    <div onClick={() => navigate("/dashboard")}>Dashboard</div>
                    <div onClick={() => navigate("/profile")}>Profile</div>
                    <div onClick={() => navigate("/certificates")}>Certifcates</div>

                </div>
            )}
        </div>

    </div>;
}

export default Navbar;