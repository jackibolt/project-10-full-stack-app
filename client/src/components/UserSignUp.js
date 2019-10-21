
import React, { Component } from 'react';
// import axios from 'axios';
import {
    Link
} from 'react-router-dom';

export default class UserSignUp extends Component {

    state = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        errors: []
    }


    cancelLink = (event) => {
        event.preventDefault(); 
        this.props.history.push('/');
    }

    handleSignUp = (event) => {
        event.preventDefault();
        const { context } = this.props;
        const {
            firstName,
            lastName,
            emailAddress,
            password,
        } = this.state; 

        // New user payload
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
        };

        context.data.createUser(user)
            .then( errors => {
            if (errors.length) {
                this.setState({ errors });
            } else {
                console.log(`${emailAddress} is successfully signed up and authenticated!`);
            }
            })
            .catch( err => { 
                console.log(err);
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
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <form>
                            <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={this.state.firstName} onChange={this.change} /></div>
                            <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={this.state.lastName} onChange={this.change} /></div>
                            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={this.change} /></div>
                            <div><input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={this.change} /></div>
                            <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" value={this.state.firstName} onChange={this.change} /></div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit" onClick={(e) => this.handleSignUp(e)}>Sign Up</button>
                                <button className="button button-secondary" onClick={(e) => this.cancelLink(e)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        )
    }
}