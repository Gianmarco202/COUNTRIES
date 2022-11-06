const { Router } = require('express');
const { Countries, Activities } = require('../db');
const axios = require('axios');



const router = Router();

router.get("/getAll", async(req, res) => {
    try {
        
        const all= await Countries.findAll({
            include: {
                model: Activities,
                attributes:['name'],
                through:{
                    attributes:[],
                },
            }}) 
        
            res.send(all)
        
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        //let pais =  await Countries.findByPK(id, {include: [{model: Actividades}]})
        
        let country = await Countries.findByPk(id, {
            include: {
                model: Activities,
                attributes:['name'],
                through:{
                    attributes:[],
                },
            }})
        
        res.send(country)

    } catch (error) {
        console.log(error)
    }


})

router.get("/" , async(req, res) => {
    try {
        const {name} = req.query;
        console.log(name)
        let country = await Countries.findAll({
            include: {
                model: Activities,
                attributes:['name'],
                through:{
                    attributes:[],
                },
            }})
        if(name) {
            let countryName = await country.filter( pais => pais.name.toLowerCase().includes(name.toLowerCase()))
            countryName.length ?
            res.status(200).send(countryName) :
            res.status(404).send("No existe el pais");
            //console.log(countryName)
        }else {
            res.status(200).send(country)
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;