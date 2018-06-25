import React from 'react';
import Logo from '../Logo/Logo'
const Navigation =({onRouteChange, isSignedIn})=>{
  
    if (isSignedIn) {
      return (
        
        <div><Logo />
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
  
            {/* <div id="wrapper">Button...</div>
            {window.onload =  () => {
             let ttam = TTAM('123456789abcdef0123456789abcdef0');
              ttam.connectButton('wrapper', ["basic", "rs1234"]);
            }} */}

        <p onClick={() => onRouteChange('signout')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
      </nav>
        </div>
      );
    } else {
      return(
        <div>
        <Logo />

      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
  <p onClick={() => onRouteChange ('signin')}
    className="f3 link dim black underline pa3 pointer">Sign In</p>
  <p onClick={() => onRouteChange('resister')} className="f3 link dim black underline pa3 pointer">Register</p>
    </nav>
    </div>
      );
            
        
      }
      }
export default Navigation