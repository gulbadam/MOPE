import React from 'react';
import './InfoBox.css';

const InfoBox = ({colors}) => {
    return (
        <div>
            <p className='f3'>{}</p>
            <div className="center">
                <div className='form mw8 center pa4   shadow-5'>
                <h3>Info Box</h3>
                   <ul>
                   <li>{colors}</li>
                   <li>Image Recognition Info</li>
                    <li>Colors</li>
                    <li>Face detection</li>
                    <li>Demografics</li>
                   </ul>
                </div>
            </div>
        </div>
    )
}

export default InfoBox;