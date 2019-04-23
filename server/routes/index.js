var listings = require('../controllers/listings.server.controller.js'),
    express = require('express'),
    router = express.Router(),
    login = require('../controllers/login.server.controller.js'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    { ensureAuthenticated } = require('../config/auth.js');


router.get('/main', ensureAuthenticated, function(req, res) {
    res.render('main.html', { username: req.user.username });
});

router.get('/main.html', ensureAuthenticated, function(req, res) {
    res.render('main.html', { username: req.user.username });
});

router.get('/logout', function(req, res){
    req.logOut();
    res.render('index.html', { Message: 'Successfully Logged Out.' });
});

router.get('/err', function(req, res) {
    res.render('index.html', { Message: 'Username/Password is incorrect.' });
});
/*
  The 'router.param' method allows us to specify middleware we would like to use to handle
  requests with a parameter.
  Say we make an example request to '/listings/566372f4d11de3498e2941c9'
  The request handler will first find the specific listing using this 'listingsById'
  middleware function by doing a lookup to ID '566372f4d11de3498e2941c9' in the Mongo database,
  and bind this listing to the request object.
  It will then pass control to the routing function specified above, where it will either
  get, update, or delete that specific listing (depending on the HTTP verb specified)
 */
router.param('listingId', listings.listingByID);

module.exports = router;
