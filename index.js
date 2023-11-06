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

/*app.get('/api/superheroInfo', (req, res) => {
    console.log(`GET request for ${req.url}`);
    res.send(superheroInfo);
});
*/

app.listen(port, () => 
    console.log(`Listening on port ${port}`)
);

/*
router.route('/getSuperheroByName/:name')
	.get((req, res) => {
		console.log("Response Sent")
		result = getHeroByName(req.params.name)

		res.send(result)
	})
*/


router.get('/getSuperheroByName/:name', (req, res) => {
    console.log("Looking for: " + req.params.name);
    const result = getHeroByName(req.params.name);

    if (result.length > 0) {
        res.json(result);
    } else {
        res.status(404).send('No superheroes found with the given name.');
    }
});


router.get('/getSuperheroByRace/:race', (req, res) => {
    console.log("Looking for: " + req.params.race);
    const result = getHeroByRace(req.params.race);

    if (result.length > 0) {
        res.json(result);
    } else {
        res.status(404).send('No superheroes found with the given race.');
    }
});

router.get('/getSuperheroByPublisher/:publisher', (req, res) => {
    console.log("Looking for: " + req.params.publisher);
    const result = getHeroByPublisher(req.params.publisher);

    if (result.length > 0) {
        res.json(result);
    } else {
        res.status(404).send('No superheroes found with the given publisher.'); 
    }
});


router.get('/getSuperheroByPower/:power', (req, res) => {
    console.log("Looking for: " + req.params.power);
    const result = getHeroByPower(req.params.power);

    if (result.length > 0) {
        res.json(result);
    } else {
        res.status(404).send('No superheroes found with the given power.');
    }
})


router.get('/getSuperheroByID/:id', (req, res) => {
    console.log("Looking for: " + req.params.id);
    const result = getHeroByID(req.params.id);

    if (result.length > 0) {
        res.json(result);
    } else {
        res.status(404).send('No superheroes found with the given id.');
    }
})



function getHeroByName(searchName){
    console.log("Search: " + searchName)
    let results = [];

    const searchNameLower = searchName.toLowerCase();

    superheroInfo.forEach((hero) => {
        if(hero.name.toLowerCase().includes(searchNameLower)){
            const powers = superheroPowers.find((power) => power.hero_names === hero.name);

            if (powers) {
                results.push({ ...hero, powers});
            } else {
                results.push(hero);
            }
        }
    });
    return results;
}

/*
function getHeroByName(name){
	console.log("Search: " + name)
	let results = [];
	for(let i=0; i<superheroInfo.length; i++){
		if(superheroInfo[i].name.includes(name)){
			for(let j=0; j<superheroPowers.length; j++){
				if(superheroPowers[j].hero_names == superheroInfo[i].name){
					superheroInfo[i].Powers = superheroPowers[j]
				}
			}
			results.push(JSON.stringify(superheroInfo[i]));
		}
	}
	return results;
}
*/