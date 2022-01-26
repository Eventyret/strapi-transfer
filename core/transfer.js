const { testPermissions } = require('./permissions');
const { listEndpoints } = require('./getFiles');
const alert = require('cli-alerts');
const { createFiles } = require('./store');

const checkAPI = async () => {
	const collections = await listEndpoints(process.env.SOURCE_STRAPI_PATH);
	alert({
		type: `info`,
		msg: `Testing Permissions`
	});
	const createdCollections = await testPermissions(collections);
	await createFiles(createdCollections);
};

module.exports = { checkAPI };
