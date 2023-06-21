/** user.model.js */
const mongoose = require('mongoose');

const USERSSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: false
    },
    lname: {
        type: String,
        required: null
    }
});

const Users = mongoose.model('Users', USERSSchema);

module.exports = Users;