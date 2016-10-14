const koa = require('koa');
const config = require('config');
const httpLogger = require('koa-logger');
const cors = require('koa-cors');
const compress = require('koa-compress');
const compose = require('koa-compose');
const bodyParser = require('koa-bodyparser');
const limit = require('koa-better-ratelimit');
const serve = require('koa-static');
const onerror = require('koa-onerror');
const toobusy = require('koa-toobusy');
const rollbar = require('rollbar');
const log = require('server/utils/logger');
const db = require('server/utils/db');
const loadPlugins = require('server/utils/loadPlugins');
const notFound = require('./middlewares/notFound');

const app = koa();
onerror(app, {accepts: () => 'json'});
rollbar.init(config.get('rollbar.key'), {
    environment: config.get('app.env'),
    enabled: config.get('rollbar.enabled'),
});

/**
 * Load Middleware.
 */
app.use(compose([
    bodyParser({
        formLimit: '10mb',
        extendTypes: {
            // will parse application/x-javascript type body as a JSON string
            json: ['application/x-javascript'],
        },
    }),
    notFound(),
    toobusy(),
    httpLogger(),
    compress(),

    cors(config.get('cors')),
    limit(config.get('rateLimit')),
    serve('public'),
]));

/**
 * Load All Plugins.
 */
loadPlugins(app);

/**
 * Handle Application Error.
 */
app.on('error', (err, ctx) => {
   log.error({ctx: ctx.originalUrl, debug: ctx.headers.metadata}, `[App Error] ${err.toString()}`);
});

/**
 * Server Listening.
 */
db.on('connected', () => {
    app.listen(config.get('app.port'));
    log.info(`listening on port ${config.get('app.port')}`);
});

module.exports = app;
