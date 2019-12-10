import React, {useRef} from 'react'

function Login(){
    var username = useRef("");
    var password = useRef("");

    function Authenticate(){
       
        let Username = username.current.value;
        let Password = password.current.value;
        console.log(Username + Password)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({Username, Password})
        };
        return fetch("http://localhost:4000/api/teacher", requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log(user);
            return user;
        })
    }
    function handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    logout();
                    location.reload(true);
                }
    
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            console.log(response)
            return data;
           
        });
    }
    return (
        <div>
            <h2>Welcome To DigiHomework</h2>
            <input ref={username} type="text" defaultValue="Username"></input>
            <input ref={password} type="text" defaultValue="Password"></input>
            <button onClick={Authenticate}>Sign In</button>
        </div>
    )
}
export default Login;