
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReactMarkdown = require('react-markdown')


class CourseDetails extends Component {

    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: '',
        id: '',
        ownerFirstName: '',
        onerLastName: '',
    };

    componentDidMount() {
        axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
            .then( response => {
                this.setState({
                    title: response.data.course.title,
                    description: response.data.course.description,
                    estimatedTime: response.data.course.estimatedTime,
                    materialsNeeded: response.data.course.materialsNeeded,
                    id: response.data.course.id,
                    userId: response.data.course.userId,
                    ownerFirstName: response.data.course.User.firstName,
                    ownerLastName: response.data.course.User.lastName
                })
            })
            .catch( error => {
                console.log(error)
            })
    };

    handleDelete = (event) => {
        event.preventDefault();

        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const userPassword = context.authenticatedUserPassword;
        const id = this.props.match.params.id

        context.data.deleteCourse(id, authUser.emailAddress, userPassword)
            .then( errors => {

                if (errors.length) {
                    this.setState({ errors });
                } else {
                    console.log(`${this.state.title} has been deleted`);
                    this.props.history.push('/');
                }
            })
            .catch( errors => { 
                console.log(errors);
                this.props.history.push('/error');
            });  

    }

    isCourseOwner = () => {
        
        const { context } = this.props;
        const authUserId = context.authenticatedUser.userId;

        if (authUserId === this.state.userId){
            return(
                <span>
                    <Link className="button" to={`/courses/${this.props.match.params.id}/update`}>Update Course</Link>
                    <Link className="button" to='/' onClick={this.handleDelete}>Delete Course</Link>
                </span>
            )
        } 
    }

    render() {

        let courseDeets = 
            <div>
                <div className="grid-66">
                    <div className="course--header">
                        <h3 className="course--title">{this.state.title}</h3>
                        <p>By {this.state.ownerFirstName} {this.state.ownerLastName}</p>
                    </div>
                    <div className="course--description">
                        {this.state.description}
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                    <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{this.state.estimatedTime}</h3>
                        </li>
                        <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <ReactMarkdown source={this.state.materialsNeeded} />
                        </li>
                    </ul>
                    </div>
                </div>
            </div>

        return(
            <div>
                <div className='bounds'>
                    <div className="grid-100">
                        {this.isCourseOwner()}
                        <Link className="button button-secondary" to="/">Return to List</Link></div>
                </div>

                { courseDeets }
            </div>


        );
    }
}

export default CourseDetails;