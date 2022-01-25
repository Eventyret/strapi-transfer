const axios = require('axios');
const dree = require('dree');
const { createTable, printTable } = require('../core/printTable');
const ora = require('ora');

const collections = [];
const options = {
	stat: false,
	normalize: true,
	followLinks: true,
	size: true,
	hash: true,
	depth: 1
};

const addCollections = async () => {
	const { children } = await dree.scanAsync(
		'/Users/d7892891/Development/Challenger/strapi-application/api',
		options
	);
	children.forEach(tree => {
		if (tree.name.endsWith('s')) collections.push();
		collections.push(tree.name.endsWith('s') ? tree.name : tree.name + 's');
	});
	checkAPI();
};

addCollections();

const checkAPI = async () => {
	const accessGranted = [];
	const notFound = [];
	const noPermissions = [];

	for await (const col of collections) {
		const spinner = ora(`Trying ${col}`).start();
		try {
			const res = await axios.get(`http://localhost:1337/${col}`);
			accessGranted.push(col);
			spinner.succeed(`Access Granted for ${col}`);
			reportApi(col, 200);
		} catch (err) {
			switch (err.response.status) {
				case 403:
					spinner.warn(`Permission Denied for ${col}`);
					noPermissions.push(col);
					reportApi(col, err.response.status);
					break;
				case 404:
					notFound.push(col);
					spinner.fail(`Did not find ${col}`);
					reportApi(col, err.response.status);
					break;

				default:
					console.log(err.message);
					reportApi(col, err.response.status);
					break;
			}
		}
	}
	printTable();
};

const reportApi = async (collection, statusCode) => {
	createTable([collection, STATUS[statusCode]]);
};

const STATUS = {
	200: '✅  Access Granted',
	403: '⛔️ Permission Denied',
	404: '❓ Not Found',
	500: '❌ Unknown Error'
};
