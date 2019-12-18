import React, {useRef} from 'react'
import getBaseUrl from './apiHelper'

function Login(props){
    var username = useRef("");
    var password = useRef("");

    function Authenticate(){
        console.log(props);
        let Username = username.current.value;
        let Password = password.current.value;
        console.log(Username + Password)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({Username, Password})
        };
        return fetch(getBaseUrl() + "api/authenticate", requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log(user);
            localStorage.setItem('user', JSON.stringify(user.token))
            let path = `/homepage`
            props.history.push(path);
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