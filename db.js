//coneectar base de datos
const mongoose = require('mongoose'); // requerir mongoose

async function dbConnect(params) {
    try {
        // conectar mongoose con url dada por monggose y usenewurlparser true
        await mongoose.connect('mongodb+srv://mezher:topita1416@cluster0.q8nbcm6.mongodb.net/jobfy', {useNewUrlParser: true})
        console.log("db connection succesfull");
    } catch (error) {
        console.log(error.message, "error");
    }
}

dbConnect(); // ejecutar funcion async para con la conexion a mongoose

module.exports = mongoose;  // porque exporto mongoose? en que momento se ejecuta esto?