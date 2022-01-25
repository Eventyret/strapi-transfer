const axios = require('axios');
const dree = require('dree');
const { reportApi, printTable } = require('./report.js');
const ora = require('ora');
const { createFiles, getStore, getStoreAll } = require('./store.js');

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
	children.forEach(tree =>
		collections.push(tree.name.endsWith('s') ? tree.name : tree.name + 's')
	);
	checkAPI();
};

const checkAPI = async () => {
	const store = {
		accessGranted: [],
		notFound: [],
		noPermissions: []
	};

	for await (const col of collections) {
		const spinner = ora(`Trying ${col}`).start();
		try {
			const res = await axios.get(`http://localhost:1337/${col}`);
			store.accessGranted.push(col);
			spinner.succeed(`Access Granted for ${col}`);
			reportApi(col, 200);
		} catch (err) {
			switch (err.response.status) {
				case 403:
					spinner.warn(`Permission Denied for ${col}`);
					store.noPermissions.push(col);
					reportApi(col, err.response.status);
					break;
				case 404:
					store.notFound.push(col);
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
	createFiles(store);
	getStore('noPermissions');
	//printTable();
};
console.log(getStoreAll());
//getStore('noPermissions');

// addCollections();
