
import ErrorMessage from "./ErrorMessage";


    interface Props{
        title: string,
        showError: boolean,
        errorMessage: string,
        formData: {email:string, password:string},
        onSubmit: (e: React.FormEvent) => void,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    }

function EmailPasswordForm(props: Props){
    return <>
        {props.showError && <ErrorMessage message={props.errorMessage} />}
        <div>
            <form onSubmit={props.onSubmit}>
                <h1>{props.title}</h1>
                <label>Email: </label>
                <input 
                    type="text"
                    name="email"
                    value={props.formData["email"]}
                    onChange={props.onChange}
                    required>
                </input>
                <br></br>
                <label>Password: </label>
                <input 
                    type="password"
                    name="password" 
                    value={props.formData["password"]} 
                    onChange={props.onChange}
                    required>
                </input>
                <br></br>
                <button type="submit">Submit</button>
            </form>
        </div>
    </>;
}

export default EmailPasswordForm;