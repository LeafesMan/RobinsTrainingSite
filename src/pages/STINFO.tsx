

import "../components/components.css"
import GetBuildContext from "../components/UnityGame";
import { Unity } from "react-unity-webgl";
import {  useCallback, useEffect, useState } from "react";
import { ReactUnityEventParameter } from "react-unity-webgl/distribution/types/react-unity-event-parameters";
import { GetActiveUserEmail, GetDoc, GetUserData, SetDoc, auth } from "../firebase";
import { Timestamp } from "firebase/firestore";


function STINFO(){
    const buildContext = GetBuildContext("STINFO");

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
    //const  handleSaveGame = useCallback((attemptsLeft: any, userAnsResult: any, buttonAnswerChoice: any, trainingCompleted: any) => {

        UpdateSavedData(attemptsLeft, userAnsResult, buttonAnswerChoice, currentScreen, trainingCompleted);
        //UpdateSavedData(attemptsLeft, userAnsResult, buttonAnswerChoice, trainingCompleted);

    }, []);

    async function UpdateSavedData(attemptsLeft: number, userAnsResult: boolean[], buttonAnswerChoice: string[], currentScreen: number, trainingCompleted: number){
    //async function UpdateSavedData(attemptsLeft: number, userAnsResult: boolean[], buttonAnswerChoice: string[], trainingCompleted: number){    
        // Get Email
        const email = GetActiveUserEmail();
        const data = await GetUserData(email);

        data["STINFOAttemptsLeft"] = attemptsLeft;
        data["STINFOUserAnsResult"] = userAnsResult;
        data["STINFOButtonAnswerChoice"] = buttonAnswerChoice;
        data["STINFOCurrentScreen"] = currentScreen;
        data["STINFOTrainingCompleted"] = trainingCompleted;
        if(trainingCompleted === 1) {
            data["stinfoCompletionTime"] = Timestamp.now();
        }

        console.log("STINFOAttemptsLeft has updated to: " + attemptsLeft);
        console.log("STINFOAttemptsLeft type is: " + typeof attemptsLeft);

        console.log("STINFOUserAnsResult has updated to: " + userAnsResult);
        console.log("STINFOUserAnsResult type is : " + typeof userAnsResult);

        console.log("STINFOButtonAnswerChoice has updated to: " + buttonAnswerChoice);
        console.log("STINFOButtonAnswerChoice type is : " + typeof buttonAnswerChoice);

        console.log("STINFOTrainingCompleted has updated to : " + trainingCompleted);
        console.log("STINFOTrainingCompleted type is : " + typeof trainingCompleted);

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
        <Unity unityProvider={buildContext.unityProvider} className="UnityGame"/>
    </>;
}


export default STINFO;