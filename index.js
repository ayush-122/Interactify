const express =require('express');
const app =express();
const port =8000;

//use express Router
app.use('/' ,require('./routes'));

app.set('view-engine' , 'ejs');
app.set('views' ,'./views');

app.listen(port,function(err)
{
    if(err)
    {
        console.log(`error in starting webserver: ${err}`);
    }
    console.log(`Server is running on port :${port}`);
})