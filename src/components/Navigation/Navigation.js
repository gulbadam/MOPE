import React from 'react';
import Logo from '../Logo/Logo';
import Tilt from 'react-tilt';
import brain from './brain-icon-512x512-300x300.png'
import {
  Nav,
  NavItem
} from 'react-bootstrap'
const Navigation =({onRouteChange, isSignedIn})=>{
  
    if (isSignedIn) {
      return (
    <div>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      
              <p onClick = {() => onRouteChange('signout')}
                className = "f3 i link dim black underline pa3 hover-purple pointer" > Sign Out </p>
          </div>
     <div className='ml6 mt0'>
    <Tilt className = "Tilt br2 shadow-2"
        options = {{max: 55}}
        style = {{height: 100,
                width: 100,
                marginRight: 0,
            }}>
        <div className = "Tilt-inner pa3">
        <img style = {{paddingTop: '5px'}}
        alt = 'logo'
        src = {brain}
        /> </div> </Tilt> 
        </div>
        </div> 
        
  );
    } else {
      return(
        <div>
       

      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
  <p onClick={() => onRouteChange ('signin')}
    className = "f3  i link dim black underline pa3 hover-purple pointer" > Sign In </p>
    
  
  <p onClick={() => onRouteChange('resister')} className="f3  i link dim black underline pa3 hover-purple pointer">Register</p>
  </div>
             <div className = 'ml6 mt0' >

<Tilt className = "Tilt br2 shadow-2"
        options = {{max: 55}}
        style = {{height: 100,
                width: 100,
                marginRight: 0,
            }}>
        <div className = "Tilt-inner pa3">
        <img style = {{paddingTop: '5px'}}
        alt = 'logo'
        src = {brain}
        /> </div> </Tilt> 
        </div>
   </div>
      );
            
        
      }
      }
export default Navigation