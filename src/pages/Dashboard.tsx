import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase.ts";

function Dashboard(){
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    return  <>
                <Navbar/>
            </>;
}



export default Dashboard;