const express = require('express')
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const fs = require('fs')

app.set('view engine', 'ejs')
app.use(ejsLayouts)



app.get('/', (req, res)=>{

    res.send("<h1>hello there</h1>")
})


app.get('/dinosaurs', (req, res)=>{

        let dinosaurs = fs.readFileSync('./dinosaurs.json')
        let dinoData = JSON.parse(dinosaurs)
        // console.log(dinoData)

        res.render("index.ejs", {myDinos: dinoData})


})

// show route. all info on a single dino
app.get('/dinosaurs/:idx', (req, res)=>{

    console.log('idx: ' + req.params.idx)

})


app.listen(port, ()=>{

    console.log(`🎙 Welcome to port ${port} for easy listening🎙`)

})