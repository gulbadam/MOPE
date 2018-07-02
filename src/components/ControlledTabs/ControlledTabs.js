import React from 'react';
import Colors from "../Colors/Colors";
import General from "../General/General";
import Demographics from "../Demographics/Demographics";
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
            key: 1,
            colors: [],
            age: [],
            gender: [],
            culture: [],
            message: '',
            general:[]

        };
    }
    componentDidMount() {
        this.handleSelect(this.state.key);
    }
    handleResultsColors = (data) => {
        return data.outputs[0].data.colors.map(color => {
            const raw_hex = color.raw_hex;
            const name = color.w3c.name;
            const hex =color.w3c.hex;
            const value =  Math.floor(color.value *100);
        return {
        raw_hex: raw_hex,
        name: name,
        hex: hex,
        value: value
        };
})
}
    handleColors = (colors) => {
        this.setState({colors: colors});
        console.log("--------")
        console.log(colors);
        console.log(typeof(colors))
        
}
handleResultsMulticultural =(data) => {
    return data.outputs[0].data.regions[0].data.face.multicultural_appearance.concepts.map(culture => {
        const id = culture.id;
        const name= culture.name;
        const value= Math.floor(culture.value *100);
        return {
            id: id,
            name: name,
            value: value
        };
    })
}
handleCulture=(culture)=>{
    this.setState({culture: culture});
    console.log ("~~~~~~~~~~");
    console.log(culture);
    
}
handleResultGender =(data)=>{
    return data.outputs[0].data.regions[0].data.face.gender_appearance.concepts.map(gender =>{
        const id = gender.id;
        const name = gender.name;
        const value =Math.floor(gender.value *100);
        return {
            id : id,
            name: name,
            value: value
            
        };
    })
}
handleGender = (gender) =>{
    this.setState({gender: gender});
    console.log("GENDER");
    console.log(gender);
}
handeleResultsAge=(data)=>{
    return data.outputs[0].data.regions[0].data.face.age_appearance.concepts.map(age => {
        const id = age.id;
        const name = age.name;
        const value = Math.floor(age.value*100);
        return {
            id: id,
            name: name,
            value: value
        }
    })
}
handleAge =(age)=>{
    this.setState({age: age});
    console.log("age");
    console.log(age);
}
handleResultsGeneral=(data)=>{
return data.outputs[0].data.concepts.map(general => {
const id = general.id;
const name = general.name;
const value = Math.floor(general.value *100);
return {
    id: id,
    name: name,
    value: value
}
})
}
handleGeneral=(general)=>{
    this.setState({general: general});
    console.log("GENERAL");
    console.log(general)
    this.setState ({key: 1})

}
        handleSelect(key) {
        //alert(`selected ${key}`);
        this.setState({key});
        //console.log(key)
        switch (key) {
        case 1:
            console.log(`GENERAL ${key}`);
            fetch('http://localhost:3001/general', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        input: this.props.input
                    })
                })
                .then(response => response.json())
                .then(response => {
                this.handleGeneral(this.handleResultsGeneral(response))
                    console.log(response)
                })
                .catch(err => console.log(err));
        
        break;
        case 2:
    
    console.log(`COLOR ${key}`);
    fetch('http://localhost:3001/colors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: this.props.input
            })
        })
        .then(response => response.json())
        .then(response => {
            this.handleColors(this.handleResultsColors(response))
            console.log("arrrCOLORS");
            console.log(response)
        })
        .catch(err => console.log(err));
        break;
            case 3:
    console.log(`DEMOGRAFICS ${key}`);
    fetch('http://localhost:3001/demographics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: this.props.input
            })
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if (response.outputs[0].data.regions) {
            this.handleCulture(this.handleResultsMulticultural(response));
            this.handleGender(this.handleResultGender(response));
            this.handleAge(this.handeleResultsAge(response));
            console.log(response.outputs[0].data.regions[0].data.face.multicultural_appearance.concepts);
            } else  {
                const msg = "No faces detected";
                console.log(msg);
                this.setState({message: msg});
            }
        })
        .catch(err => console.log(err));
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
    const {colors, general, gender, age, culture} = this.state;

    return (
        <div className="center ma">
            <Tabs
                activeKey={this.state.key}
                onSelect={this.handleSelect}
                colors={colors}
                general={general}
                id="controlled-tab-example">
                <Tab eventKey={1} general={general} title="General">
                    <div>
                        <h3>General</h3>
                        {(general.length >1 ?
                        <General general ={general}/>:
                    <div></div>)}
                        

                    </div >
                </Tab>
                <Tab eventKey={2} title="Colors">
                    <h3> Colors </h3>
                   {(colors.length > 1) ?
                    <Colors colors = {colors}/> :
                    <div> </div>
                }
                </Tab>
               
                <Tab eventKey={3} culture={culture}  gender={gender} title="Demographics">
                    <h3> Demographics </h3>
                    {(culture.length>1)?
                    <Demographics culture={culture}  gender={gender}/>:
                    <div> </div>
                }
                </Tab>
            </Tabs>

        </div>
    );
}
}
export default ControlledTabs;