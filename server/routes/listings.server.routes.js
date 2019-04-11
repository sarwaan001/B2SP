/* Dependencies */
var listings = require('../controllers/listings.server.controller.js'),
    express = require('express'),
    router = express.Router(),
    login = require('../controllers/login.server.controller.js');
    bodyParser = require('body-parser');

/*
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */
router.route('/search')
  .get(listings.readSearch)

router.route('/results')

/*
  The ':' specifies a URL parameter.
 */
router.route('/trends')
  .get(listings.readTrends)

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.route('/login').post(login.check);
router.route('/signup').post(login.create);
router.route('/users').get(login.getListings);
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
