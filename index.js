const express =require('express');
const app =express();
const cookieParser =require('cookie-parser');
const port =8000;
const expresslayouts = require('express-ejs-layouts');

const db =require('./config/mongoose');

// used  for session cookies
const session =require('express-session');
const passport =require('passport');
const passportLocal =require('./config/passport-local-strategy');

app.use(express.static('./assets'));
app.use(expresslayouts);
app.use(express.urlencoded());
app.use(cookieParser());
//extract style and script from subpages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



///set up the views
app.set('view engine' , 'ejs');
app.set('views', './views');

app.use(session({
 name:'codeial',
 //TODO change he scret before deployment in production mode
 secret:'blahsomething',
 saveUninitialized:false,
 resave:false,
 cookie:{maxAge:(1000*60*100)}
}));

app.use(passport.initialize());
app.use(passport.session());
//use express Router
app.use('/' ,require('./routes'));

app.listen(port,function(err)
{
    if(err)
    {
        console.log(`error in starting webserver: ${err}`);
    }
    console.log(`Server is running on port :${port}`);
})