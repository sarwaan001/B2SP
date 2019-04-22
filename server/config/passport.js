var mongoose = require('mongoose'),
    Login = require("../models/users.js");
var crypto = require('crypto');
var LocalStrategy = require('passport-local').Strategy;




module.exports = function(passport) {
    passport.use(new LocalStrategy(function (username, password, done) {

        function sha256(data) {
            return crypto.createHash("sha256").update(data, "binary").digest("base64");
        }
        hash = sha256(password);

        Login.findOne({username: username, hash: hash}, function(err, user) {
            if (err) {
                return done(err);
            }
            else {
                if ((user == undefined) || (user.length < 1)) {
                    return done(null, false, { message: 'Incorrect Username/Password' });
                }
                else {
                    return done(null, user)
                }

            }
        });
    }));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        Login.findById(id, function(err, user) {
            done(err, user);
        });
    });
};