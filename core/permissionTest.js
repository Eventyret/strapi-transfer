const { api } = require('./api');
const { getEndpointsFromProject } = require('./getEndpoints');
const alert = require('cli-alerts');
const { setLocalStore, setRemoteStore, STORE_LOOKUP } = require('./store');

const checkAPI = async () => {
	const collections = await getEndpointsFromProject(
		process.env.SOURCE_STRAPI_PATH
	);
	alert({
		type: `info`,
		msg: `Testing Permissions for ${process.env.SOURCE_STRAPI_URL}`
	});
	await api(collections, STORE_LOOKUP.LOCAL);
	if (process.env.TARGET_STRAPI_URL && process.env.ENDPOINT_TESTING_ENABLED) {
		alert({
			type: `info`,
			msg: `Testing Permissions for ${process.env.TARGET_STRAPI_URL}`
		});
		await api(collections, STORE_LOOKUP.REMOTE);
		await setStore(remotePermissions, STORE_LOOKUP.REMOTE);
	}
};

module.exports = { checkAPI };
