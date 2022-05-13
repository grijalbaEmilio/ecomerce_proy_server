const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const {API_VERESION} = require("./config");

const userRoutes = require('./src/routes/user.routes')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/back', (req, res)=>{
    res.json({message : 'conección exitosa con el back'})
})

app.use(`/api/${API_VERESION}`, userRoutes)

/* app.listen(3000, ()=>{
    console.log('Linstening the port 3000')
})

routes(app) */

module.exports = app;
