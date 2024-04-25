

import "../components/components.css"
import GetBuildContext from "../components/UnityGame";
import { Unity } from "react-unity-webgl";
import {  useCallback, useEffect } from "react";
import { ReactUnityEventParameter } from "react-unity-webgl/distribution/types/react-unity-event-parameters";
import { GetActiveUserEmail, GetUserData, SetDoc } from "../firebase";
import { Timestamp } from "firebase/firestore";

const maxAttempts = 3;

function NoFearAct(){
    const buildContext = GetBuildContext("nofearact");





    function handleSceneLoaded(){
        LoadUnityProgress();
    }
    async function LoadUnityProgress(){
        const email = GetActiveUserEmail();
        const data = await GetUserData(email);

        if(data.nofearActsCompleted) buildContext.sendMessage("Acts", "OnModuleCompleted");
        if(data.nofearDartsCompleted) buildContext.sendMessage("Darts", "OnModuleCompleted");
        if(data.nofearDoctorCompleted) buildContext.sendMessage("Doctor", "OnModuleCompleted");
        buildContext.sendMessage("Jeopardy", "SetAttempts", (data.nofearAttemptsRemaining == null ? maxAttempts : data.nofearAttemptsRemaining));
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
        if(moduleNameString != undefined){
            data["nofear" + moduleNameString + "Completed"] = true;

            const modulesCompleted = (data["nofearActsCompleted"] ? 1 : 0) + (data["nofearDartsCompleted"] ? 1 : 0) + (data["nofearDoctorCompleted"] ? 1 : 0) * 100;
            data["nofear" + "Progress"] = modulesCompleted / 4;
        }

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


            data["nofearActsCompleted"] = false;
            data["nofearDartsCompleted"] = false;
            data["nofearDoctorCompleted"] = false;
            data["nofearProgress"] = 0;
            data["nofearAttemptsRemaining"] = maxAttempts;
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


            // If no more fails reset all nofearAct Vars
            if(attemptsRemainingNum <= 0){
                data["nofearActsCompleted"] = false;
                data["nofearDartsCompleted"] = false;
                data["nofearDoctorCompleted"] = false;
                data["nofearProgress"] = 0;
                data["nofearAttemptsRemaining"] = maxAttempts;
            }
            // If have more attempts update attempts remaning
            else
                data["nofearAttemptsRemaining"] = attemptsRemainingNum;
           

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