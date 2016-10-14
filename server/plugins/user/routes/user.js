const router = require('koa-router')();
const authenticate = require('server/middlewares/authenticate');
const User = require('mongoose').model('User');
const intersection = require('lodash/intersection');

router.use(authenticate());


/**
 * @api {get} /user/:phone Retrieve user by phone
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer [JWT]
 * @apiHeaderExample {String} Header-Example:
 *      Authorization: Bearer [JWT]
 *
 * @apiParam {String} phone Phone Number format
 * @apiParam {String} fields A comma separated fields to select
 *
 * @apiParamExample {String} Fields-Example:
 *      user/76D142ED9038C3688674?fields=firstName,lastName
 * @apiSuccess {Object} user User object
 */
router.get('/user/:phone', function* show() {
    const query = User.findOne({phone: this.params.phone});

    const fields = this.query.fields
        ? this.query.fields.replace(/ /g,'').split(',')
        : null;

    if(fields) {
        const proj = intersection(fields, User.permit).join(' ');
        query.select(proj);
    }

    const user = yield query.exec();

    this.body = JSON.stringify(user);
});

module.exports = router;
