//This file holds any configuration variables we may need 
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: 'mongodb://b2sp:b2sppass@ds227146.mlab.com:27146/twitteruserdata', //place the URI of your mongo database here.
  }, 
  woeidb: {
    uri: 'mongodb://twitterwoeiduser:spring2019@ds157873.mlab.com:57873/twitterwoeidinfo'
  },
  port: 8080,

  consumer_key: 'kd2Srldv4Z6j5HXdJlHHjeDZu',
  consumer_secret:  'z4NeNEf2uRZBXHvVdlbJWVVelDN4Gz83hyrbBet2w1tC00svX1',
  access_token: '1101176210640515072-bkJ29E0W6OHyo938KqSo4sk5sdDq6k',
  access_token_secret:  'JEMOlcPV2evpMgewUquVGW6s0tk3siqAZjnsqkaXvolSF'
};