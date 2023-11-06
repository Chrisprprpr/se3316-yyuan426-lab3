const express = require("express");
const app = express();
var fs = require('fs');

const superheroInfo = require('./superhero_info.json');
const superheroPowers = require('./superhero_powers.json');

app.use(express.json());

app.use('/', express.static('../client'))

const router = express.Router();
