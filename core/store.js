const Configstore = require('configstore');
const config = new Configstore('strapiApiInfo', {});

const createFiles = async collection => {
	config.set(collection);
};

const getStore = async key => {
	return config.get(key);
};
const updateStore = async (key, store) => {
	return config.set(key, store);
};
const getStoreAll = async () => {
	return config.all;
};
module.exports = { createFiles, getStore, getStoreAll, updateStore };
