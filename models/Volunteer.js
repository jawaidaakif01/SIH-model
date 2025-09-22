const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const VolunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        require: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

VolunteerSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

VolunteerSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}
module.exports = mongoose.model('Volunteer', VolunteerSchema);
