
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class SignOut extends Component {

    render() {

        const {context} = this.props;
        context.actions.signOut();

        return(
            <Redirect to='/' />
        );
    }
}

export default SignOut;