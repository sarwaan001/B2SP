const Twit = require("twit");

const config = require("../config/config");

const client = new Twit ({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret
});

module.exports = client;
