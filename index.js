require('dotenv').config({silent: true})
require('newrelic');
require('app-module-path/register');

const app = require('./server');

module.exports = app;