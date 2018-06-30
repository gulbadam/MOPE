import React from 'react';
import {
    Grid,
    Row,
    Col,
    Panel
} from 'react-bootstrap';
const Demographics =({culture, age, gender})=>{
return(
      < div style = {{width: '500px'}}>
      <h4>Gender</h4>
      {gender.map(p=> <Panel key={p.id}>
        <Panel.Body>
            <Grid>
            <Row>
            <Col xs = {2}> <p> {p.name} </p></Col>
            <Col xs = {1}> <p> {p.value}%</p> </Col>
           </Row> 
            </Grid>  
            </Panel.Body>
        </Panel>)
        }
        <h4>Age</h4>
          {age.map(p=> <Panel key={p.id}>
        <Panel.Body>
            <Grid>
            <Row>
            <Col xs = {2}> <p> {p.name} </p></Col>
            <Col xs = {1}> <p> {p.value}%</p> </Col>
           </Row> 
            </Grid>  
            </Panel.Body>
        </Panel>)
        }
        <h4>Multicultural</h4>
          {culture.map(p=> <Panel key={p.id}>
        <Panel.Body>
            <Grid>
            <Row>
            <Col xs = {2}> <p> {p.name} </p></Col>
            <Col xs = {1}> <p> {p.value}%</p> </Col>
           </Row> 
            </Grid>  
            </Panel.Body>
        </Panel>)
        }


          </div>
)
}
export default Demographics 