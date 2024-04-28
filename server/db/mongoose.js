const mongoose = require('mongoose')

mongoose.Promise = global.Promise
const connectionURI = "mongodb+srv://psk123:psk123@stackuptest.9namfg2.mongodb.net/OrganProject" 
mongoose.connect(connectionURI, 
    {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });

module.exports = {mongoose}