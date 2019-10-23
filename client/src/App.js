
// Import Dependencies
import React, {Component} from 'react';
import {
  BrowserRouter,
  Switch,
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
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const CourseDetailsWithContext = withContext(CourseDetails);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);


class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <HeaderWithContext />
        <Switch>
          <Route exact path='/' component={CoursesWithContext} />
          <Route exact path='/courses' component={CoursesWithContext} />
          <PrivateRoute exact path='/courses/create' component={CreateCourseWithContext} />
          <PrivateRoute exact path='/courses/:id/update' component={UpdateCourseWithContext} />
          <Route exact path='/courses/:id' component={CourseDetailsWithContext} /> 
          <Route path='/signin' component={UserSignInWithContext} />
          <Route path='/signup' component={UserSignUpWithContext} />
          <Route path='/signout' component={UserSignOutWithContext} />
          <Route path='/error' component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
