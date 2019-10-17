
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Database
const { sequelize, models } = require('../db');
const { Course, User } = models;


const { validationResult } = require('express-validator');


//Middleware
const authenticateUser = require('../middleware/authenticateUser');
const validateUser = require('../middleware/validateUser');


// RETURN CURRENT USER
router.get('/users', authenticateUser, async (req, res, next) => {
    try {
        const user = await req.currentUser;
        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            userId: user.id
        });
    } catch (err) {
        next(err);
    }

})


// CREATE NEW USER
router.post('/users', validateUser, (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);
        res.status(400).json({
            errors: errorMessages
        })
    } else {
        const user = req.body;
        user.password = bcrypt.hashSync(user.password);
        console.log(user);
        User.create(user);
        res.location('/');
        res.status(201).end();
    }

})



module.exports = router;