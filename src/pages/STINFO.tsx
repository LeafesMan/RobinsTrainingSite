

import "../components/components.css"
import GetBuildContext from "../components/UnityGame";
import { Unity } from "react-unity-webgl";
import {  useCallback, useEffect, useState } from "react";
import { ReactUnityEventParameter } from "react-unity-webgl/distribution/types/react-unity-event-parameters";
import { GetActiveUserEmail, GetDoc, GetUserData, SetDoc, auth } from "../firebase";
import { Timestamp } from "firebase/firestore";


function STINFO(){
    const buildContext = GetBuildContext("STINFO");


    
    return <>
    <Unity unityProvider={buildContext.unityProvider} className="UnityGame"/>
    </>;
}


export default STINFO;