import React from 'react';
import './ImageLinkForm.css';
import Dna from '../Dna/Dna'

const ImageLinkForm=({onInputChange, onButtonSubmit})=>{
    return (
        <div>
        <p className='f3'>{'This Magic Brain will detect picture.'}</p>
        <div className="center">
        <div className='form mw8 center pa4  shadow-5'>
                    <input className="f6 f5-l input-reset bn fl black-80  pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns shadow-3" type='text' onChange={onInputChange}/>
                    <button className="grow f4 link ph3 pv2 dib white  br2 - ns bg-light-purple shadow-3 pointer" onClick={onButtonSubmit}>Detect</button>
        </div>
</div>
</div>
    )
}

export default ImageLinkForm;
