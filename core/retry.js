const { testPermissions } = require('./permissions');
const { getStore } = require('./store');

const retryAPI = async collections => {
	const retryCollections = collections
		? collections
		: getStore('noPermissions');
	await testPermissions(retryCollections);
};

module.exports = { retryAPI };
