import React from 'react';
 import {
     Grid,
     Row,
     Col,
     Panel
 } from 'react-bootstrap';
const Context =({colors})=>{

//const mappingFunction = p => <li key={p.raw_hex}>{p.raw_hex}</li>;

 
return (
    
    <div style = {{width: '500px'}}>
   
   
    {
        colors.map(p => <Panel key = {p.raw_hex} style={{backgroundColor: `${p.raw_hex}`}}>
           
            <Panel.Body className = 'pv0'>
            <Grid>
                <Row>
                <Col xs={2} className='tl'><p>{p.name}</p></Col>
                <Col xs={2}><p> {p.raw_hex}</p> </Col> 
                <Col xs={1} className='tr'><p>{p.value}%</p></Col>  
                
                </Row>
                </Grid> 
                </Panel.Body>
               </Panel>)}
    



    </div>
)
}
export default Context;