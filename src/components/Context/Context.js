import React from 'react';
const Context =({colors})=>{
return (
    <div>
<p>RAW_Hex</p>
<p>{colors[0].raw_hex}</p>
    </div>
)
}
export default Context;