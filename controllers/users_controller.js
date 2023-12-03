module.exports.profile = function (req, res)
{
    return res.render('user',{
        title:"user"
    })
}

module.exports.profilelink =function(req,res)
{
    return res.end('<h1> no profile link is built</h1>');
}