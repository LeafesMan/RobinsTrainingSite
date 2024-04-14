import ErrorMessage from "./ErrorMessage";
import React from "react";

interface Props {
    formType: 'login' | 'signup' | 'forgotpassword',
    title: string,
    showError: boolean,
    errorMessage: string,
    formData: {
        email: string,
        password?: string,
        firstName?: string,
        lastName?: string,
        squadron?: string,
        role?: 'user'
    },
    onSubmit: (e: React.FormEvent) => void,
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void 
}

function EmailPasswordForm(props: Props) {
    const { formType } = props;

    return (
        <>
            {props.showError && <ErrorMessage message={props.errorMessage} />}
            <div>
                <form onSubmit={props.onSubmit}>
                    <h1>{props.title}</h1>
                    <input
                        placeholder="Email"
                        type="text"
                        name="email"
                        value={props.formData["email"]}
                        onChange={props.onInputChange}
                        required
                    />
                    <br />
                    {formType === 'signup' && (
                        <>
                            <input
                                placeholder="First Name"
                                type="text"
                                name="firstName"
                                value={props.formData["firstName"]}
                                onChange={props.onInputChange}
                                required
                            />
                            <br />
                            <input
                                placeholder="Last Name"
                                type="text"
                                name="lastName"
                                value={props.formData["lastName"]}
                                onChange={props.onInputChange}
                                required
                            />
                            <br />
                            <select
                                name="squadron"
                                value={props.formData["squadron"]}
                                onChange={props.onSelectChange}
                                required
                            >
                                <option value="" disabled selected hidden>Squadron</option>
                                <option value="577">577</option>
                                <option value="578">578</option>
                                <option value="579">579</option>
                                <option value="581">581</option>
                                <option value="582">582</option>
                                <option value="402 SWEG">402 SWEG</option>
                            </select>
                            <br />
                        </>
                    )}
                    {(formType === 'login' || formType === 'signup') && (
                        <>
                            <input
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={props.formData["password"]}
                                onChange={props.onInputChange}
                                required
                            />
                            <br />
                        </>
                    )}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default EmailPasswordForm;
