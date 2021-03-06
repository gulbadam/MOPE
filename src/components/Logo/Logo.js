import React from "react";
import Tilt from 'react-tilt';
import "./Logo.css";
import brain from './Brain-icon-300x300.png';

const Logo = () => {
    return ( <div className = 'ma4 mt4' >
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
    );
}

export default Logo;

// const Logo =()=>{
//     return (
//     <div className="ma4 mt0">
//     <Tilt className = "Tilt br2 shadow-3" options = {{max: 55}} style = {{height: 100, width: 100}}>
//     <div className = "Tilt-inner"> <img scr ={brain} alt = {'Logo'}/>
//     </div>
//     </Tilt>
    
    
//     </div> 
//     );
// }
// export default Logo;