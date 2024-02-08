import { ReactElement } from "react";
import './components.css'

interface props{
    children : ReactElement;
}

function ResizeableBox(props : props){
    return <>
    <div className="box">
        {props.children}
    </div></>;
}

export default ResizeableBox;