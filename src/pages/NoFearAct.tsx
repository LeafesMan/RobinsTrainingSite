

import "../components/components.css"
import GetBuildContext from "../components/UnityGame";
import { Unity } from "react-unity-webgl";
import {  useCallback, useEffect, useState } from "react";
import { ReactUnityEventParameter } from "react-unity-webgl/distribution/types/react-unity-event-parameters";
import { GetActiveUserEmail, GetDoc, GetUserData, SetDoc, auth } from "../firebase";
import { Timestamp } from "firebase/firestore";


function NoFearAct(){
    const buildContext = GetBuildContext("nofearact");


    const [completedModule, setCompletedModule] = useState("");





    function handleSceneLoaded(){
        LoadUnityProgress();
    }
    async function LoadUnityProgress(){
        const email = GetActiveUserEmail();
        const data = await GetUserData(email);

        if(data.ActsCompleted) buildContext.sendMessage("Acts", "OnModuleCompleted");
        if(data.DartsCompleted) buildContext.sendMessage("Darts", "OnModuleCompleted");
        if(data.DoctorCompleted) buildContext.sendMessage("Doctor", "OnModuleCompleted");
        buildContext.sendMessage("Jeopardy", "SetAttempts", data.AttemptsRemaining);
    }
    // Bind Unity SceneLoaded event to -> HandleSceneLoaded() above
    useEffect(() => {
        buildContext.addEventListener("SceneLoaded", handleSceneLoaded);
        return () => {
            buildContext.removeEventListener("SceneLoaded", handleSceneLoaded);
        };
        }, [buildContext.addEventListener, buildContext.removeEventListener, handleSceneLoaded]);
    


    // Handling and Subscription to Extern ModuleCompleted UnityWebGL Events
    const  handleModuleCompleted = useCallback((moduleName: ReactUnityEventParameter) => {
        console.log("Module Completed: " + moduleName);
        
        UpdateModuleCompleted(moduleName);

        }, []);
    async function UpdateModuleCompleted(moduleName: ReactUnityEventParameter){
        // Get Email
        const email = GetActiveUserEmail();
        const data = await GetUserData(email);

        // Get Module Name amd Save Module Completed
        const moduleNameString = moduleName?.toString()
        if(moduleNameString != undefined)
            data[moduleNameString + "Completed"] = true;

        // Save Doc
        SetDoc(data, "users/" + email);
    }
    useEffect(() => {
        buildContext.addEventListener("ModuleCompleted", handleModuleCompleted);
        return () => {
            buildContext.removeEventListener("ModuleCompleted", handleModuleCompleted);
        };
    }, [buildContext.addEventListener, buildContext.removeEventListener, handleModuleCompleted]);




        // Handling and Subscription to Extern Jeopardy Passed UnityWebGL Events
        const  handleJeopardyPassed = useCallback(() => {
            console.log("JeopardyPassed");
            
            UpdateJeopardyPassed();
    
            }, []);
        async function UpdateJeopardyPassed(){
            // Get Email
            const email = GetActiveUserEmail();
            const data = await GetUserData(email);


            data["ActsCompleted"] = false;
            data["DartsCompleted"] = false;
            data["DoctorCompleted"] = false;
            data["AttemptsRemaining"] = 2;
            data["nofearCompletionTime"] = Timestamp.now();

            // Save Doc
            SetDoc(data, "users/" + email);
        }
        useEffect(() => {
            buildContext.addEventListener("JeopardyPassed", handleJeopardyPassed);
            return () => {
                buildContext.removeEventListener("JeopardyPassed", handleJeopardyPassed);
            };
        }, [buildContext.addEventListener, buildContext.removeEventListener, handleJeopardyPassed]);
    

        
        // Handling and Subscription to Extern JeopardyFailed UnityWebGL Events
        const  handleJeopardyFailed = useCallback((attemptsRemaining: ReactUnityEventParameter) => {
            console.log("JeopardyFailed");
            
            UpdateJeopardyFailed(attemptsRemaining);
    
            }, []);
        async function UpdateJeopardyFailed(attemptsRemaining: ReactUnityEventParameter){
            // Get Email
            const email = GetActiveUserEmail();
            const data = await GetUserData(email);


            // Process attempts remaining
            const attemptsRemainingNum = Number(attemptsRemaining);
            if(attemptsRemainingNum == undefined) throw new Error("Attemps Remaining is Not a Number!");


            // If no more fails reset all NoFearAct Vars
            if(attemptsRemainingNum <= 0){
                data["ActsCompleted"] = false;
                data["DartsCompleted"] = false;
                data["DoctorCompleted"] = false;
                data["AttemptsRemaining"] = 2;
            }
            // If have more attempts update attempts remaning
            else
                data["AttemptsRemaining"] = attemptsRemainingNum;
           

            // Save Doc
            SetDoc(data, "users/" + email);
        }
        useEffect(() => {
            buildContext.addEventListener("JeopardyFailed", handleJeopardyFailed);
            return () => {
                buildContext.removeEventListener("JeopardyFailed", handleJeopardyFailed);
            };
        }, [buildContext.addEventListener, buildContext.removeEventListener, handleJeopardyFailed]);
    


    return <>
    <Unity unityProvider={buildContext.unityProvider} className="UnityGame"/>
    </>;
}


export default NoFearAct;