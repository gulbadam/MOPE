import React from "react";
class Rank extends React.Component {
    constructor(){
        super();
        this.state = {
            emoji: ''
        }
    }
    componentDidMount = () => {
      this.generateEmoji(this.props.entries)
    };
    generateEmoji =(entries) => {
        fetch(`https://4sjb4co4q0.execute-api.us-east-1.amazonaws.com/dev/rank?=${entries}`)
        .then(response => response.json())
        .then(data => this.setState({emoji: data.input}))
        .catch(console.log)
    }
    render() {
    return(
        <div className='white f3'>
        {`${this.props.name} , your current rank is...`} 
        <div className = 'white f1 '> {this.props.entries} </div>
        <div className = 'white f3 '> {`Rank Badge: ${this.state.emoji}` } </div>
        </div>
    ) 

} 
}
export default Rank;