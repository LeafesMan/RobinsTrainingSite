

interface props{
    message: string;
    color: string;
}

function Popup(props: props){

    return <div className="popup">{props.message}</div>;
}


export default Popup;