const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},

    firstname: {type: String, default: ""},
    lastname: {type: String, default: ""},
    email: {type: String, default: ""},
    mobileNumber: {type: String, default: ""},
    porfolio: {type: String, default: ""},

    about: {type: String, default: ""},
    adress: {type: String, default: ""},

    education: {type: [], default: [""]},
    skills: {type: [], default: [""]},
    projects: {type: [], default: [""]},
    experience: {type: [], default: [""]},

    appliedJobs:{type: []} 
}, {
    timestamps: true
})

const userModel = new mongoose.model('users', userSchema) // creo el modelo del schema antes creado

module.exports = userModel;