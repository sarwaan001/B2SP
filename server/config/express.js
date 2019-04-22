var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes'),
    indexjs = require('../routes/index.js')
    passport = require('passport');
var flash = require('connect-flash');
var { ensureAuthenticated } = require('../config/auth.js');

module.exports.init = function() {

  require('./passport')(passport);
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();
    var session = require("express-session"),
        bodyParser = require("body-parser");
    app.use(express.static("public"));
    app.use(session({ secret: "cats" }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());


  /**TODO
  Serve static files */
  //app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, '/../../private'));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

  var options = {
          dotfiles: 'ignore',
          etag: false,
          extensions: ['htm', 'html'],
          index: false,
          maxAge: '1d',
          redirect: false,
          setHeaders: function (res, path, stat) {
              res.set('x-timestamp', Date.now())
          }
      };

  app.use("/", express.static("client", options));

  //app.use("/")
  //app.use("/public", express.static(__dirname + "/../../public"));
  //basic files

  /**TODO
  Use the listings router for requests to the api */
  app.use("/api/", listingsRouter);

  /**TODO
  Go to homepage for all routes not specified */


  app.all("/*", function(req, res) {
    res.sendFile(path.resolve("client/index.html"));
  });


  return app;
};
