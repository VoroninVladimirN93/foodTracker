/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const removeHTTPHeader = require('../middleware/removeHeader');

const { CLIENT_URL } = process.env;

const corsConfig = {
  origin: [CLIENT_URL, 'https://www.google.com'],
  optionsSuccessStatus: 200,
  credentials: true,
};

let accessLogStream;

if (fs.existsSync(path.join(__dirname, '../logs'))) {
  accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), {
    flags: 'a',
  });
} else {
  fs.mkdirSync(path.join(__dirname, '../logs'));
  accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), {
    flags: 'a',
  });
}

const serverConfig = (app) => {
  //   app.use(
  //     "/images",
  //     express.static(path.resolve(__dirname, "../../public/images"))
  //   );

  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());

  app.use(morgan('combined', { stream: accessLogStream }));

  app.use(cookieParser());

  app.use(cors(corsConfig));

  app.use(removeHTTPHeader);
};

module.exports = serverConfig;
