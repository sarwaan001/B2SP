var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var woeidSchema = new Schema({
  name: {
    type: String, 
    required: true
  }, 
  woeid: {
    type: Number, 
    required: true, 
    unique: true
  }  
});


var woeid = mongoose.model('woeid', woeidSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = woeid;
