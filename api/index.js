//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require("axios");
const {Countries} = require("./src/db")

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {

    const api = await axios.get("https://restcountries.com/v3/all")
        
        const format = await api.data.map(pais=>{
                    Countries.create({
                        id: pais.cca3,
                        name: pais.name.common, 
                        flag: pais.flags[1],
                        continent: pais.region,
                        capital: pais.capital && pais.capital[0],
                        subRegion: pais.subregion,
                        area: pais.area,
                        population: pais.population  
                   })
                 })

        
        

    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});