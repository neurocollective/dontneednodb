const express = require('express');
const app = express();

const dataModel = require('./data_model');
const {
	buildCryptr
} = require('./lib');

let {
	env: {
		PORT = 3000
	} = {}
} = process;

const cryptr = buildCryptr('test');

app.listen(PORT, () => console.log(`listening on ${PORT}`));
