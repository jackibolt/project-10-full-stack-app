
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
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';


class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <Header />
        <Route exact path='/' component={Courses} />
        <Route exact path='/courses/:id' component={CourseDetails} /> 
        <Route path='/signin' component={UserSignIn} />
        <Route path='/signup' component={UserSignUp} />
        <Route exact path='/courses/create' component={CreateCourse} />
        <Route exact path='/courses/:id/update' component={UpdateCourse} />

      </BrowserRouter>
    );
  }
}

export default App;
