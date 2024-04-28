const mongoose = require('mongoose')

mongoose.Promise = global.Promise
const connectionURI = "" 
mongoose.connect(connectionURI, 
    {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });

module.exports = {mongoose}
