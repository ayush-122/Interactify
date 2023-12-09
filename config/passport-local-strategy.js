const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport js

//mongoose do not use callback

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async function (email, password, done) {
        try {

            const user = await User.findOne({ email: email });

            if (!user || user.password != password) {
                console.log('Invalid UserName/Password');
                return done(null, false);

            }
            return done(null ,user);
        }
        catch (error) {
            console.log('Error in finding user -->Passport');
            return done(error);
        }
    }
));

//Serializing the user to decide which key is to kept in the cookies

passport.serializeUser(function(user ,done)
{
  done(null ,user.id);
});

//deserializing the user from the key in the cookies

passport.deserializeUser( async function(id,done)
{
    try{
   const user = await  User.findById(id);
     return done(null ,user);
    }
    catch(error){
        console.log('Error in finding user -->Passport');
        return done(error);
         
    }
})

module.exports =passport;