const express =require('express');

const router =express.Router();

const usersController = require('../controllers/users_controller');

const postController =require('../controllers/post_controller');

router.get('/profile',usersController.profile);
// router.get('/profilelink',usersController.profilelink);

router.get('/sign-up', usersController.signUp);

router.get('/sign-in', usersController.signIn);
router.get('/post' ,postController.post );

router.post('/create' ,usersController.create);

router.post('/create-session',usersController.create_session);

router.post('/profile/sign-out' , usersController.signOut);

module.exports =router;