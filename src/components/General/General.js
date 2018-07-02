import React from 'react';
import './General.css';

import {
    Grid,
    Row,
    Col,
    Panel
} from 'react-bootstrap';
const General =({general})=>{
return(
    <div style = {{width: '500px'}}>
    {general.map(p => <Panel key = {p.id}>
        <Panel.Body className = 'pv0 panbg'>
            <Grid>
            <Row>
            <Col xs = {4} className='tl'> <p> {p.name} </p></Col>
            <Col xs = {1} className='tr'> <p> {p.value}%</p> </Col>
           </Row> 
            </Grid>  
            </Panel.Body>
        </Panel>)}
    </div>
)

}
export default General;