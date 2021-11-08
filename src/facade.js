const URL = "http://localhost:8080/jokeFetcher";

function handleHttpErrors(res)
{
    if (!res.ok)
    {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

let apiFacade = () =>
{

    const fetchData = (endpoint, updateAction, errorResponse) =>
    {
        const options = makeOptions("GET", true); //True add's the token
        return fetch(URL + "/api/" + endpoint, options)
            .then(handleHttpErrors)
            .then((data) => updateAction(data))
            .catch(err =>
            {
                if (err.status)
                {
                    console.log(err)
                    err.fullError.then(e => errorResponse(e.code + ": " + e.message))
                }
                else { errorResponse("Network error"); }
            })
    }

    // Security funktionalitet

    const setToken = (token) =>
    {
        localStorage.setItem('jwtToken', token)
    }
    const getToken = () =>
    {
        return localStorage.getItem('jwtToken')
    }
    const loggedIn = () =>
    {
        const loggedIn = getToken() != null;
        return loggedIn;
    }
    const logout = () =>
    {
        localStorage.removeItem("jwtToken");
    }

    const getUserRoles = () =>
    {
        const token = getToken()
        if (token != null)
        {
            const payloadBase64 = getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const roles = decodedClaims.roles
            return roles
        } else return ""
    }

    const hasUserAccess = (neededRole) =>
    {
        const roles = getUserRoles().split(',')
        console.log('roles', roles, roles.includes(neededRole))
        return roles.includes(neededRole)
    }

    const login = (user, password) =>
    {
        const options = makeOptions("POST", true, { username: user, password: password });
        return fetch(URL + "/api/login", options)
            .then(handleHttpErrors)
            .then(res => { setToken(res.token) })

    }

    const makeOptions = (method, addToken, body) =>
    {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken && loggedIn())
        {
            opts.headers["x-access-token"] = getToken();
        }
        if (body)
        {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }

    return {
        makeOptions,
        fetchData,
        setToken,
        getToken,
        loggedIn,
        login,
        logout,
        getUserRoles,
        hasUserAccess,
    }

}

const facade = apiFacade()

export default facade
