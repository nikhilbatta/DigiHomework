import React from 'react'
function SideN(){
    var sideStyle = {
        paddingTop: "30px",
  height: "100%",
  width:"200px",
  position: "fixed",
  zIndex:"1",
  top: "0",
  left:"0",
  background: "rgb(255,255,255)",
  background: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(36, 206, 197) 100%)"
    }
    return (
        <div className='sidenav'>
        <a href="index.html"><img
            src="https://static1.squarespace.com/static/5524448ee4b0d6f6b83ab9e2/t/57cf3de246c3c4d2933aa57c/1572904787997/?format=1500w"
            id="navImg"/></a>
        <a href="login.html">Login/Sign-up</a><br/>
        <a href="index.html">Home</a><br/>
        <a href="user.html">My Profile</a>
        <a id="logout" href="index.html">Logout</a>
        </div>
   
    )
}
export default SideN;