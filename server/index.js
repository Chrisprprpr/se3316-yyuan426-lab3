// Import necessary libraries
const express = require("express");
const app = express();
var fs = require('fs');
const port = 3000;

// Load the superhero information and powers from the JSON files
const superheroInfo = require('./superheroes/superhero_info.json');
const superheroPowers = require('./superheroes/superhero_powers.json');

// Set up the server to parse incoming requests as JSON
app.use(express.json());

// Serve static files from the client directory
app.use('/', express.static('../client'))

// Create a new router to handle API requests
const router = express.Router();

// Attach the router to the server, allowing it to handle API requests
app.use('/api', router);

// Start the server and listen on port 3000
app.listen(port, () => 
    console.log(`Listening on port ${port}`)
);


// Route to get superheroes by name
router.get('/getSuperheroByName/:name', (req, res) => {
    console.log("Looking for: " + req.params.name);
    const result = getHeroByName(req.params.name);

    if (result.length > 0) {
        res.json(result);
    } else {
        res.status(404).send('No superheroes found with the given name.');
    }
});

// Route to get superheroes by race
router.get('/getSuperheroByRace/:race', (req, res) => {
    console.log("Looking for: " + req.params.race);
    const result = getHeroByRace(req.params.race);

    if (result.length > 0) {
        res.json(result);
    } else {
        res.status(404).send('No superheroes found with the given race.');
    }
});

// Route to get superheroes by publisher
router.get('/getSuperheroByPublisher/:publisher', (req, res) => {
    console.log("Looking for: " + req.params.publisher);
    const result = getHeroByPublisher(req.params.publisher);

    if (result.length > 0) {
        res.json(result);
    } else {
        res.status(404).send('No superheroes found with the given publisher.'); 
    }
});

// Route to get superheroes by power
router.get('/getSuperheroByPower/:power', (req, res) => {
    console.log("Looking for: " + req.params.power);
    const result = getHeroByPower(req.params.power);

    if (result.length > 0) {
        res.json(result);
    } else {
        res.status(404).send('No superheroes found with the given power.');
    }
})

// Route to get superheroes by id
router.get('/getSuperheroByID/:id', (req, res) => {
    console.log("Looking for: " + req.params.id);
    const result = getHeroByID(req.params.id);

    if (result && !result.message) {
        res.json(result);
    } else {
        res.status(404).json(result);
    }
});



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


function getHeroByID(searchID) {
    console.log("Search: " + searchID);
    let result = null;
  
    const hero = superheroInfo.find((hero) => hero.id.toString() === searchID.toString());
  
    if (hero) {
        const heroPowers = superheroPowers.find((power) => power.hero_names === hero.name);
  
        result = heroPowers ? { ...hero, powers: heroPowers } : hero;
    }
  
    return result ? result : { message: 'Hero not found' };
  }