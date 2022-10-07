const express = require('express');
const db = require('./db');
const jobsRoutes = require('./routes/jobRoute');
const usersRoutes = require('./routes/usersRoute');
const app = express();
app.use(express.json()); // para poder postear antes era body.parser

app.use('/api/jobs/', jobsRoutes)
app.use('/api/users/', usersRoutes); // para empezar con esa direccion   


const port = process.env.PORT || 5000 ;

app.listen(port, () => console.log("server prendido"))