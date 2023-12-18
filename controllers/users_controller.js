const User = require('../models/user');

module.exports.profile = async function(req, res){

    const user =await User.findById(req.params.id);

    console.log('how are you');
   // console.log(res.locals.user);
    return res.render('user_profile', {
        title: 'User Profile',
        profile_user:user
    })
}

module.exports.update=async function(req,res)
{
    if(req.user.id==req.params.id)
    {
        await User.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email});
        return res.redirect('back');
    }
    else
    {
        res.status(401).send("unauthorized");
    }
}

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
        req.flash('success','Logged in Successfully');
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

    req.flash('success','Logged out Successfully');
   // console.log('cookies cleared');
    return res.redirect('/');
}