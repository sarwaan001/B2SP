var Twit = require('twit');

var config = require('./server/config/config');

var twitObject = new Twit(config);

var params = {
    /*Below woeid is for Miami for testing purposes. Returns top 50 trends in location
    (we will need to pass in woeid of location searched for by user)*/
    id: '2450022'
    //Below woeid is for Nashville, Tennessee (to compare)
    //id: '2457170'
    //woeid = 1 gives global trends.
    
}

twitObject.get('trends/place', params, dataReceived);
/*^We are searching in https://api.twitter.com/1.1/trends/place.json, but with twit we just need to specify
trends/place, omitting the .json */

function dataReceived(err, data, response)
{
    console.log(data[0]);
    /*We have to grab the first element of this array, because the trend API call returns
    an array of an array of trend objects. By grabbing the first element of this outer array,
    we return all of the trend objects within the inner array.
    */
}

