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

function getHeroByRace(searchRace) {
    console.log("Search: " + searchRace);
    let results = [];
    
    const searchRaceLower = searchRace.toLowerCase();
  
    superheroInfo.forEach((hero) => {
        if (hero.Race.toLowerCase().includes(searchRaceLower)) {
            const heroPowers = superheroPowers.find((power) => power.hero_names === hero.name);
  
            if (heroPowers) {
            results.push({ ...hero, Powers: heroPowers });
            } else {
                results.push(hero);
            }
        }
    });
    return results;
}

function getHeroByPublisher(searchPublisher) {
    console.log("Search: " + searchPublisher);
    let results = [];
    
    const searchPublisherLower = searchPublisher.toLowerCase();
    
    superheroInfo.forEach((hero) => {
        if (hero.Publisher.toLowerCase().includes(searchPublisherLower)) {
            const heroPowers = superheroPowers.find((power) => power.hero_names === hero.name);
    
            if (heroPowers) {
            results.push({ ...hero, Powers: heroPowers });
            } else {
            results.push(hero);
            }
        }
    });
    return results;
}

function getHeroByPower(searchPower) {
    console.log("Search: " + searchPower);
    let results = [];
  
    superheroPowers.forEach((heroPower) => {
      for (let power in heroPower) {
        if (power.toLowerCase().includes(searchPower.toLowerCase()) && heroPower[power] === "True") {
          let heroResult = getHeroByName(heroPower["hero_names"]);
          if (heroResult.length > 0) {
            results.push(heroResult[0]); 
          }
        }
      }
    });
  
    return results;
  }