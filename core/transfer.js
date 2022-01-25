const { testPermissions } = require('./permissions');
const { listEndpoints } = require('./getFiles');
const alert = require('cli-alerts');
const { createFiles } = require('./store');

const checkAPI = async () => {
	const collections = await listEndpoints(
		`/Users/d7892891/Development/Challenger/strapi-application/api`
	);
	alert({
		type: `info`,
		msg: `Testing Permissions`
	});
	const createdCollections = testPermissions(collections);
	createFiles(createdCollections);
};

module.exports = { checkAPI };
