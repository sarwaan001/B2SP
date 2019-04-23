var listings = require('../controllers/listings.server.controller.js'),
    express = require('express'),
    router = express.Router(),
    login = require('../controllers/login.server.controller.js'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    config = require("../config/config"),
    LocalStrategy = require('passport-local').Strategy,
    { ensureAuthenticated } = require('../config/auth.js'),
    path = require('path');


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

router.param('listingId', listings.listingByID);


router.route('/search')
  .get(listings.readSearch)

router.route('/results')

router.route('/trends')
  .get(listings.readTrends)

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.post('/login', passport.authenticate('local', {
    failureRedirect: '/err',
    failureFlash: 'Invalid username or password.'
}), function(req, res) {
    res.render("main.html", { username: req.user.username });
});

router.post('/login', function(req, res, next) {

    passport.authenticate('local', {
        successRedirect: '/main.html',
        failureRedirect: '/index.html',
        failureFlash: true
    }) (req, res, next);
});

router.get('/username', ensureAuthenticated, function(req, res){

    res.send(req.user.username);

});

router.route('/signup').post(login.create);
router.route('/users').get(login.getListings);

router.param('listingId', listings.listingByID);

module.exports = router;
