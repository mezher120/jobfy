const mongoose = require('mongoose');  //requerir mongoose

const jobSchema = new mongoose.Schema(   // se crea el schema, el modelo a crear en db
    {
        title: {type: String, required: true},
        department: {type: String, required: true}, 
        salaryFrom: {type: String, required: true}, 
        salaryTo: {type: Number, required: true}, 
        experience: {type: Number, required: true}, 
        smallDescription: {type: String, required: true}, 
        fullDescription: {type: String, required: true}, 
        minimumQualification: {type: String, required: true}, 
        skillsRequired: {type: String, required: true}, 
        company: {type: String, required: true}, 
        email: {type: String, required: true}, 
        phoneNumber: {type: String, required: true}, 
        companyDescription: {type: String, required: true},  
        appliedCandidates: {type: [], required: true}, 
        postedBy: {type: String, required: true}, 

    }, 
    {
        timestamps: true,
    }
);

const jobModel = new mongoose.model('jobs', jobSchema); // se crea el modelo en el db, con el (nombre ' ', y el schema)

module.exports = jobModel; // se exporta para poder usarlo en las rutas