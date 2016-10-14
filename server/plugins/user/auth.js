const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('mongoose').model('User');
const url = require('url');
const fetch = require('node-fetch');
const gcm = require('server/utils/gcm');
const log = require('server/utils/logger');
const contacts = require('server/plugins/contact/contacts');

/**
 * Description
 * @method registerOrLogin
 * @param {} body
 * @param {} headers
 * @return
 */
function* registerOrLogin(body, headers) {
    const {phone, apiUrl, credentials} = body;

    const digits = apiUrl && credentials
        ? yield digitisVerify(apiUrl, credentials)
        : null;

    // const digits = yield digitisVerify(apiUrl, credentials);
    if(digits && digits.errors) {
        throw new Error(`Digits error: ${JSON.stringify(digits.errors)}`);
    }

    // JWT token.
    const authorization = headers.authorization;
    const token = authorization
        ? authorization.replace('Bearer ', '')
        : null;

    // Load user by digitsId
    let existUser = yield User.findOne({digitsId: digits.id_str}).exec();

    return existUser
        // If the user exist, we try to login.
        ? yield login(body, digits, existUser)
        : yield register(body, digits);
}

/**
 * Description
 * @method register
 * @param {} body
 * @param {} digits
 * @return ObjectExpression
 */
function* register(body, digits) {
    const {phone, firstName, lastName} = body;

    // Create user obj.
    const user = new User({phone, firstName, lastName});

    // Generate new auth token.
    const authToken = generateToken(user);

    // Save the user.
    user.digits = digits;
    user.digitsId = digits.id_str;
    user.authToken = authToken;
    const newUser = yield user.save();

    log.info(`User register: new user id ${newUser.id}`);

    return {authToken};
}

/**
 * Description
 * @method login
 * @param {} body
 * @param {} digits
 * @param {} existUser
 * @return ObjectExpression
 */
function* login(body, digits, existUser) {
    const {phone, firstName, lastName} = body;

    // Generate new auth token
    const authToken = generateToken(existUser);

    // Update the user.
    existUser.phone = phone;
    existUser.digits = digits;
    existUser.digitsId = digits.id_str;
    existUser.authToken = authToken;

    if (firstName) existUser.firstName = firstName;
    if (lastName) existUser.lastName = lastName;

    const newUser = yield existUser.save();

    log.info(`User login: user id ${newUser.id}`);

    return {authToken};
}

/**
 * Description
 * @method generateToken
 * @param user
 * @return CallExpression
 */
function generateToken(user) {
    return jwt.sign(
        {uid: user.id},
        process.env.JWT_KEY,
        {expiresIn: config.get('jwt.expiresIn')},
    );
}

/**
 * Description
 * @method digitisVerify
 * @param {} apiUrl
 * @param {} credentials
 * @return YieldExpression
 */
function* digitisVerify(apiUrl, credentials) {
    // Verify the OAuth consumer key.
    if (credentials.indexOf('oauth_consumer_key') === -1 ||
        credentials.indexOf(config.get('twitter.key')) === -1) {
        throw new Error('Digit: The Digits API key does not match.');
    }

    // Verify the hostname.
    const hostname = url.parse(apiUrl).hostname;
    if (hostname !== 'api.digits.com') {
        throw new Error('Digit: Invalid API hostname.');
    }

    // Fetch Digits user.
    const result = yield fetch(apiUrl, {headers: {'Authorization': credentials}});
    return yield result.json();
}

module.exports = {
    registerOrLogin,
};
