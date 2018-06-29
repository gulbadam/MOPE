import React from 'react';
import './FaceRecognition.css';
import ControlledTabs from "../ControlledTabs/ControlledTabs"
// const FaceRecognition   = ({box, imageUrl}) =>{ 
//     return (
// <div className="center ma">
//     <div className = "absolute mt3" >
//         <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
//             <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
           
//             </div>
//          < div className = 'absolute container mt3'
//          style = {{width: '500px'}} > < ControlledTabs /> </div >
//         </div>
//     );
// }

// export default FaceRecognition;
class FaceRecognition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            colors: []
        }
    }
    render() {
        const {box, imageUrl, input, colors }= this.props;
        return(
            <div>
                <div className = "center ma" >
                    <div className = "absolute mt3" >
                        <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
                        <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
                </div>
            </div>
            <div>
            {imageUrl ? < div className = 'absolute container mt3'style = {{width: '500px'}}> <ControlledTabs input={input}/> </div> :<div></div >}
            </div>
            </div>
        )
    }
}
export default FaceRecognition;