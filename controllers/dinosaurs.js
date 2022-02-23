const express = require('express');
const router = express.Router();
const fs = require('fs')

router.get('/', (req, res)=>{

    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let nameFilter = req.query.nameFilter
    //if nameFilter has value, filter.
    if (nameFilter){
        dinoData = dinoData.filter(dino=>{
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('index.ejs', {myDinos: dinoData})
})

router.get('/new', (req, res)=>{

    res.render('new.ejs')

})

router.get("/edit/:idx", (req, res)=>{

    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    let dinoIndex = req.params.idx
    let targetDino = dinoData[dinoIndex]
    res.render('edit.ejs', {dino: targetDino, dinoId: dinoIndex})

})


router.put("/:idx", (req, res)=>{

    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)
    // turn back into JSON
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    res.redirect("/dinosaurs")
    
})

router.get('/:idx', (req, res)=>{

    // read dinos from database
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    let dinoIndex = req.params.idx
    let targetDino = dinoData[dinoIndex]
    res.render('show.ejs', {dino: targetDino})

})

router.post('/', (req, res)=>{

    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // add new dino to the exsiting dinodata array
    // console.log(dinoData)
    dinoData.push(req.body)
    console.log(req.body)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')

})

router.delete('/:idx', (req, res)=>{

    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    console.log(`lets delete dino ${req.params.idx}`)

    dinoData.splice(req.params.idx, 1)

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    res.redirect('/dinosaurs')
    

})

module.exports = router;