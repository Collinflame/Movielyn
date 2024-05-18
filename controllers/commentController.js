const {Comment, Reply} = require('../models');

module.exports.createComment = async function(req, res){
    let movieId = req.params.movieId;
    await Comment.create( {
        author_username: req.body.author_username,
        body: req.body.body,
        commented_on: new Date,
        movie_id: movieId
    });
    res.redirect(`/movie/${movieId}`);
}

module.exports.addReply = async function(req, res){
    const parentComment = await Comment.findByPk(req.params.commentId);
    let movieId = parentComment.movie_id;
    await Reply.create( {
        author_username: req.body.author_username,
        body: req.body.body,
        commented_on: new Date,
        movie_id: movieId,
        parent_comment_id:parentComment.id
    });
    res.redirect(`/movie/${movieId}`);
}

module.exports.deleteComment = async function(req, res){
    const comment = await Comment.findByPk(req.params.commentId);
    await Comment.update({
            is_deleted: true
        }, {
            where: {
                id: req.params.commentId
            }
        }
    );
    res.redirect(`/movie/${comment.movie_id}`);
};

module.exports.deleteReply = async function(req, res){
    const reply = await Reply.findByPk(req.params.replyId);
    await Reply.update({
            is_deleted: true
        }, {
            where: {
                id: req.params.replyId
            }
        }
    );
    res.redirect(`/movie/${reply.movie_id}`);
};