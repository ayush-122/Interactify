const express =require('express');
const app =express();
const port =8000;

//use express Router
app.get('/' ,require('./routes'));

app.listen(port,function(err)
{
    if(err)
    {
        console.log(`error in starting webserver: ${err}`);
    }
    console.log(`Server is running on port :${port}`);
})