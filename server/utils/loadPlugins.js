const glob = require('glob');
const isPlainObject = require('lodash/isPlainObject');
const flatten = require('lodash/flatten');
const compose = require('koa-compose');

/**
 * registerRoutes
 * @method registerRoutes
 * @param routers
 * @return allRoutes
 */
function registerRoutes(routers) {
    const ret = routers.map((router) => {
        return isPlainObject(router)
            ? Object.keys(router).map((r) => (router[r]))
            : router;
    });

    const routersArray = flatten(ret);

    // Register all routers.
    const allRoutes = routersArray.reduce((bucket, drop) => (
        bucket.concat([
            drop.routes(),
            drop.allowedMethods({throw: true})])
    ), []);

    return allRoutes;
}

/**
 * loadPlugins
 * @method loadPlugins
 * @param app
 * @return app
 */
function loadPlugins(app) {
    const plugins = glob.sync('server/plugins/**/index.js');
    const models = glob.sync('server/plugins/**/model.js');

    // Load all models.
    const schemas = models.reduce((bucket, drop) => (
        bucket.concat([require(drop)])
    ), []);

    // Load all routers.
    const routers = plugins.reduce((bucket, drop) => (
        bucket.concat([require(drop)])
    ), []);

    const routes = registerRoutes(routers);

    app.use(compose(routes));

    
    return app;
}

module.exports = loadPlugins;
