const router = require('koa-router')();
const authenticate = require('server/middlewares/authenticate');
const Post = require('mongoose').model('Post');

router.use(authenticate());

/**
 * @api {post} /post Create post
 * @apiGroup Post
 *
 * @apiHeader {String} Authorization Bearer [JWT]
 * @apiHeaderExample {String} Header-Example:
 *      Authorization: Bearer [JWT]
 *
 * @apiSuccess {String} body Success
 */
router.post('/post', function* () {
    const {title, body, tags} = this.request.body;
    const userId = this.request.currentUser.id;
    const newPost = yield Post.create({userId, title, body, tags});

    
    this.body = JSON.stringify(newPost);
});

module.exports = router;
