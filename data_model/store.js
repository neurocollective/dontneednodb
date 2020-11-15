const { writeJsonToFile, readJsonFromFile, hashJsonObject } = require('./lib');

const STATE_HOLDER = {
	state: {},
	commitStack: [] // array of objects: { hash: String, state: Object }
};
const JSON_FILE_ROOT_PATH = `${process.cwd()}/data_model/disk/`;

const commitNewState = (STATE_HOLDER, stateObject, hash) => {
	STATE_HOLDER.commitStack.push({
		hash,
		state: stateObject
	});

	STATE_HOLDER.state = completeNewState;
};

const getState = () => STATE_HOLDER.state;

// unlike redux, no reducer inside store -> state update logic is expected to exist outside store. New state is simply sent to dispatch,
// and whatever is in newState will overwrite the contents of STATE_HOLDER.state 
const dispatchNewState = (wholeOrPartialNewState = {}) => {
	const completeNewState = {
		...STATE_HOLDER.state,
		...wholeOrPartialNewState;
	};

	const commitHash = hashJsonObject(completeNewState);

	const { hash: lastCommitHash } = STATE_HOLDER.recentCommitStack[STATE_HOLDER.recentCommitStack.length - 1];
	const isDuplicate = lastCommitHash === commitHash;

	if (isDuplicate) {
		return {
			state: STATE_HOLDER.state,
			fileWritePromise: Promise.reject('new state is a duplicate of old state');
		};
	}

	const filePath = `${JSON_FILE_ROOT_PATH}/${commitHash}`

	const fileWritePromise = writeJsonToFile(filePath, completeNewState);
	.then(() => {
		console.log(`new state written to ${filePath}`);
	})
	.catch(err => {
		console.error(`failed to write json: ${err.message}`);
	});

	// STATE_HOLDER.commitStack.push({
	// 	commit,
	// 	state: completeNewState
	// });

	// STATE_HOLDER.state = completeNewState;
	commitNewState(STATE_HOLDER, completeNewState, commitHash);
	return {
		state: completeNewState,
		fileWritePromise
	};
};

const STORE = {
	getState,
	dispatchNewState
};

export default STORE;