import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Rank from './components/Rank/Rank';
// import InfoBox from './components/InfoBox/InfoBox';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import "tachyons";
import Particles from 'react-particles-js';
import ControlledTabs from './components/ControlledTabs/ControlledTabs';
import {Tabs,Tab,TabContainer,TabContent,TabPane} from 'react-bootstrap';



const particlesOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}
const initialState = {
  input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    heigh: 0,
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
  }


class App extends Component {
  constructor() {
      super();
  this.state = initialState; 
}
  componentDidMount() {
    
      fetch('http://localhost:3000/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => {
          if (data && data.id) {
            fetch(`http://localhost:3000/profile/${data.id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json', 
                }
              })
              .then(response => response.json())
              .then(user => {
                if (user && user.email) {
                  this.loadUser(user)
                  this.onRouteChange('home');
                }
              })
          }
        })
        .catch(console.log)
    
  }
    

  loadUser = (data) =>{
    this.setState({user: {
      id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(data.outputs[0].data.regions[0])
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    console.log(width)
    const height = Number(image.height);
    this.setState({heigh: height})
    console.log(height)
     
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
    console.log(box);
  }
  onInputChange =(event)=>{
   
    this.setState({
      input: event.target.value
    }, () => {
      console.log(this.state.input)
    });
    console.log(event.target.value);
  }

  onButtonSubmit = (event) => {
    event.preventDefault();
    this.setState({
      imageUrl: this.state.input
    }, () => {
      console.log(this.state.imageUrl)
    });
    fetch('http://localhost:3001/imageurl', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
      body: JSON.stringify({input: this.state.input})
    })
    .then(res => res.json())
          .then(response => {
            console.log(response)
            if (response) {
              fetch('http://localhost:3001/image', {
                  method: 'put',
                  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                  id: this.state.user.id})
                })
                .then(res => res.json())
                .then(count => {
                  this.setState(Object.assign(this.state.user, {
                    entries: count
                  }))
                })
                .catch(console.log)
              }
            this.displayFaceBox(this.calculateFaceLocation(response))
          })
          .catch(err => console.log(err));
        }
   onRouteChange =(route)=> {
    if(route==='signout') {
      this.setState(initialState)
    } else if (route ==='home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  render() {
    const { isSignedIn, imageUrl, route, box, input, heigh  } = this.state;
    return (
      <div className="App">
      <Particles className = 'particles'
      params = {particlesOptions}/>
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route ==="home" 
      ? <div> <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
      <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}  /> 
     <FaceRecognition box = {box} imageUrl = {imageUrl} input ={input} heigh={heigh} onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
      </div>
      : (route==='signin' ?
      <Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
      :<Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange} />
      )
      }
  </div>
      
    );
  }
}

export default App;
