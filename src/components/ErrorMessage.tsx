

interface props{
    message: string;
}

function ErrorMessage(props: props){

    return <div className="popup">{props.message}</div>;
}


export default ErrorMessage;