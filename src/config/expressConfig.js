const express = require("express");
const path = require("path");
let cookieParser = require('cookie-parser');


const expressConfig = (app) => {
  app.use(express.static(path.resolve(__dirname, "../public")));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser())
};

module.exports = expressConfig;
