

import "../components/components.css"
import GetBuildContext from "../components/UnityGame";
import { Unity } from "react-unity-webgl";
import {  useCallback, useEffect, useState } from "react";
import { ReactUnityEventParameter } from "react-unity-webgl/distribution/types/react-unity-event-parameters";
import { GetActiveUserEmail, GetDoc, GetUserData, SetDoc, auth } from "../firebase";
import { Timestamp } from "firebase/firestore";
import DownloadCertificate from "../components/DownloadCertificate";
import SendEmail from "../components/EmailJS";


function STINFO(){
    const buildContext = GetBuildContext("stinfo");

    const [completed, setCompleted] = useState(false);
    const [email, setEmail] = useState("");
    const [userData, setUserData] = useState<any>({});
    const [initDone, setInitDone] = useState(false);
    if(!initDone){
        Init();
    }
    async function Init(){
        setInitDone(true);

        const email = await GetActiveUserEmail();
        const data = await GetUserData(email);

        setEmail(email);
        setUserData(data);
    }







    function handleSceneLoaded(){
        LoadUnityProgress();
    }

    async function LoadUnityProgress(){
        const email = GetActiveUserEmail();
        const data = await GetUserData(email);

        buildContext.sendMessage("Game Manager", "LoadGameAttempt", data.STINFOAttemptsLeft);
        buildContext.sendMessage("Game Manager", "LoadUserAnswers", data.STINFOUserAnsResult);
        buildContext.sendMessage("Game Manager", "LoadButtonIndex", data.STINFOButtonAnswerChoice);
        buildContext.sendMessage("Game Manager", "LoadCurrentScreen", data.STINFOCurrentScreen);
        buildContext.sendMessage("Game Manager", "LoadTrainingStatus", data.STINFOTrainingCompleted);
    }

    // Bind Unity SceneLoaded event to -> HandleSceneLoaded() above
    useEffect(() => {
        buildContext.addEventListener("LoadGameFromDatabase", handleSceneLoaded);
        return () => {
            buildContext.removeEventListener("LoadGameFromDatabase", handleSceneLoaded);
        };
    }, [buildContext.addEventListener, buildContext.removeEventListener, handleSceneLoaded]);
    
    // Handle saving data to the database
    const  handleSaveGame = useCallback((attemptsLeft: any, userAnsResult: any, buttonAnswerChoice: any, currentScreen: any, trainingCompleted: any) => {

        UpdateSavedData(attemptsLeft, userAnsResult, buttonAnswerChoice, currentScreen, trainingCompleted);

    }, []);

    async function UpdateSavedData(attemptsLeft: number, userAnsResult: boolean[], buttonAnswerChoice: string[], currentScreen: number, trainingCompleted: number){ 
        // Get Email
        const email = GetActiveUserEmail();
        const data = await GetUserData(email);

        data["STINFOAttemptsLeft"] = attemptsLeft;
        data["STINFOUserAnsResult"] = userAnsResult;
        data["STINFOButtonAnswerChoice"] = buttonAnswerChoice;
        data["STINFOCurrentScreen"] = currentScreen;
        data["STINFOTrainingCompleted"] = trainingCompleted;
        const currentProgress = (currentScreen / 30 * 100).toFixed(0);
        data["stinfoProgress"] = currentProgress;
        if(trainingCompleted === 1) {
            data["stinfoCompletionTime"] = Timestamp.now();
            data["stinfoProgress"] = 100;
        }


        // Completion
        if(currentProgress == "100"){
            setCompleted(true);
            SendEmail(email, "STINFO");
        }

        // Save Doc
        SetDoc(data, "users/" + email);
    }

    useEffect(() => {
        buildContext.addEventListener("SaveGameToDatabase", handleSaveGame);
        return () => {
            buildContext.removeEventListener("SaveGameToDatabase", handleSaveGame);
        };
    }, [buildContext.addEventListener, buildContext.removeEventListener, handleSaveGame]);
    
    return <>
    {!completed ? 
        <Unity unityProvider={buildContext.unityProvider} className="UnityGame"/> 
        : 
        <DownloadCertificate
                firstName={userData.firstName}
                lastName={userData.lastName}
                courseName={"Records Management"}
                completionDate={Timestamp.now()}
                userEmail={email}
            />
    }
    </>;
}


export default STINFO;