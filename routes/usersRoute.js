const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        const newUser = new User(req.body);
        const newUser1 = await newUser.save();
        res.send('user created');
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password}); 
        // no olvidar el await cuando se consulta o se guarda informacion en la DB
        if (user) {
            res.json(user);
        } else {
            return res.status(400).json({message: 'invalid credencial' })
        }
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('/update', async (req, res) => {

    try {
        const updateUser = await User.findOneAndUpdate({_id: req.body._id}, req.body)
        const user = await User.findOne({_id: req.body._id})
        console.log("updated")
        res.json(user);
    } catch (error) {
        res.status(400).json({message: error});
    }
})

router.get('/getall', async (req, res) => {

    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (error) {
        return res.status(400).send(error);
    }
})

module.exports = router;