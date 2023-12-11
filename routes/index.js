const express =require('express');

const router = express.Router();

const homeController =require('../controllers/home_controller');

router.get('/', homeController.home);
// router.get('/navigation', homeController.navigation);

router.use('/users',require('./users'));

router.use('/posts',require('./post'));




module.exports= router;