
const { check } = require('express-validator');

const validateUser = [
    check('firstName')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('First name required'),
    check('lastName')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Last name required'),
    check('emailAddress')
        .isEmail()
        .withMessage('Valid email address is required'),
    check('password')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Password required')
];


module.exports = validateUser;