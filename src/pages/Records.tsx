

import "../components/components.css"
import GetBuildContext from "../components/UnityGame";
import { Unity } from "react-unity-webgl";
import {  useCallback, useEffect } from "react";
import { ReactUnityEventParameter } from "react-unity-webgl/distribution/types/react-unity-event-parameters";
import { GetActiveUserEmail, GetUserData, SetDoc } from "../firebase";
import { Timestamp } from "firebase/firestore";


function Records(){
    const buildContext = GetBuildContext("records");

    return <>
    <Unity unityProvider={buildContext.unityProvider} className="UnityGame"/>
    </>;
}


export default Records;