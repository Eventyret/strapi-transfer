const { testPermissions } = require('./permissions');
const { listEndpoints } = require('./getFiles');
const alert = require('cli-alerts');
const { createFiles } = require('./store');

const checkAPI = async () => {
	const collections = await listEndpoints(process.env.SOURCE_STRAPI_PATH);
	alert({
		type: `info`,
		msg: `Testing Permissions for ${process.env.SOURCE_STRAPI_URL}`
	});
	const localhostPermissions = await testPermissions(collections);
	await createFiles(localhostPermissions);
	alert({
		type: `info`,
		msg: `Testing Permissions for ${process.env.TARGET_STRAPI_URL}`
	});
	const remotePermissions = await testPermissions(collections);
	await createFiles(remotePermissions);
};

module.exports = { checkAPI };
