import React from 'react';
import './FaceRecognition.css';
import ControlledTabs from "../ControlledTabs/ControlledTabs";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

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
            heigh: 0,
            key: 1

        }
    }
    render() {
        const {
            boxes,
            imageUrl,
            input,
            heigh,
            key,
            onButtonSubmit
        } = this.props;
        console.log('++++++++++++++')
    console.log(boxes)
        return(
            <div>
                <div className = "center ma" >
                    <div className = "absolute mt3" >
                        <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto' style={{ minWidth: 500 }}/>
                        
                        {boxes.map(box =>
                          <div key={`box${box.topRow}${box.rightCol}`}
                            className='bounding-box'
                            style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
                            </div>
                            )}
                </div>
            </div>
            <div>
            {(imageUrl && heigh) ?    <div className = 'relative  container mt3' style = {{width: '500px', top: `${heigh}px`}} > <ControlledTabs input={input}  key={key} onButtonSubmit={onButtonSubmit} /> </div>  :<div></div>}
            </div>
            
            </div>
        )
    }
}
export default FaceRecognition;