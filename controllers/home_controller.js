module.exports.home = function (req, res)
{
    return res.render('home',{
        title:"Home"
    });
}

module.exports.navigation =function(req ,res)
{
    return res.end('<h1>navigation bar is not built currently</h1>');
}