
import React, { Component } from 'react';

class CreateCourse extends Component {

    state = {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        errors: [],
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('mmmhm creating course is connected');
    }

    cancelLink = (event) => {
        event.preventDefault(); 
        this.props.history.push('/');
    }

    render() {

        let newCourseDeets = 
            <div>
                <h1>Create Course</h1>
                <div>
                    <form>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                                    value="" /></div>
                                <p>By Joe Smith</p>
                            </div>
                            <div className="course--description">
                                <div><textarea id="description" name="description" className="" placeholder="Course description..."></textarea></div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                        placeholder="Hours" value="" /></div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..."></textarea></div>
                                </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit" onClick={(e) => this.handleSubmit(e)}>Create Course</button>
                            <button className="button button-secondary" onClick={(e) => this.cancelLink(e)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

        return(

            <div className="bounds course--detail">
                {newCourseDeets}
            </div>

        )
    }
}

export default CreateCourse;