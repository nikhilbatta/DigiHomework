import React from 'react'
function LandingPage(){
    return (
        <div>
            <style jsx>{`header {
  align-items: center;
  display: flex;
  font-size: 18px;
  height: 100vh;
  justify-content: center;
  overflow: hidden;
  position: relative;
  text-align: center;
  transform-style: preserve-3d;
  perspective: 100px;
}

header:before {
  background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.8))
  background-size: cover;
  content: "";
  position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  z-index: -1;
}

header:after {
  background: #F9FCFF;
  content: "";
  height: 40rem;
  left: -5%;
  position: absolute;
    right: -5%;
    top: 90%;
  transform-origin: 0 0;
  transform: rotateZ(-4deg);
  z-index: 0;
}

.header-title, .header-subtitle {
  color: #fff;
}

.header-subtitle {
  text-transform: uppercase;
  margin-bottom: 5rem;
}

.header-button {
  transform: translateZ(.1px);
  position: relative;
  z-index: 10;
}

.animate-pop-in {
  animation: pop-in .6s ease-out forwards;
  opacity: 0;
}

.rocky-dashed {
  animation-delay: .6s;
}

.header-title {
  animation-delay: .8s;
}

.header-subtitle {
  animation-delay: 1s;
}

.header-button {
  animation-delay: 1.1s;
}


/* Animations */

@keyframes pop-in {
  0% {
    opacity: 0;
    transform: translateY(-4rem) scale(.8);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}

  `}</style>
              <header>
  <section className="header-content">
  
    <img className="rocky-dashed animate-pop-in" src="https://s3.amazonaws.com/home.kidblog.org/home/wp-content/uploads/blogging-homework-2-640x427.jpg"/>
    <h1 className="header-title animate-pop-in">Welcome To DigiHomework</h1>
    <h3 className="header-subtitle animate-pop-in">A useful way to track homework</h3>
    <h2 className="header-button animate-pop-in"><a href="/#/login" class="button">Login</a></h2>
  
    </section>
    </header>
    </div>
    )
}
export default LandingPage;