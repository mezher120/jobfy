const express = require('express');
const db = require('./db');
const jobsRoutes = require('./routes/jobRoute');
const path = require('path');   // requiero path para juntar client con el back para heroku
const usersRoutes = require('./routes/usersRoute');
const app = express();
app.use(express.json()); // para poder postear antes era body.parser

app.use('/api/jobs/', jobsRoutes)
app.use('/api/users/', usersRoutes); // para empezar con esa direccion   


const port = process.env.PORT || 5000 ;

if (process.env.NODE_ENV === "production") {    // para heroku
    
    app.use('/', express.static('client/build'))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build/index.html'))
    });
}


app.listen(port, (err) =>  {
    if (err) {
        throw err;
    }
    console.log("server prendido")
})