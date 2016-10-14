const router = require('koa-router')();

/**
 * @api {get} / Home Page
 * @apiName Root
 * @apiGroup General
 *
 * @apiSuccess {String} body Welcome
 */
router.get('/', function *() {
    this.body = 'Welcome to Koa Starter';
});

module.exports = router;
