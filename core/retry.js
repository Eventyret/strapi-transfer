const { testPermissions } = require('./permissions');
const { getStore } = require('./store');

const retryAPI = async () => {
	const retryCollections = getStore('noPermissions');
	await testPermissions(retryCollections);
};

module.exports(retryAPI);
