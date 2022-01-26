const axios = require('axios');
const ora = require('ora');
const { STORE_LOOKUP, setStore, getStore } = require('./store.js');

const api = async (collections, location) => {
	for await (const col of collections) {
		const spinner = ora(`Trying ${col}`).start();
		try {
			await axios.get(`${process.env.SOURCE_STRAPI_URL}${col}`);
			spinner.succeed(`Access Granted for ${col}`);
			console.log(col, location, STORE_LOOKUP.ACCESS_GRANTED);
			setStore(col, location, STORE_LOOKUP.ACCESS_GRANTED);
		} catch (err) {
			switch (err.response.status) {
				case 403:
					spinner.warn(`Permission Denied for ${col}`);
					setStore(col, location, STORE_LOOKUP.NO_PERMISSIONS);
					console.log(col, location, STORE_LOOKUP.NO_PERMISSIONS);
					break;
				case 404:
					setStore(col, location, STORE_LOOKUP.NOT_FOUND);
					console.log(col, location, STORE_LOOKUP.NOT_FOUND);
					spinner.fail(`Did not find ${col}`);
					break;

				default:
					console.log(err.message);
					break;
			}
			console.log(await getStore());
		}
	}
};
module.exports = { api };
