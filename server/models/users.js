const {mongoose} = require('../db/mongoose')

var userSchema = mongoose.Schema({
    loginId: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
    }
})


var Users = mongoose.model('users', userSchema)

module.exports = {Users}