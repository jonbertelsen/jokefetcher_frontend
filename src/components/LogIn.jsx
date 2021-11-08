import { useState } from "react";

export default function LogIn({ facade, setLoggedIn, setErrorMessage })
{
    const init = { username: "", password: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);

    const performLogin = (evt) =>
    {
        evt.preventDefault();
        facade.login(loginCredentials.username, loginCredentials.password, setLoggedIn, setErrorMessage)
    }
    const onChange = (evt) =>
    {
        setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
    }

    return (
        <div>
            <h2>Login</h2>
            <form onChange={onChange} >
                <input placeholder="User Name" id="username" />
                <input placeholder="Password" id="password" />
                <button onClick={performLogin}>Login</button>
            </form>
        </div>
    )

}