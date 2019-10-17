
'use strict';

const express = require('express');
const router = express.Router();

//Database
const { sequelize, models } = require('../db');
const { Course, User } = models;

const { validationResult } = require('express-validator');

//Middleware
const validateCourse = require('../middleware/validateCourse');
const authenticateUser = require('../middleware/authenticateUser');



// GETS FULL LIST OF COURSES
router.get('/courses', async (req, res, next) => {
    try {
        const courses = await Course.findAll({
            attributes: { 
                include: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded'],
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{
                model: User,
                attributes: {
                    include:['id','firstName','lastName','emailAddress'],
                    exclude:['password','createdAt','updatedAt']
                }
            }],
        });
        res.status(200).json({ courses });

    } catch (err) {
        res.status(404);
        console.log("Courses aren't loading");
        next(err);
    }
});


// GETS COURSE BY ID
router.get('/courses/:id', async (req, res, next) => {
    try {
        const course = await Course.findByPk(req.params.id, {
            attributes: { 
                include: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded'],
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{
                model: User,
                attributes: {
                    include:['id','firstName','lastName','emailAddress'],
                    exclude:['password','createdAt','updatedAt']
                }
            }],
        });
        if (course) {
            res.status(200).json({ course });
        } else {
            res.status(404).json({message: `Course with id:${req.params.id} does not exist`});
            next();
        }

    } catch (err) {
        next();
    }
});


// CREATES COURSE
router.post('/courses', authenticateUser, validateCourse, async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);
        res.status(400).json({
            errors: errorMessages
        })
    } else {
        const course = await Course.create(req.body);
        res.location(`localhost:5000/api/courses/${course.id}`).status(201).end();
    }

});


// UPDATES COURSE
router.put('/courses/:id', authenticateUser, validateCourse, async (req, res, next) => {
    try {

            const errors = validationResult(req);
            const course = await Course.findByPk(req.params.id);

            if(!errors.isEmpty()){
                const errorMessages = errors.array().map(error => error.msg);
                res.status(400).json({
                    errors: errorMessages
                })
            } else {


            if (course) {
                await course.update(req.body);
                res.status(204).json({ course }).end();

            } else {
                next();
            }
        }

    } catch (err) {
        next(err);
    }


});


// DELETES COURSE
router.delete('/courses/:id', async (req, res ) => {
    try {
        const course = await Course.findByPk(req.params.id);

        if (course) {
            course.destroy();
            res.status(204).end();
        }

    } catch (err) {
        next(err);
    }
})


module.exports = router;