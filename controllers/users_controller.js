const User = require('../models/user');

module.exports.profile = function(req, res){

    console.log('how are you');
    console.log(res.locals.user);
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

// module.exports.profilelink =function(req,res)
// {
//     return res.end('<h1> no profile link is built</h1>');
// }

module.exports.signIn = function (req, res) {
    if(req.isAuthenticated())
      {
        return res.redirect('/users/profile');
      }
    return res.render('user_sign_in', {
        title: "Sign In"
    })
}
module.exports.signUp = function (req, res) {
      if(req.isAuthenticated())
      {
        return res.redirect('/users/profile');
      }

    return res.render('user_sign_up', {
        title: "Sign Up"
    })
}

module.exports.create = async function (req, res) {
    //TODO list
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }


    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            //user already exists
            return res.redirect('/users/sign-up');
        }

        const newUser = await User.create(req.body);
        //successfully created the user
        return res.redirect('/users/sign-in');
    }
    catch (error) {
        console.error('Error during sign-up');
        return res.status(500).send('Internal server error');
    }



} 
//sign in and create user session
module.exports.create_session = async function (req, res) {
    //Todo list
    return res.redirect('/');
    
}

module.exports.destroySession =function(req,res)
{
    req.logout(function(err){
        if(err){
          console.error(err);
          return res.status(500).json({ message: 'Error logging out' });
        }
    });
    console.log('cookies cleared');
    return res.redirect('/users/sign-in');
}