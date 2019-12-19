import React from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

function LetsSee(props){
    console.log(props.history)
    var headerStyle = {
        backgroundColor: 'grey',
    }
    function handleClick(){
        console.log("props")
        console.log(localStorage.getItem('user'))
        let newpath = `/#`
        props.history.push(newpath);
    }
    if(props.history.location.pathname == "/"){
        return (
       
                <Navbar style={headerStyle}>
                     <Navbar.Brand href="/#">DigiHomework</Navbar.Brand>
                </Navbar>
          
        )
    } else {
    return (
        <Navbar style={headerStyle} expand="lg">
        <Navbar.Brand href="/#">DigiHomework</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Navbar.Brand onClick={handleClick}>Sign Out</Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
    }
}
export default withRouter(LetsSee);