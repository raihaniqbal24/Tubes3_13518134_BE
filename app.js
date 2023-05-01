const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('./config/logger.config');
const routes = require('./routes');
const errors = require('./middlewares/error.middleware');
const config = require('./config/config');

const app = express();

app.use(morgan('dev', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (config.KEEP_SERVER_AWAKE) {
  app.get('/awake', (_req, res) => {
    res.send();
  });
}

app.use('/', routes);

app.use(errors.notFoundHandler);
app.use(errors.errorConverter);
app.use(errors.errorHandler);

module.exports = app;
