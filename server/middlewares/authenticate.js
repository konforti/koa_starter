const User = require('mongoose').model('User');
const jwt = require('jsonwebtoken');

/**
 * Description
 * @method authenticate
 * @param {} role
 * @return FunctionExpression
 */
function authenticate(role = false) {
    return function* authenticate(next) {
        // Verify the JWT token.
        const authorization = this.request.headers.authorization;
        const token = authorization
            ? authorization.replace('Bearer ', '')
            : this.throw('missing authorization header.', 401);

        const payload = yield jwt.verify(token, process.env.JWT_KEY);

        // Load a user by the JWT token.
        // User without token will fail auth.
        const user = yield User.findOne({authToken: token}).exec();
        if(!user) {
            this.throw('You are not authenticate.', 401);
        }

        // Check roles.
        if(role && user.roles.indexOf(role) !== -1) {
            this.throw(`You are not ${role}.`, 401);
        }

        // Set current user.
        this.request.currentUser = user;

        yield next;
    };
}

module.exports = authenticate;
