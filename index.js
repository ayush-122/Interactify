const express =require('express');
const app =express();
const port =8000;
const expresslayouts = require('express-ejs-layouts');

const db =require('./config/mongoose');

app.use(express.static('./assets'));
app.use(expresslayouts);
//extract style and script from subpages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
//use express Router
app.use('/' ,require('./routes'));

///set up the views
app.set('view engine' , 'ejs');
app.set('views', './views');

app.listen(port,function(err)
{
    if(err)
    {
        console.log(`error in starting webserver: ${err}`);
    }
    console.log(`Server is running on port :${port}`);
})