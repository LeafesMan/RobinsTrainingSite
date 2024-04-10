import "./components.css"
import { Unity, useUnityContext } from "react-unity-webgl";

interface props{
  buildName: string;
}

function UnityGame(props: props){
    
    const { unityProvider } = useUnityContext({
        loaderUrl:    "/" + props.buildName + "/build.loader.js",
        dataUrl:      "/" + props.buildName + "/build.data.unityweb",
        frameworkUrl: "/" + props.buildName + "/build.framework.js.unityweb",
        codeUrl:      "/" + props.buildName + "/build.wasm.unityweb",
      });


    // React Component
    return <>
    <Unity unityProvider={unityProvider} className="UnityGame"/>
    </>;
}


export default UnityGame;