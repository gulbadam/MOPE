import React from 'react';
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
        <Panel.Body>
            <Grid>
            <Row>
            <Col xs = {2}> <p> {p.name} </p></Col>
            <Col xs = {1}> <p> {p.value}%</p> </Col>
           </Row> 
            </Grid>  
            </Panel.Body>
        </Panel>)}
    </div>
)

}
export default General;