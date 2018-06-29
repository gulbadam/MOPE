import React from 'react';
import Context from "../Context/Context";
import {
    Tabs,
   Tab,
    TabContainer,
    TabContent,
    TabPane
} from 'react-bootstrap';
class ControlledTabs extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            key: 2,
            colors: [],
            
        };
    }
    componentDidMount() {
        this.handleSelect(this.state.key);
    }
    handleResults = (data) => {
        return data.outputs[0].data.colors.map(color => {
            const raw_hex = color.raw_hex;
            const value =  Math.floor(color.value *100);
        
              return {
                  raw_hex: raw_hex,
                  value: value
              }
           
            // console.log(raw_hex)
            // console.log(value)
            // console.log(color)
             })
            
            }
          
             
    handleColors = (colors) => {
        this.setState({colors: colors});
        console.log("--------")
        console.log(colors);
        console.log(typeof(colors))

    }
            

    
    

    

    handleSelect(key) {
        //alert(`selected ${key}`);
        this.setState({key});
        //console.log(key)
        switch (key) {
            case 1:
            console.log("THis state "+ this.props.input)
            //console.log("INput " + input)
           console.log(`vibor ${key}`);
               fetch('http://localhost:3001/colors', {
                       method: 'POST',
                       headers: {
                           'Content-Type': 'application/json',},
                       body: JSON.stringify({
                           input: this.props.input
                       })
                   })
                   .then(response => response.json())
                   .then(response => {
                    //    response.outputs[0].data.colors.map(color => {
                    //                const raw_hex = color.raw_hex;
                    //                const value = color.value;

                    //                return this.setState({
                    //                    cveta: {
                    //                        hex: raw_hex,
                    //                        value: value
                    //                    }
                    //                })
                    //             })
                    //         })
                       //console.log(response.outputs[0].data.colors[0])
            
                this.handleColors(this.handleResults(response))
                       })
                    .catch(err=>console.log(err));
                     
                    
                    break;

               
            case 2:
       console.log(`pribor ${key}`);

                break;
            case 3:
      console.log(`zabor ${key}`);

                break;
        
            default:
                break;
        }
    }

    render() {
        console.log(this.props)
        console.log("--------")
        console.log(this.state.colors[0])
        console.log(typeof(this.state.colors))
        const {colors} = this.state;
        
        return ( 
           <div>
            <Tabs activeKey = {this.state.key}
            onSelect = {this.handleSelect}
            colors = {colors}
            id = "controlled-tab-example" >
            <Tab eventKey = {1}
            colors = {colors}
            title = "Colors" >
         <div> <h3> Colors </h3>
         <ul> 
         {
             (colors.length > 1) ? < Context   colors={colors}/> :<div></div>
         }
         
         <li>
         </li>
         
         </ul>
         
         </div >
             </Tab> 
            <Tab eventKey = {
                2
            }
            title = "Tab 2" >
            Tab 2 content </Tab> 
            <Tab eventKey = {
                3
            }
            title = "Tab 3">
            Tab 3 content 
            </Tab> 
            </Tabs>
           
       </div>
        );
    }
}
export default ControlledTabs;