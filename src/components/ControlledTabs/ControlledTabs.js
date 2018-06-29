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
            age: "",
            gender: "",
            culture: [],
            message: ''
        };
    }
    componentDidMount() {
        this.handleSelect(this.state.key);
    }
    handleResultsColors = (data) => {
        return data.outputs[0].data.colors.map(color => {
            const raw_hex = color.raw_hex;
            const value =  Math.floor(color.value *100);
        return {
        raw_hex: raw_hex,
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
        handleSelect(key) {
        //alert(`selected ${key}`);
        this.setState({key});
        //console.log(key)
        switch (key) {
            case 1:
        console.log(`COLOR ${key}`);
        fetch('http://localhost:3001/colors', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',},
        body: JSON.stringify({
        input: this.props.input})
        })
        .then(response => response.json())
        .then(response => {
                    this.handleColors(this.handleResultsColors(response))
        })
        .catch(err=>console.log(err));
        break;
        case 2:
    console.log(`FOCUS ${key}`);
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
            this.handleCulture(this.handleResultsMulticultural(response))

            
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
    const {colors} = this.state;

    return (
        <div className="center ma">
            <Tabs
                activeKey={this.state.key}
                onSelect={this.handleSelect}
                colors={colors}
                id="controlled-tab-example">
                <Tab eventKey={1} colors={colors} title="Colors">
                    <div>
                        <h3>
                            Colors
                        </h3>
                        <ul>
                            {
                                (colors.length > 1)
                                    ? <Context colors = {
                                        colors
                                    } />
                                    : <div></div>
                            }

                            <li></li>

                        </ul>

                    </div >
                </Tab>
                <Tab eventKey={2
} title="Tab 2">
                    Tab 2 content
                </Tab>
                <Tab eventKey={3
} title="Tab 3">
                    Demographics
                </Tab>
            </Tabs>

        </div>
    );
}
}
export default ControlledTabs;