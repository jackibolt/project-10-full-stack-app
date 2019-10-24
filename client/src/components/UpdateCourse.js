
import React, { Component } from 'react';
import axios from 'axios';

class UpdateCourse extends Component {

    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        id: '',
        errors: [],
        ownerFirstName: '',
        onerLastName: '',
    };

    // fetches the course data and updates the state
    componentDidMount() {
        axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
            .then( response => {
                this.setState({
                    title: response.data.course.title,
                    description: response.data.course.description,
                    estimatedTime: response.data.course.estimatedTime,
                    materialsNeeded: response.data.course.materialsNeeded,
                    id: response.data.course.id,
                    ownerFirstName: response.data.course.User.firstName,
                    ownerLastName: response.data.course.User.lastName
                })
            })
            .catch( error => {
                console.log(error)
            })
    };

    // functionality for cancel button
    cancelLink = (event) => {
        event.preventDefault(); 
        this.props.history.push(`/courses/${this.props.match.params.id}`);
    }

    // functionality for update button
    handleSubmit = (event) => {
        event.preventDefault();

        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const userPassword = context.authenticatedUserPassword;
        const userId = context.authenticatedUser.userId;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            id,
        } = this.state;        

        const course = { 
            title, 
            description, 
            estimatedTime, 
            materialsNeeded,
            id,
            userId 
        };

        context.data.updateCourse(course, id, authUser.emailAddress, userPassword)
            .then( errors => {

                if (errors.length) {
                    this.setState({ errors });
                } else {
                    this.props.history.push(`/courses/${this.props.match.params.id}`);
                }
            })
            .catch( errors => { 
                console.log(errors);
                this.props.history.push('/error');
            });  
    }

    // resets state as user changes input
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
    };

    // dipslays validation errors if they exist
    ErrorsDisplay = ( errors ) => {
        let errorsDisplay = null;

        if (errors.length) {
          errorsDisplay = (
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  {errors.map((error, i) => 
                    <li key={i}>
                        {error}
                    </li>)}
                </ul>
              </div>
            </div>
          );
        }
      
        return errorsDisplay;
    }

    render() {

        let courseDeets = 
            <div>

            {this.ErrorsDisplay(this.state.errors)}

                <form>
                    <div className="grid-66">
                        <div className="course--header">
                            <div>
                                <input id="title" 
                                    name="title" 
                                    type="text" 
                                    className="input-title course--title--input" 
                                    placeholder="Course title..." 
                                    value={this.state.title}
                                    onChange={this.change} />
                            </div>
                            <p>By {this.state.ownerFirstName} {this.state.ownerLastName}</p>
                        </div>
                        <div className="course--description">
                            <div>
                                <textarea id="description" 
                                    name="description" 
                                    className="" 
                                    placeholder="Course description..." 
                                    value={this.state.description} 
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
                                            value={this.state.estimatedTime} 
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
                                            value={this.state.materialsNeeded} 
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

export default UpdateCourse;