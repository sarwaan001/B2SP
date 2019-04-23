var config = require('./config'),
    mongoose = require('mongoose'),
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    routes = require('../routes/index.js'),
    passport = require('passport');

var flash = require('connect-flash');
var { ensureAuthenticated } = require('../config/auth.js');

module.exports.start = function() {
  var app = express();

  require('./passport')(passport);
  //connect to database
  mongoose.connect(config.woeidb.uri);

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


  /**TODO
  Use the listings router for requests to the api */
  app.use("/api/", routes);

  /**TODO
  Go to homepage for all routes not specified */
  app.all("/*", function(req, res) {
    res.sendFile(path.resolve("client/index.html"));
  });

  //LISTEN TO THE PORT
  let port = process.env.PORT;
  if(port == null || port == "") {
    port = config.port;
  }

  app.listen(port, function() {
    console.log('App listening on port', port);


    //console.log('App listening on port', config.port);
  });
};
