
const { check } = require('express-validator');

const validateCourse = [

    check('title')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Course title is required'),
    check('description')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Course description is required'),
];


module.exports = validateCourse;
