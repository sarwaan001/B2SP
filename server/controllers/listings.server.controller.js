'use strict';

/* Dependencies */
const fs = require('fs');
var mongoose = require('mongoose'),
  Listing = require('../models/woeids.js');
var Twit = require('twit');
var config = require('../config/config');
var ourTwit = require("../models/twitterModel");

mongoose.connect(config.woeidb.uri);
var db = mongoose.connection;
/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */


/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);


  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Show the current listing */
exports.readSearch = function(req, res) {

  console.log("This is the query: " + req.query.searchText);
  console.log("This is the result_type: " + req.query.resultType);
  var params = {
    q: req.query.searchText,
    count: 10,
    result_type: req.query.resultType
  }

  ourTwit.get('search/tweets', params, dataReceived);

  function dataReceived(err, data, response)
  {
    if(err)
    {
      console.log(err);
    }
    else
    {
      var tweetsArray = [];

      for(let i = 0; i < data.statuses.length; i++)
      {
        var theurl = null;
        if(data.statuses[i].entities.urls[0] != undefined)
        {
          theurl = data.statuses[i].entities.urls[0].url;
        }
        var tweet = {
          created_at: data.statuses[i].created_at,
          text: data.statuses[i].text,
          name: data.statuses[i].user.name,
          screen_name: data.statuses[i].user.screen_name,
          followers_count: data.statuses[i].user.followers_count,
          friends_count: data.statuses[i].user.friends_count,
          retweet_count: data.statuses[i].retweet_count,
          favorite_count: data.statuses[i].favorite_count,
          url: theurl
        }
        tweetsArray.push(tweet);
      }
    }
    //res.json(tweetsArray);
    console.log(tweetsArray);
    //res.redirect('./results.html');
    res.render('results', { username: req.user.username, data: tweetsArray });
    let searchResultsData = JSON.stringify(tweetsArray);
    fs.writeFileSync('client/api/searchResults.json', "{ \"person\": " + searchResultsData + "}");
  };
};

exports.readTrends = function(req, res)
{
  console.log("Place: " + req.query.searchText);
  var theWoeid;
  function findInDb()
  {
    return new Promise((resolve, reject) =>
    {
      var woeids = db.collection('mywoeids');
      woeids.find({name: req.query.searchText}).toArray(function(err, result)
      {
        if(err)
        {
          reject('Error during db query');
        }
        else
        {
          if(typeof result[0] == "undefined")
          {
            console.log("Uhoh, place not found!");
            resolve(null);
          }
          else
          {
            console.log("Woeid from db: " + (result[0].woeid));
            theWoeid = result[0].woeid;
            resolve(theWoeid);
          }
        }
      });
    });
  }

  makeTwitCall();

  async function makeTwitCall()
  {
    const woeid = await findInDb();

    var params = {
      // id refers to the woeid that will be passed to API call. Returns top 50 trends in location
      id: woeid
    }

    ourTwit.get('trends/place', params, dataReceived);

    function dataReceived(err, data, respon)
    {
      var trendsArray = [];
      if(err)
      {
        console.log(err);
      }
      else
      {
        console.log(data);
        for(let i = 0; i < data[0].trends.length; i++)
        {
          var trendsInfo = {
            name: data[0].trends[i].name,
            tweet_volume: data[0].trends[i].tweet_volume
          }
          if(data[0].trends[i].tweet_volume == null)
          {
            continue;
          }
          else
          {
              trendsArray.push(trendsInfo);
          }
          //^Above if else ensures trends with tweet volume of null aren't added to the trendsArray
        }
      }
      //res.json(trendsArray);
      console.log(trendsArray);
      //res.redirect('./resultsTrends.html');
      res.render('resultsTrends', { username: req.user.username, data: trendsArray });
      let searchResultsData = JSON.stringify(trendsArray);
      fs.writeFileSync('client/api/searchResults.json', "{ \"person\": " + searchResultsData + "}");
    };
  }
};

/* Update a listing */
exports.update = function(req, res) {
  var listing = req.listing;

  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */

  listing.code = req.body.code;
  listing.name = req.body.name;
  listing.address = req.body.address;

  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });



};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;

  /** TODO **/
  /* Remove the article */

  listing.remove(function(err) {
    if(err) {res.status(400).send(err); }
    else { res.end(); }
  })

};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /** TODO **/
  /* Your code here */

  Listing.find().sort("code").exec(function(err, listings) {
    if(err) {res.status(400).send(err); }
    else { res.json(listings); }

  })



};

/*
  Middleware: find a listing by its ID, then pass it to the next request handler.

  Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};
