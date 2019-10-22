
import React, { Component } from 'react';
import axios from 'axios';

// THIS NEEDS UPDATES TO TEACHER + EDITING CAPABILITIES + UPDATING THE DATABASE
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
                console.log(this.state.course)
            })
            .catch( error => {
                console.log(error)
            })
    };

    cancelLink = (event) => {
        event.preventDefault(); 
        this.props.history.push(`/courses/${this.props.match.params.id}`);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('mmmhm');
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
    };

    render() {

        let course = this.state.course;
        let courseDeets = 
            <div>
                <form>
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <div>
                                <input id="title" 
                                    name="title" 
                                    type="text" 
                                    className="input-title course--title--input" 
                                    placeholder="Course title..." 
                                    value={this.state.course.title}
                                    onChange={this.change} />
                            </div>
                            <p>By {course.teacher}</p>
                        </div>
                        <div className="course--description">
                            <div>
                                <textarea id="description" 
                                    name="description" 
                                    className="" 
                                    placeholder="Course description..." 
                                    value={this.state.course.description} 
                                    onChange={this.change}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div>
                                        <input 
                                            id="estimatedTime" 
                                            name="estimatedTime" 
                                            type="text" 
                                            className="course--time--input" 
                                            placeholder="Hours" 
                                            value={this.state.course.estimatedTime} 
                                            onChange={this.change} />
                                    </div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div>
                                        <textarea 
                                        id="materialsNeeded" 
                                            name="materialsNeeded" 
                                            className="" 
                                            placeholder="List materials..." 
                                            value={this.state.course.materialsNeeded} 
                                            onChange={this.change}>
                                        </textarea>
                                        </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit" onClick={(e) => this.handleSubmit(e)}>Update Course</button>
                        <button className="button button-secondary" onClick={(e) => this.cancelLink(e)}>Cancel</button>
                    </div>
                </form>
            </div>

        return(

            <div className='bounds course--detail'>
                { courseDeets }
            </div>

        );
    }
}

export default CourseDetails;