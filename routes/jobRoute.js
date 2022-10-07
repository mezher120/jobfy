const express = require('express');
const router = express.Router();  // llamo a router para armar las rutas 
const Job = require('../models/jobModel') // se importa el modelo a usar
const moment = require('moment');
const User = require('../models/userModel'); // importo modelo user

router.get('/getalljobs', async (req, res) => {  // se pone la extension en la url que se va a usar para pedir la info
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        return res.status(400).json({error});
    }
});

router.post('/postjob', async (req, res) => {

    try {
        // const newJob = await Job.create(req.body);
        const newJob = new Job(req.body);
        await newJob.save();
        res.json(newJob);
    } catch (error) {
        res.status(400).json({error});
    }
})

router.put('/editjob', async (req, res) => {

    try {
        const jobUpdated = await Job.findOneAndUpdate({_id: req.body._id}, req.body); // se da la condicion para encontrar lo que hay que actualizar y los valores 
        console.log(jobUpdated, 'jobupdated')
        res.send('updated');
    } catch (error) {
        return res.status(400).json({messsage: error})
    }
})

router.post('/applyjob', async (req, res) => {

    const {job, user} = req.body;
    console.log(job, user, "estoy en el back")

    try {
        const jobDetail = await Job.findOne({_id: job._id});
        const appliedCandidate = {
            userId: user._id,
            dateApplied: moment().format("MMM Do YY")
        }
        console.log(appliedCandidate)

        jobDetail.appliedCandidates.push(appliedCandidate);
        console.log(jobDetail, "sigo aca")
        await jobDetail.save();

        const userDetail = await User.findOne({_id: user});
        userDetail.appliedJobs.push(job._id);
        console.log(userDetail, "sigo alla")
        await userDetail.save();

        return res.send('job applied')


    } catch (error) {
        return res.status(400).send(error);
    }

})

module.exports = router; // exporto para usar en server y poner algun uso de direccion y no usar todo en el mismo.