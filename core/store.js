const Configstore = require('configstore');
const config = new Configstore('strapiApiInfo', {});

const createFiles = async collection => {
	config.set(collection);
};

const getStore = async key => {
	return config.get(key);
};
const getStoreAll = async () => {
	const store = config.all;
	return store;
};
module.exports = { createFiles, getStore, getStoreAll };
