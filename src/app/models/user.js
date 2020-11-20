const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    local: {
        nombre: String,
        apellidos: String,
        email: String,
        password: String
    }
});

userSchema.methods.generarHash = function (password){
    return bcrypt.hashSync(password, bcrypt.genSalt(8), null);
}

userSchema.methods.validPassword = function (password){
    return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);