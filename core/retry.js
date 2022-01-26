const { api } = require('./api');
const { getStore, getStoreAll, updateStore } = require('./store');

const retryAPI = async collections => {
	await api(collections);
};

module.exports = { retryAPI };
