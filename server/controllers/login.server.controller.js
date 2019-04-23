var mongoose = require('mongoose'),
  Login = require("../models/users.js");
var config = require('../config/config');
var crypto = require('crypto');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


/*
passport.use(new LocalStrategy(function (username, password, done) {
    function sha256(data) {
        return crypto.createHash("sha256").update(data, "binary").digest("base64");
    }
    hash = sha256(password);
    Login.find({username: username, hash: hash}, function(err, docs) {
        if (err) {
            return done(err);
        }
        else {
            if ((docs == undefined) || (docs.length < 1)) {
                 return done(null, false, { message: 'Incorrect Username/Password' });
            }
            else {
                return done(null, docs)
                //res.status(200).send(docs);
            }
        }
    });
}));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
var user_cache = {};
passport.serializeUser(function(user, next) {
    let id = user._id;
    user_cache[id] = user;
    next(null, id);
});
passport.deserializeUser(function(id, next) {
    next(null, user_cache[id]);
});
*/

/*create*/
exports.create = function(req, res) {
  function sha256(data) {
    return crypto.createHash("sha256").update(data, "binary").digest("base64");
  }
  req.body.hash = sha256(req.body.hash);
  var user = new Login(req.body);
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(404);
      res.render("index.html", { Message: "There was an error signing up" } );
    }
    else {
      res.redirect("/createsuccess");
      //res.json(user);
    }
  });
};

/*check*/
exports.check = function(req, res, next) {
  function sha256(data) {
    return crypto.createHash("sha256").update(data, "binary").digest("base64");
  }
  req.body.hash = sha256(req.body.hash);
  Login.find({username: req.body.username, hash: req.body.hash}, function(err, docs) {
    if (err) {
      res.status(404).send();
    }
    else {
      if ((docs == undefined) || (docs.length < 1)) {
        res.status(404);
        res.redirect("/index.html" + { message: "Username/Password does not match" });
      }
      else {
        res.redirect("/main.html");
        //res.status(200).send(docs);
      }
    }
  });
};

exports.getListings = function(req, res, next) {
  Login.find().exec(function(err, users) {
    if (err) {
      res.status(404).send();
    }
    else {
      res.status(200).json(users);
    }
  });
};
