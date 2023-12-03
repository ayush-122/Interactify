const express =require('express');

const router = express.Router();

const homeController =require('../controllers/home_controller');

router.get('/',homeController.home);

console.log(' I am using now users routes');
router.use('/users',require('./users'));



module.exports= router;