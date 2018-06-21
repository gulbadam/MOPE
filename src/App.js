import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
// import InfoBox from './components/InfoBox/InfoBox';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import "tachyons";
import Particles from 'react-particles-js';
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: 'aa771fc1104f4d49827dac5a21154465'
});

const particlesoptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 1
      }
    },
      number: {
        value: 200,
        density: {
          enable: true,
          value_area: 600
        }
      },
      move: {
        enable: true,
        speed:60

      },
    
      }
    }
  



class App extends Component {
  state ={
    input: '',
    imageUrl: '',
    box: {},
    colors: [],
    route: 'signin',
    isSignedIn: false
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return  {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height -(clarifaiFace.bottom_row * height)
    }

  }
  displayFaceBox =(box) =>{
    console.log(box);
    this.setState ({box: box})

  }
  onInputChange =(event)=>{
    this.setState({input: event.target.value});
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
    }

        // this.setState({ colors: response.outputs[0].data.colors });
        // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    // app.models.predict(Clarifai.COLOR_MODEL, this.state.input).then(
    //   function (response) {
        
    //     this.setState({ colors: response.outputs[0].data.colors});
    //     console.log (response.outputs[0].data.colors[0].raw_hex);

       

        
        // do something with response
        
      // },
      
  onRouteChange =(route)=> {
    if(route==='signout') {
      this.setState({isSignedIn: false})
    } else if (route ==='home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  render() {
    const {isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesoptions}/>
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route ==="home"
       ? <div>
         <Logo />
          <Rank />
         <ImageLinkForm
       onInputChange = {
         this.onInputChange
       }
       onButtonSubmit = {
         this.onButtonSubmit
       }
       /> 
       <FaceRecognition box = {
         box
       }
       imageUrl = {
        imageUrl
       }
       /> { /* <InfoBox colors= {this.state.colors} /> */ }

       </div>
       : (
         route==='signin' ?
         <Signin onRouteChange = {
           this.onRouteChange
         }
         />
         :<Register onRouteChange = {
           this.onRouteChange
         } />
       )
       
      }
      </div>
      
    );
  }
}

export default App;
