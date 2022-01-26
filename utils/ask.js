const { MultiSelect, Select } = require('enquirer');
const { getLocalStore } = require('../core/store');
const { retryAPI } = require('../core/retry');
const { STORE_LOOKUP } = require('../core/store');

const _retryList = async () => {
	const storedPermissions =
		permissions === 'noPermissions'
			? await getSingleStore('noPermissions')
			: await getSingleStore('notFound');
	const prompt = new MultiSelect({
		name: 'value',
		hint: '(Use <space> to select, <return> to submit)',
		initial: storedPermissions,
		message: 'What collections do you want to retry',
		choices: storedValues
	});

	prompt
		.run()
		.then(answer => retryAPI(storedValues, answer))
		.catch(console.error);
};

// const reportToShow = async () => {};

const whatToRetry = async () => {
	const prompt = new Select({
		name: 'color',
		message: 'What shall we retry',
		choices: [STORE_LOOKUP.LOCAL, STORE_LOOKUP.REMOTE]
	});

	prompt
		.run()
		.then(answer => console.log('Answer:', answer))
		.catch(console.error);
};

module.exports = { whatToRetry };
