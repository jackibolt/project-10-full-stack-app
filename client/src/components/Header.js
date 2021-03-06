
import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class Header extends Component {

    render() {

      const { context } = this.props;
      const authUser = context.authenticatedUser;

        return(

          // shows user sign in/out dependent on Provider state
          <div className="header">
            <div className="bounds">
              <h1 className="header--logo"><Link to='/'>Courses</Link></h1>
              <nav>

                {authUser ? (
                  <React.Fragment>
                    <span>Welcome, {authUser.firstName}!</span>
                    <Link to="/signout">Sign Out</Link>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link className="signup" to="/signup">Sign Up</Link>
                    <Link className="signin" to="/signin">Sign In</Link>
                  </React.Fragment>
                )}

              </nav>
            </div>
          </div>
          
        );
    }
}

export default Header;