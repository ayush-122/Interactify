const Post =require('../models/post');
const Comment =require('../models/comment');

module.exports.create= async function(req,res)
{
    try
    {
 const post=  await Post.create({
    content:req.body.content,
    user:req.user._id

    });
    return res.redirect('back');
}
catch(error)
{
    console.log('error in creating posts',error);
    return res.redirect('back');
}

}
module.exports.destroy = async function(req,res)
{
    try
    {
        const post =await Post.findById(req.params.id);
        //.id means converting the object id into string
        if(post.user==req.user.id)
        {
            await post.deleteOne();
        }
       await Comment.deleteMany({post: req.params.id});
       return res.redirect('back');
    }
    catch(error)
    {
        return res.redirect('back');
    }
    

}