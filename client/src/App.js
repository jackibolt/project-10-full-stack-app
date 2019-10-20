
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
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';


class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <Route exact path='/' component={Courses} />
        <Route path='/courses/:id' component={CourseDetails} /> 
      </BrowserRouter>
    );
  }
}

export default App;
