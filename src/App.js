import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import "tachyons";
import Particles from 'react-particles-js';

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
    boxes: [],
    route: 'signin',
    heigh: 0,
    isProfileOpen: false,
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
      old: 0,
      pet: ""
    }
  }


class App extends Component {
  constructor() {
      super();
  this.state = initialState; 
}
  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if(token) {
      fetch('http://localhost:3000/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'},
            'Authorization': token
        })
        .then(response => response.json())
        .then(data => {
          if (data && data.id) {
            fetch(`http://localhost:3001/profile/${data.id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
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
        .catch(err => console.log(err))
      }
  }
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }
  
  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    console.log(width)
    const height = Number(image.height);
    this.setState({heigh: height})
    console.log(height)
    return  data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
    }
    });
  }
  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
    console.log(boxes);
  }
  onInputChange =(event)=>{
   this.setState({input: event.target.value}, () => {
      console.log(this.state.input)
    });
    console.log(event.target.value);
  }

  onButtonSubmit = (event) => {
    event.preventDefault();
    this.setState({imageUrl: this.state.input}, () => {
      console.log(this.state.imageUrl)
      this.setState({boxes: []})
    });
    fetch('http://localhost:3001/imageurl', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
          'Authorization': window.sessionStorage.getItem('token'),
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
      'Authorization': window.sessionStorage.getItem('token'),
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
                .catch(err => console.log(err))
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
    const { isSignedIn, imageUrl, route, boxes, input, heigh  } = this.state;
    return (
      <div className="App">
      <Particles className = 'particles'
      params = {particlesOptions}/>
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route ==="home" 
      ? <div> <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
      <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}  /> 
     <FaceRecognition boxes = {boxes} imageUrl = {imageUrl} input ={input} heigh={heigh} onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
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
