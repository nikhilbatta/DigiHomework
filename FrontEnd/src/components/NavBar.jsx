import React from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function LetsSee(props){
    console.log(props.history)
    var headerStyle = {
        backgroundColor: 'black',
        color: "white",
    }
    function handleClick(){
        console.log("props")
        console.log(localStorage.getItem('user'))
        localStorage.setItem('user', null)
        let newpath = `/login`
        props.history.push(newpath);
    }
    if(props.history.location.pathname == "/" || props.history.pathname == "sh/:shID"){
        return (
       
            <nav>
            <div style={headerStyle} className="nav-wrapper">
              <a href="#" className="brand-logo">DigiHomework</a>
            </div>
          </nav>
          
        )
    } else {
    return (
        <nav>
    <div style={headerStyle} className="nav-wrapper">
      <a href="#" className="brand-logo">DigiHomework</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="/#/homepage">Homepage</a></li>
        <li><a onClick={handleClick}>Sign Out</a></li>
      </ul>
    </div>
  </nav>
 
    )
    }
}
export default withRouter(LetsSee);