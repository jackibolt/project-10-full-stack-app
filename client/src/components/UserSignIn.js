
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSignIn extends Component {

    state = {
        emailAddress: "",
        password: "",
        errors: [],
    }

    cancelLink = (event) => {
        event.preventDefault(); 
        this.props.history.push('/');
    }

    handleSignIn = (event) => {
        event.preventDefault();
        const { context } = this.props;
        // const { from } = this.props.location.state;
        const {
            emailAddress,
            password,
          } = this.state;

        context.actions.signIn(emailAddress, password)
            .then((user) => {
                if (user === null) {
                this.setState(() => {
                    return { errors: [ 'Sign-in was unsuccessful' ] };
                });
                } else {
                this.props.history.push('/');
                }
            })
            .catch((error) => {
                console.error(error);
                this.props.history.push('/error');
            });
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
    }


    render() {
        
        return(
            <div className='bounds'>
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form>
                            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={this.change} /></div>
                            <div><input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={this.change} /></div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit" onClick={(e) => this.handleSignIn(e)} >Sign In</button>
                                <button className="button button-secondary" onClick={(e) => this.cancelLink(e)} >Cancel</button>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="/">Click here</Link> to sign up!</p>
                </div>
            </div>
        )
    }
}

export default UserSignIn;