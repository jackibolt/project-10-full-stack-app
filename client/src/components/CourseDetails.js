
import React, { Component } from 'react';
import axios from 'axios';
// import {
//     Link
// } from 'react-router-dom';

class CourseDetails extends Component {

    state = {
        course: []
    };

    componentDidMount() {
        axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
            .then( response => {
                this.setState({
                    course: response.data.course
                })
            })
            .catch( error => {
                console.log(error)
            })
    };

    render() {

        let course = this.state.course;
        console.log(course)
        let courseDeets = 
            <div>
                <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                        <p>{course.teacher}</p>
                    </div>
                    <div className="course--description">
                        {course.description}
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                    <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{course.estimatedTime}</h3>
                        </li>
                        <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <p>{course.materialsNeeded}</p>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>

        return(
            <div>
                <div className='bounds'>
                    <div className="grid-100">
                        <span><a className="button" href="/">Update Course</a><a className="button" href="/">Delete Course</a></span><a
                    className="button button-secondary" href="/">Return to List</a></div>
                </div>

                { courseDeets }
            </div>


        );
    }
}

export default CourseDetails;