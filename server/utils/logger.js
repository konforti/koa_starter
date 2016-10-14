const bunyan = require('bunyan');
const bunyanRollbar = require('bunyan-rollbar');
const format = require('bunyan-format');
const config = require('config');

const opts = config.get('log.enabled')
    // Production - save logs to file and send them to Rollbar.
    ? {
        name: config.get('app.name'),
        streams: [{
            level: config.get('log.level'),
            type: 'raw', // Must be set to raw for use with BunyanRollbar
            stream: new bunyanRollbar.Stream({
                rollbarToken: config.get('rollbar.key'),
            }),
        },
            {
                stream: format({outputMode: 'short'}),
                path: config.get('log.filepath'),
                level: config.get('log.level'),
            }],
    }

    // Development - send logs to console.
    : {
        name: config.get('app.name'),
        streams: [{
            stream: format({outputMode: 'short'}),
            level: config.get('log.level'),
        }],
    };


module.exports = bunyan.createLogger(opts);
