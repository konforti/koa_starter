const conf = {
    db: {
        path: process.env.DB_PATH,
    },
    
    smtp: {
        host: '',
        user: '',
        password: '',
        fromName: '',
        fromAddress: ''
    },

    log: {
        filepath: '/home/node/koa_starter_app.log',
        enabled: true
    },
    
    cron: {
        enabled: true
    },
    rollbar: {
        key: process.env.ROLLBAR_KEY,
        enabled: true
    },
};

module.exports = conf;