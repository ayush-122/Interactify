const express =require('express');
const app =express();
const cookieParser =require('cookie-parser');
const port =process.env.PORT ||8000;
const expresslayouts = require('express-ejs-layouts');

const db =require('./config/mongoose');

// used  for session cookies
const session =require('express-session');
const passport =require('passport');
const passportLocal =require('./config/passport-local-strategy');
// const MongoStore= require('connect-mongo');
// const mongoStore= require('connect-mongo')(session);

const MongoStore = require('connect-mongo');

const sassMiddleWare= require('node-sass-middleware');
const flash =require('connect-flash');
const customMware =require('./config/middleware');


app.use(sassMiddleWare({
    src: './assets/scss',
    dest: './assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'


}));



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


//mongo store is used to stored the session-cookies in the db

app.use(session({
        name: 'codeial',
        // TODO change the secret before deployment in production mode
        secret: 'blahblah',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: (1000 * 60 * 100)
        },
        store:  MongoStore.create(
            {
                client: db.getClient(),
                autoRemove: 'disabled'
            },function(err){
                console.log(err||'cannot stablish the connection ok.!!!')
            }
        )
    }));


// app.use(session({
//  name:'codeial',
//  //TODO change he scret before deployment in production mode
//  secret:'blahsomething',
//  saveUninitialized:false,
//  resave:false,
//  cookie:{
//     maxAge:(1000*60*100)
// },
// // store: MongoStore.create({
// //     mongoUrl:'mongodb://localhost/codeial_development',
// //     autoRemove: 'disabled',
// //   })
// store:new mongoStore({
//     mongooseConnection:db,
//     autoRemove:'disabled'
//  },
//  function(err){
//     console.log(err||'connect-mongodb setup is ok');
//  }
//  )


// }));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

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