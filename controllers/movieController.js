const {Movie, Comment, Reply} = require('../models')

module.exports.renderAddForm = function(req, res){
    const movie = {
        title: '',
        subject: '',
        review: '',
        poster: '',
    };
    res.render('movies/add', {movie});
};

module.exports.addMovie = async function(req, res){
    const movie = await Movie.create( {
        title: req.body.title,
        subject: req.body.subject,
        review: req.body.review,
        poster: req.body.poster,
        author_id: req.user.id, //todo get logged in user
        date_watched: new Date()
    });
    res.redirect('/') //todo change the redirect to view all once mode
};

module.exports.displayMovie = async function(req, res){
    const movie = await Movie.findByPk(req.params.movieId, {
        include: ['author',
            {
                model: Comment,
                as: 'comments',
                required: false,
                include: [{
                    model: Reply,
                    as: 'replies',
                    required: false
                }]
            }
        ],
        order: [
            ['comments', 'commented_on', 'desc']
        ]
    });
    res.render('movies/view', {movie})
};

module.exports.displayAll = async function(req, res){
    const movies = await Movie.findAll( {
        include: ['author']
    });
    res.render('movies/viewAll', {movies})
};

module.exports.renderEditForm = async function(req, res){
    const movie = await Movie.findByPk(req.params.movieId);
    if (!movie.isOwnedBy(req.user)){
        res.redirect('/');
        return;
    }
    res.render('movies/edit', {movie});
};

module.exports.updateMovie = async function(req, res){
    const movie = await Movie.findByPk(req.params.movieId);
    if (!movie.isOwnedBy(req.user)){
        res.redirect('/');
        return;
    }
    await Movie.update({
        title: req.body.title,
        subject: req.body.subject,
        review: req.body.review,
        poster: req.body.poster,
    }, {
        where: {
            id: req.params.movieId
        }
    });
    res.redirect(`/movie/${req.params.movieId}`)
};

module.exports.deleteMovie = async function(req, res){
    const movie = await Movie.findByPk(req.params.movieId);
    if (!req.user.is('Admin') && !movie.isOwnedBy(req.user)){
        res.redirect('/');
        return;
    }
    await Movie.destroy({
        where: {
            id: req.params.movieId
        }
    });
    res.redirect('/')
};