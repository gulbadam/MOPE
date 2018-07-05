import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';
import Tilt from 'react-tilt';
import brain from './logo-Gulbadam.png';
import { Nav, NavItem } from 'react-bootstrap'
const Navigation = ({
    onRouteChange, isSignedIn, toggleModal,}) => {
  
    if (isSignedIn) {
      return (
    <div  className = "mb5 pb5 mt3" >
    <div  onClick = {
      () => onRouteChange('home')
    }
    className = 'ml6 mt3 ponter' >
    <Tilt className = "Tilt br2 shadow-2 fl w-60 pa"
        options = {{max: 65}}
        style = {{height: 90,
                width: 90,
                marginRight: 0,
            }}>
        <div className = "Tilt-inner pa2">
        <img style = {{paddingTop: '1px'}}
        alt = 'logo'
        src = {brain}
        /> </div> </Tilt> 
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end'}} className = "mr5 mt3">
     
      <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} />
           {/*<p onClick = {() => onRouteChange('signout')}
          //       className = "f3 i link dim black underline pa3 hover-purple pointer" > Sign Out </p> */}
     </div>
     
        </div> 
        
  );
    } else {
      return(
        <div className = "mb5 pb5" >
    <div div onClick = {
      () => onRouteChange('home')
    }
    className = 'ml6 mt0 pointer' >
    <Tilt className = "Tilt br2 shadow-2 fl w-60 pa"
        options = {{max: 65}}
        style = {{height: 90,
                width: 90,
                marginRight: 0,
            }}>
        <div className = "Tilt-inner pa1">
        <img style = {{paddingTop: '1px'}}
        alt = 'logo'
        src = {brain}
        /> </div> </Tilt> 
        </div>
       

      <div style = {{display: 'flex', justifyContent: 'flex-end'}}
      className = "mr4 mt3">
  <p onClick={() => onRouteChange ('signin')}
    className = "f3  i link dim black underline pa3 mt4  ml4 hover-purple pointer" > Sign In </p>
    
  
  <p onClick={() => onRouteChange('resister')} className="f3  i link dim black underline pa3 mt4 ml4 hover-purple pointer">Register</p>
  </div>
   </div>
      );
            
        
      }
      }
export default Navigation