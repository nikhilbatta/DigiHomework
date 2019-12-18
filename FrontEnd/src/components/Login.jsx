import React, {useRef} from 'react'
import getBaseUrl from './apiHelper'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

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
            if(user){
                let path = `/homepage`
            props.history.push(path);
            return user;
            }
            else{
                alert("error")
            }
            
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
    var firstDivStyle = {
        textAlign: "center"
    }
    var divstyle = {
        width: '65%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '50px'
    }
    var formStyle = {
        margin: "0 auto",
        maxWidth: "320px"
    }
    // var inputStyle = {
    //     height: "50px",
    //     width: "120px"
    // }
    var btnStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
    marginBottom: '10px'
  };
    
    return (
        
        <div style={firstDivStyle}>
            <header>Welcome To DigiHomework</header>
            <div style={divstyle}>
                <form onSubmit={Authenticate} style={formStyle}>
                {/* <FormGroup>
                    <ControlLabel>Username</ControlLabel>
                </FormGroup> */}
                <label>Username </label>
                <FormGroup>
                
                <FormControl  size="50" ref={username} type="text"/>
                </FormGroup>
                <br/>
                <label>Password</label>
                <FormGroup>
                <FormControl ref={password} type="password"/>
                </FormGroup>
                <br/>
                <button style={btnStyle} type="submit" class="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Login</button>
               
                </form>
            
            </div>
        </div>
    )
}
export default Login;