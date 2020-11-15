const fs = require('fs');
const buildCryptr = require('./encryption');

const writeJsonToFile = (path = '', json = {}) => new Promise((resolve, reject) => (
	fs.writeFile(path, JSON.stringify(json), err => {
		if (err) {
			return reject(err);
		}
		return resolve();
	});
));

const readJsonFromFile = (path = '') => new Promise((resolve, reject) => (
	fs.readFile(path, (err, jsonString) => {
		if (err) {
			return reject(err);
		}
		let jsonObject;
		try {
			jsonObject = JSON.parse(jsonString);
		} catch (err) {
			return reject(`error parsing json from ${path}: ${err.message}`)
		} 
		return resolve(jsonObject);
	});
));

const hashJsonObject = (object) => {
	// sha1 is broken and not considered secure, however this fact may not matter for this use case. for now.
	const hash = crypto.createHash('sha1');
	hash.setEncoding('hex');
	const asString = JSON.stringify(object);
	hash.write(asString);
	hash.end();
	const sha1sum = hash.read();
	return sha1sum;
};

module.exports = {
	buildCryptr,
	hashJsonObject,
	writeJsonToFile,
	readJsonFromFile
};
