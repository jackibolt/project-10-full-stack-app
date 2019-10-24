
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

        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const userPassword = context.authenticatedUserPassword;
        const userId = context.authenticatedUser.userId;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
        } = this.state; 

        const course = { 
            userId, 
            title, 
            description, 
            estimatedTime, 
            materialsNeeded 
        };

        context.data.createCourse(course, authUser.emailAddress, userPassword)
            .then( errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    console.log(`${title} has been successfully created!`);
                    this.props.history.push('/');
                }
            })
            .catch( errors => { 
                console.log(errors);
                this.props.history.push('/error');
            });  
    }
    
    cancelLink = (event) => {
        event.preventDefault(); 
        this.props.history.push('/');
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
    }

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
// THIS SECTION NEEDS TO BE CONNECTED TO THE USER INFO - Line 116
        return(

            <div className="bounds course--detail">
                <div>
                    <h1>Create Course</h1>
                    <div>

                    {this.ErrorsDisplay(this.state.errors)}

                        <form>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <input 
                                            id="title" 
                                            name="title" 
                                            type="text" 
                                            className="input-title course--title--input" 
                                            placeholder="Course title..."
                                            value={this.state.title} 
                                            onChange={this.change} />
                                        </div>
                                    <p>By -------</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea 
                                            id="description" 
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
                                <button className="button" type="submit" onClick={(e) => this.handleSubmit(e)}>Create Course</button>
                                <button className="button button-secondary" onClick={(e) => this.cancelLink(e)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default CreateCourse;