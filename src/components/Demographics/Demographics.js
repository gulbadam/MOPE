import React from 'react';
import './Demographics.css'
import {
    Grid,
    Row,
    Col,
    Panel
} from 'react-bootstrap';
const Demographics =({culture, gender})=>{
 
    

return(
      <div style = {{width: '500px'}}>
      <h4>Gender</h4>
      {gender.map(p=> <Panel key={p.id}>
        <Panel.Body className = 'pv0 panbg'>
            <Grid>
            <Row>
            <Col xs = {4} className='tl'> <p> {p.name} </p></Col>
            <Col xs = {1} className='tr'> <p> {p.value}%</p> </Col>
           </Row> 
            </Grid>  
            </Panel.Body>
        </Panel>)
        }
        <h4>Multicultural</h4>
          {culture.map(p=> <Panel key={p.id}>
        <Panel.Body className = 'pv0 panbg'>
            <Grid>
            <Row>
            <Col xs = {4} className='tl'> <p> {p.name} </p></Col>
            <Col xs = {1} className='tr'> <p> {p.value}%</p> </Col>
           </Row> 
            </Grid>  
            </Panel.Body>
        </Panel>)
        }


          </div>
)
}
export default Demographics 