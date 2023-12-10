const express =require('express');
const passport =require('passport');

const router =express.Router();

const usersController = require('../controllers/users_controller');

const postController =require('../controllers/post_controller');

router.get('/profile', passport.checkAuthentication,usersController.profile);
// router.get('/profilelink',usersController.profilelink);

router.get('/sign-up', usersController.signUp);

router.get('/sign-in', usersController.signIn);
router.get('/post' ,postController.post );

router.post('/create' ,usersController.create);

//it will take three arugment 2nd one will be middleware
//use passport as a middleware to autheticate
router.post('/create-session',passport.authenticate(
   'local',{failureRedirect:'/users/sign-in'} 
)
,usersController.create_session);


router.get('/sign-out',usersController.destroySession);

module.exports =router;