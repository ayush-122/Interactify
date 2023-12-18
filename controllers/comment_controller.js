const Comment = require('../models/comment');
const Post = require('../models/post');
const User =require('../models/user');

module.exports.create = async function (req, res) {
    try {
        const post = await Post.findById(req.body.post);
        if (post) {
            try {
                const comment = await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                });

                if (comment) {

                    post.comments.push(comment);
                    post.save();
                    return res.redirect('/');
                }
            }
            catch (error) {
                console.error('Error during finding posts by id', error);
                return res.status(500).send('Internal server error');

            }

        }
    }
    catch(error)
    {
        console.error('Error during creating comments', error);
        return res.status(500).send('Internal server error');
    }
}
module.exports.destroy=async function(req,res)
{
    const comment =await Comment.findById(req.params.id);
    let postID=comment.post;
    let post =await Post.findById(postID);
    console.log("I am printing in comment_controller.js");
    console.log(post.user);
  //  console.log(comment);
    if(comment.user==req.user.id || post.user==req.user.id )
    {
      //  console.log(postID);
       await comment.deleteOne();

     await   Post.findByIdAndUpdate(postID,{$pull: {comments: req.params.id}});
     return res.redirect('back');
    }
    else{
        console.log('nhi chl rha bhai');
        return res.redirect('back');
    }
}