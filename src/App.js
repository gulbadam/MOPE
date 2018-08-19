import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Profile from './components/Profile/Profile';
import Modal from './components/Modal/Modal';
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
    colors: [],
    gender: [],
    general: [],
    culture: [],
    age: [],
    route: 'main',
    heigh: 0,
    isProfileOpen: false,
    isSignedIn: false,
    inputIsValid: false,
    message: "",
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
      //fetch('https://alluring-redwood-89517.herokuapp.com/signin',{
      fetch('http://localhost:3000/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'},
            'Authorization': token
        })
        .then(response => response.json())
        .then(data => {
          if (data && data.id) {
            //fetch(`https://alluring-redwood-89517.herokuapp.com/profile/${data.id}`, {
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
 
// inputValidation =() =>{
//   const imgPatern = (/\.(jpeg|jpg|gif|png)$/)
//   console.log(imgPatern.test(this.state.input))
//   return  imgPatern.test(this.state.input);
//  //this.setState({
//    //inputIsValid: (this.state.input.match(/\.(jpeg|jpg|gif|png)$/) != null)
 
// }
onButtonSubmit = (event) => {
    event.preventDefault();
    //if (/\.(jpe?g|png|gif|bmp)$/i.test(this.state.input)) {
    this.setState({imageUrl: this.state.input}, () => {
      console.log(this.state.imageUrl)
      this.setState({key: 1})
      this.setState({boxes: []})
      
    });
    //fetch('https://alluring-redwood-89517.herokuapp.com/imageurl', {
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
            console.log("res", response)
           if (response) {
              //fetch('https://alluring-redwood-89517.herokuapp.com/image', {
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
                .then(response => response.json())
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
          
        //}else{
          //this.setState({messagege: "Not valid image"})
         // console.log("image not valid")

        //}
        }
      
   onRouteChange =(route)=> {
    if(route==='signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({
        isSignedIn: true
      })
    } 
    this.setState({route: route})
  }
  toggleModal = () => {
    this.setState(state => ({
      ...state,
      isProfileOpen: !state.isProfileOpen,
    }));
  }
  render() {
    const { 
      isSignedIn,
      message,
      imageUrl,
      route,
      boxes,
      input,
      heigh,
      isProfileOpen,
      user
    } = this.state;
    
    return (
      <div className="App">
      <Particles className = 'particles'
      params = {particlesOptions}/>
      <Navigation   isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal}/>
      {isProfileOpen &&
          <Modal>
            <Profile isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} user={user} loadUser={this.loadUser} />
          </Modal>
        }
      {route === "home" && isSignedIn
      ? <div> <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
      <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}  /> 
     <FaceRecognition boxes = {boxes} imageUrl = {imageUrl} input ={input} heigh={heigh} onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} message={message}/>
      </div>
      : route === "main" ? <div><ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}  /> 
     <FaceRecognition boxes = {boxes} imageUrl = {imageUrl} input ={input} heigh={heigh} onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/></div>
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
