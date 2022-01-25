const { testPermissions } = require('./permissions');
const { listEndpoints } = require('./getFiles');
const alert = require('cli-alerts');

const checkAPI = async () => {
	const collections = await listEndpoints(
		`/Users/d7892891/Development/Challenger/strapi-application/api`
	);
	alert({
		type: `info`,
		msg: `Testing Permissions`
	});
	await testPermissions(collections);
};

checkAPI();
