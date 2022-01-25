const { MultiSelect } = require('enquirer');
const { getStore } = require('../core/store');
const { retryAPI } = require('../core/retry');

module.exports = async () => {
	const prompt = new MultiSelect({
		name: 'value',
		hint: '(Use <space> to select, <return> to submit)',
		initial: await getStore('noPermissions'),
		message: 'What collections do you want to retry',
		choices: await getStore('noPermissions')
	});
	prompt
		.run()
		.then(answer => retryAPI(answer))
		.catch(console.error);
};
