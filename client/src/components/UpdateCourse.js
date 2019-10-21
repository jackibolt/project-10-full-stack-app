
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
        console.log(course);
        let courseDeets = 
            <div>
                <form>
                    <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                            value={course.title} /></div>
                        <p>By {course.teacher}</p>
                    </div>
                    <div className="course--description">
                        <div><textarea id="description" name="description" className="" placeholder="Course description..." value={course.description}></textarea></div>
                    </div>
                    </div>
                    <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                    placeholder="Hours" value={course.estimatedTime} /></div>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={course.materialsNeeded}></textarea></div>
                            </li>
                        </ul>
                    </div>
                    </div>
                    <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='course-detail.html';">Cancel</button></div>
                </form>
            </div>

// THIS SECTION NEEDS UPDATED LINKS
        return(
            <div className='bounds course--detail'>
                { courseDeets }
            </div>


        );
    }
}

export default CourseDetails;