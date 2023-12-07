const User = require('../models/user');

module.exports.profile =  async function (req, res) {
    if (req.cookies.user_id)
    {
        console.log(req.cookies.user_id);
       const user= await User.findOne({_id:req.cookies.user_id});
       console.log(user);
       if(user)
       {
        return res.render('user_profile' ,{
            title:"User profile",
            user:user
        })
       }
       else
       {
        return res.redirect('back');
       }
    }
    else
    {
        return res.redirect('/users/sign-in');
    }
}

// module.exports.profilelink =function(req,res)
// {
//     return res.end('<h1> no profile link is built</h1>');
// }

module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "Sign In"
    })
}
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "Sign Up"
    })
}
module.exports.signOut =function(req,res)
{
    res.clearCookie('user_id');
    console.log('cookies cleared');
    return res.redirect('/users/sign-in');
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
    //find the user
    try {
        const user = await User.findOne({ email: req.body.email });
        //handle user found
        if (user) {
            //handle password which does not matach
            if (user.password != req.body.password) {
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id', user._id);
            return res.redirect('/users/profile');
        }

        else {
            return res.redirect('back');
        }
    }
    catch (error) {
        onsole.error('Error during sign-in');
        return res.status(500).send('Internal server error');
    }
    
 
}