const { testPermissions } = require('./permissions');
const { getStore, getStoreAll, updateStore } = require('./store');

const retryAPI = async (key, collections) => {
	const retryComplete = await testPermissions(collections);
	updateStore(key, retryComplete);
};

module.exports = { retryAPI };
