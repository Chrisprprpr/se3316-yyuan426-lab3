const express = require("express");
const app = express();
var fs = require('fs');
const port = 3000;

const superheroInfo = require('./superheroes/superhero_info.json');
const superheroPowers = require('./superheroes/superhero_powers.json');

app.use(express.json());

app.use('/', express.static('../client'))

const router = express.Router();

app.use('/api', router);

app.get('/api/superheroInfo', (req, res) => {
    console.log(`GET request for ${req.url}`);
    res.send(superheroInfo);
});

app.listen(port, () => 
    console.log(`Listening on port ${port}`)
);



/*router.route('/getSuperByName/:name')
    .get((req, res) => {
        console.log("Response Sent")
        result = getHeroByName(req.params.name)
        res.send(result);
    });
    */
