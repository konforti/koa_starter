const router = require('koa-router')();
const auth = require('../auth');

/**
 * @api {post} /register Register new user
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer [JWT]
 * @apiHeaderExample {String} Header-Example:
 *      Authorization: Bearer [JWT]
 *
 * @apiParam {String} apiUrl X-Auth-Service-Provider header form Digit
 * @apiParam {String} credentials X-Verify-Credentials-Authorization header form Digit
 *
 * @apiParam {String} phone Phone Number
 * @apiParam {String} [firstName] User first name
 * @apiParam {String} [lastName] User last name
 *
 * @apiSuccessExample {json} Success-Response:
 *      {
 *          "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"
 *      }
 *
 * @apiSuccess {String} authToken User auth token
 */
router.post('/register', function* register() {
    const {body, headers} = this.request;

    const ret = yield auth.registerOrLogin(body, headers);

    this.body = ret;
});

module.exports = router;
