const { Router } = require('express')
const countriesRoute = require('./countries')
const actividadesRoute = require('./actividades')

const router = Router();

router.use('/countries',countriesRoute);
router.use('/actividades',actividadesRoute);

module.exports = router;
