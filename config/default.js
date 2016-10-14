const conf = {

    app: {
        name: 'Koa Starter',
        email: 'raz@ndivi.com',
        domain: 'api.koa_starterapp.com',
        talkieDomain: 'in.koa_starterapp.com',
        basePath: process.cwd(),
        timeZone: 'utc',
        port: process.env.PORT || 3000,
        env: (!process.env.NODE_ENV)
          ? 'development'
          : process.env.NODE_ENV
    },

    jwt: {
        key: process.env.JWT_KEY || 'key',
        secret: process.env.JWT_SECRET || 'secret',
        // expiresIn: '1d',
        alg: 'HS256'
    },

    log: {
        level: 'debug'
    },

    cors: {
        origin: true
    },

    rateLimit: {
        max: process.env.RATE_LIMIT || 100,
        duration: process.env.RATE_LIMIT_DUR || 10000
    },
}

module.exports = conf;