const Configstore = require('configstore');

// This needs an if check else it creates new ones all the time
const config = new Configstore('strapiApiInfo', {
	accessGranted: [],
	notFound: [],
	noPermissions: []
});

const createFiles = async collection => {
	config.set(collection);
};

const getStore = async key => {
	return config.get(key);
};
const updateStore = async (key, store) => {
	return config.set(config[key], store);
};
const getStoreAll = async () => {
	return await config.all;
};
module.exports = { createFiles, getStore, getStoreAll, updateStore };
