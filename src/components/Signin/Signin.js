import React from 'react';
import './Signin.css';
class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            msg: ''
            
        }
    }
    
    onEmailChange =(event) => {
        this.setState({signInEmail: event.target.value})
    }
      onPasswordChange = (event) => {
          this.setState({
              signInPassword: event.target.value})
    }
     saveAuthTokenInSessions = (token) => {
     window.sessionStorage.setItem('token', token);
     }
    onSubmitSignIn = () => {
        //console.log(this.state);
        //fetch('https://alluring-redwood-89517.herokuapp.com/signin', {
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
            // .then(user => {
            //     if (user.id) {
            //         this.saveAuthTokenInSessions(user.token);
            //         this.props.loadUser(user);
                    
            //         this.props.onRouteChange('home');
                .then(data =>{
                if (data && data.success === "true") {
                    this.saveAuthTokenInSessions(data.token)
                    this.props.loadUser(data.user)
                    this.props.onRouteChange('home');
                } else {
                    this.setState({msg: "email or password is invalid"})
                } })
            
    .catch(console.log)
            }
        
    render(){
        const {onRouteChange, msg} =this.props;
return(
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className = "f1 fw6 ph0 mh0" > Sign In </legend>
                    <p className="red db fw6 lh-copy f5">{this.state.msg}</p>
                
                    <div className="mt3">
                        <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                        <input   onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-blue hover-white w-100" type="email" name="email-address" id="email-address" required="required"/>
      </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                            <input   onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-blue hover-white w-100" type="password" name="password" id="password" required="required"/>
      </div>
                            {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
    </fieldset>
                            <div className="">
                                <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" type="submit" value="Sign in"/>
    </div>
                                <div className="lh-copy mt3">
                                    <p onClick={()=>onRouteChange('register')} className="f5 link dim black db pointer">Register</p>
                                    {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
                                </div>
  </div>
</main>
        </article>
  
    )
}
}
export default Signin;
