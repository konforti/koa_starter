const mongoose = require('mongoose');
const ensureIndexes = require('mongoose-hook-ensure-indexes');
const renameId = require('./mongooseRenameId');
const config = require('config');
const log = require('server/utils/logger');

const dbURI = config.db.path;

mongoose.connect(dbURI);

// Connection events.
mongoose.connection.on('error', err => {
    throw err;
});
mongoose.connection.on('connected', () => log.info(`mongodb connection open`));
mongoose.connection.on('disconnected', () => log.error(`mongodb disconnected`));

// ^C / kill -SIGINT
process.on('SIGINT', () =>
    mongoose.connection.close(() =>
        process.exit(0, log.info('mongo connection disconnected through app termination'))
    )
);

mongoose.plugin(ensureIndexes, {mongoose: mongoose});
mongoose.plugin(renameId({name: 'id'}));

module.exports = mongoose.connection;
