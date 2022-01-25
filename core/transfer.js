const axios = require('axios');
const { reportApi, printTable } = require('./report.js');
const ora = require('ora');
const { createFiles } = require('./store.js');
const { listEndpoints } = require('./getFiles');
const alert = require('cli-alerts');

const checkAPI = async () => {
	const store = {
		accessGranted: [],
		notFound: [],
		noPermissions: []
	};
	const collections = await listEndpoints(
		`/Users/d7892891/Development/Challenger/strapi-application/api`
	);
	alert({
		type: `info`,
		msg: `Testing Permissions`
	});

	for await (const col of collections) {
		const spinner = ora(`Trying ${col}`).start();
		try {
			await axios.get(`http://localhost:1337/${col}`);
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
};

checkAPI();
