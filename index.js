const express = require("express");
const app = express();
var fs = require('fs');

const superheroInfo = require('superheroes/superhero_info.json');
const superheroPowers = require('./superhero_powers.json');

app.use(express.json());

app.use('/', express.static('../client'))

const router = express.Router();

app.use('/api', router);
const port = 3000;
app.listen(port, () => 
    console.log(`Listening on port ${port}`)
);



router.route('/getSuperByName/:name')
    .get((req, res) => {
        console.log("Response Sent")
        result = getHeroByName(req.params.name)
        res.send(result);
    });
