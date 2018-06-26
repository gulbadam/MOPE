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



// const particlesoptions = {
//   particles: {
//     line_linked: {
//       shadow: {
//         enable: true,
//         color: "#3CA9D1",
//         blur: 1
//       }
//     },
//       number: {
//         value: 200,
//         density: {
//           enable: true,
//           value_area: 800
//         }
//       },
//       move: {
//         enable: true,
//         speed:60

//       },
    
//       }
//     }
  

const initialState = {
  input: '',
    imageUrl: '',
    box: {},
    colors: [],
    route: 'signin',
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
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data && data.id) {
            fetch(`http://localhost:3000/profile/${data.id}`, {
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
        .catch(console.log)
    }
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
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
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
    this.setState({input: event.target.value});
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3001/imageurl', {
      method: 'post',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({
      input: this.state.input
      })
    })
    .then(response => response.json())
          .then(response => {
            if (response) {
              fetch('http://localhost:3001/image', {
                  method: 'put',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': window.sessionStorage.getItem('token')
                  },
                  body: JSON.stringify({
                    id: this.state.user.id
                  })
                })
                .then(response => response.json())
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
      this.setState(initialState)
    } else if (route ==='home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
      
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route ==="home"
       ? <div>
         {/* <Logo /> */}
          < Rank name = {
            this.state.user.name
          }
          entries = {
            this.state.user.entries
          }
          />
         <ImageLinkForm
       onInputChange = {
         this.onInputChange
       }
       onButtonSubmit = {
         this.onButtonSubmit
       }
       /> 
       <FaceRecognition box = {box}
       imageUrl = {
        imageUrl
       }
       /> { /* <InfoBox colors= {this.state.colors} /> */ }

       </div>
       : (
         route==='signin' ?
         < Signin loadUser = {this.loadUser}
         onRouteChange = {
           this.onRouteChange
         }
         />
         :<Register loadUser={this.loadUser} onRouteChange = {
           this.onRouteChange
         } />
       )
       
      }
      </div>
      
    );
  }
}

export default App;
