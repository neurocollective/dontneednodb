const express = require('express');
const app = express();

const dataModel = require('./data_model');
const baseAPI = require('./base_api');
const { buildCryptr } = require('./lib');

let {
	env: {
		PORT = 3000
	} = {}
} = process;

const cryptr = buildCryptr('test');

app.use(baseAPI);

// read `allTheOtherStuff` from `api_routes`, and inject `dataModel`
// app.use(allTheOtherStuff);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
