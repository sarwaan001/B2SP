var Twit = require('twit');

var config = require('./config/config');

var twitObject = new Twit(config);

var params = {
    q: 'Christmas',
    count: 10
    //We can specify other query parameters in here as neccessary, such as result_type
}

twitObject.get('search/tweets', params, dataReceived);
/*^We are searching in https://api.twitter.com/1.1/search/tweets.json, but with twit we just need to specify
search/tweets, omitting the .json*/

function dataReceived(err, data, response)
{
    console.log(data);
}

