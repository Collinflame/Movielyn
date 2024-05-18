var express = require('express');
var router = express.Router();
const movieController = require('../controllers/movieController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');
const ensureUserAuthenticated = require('../middleware/ensureUserAuthenticated.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/movie');
});
router.get('/movie/add', ensureUserAuthenticated, movieController.renderAddForm)
router.post('/movie/add', ensureUserAuthenticated, movieController.addMovie)

router.get('/movie/:movieId', movieController.displayMovie)
router.get('/movie/', movieController.displayAll)

router.get('/movie/:movieId/edit', ensureUserAuthenticated, movieController.renderEditForm)
router.post('/movie/:movieId/edit', ensureUserAuthenticated, movieController.updateMovie)
router.get('/movie/:movieId/delete', ensureUserAuthenticated, movieController.deleteMovie)

router.post('/movie/:movieId/comment/create', commentController.createComment)
router.post('/comment/:commentId/reply/create', commentController.addReply)

router.get('/register', userController.renderRegistrationForm)
router.post('/register', userController.register)

router.get('/login', userController.renderLogin)
router.post('/login', userController.login)
router.get('/logout', userController.logout)

router.get('/comment/:commentId/delete', ensureUserAuthenticated, commentController.deleteComment)
router.get('/comment/:commentId/reply/:replyId/delete', ensureUserAuthenticated, commentController.deleteReply)

module.exports = router;