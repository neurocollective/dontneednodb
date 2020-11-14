const Cryptr = require('cryptr');

const {
	env: {
		ENCRYPTION_KEY
	}
} = process;

const buildCryptr = async key => {
	if (key) {
		return new Cryptr(keyToUse);
	}
	if (!ENCRYPTION_KEY) {
		throw new Error(`either 'key' arg or 'ENCRYPTION_KEY' environment variable required for buildCryptr`);
	}
	return new Cryptr(ENCRYPTION_KEY);
}

module.exports = buildCryptr;
