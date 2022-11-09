const { Router } = require('express');
const {Countries, Activities} = require("../db")

const router = Router();

router.get("/all", async(req,res) =>{
    const all = await Activities.findAll({
        include: {
            model: Countries,
            attributes:['name','continent','flag'],
            through:{
                attributes:[],
            },
        }})
    res.send(all)
})

router.post("/create", async (req, res) => {
    let {name, difficulty, duration, season, countries} = req.body;
    
    try {    
        if(!name || !difficulty || !duration || !season || !countries){
            res.status(404).send("llena todos los campos")
        }

        let createAct = await Activities.create({
            name, difficulty, duration, season
            })
        
        let country = await Countries.findAll({where:  { name: countries}});
        
        if(country){
            await createAct.addCountries(country);
        }
        
        const result =await Activities.findOne({
            where:{name},
            include:Countries
        });
        console.log(result)


        res.send(result)

    } catch (error) {
        console.log(error)
    }

})

router.get('/detail/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Activities.findByPk(id, {
        include: {
            model: Countries,
            attributes:['name', 'flag', 'continent'],
            through:{
                attributes:[],
            },
        }})
    res.send(result);
})

module.exports = router;