const express = require('express'); //imports express
const router = express.Router(); //allows routing form index
const fs = require('fs'); // not sure
const { runInNewContext } = require('vm');


router.get('/', (req, res)=>{

    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(prehistoricCreatures)

    res.render('creatures.ejs', {creatures: creaturesData})


})


router.get('/new', (req, res)=>{

    
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(prehistoricCreatures)
    
    res.render('newCreature.ejs')

    
})
router.get('/edit/:idx', (req, res)=>{

    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(prehistoricCreatures)

    let targetCreature = creaturesData[req.params.idx]
    res.render('editCreature', {creatureId: req.params.idx, creature: targetCreature})

})
router.get('/:idx', (req, res)=>{

    
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(prehistoricCreatures)

    let creatureIndex = req.params.idx
    let targetCreature = creaturesData[creatureIndex]
    res.render('showCreature.ejs', {targetC: targetCreature})


})


router.post('/', (req, res)=>{

    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(prehistoricCreatures)


    creaturesData.push(req.body)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))
    res.redirect('/prehistoric_creatures')

})

router.delete('/:idx', (req, res)=>{

    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(prehistoricCreatures)

    creaturesData.splice(req.params.idx, 1)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))

    res.redirect('/prehistoric_creatures')


})

router.put('/edit/:idx', (req, res)=>{
    
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(prehistoricCreatures)

// req.params = num

    creaturesData[req.params.idx].type = req.body.type

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))

    res.redirect('/prehistoric_creatures')
})

module.exports = router;
