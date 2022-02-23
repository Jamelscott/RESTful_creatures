//import modules
const express = require('express')
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const port = 8000;
const fs = require('fs')

// apply middleware
app.set('view engine', 'ejs')
app.use(ejsLayouts)
// //controllers
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}))
// //body-parser middleware

app.use('/dinosaurs', require('./controllers/dinosaurs.js'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures.js'))

//ROUTES



app.listen(port, ()=>{

    console.log(`🎙 Welcome to port ${port} for easy listening🎙`)

})