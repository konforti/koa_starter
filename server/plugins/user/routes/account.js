const router = require('koa-router')();
const authenticate = require('server/middlewares/authenticate');
const User = require('mongoose').model('User');
const pick = require('lodash/pick');

router.use(authenticate());

/**
 * @api {get} /account Retrieve current user
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer [JWT]
 * @apiHeaderExample {String} Header-Example:
 *      Authorization: Bearer [JWT]
 * @apiParam {String} [fields] A comma separated fields to select
 * @apiParamExample {String} Fields-Example:
 *      ?fields=firstName,lastName
 *
 * @apiSuccessExample {json} Success-Response:
 *          {
 *              "id": "we9917307sd743",
 *              "createdAt": "2015-04-21T17:31:51.105Z",
 *              "updateAt": "2015-04-21T17:31:51.105Z",
 *              "phone": "58991730708743",
 *              "firstName": "John",
 *              "lastName": "Lennon",
 *              "email": "john@beatles.com",
 *              "picture": "https://pictureUrl.com",
 *          }
 *
 * @apiSuccess {Object} user User object
 */
router.get('/account', function* show() {
    const query = User.findById(this.request.currentUser.id);

    const fields = this.query.fields;
    if(fields) {
        const proj = fields.replace(',', ' ');
        query.select(proj);
    }

    const user = yield query.exec();

    this.body = JSON.stringify(user);
});

/**
 * @api {patch} /account Update current user
 * @apiGroup User
 *
 * @apiHeader {String} Authorization Bearer [JWT]
 * @apiHeaderExample {String} Header-Example:
 *      Authorization: Bearer [JWT]
 *
 * @apiParam {String} [firstName] User first name
 * @apiParam {String} [lastName] User last name
 * @apiParam {String} [email] User email
 * @apiParam {String} [picture] User picture URL
 *
 * @apiSuccess {Object} user User object
 */
router.patch('/account', function* update() {
    const body = this.request.body;

    const toUpdate = pick(body, User.permit);

    const user = yield User
    .findOneAndUpdate(
        {id: this.request.currentUser.id},
        toUpdate,
        {new: true}).exec();

    this.body = JSON.stringify(user);
});

module.exports = router;
