var mongoose = require('mongoose'), 
  Login = require("../models/users.js");
var config = require('../config/config');
var crypto = require('crypto');

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
      res.status(404).send();
    }
    else {
      res.json(user);
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
      res.status(200).send(docs);
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