import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    courses: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/courses')
      .then( response => {
        this.setState({
          courses: response.data.courses
        })
      })
      .catch( error => {
        console.log(error)
      })
  };

  render () {
    console.log(this.state.courses);
    let courseList = this.state.courses.map(course => 
      <div>
        <p>{course.id} - {course.title}</p>
      </div>  
      
    )

    return (
      <div className="App">
        <header className="App-header">
          <div>
            {courseList}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
