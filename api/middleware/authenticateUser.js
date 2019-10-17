
const bcrypt = require('bcryptjs');
const auth = require('basic-auth');

//Database
const db = require('../db');
const { User } = db.models;



const authenticateUser = async (req, res, next) => {
    let message = null;

    // parse the users' credentials from the authorization header
    const credentials = auth(req);

    // if credentials are available
    if (credentials) {

        const user = await User.findOne({
            where: { emailAddress: credentials.name }
        });
        
        if (user) {
            const authenticated = bcrypt.compareSync(credentials.pass, user.password);

            if (authenticated) {
                req.currentUser = user;
            } else {
                message = `Authentication failure for ${credentials.name}`
            }
        } else {
            message = `User not found with first name: ${credentials.name}`;
        } 
    } else {
        message = `Authorization header not found`;
    }

    if (message) {
        console.warn(message);
        res.status(401).json({message:'Access Denied'});
    } else {
        next();
    }
}

module.exports = authenticateUser;