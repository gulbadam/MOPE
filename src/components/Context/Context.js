import React from 'react';
const Context =({colors})=>{
 
//const mappingFunction = p => <li key={p.raw_hex}>{p.raw_hex}</li>;

 
return (
    
    <div>
    {console.log({colors})}
    <ul>
    {colors.map(p => <li  key={p.raw_hex}> <div>{p.raw_hex}</div>  <div>{p.value}</div> % </li>)}
    </ul>



    </div>
)
}
export default Context;