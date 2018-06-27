import React from 'react';
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
            key: 1
        };
    }

    handleSelect(key) {
        //alert(`selected ${key}`);
        this.setState({key});
        //console.log(key)
        switch (key) {
            case 1:
           console.log(`vibor ${key}`);

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
        
        return ( 
           
            <Tabs activeKey = {
                this.state.key
            }
            onSelect = {
                this.handleSelect
            }
            id = "controlled-tab-example" >
            <Tab eventKey = {
                1
            }
            title = "Tab 1" >
            Tab 1 content </Tab> 
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
       
        );
    }
}
export default ControlledTabs;