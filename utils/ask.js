const { MultiSelect } = require('enquirer');
const { getStore } = require('../core/store');
const { retryAPI } = require('../core/retry');

module.exports = async noPermissions => {
	console.log(noPermissions);
	const storedValues =
		noPermissions === 'noPermissions'
			? await getStore('noPermissions')
			: await getStore('notFound');

	const prompt = new MultiSelect({
		name: 'value',
		hint: '(Use <space> to select, <return> to submit)',
		initial: storedValues,
		message: 'What collections do you want to retry',
		choices: storedValues
	});

	prompt
		.run()
		.then(answer => retryAPI(noPermissions, answer))
		.catch(console.error);
};
