const express =require('express');

const router =express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile',usersController.profile);

console.log('I am in the user.js routes');

module.exports =router;