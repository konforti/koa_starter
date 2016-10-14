const conf = {
    log: {
        enabled: false
    },

    cron: {
        enabled: false
    },

    db: {
        path: process.env.DB_PATH_DEV || 'mongodb://localhost:27017/koa_starter',
    },
};

module.exports = conf;