
// Import Dependencies
import React, {Component} from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

// Import Styles
import './App.css';
import './css/index.css';

// Import Components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Error from './components/Error';

import withContext from './Context';

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);


class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <Header />
        <Route exact path='/' component={Courses} />
        <Route exact path='/courses' component={Courses} />
        <Route exact path='/courses/create' component={CreateCourse} />
        <Route exact path='/courses/:id' component={CourseDetails} /> 
        <Route exact path='/courses/:id/update' component={UpdateCourse} />
        <Route path='/signin' component={UserSignInWithContext} />
        <Route path='/signup' component={UserSignUpWithContext} />
        <Route path='/signout' component={UserSignOut} />
        <Route path='/error' component={Error} />
      </BrowserRouter>
    );
  }
}

export default App;
