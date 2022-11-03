const { Router } = require('express');
const {Countries, Activities} = require("../db")

const router = Router();

router.post("/create", async (req, res) => {
    let {name, difficulty, duration, season, countries} = req.body;
    
    try {    
        if(!name || !difficulty || !duration || !season || !countries){
            res.status(404).send("llena todos los campos")
        }

        let createAct = await Activities.create({
            name, difficulty, duration, season
            })
        
        let country = await Countries.findAll({where:  { id: countries}});
        
        if(country){
            await createAct.addCountries(country);
        }
        console.log(createAct)
        

        res.send(createAct)

    } catch (error) {
        console.log(error)
    }

})

module.exports = router;