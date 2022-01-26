const os = require('os');
const store = require('data-store')({
	path: os.homedir() + '/.config/strapi-transfer/permissions.json'
});
const STORE_LOOKUP = {
	ACCESS_GRANTED: 'accessGranted',
	NOT_FOUND: 'notFound',
	NO_PERMISSIONS: 'noPermissions',
	LOCAL: 'local',
	REMOTE: 'remote'
};

const setStore = async (data, location, key) => {
	return await store.union(`${location}.${key}`, data);
};
const getSingleStore = async (location, key) => {
	return await store.get(`${location}.${key}`);
};

const getStore = async () => {
	return await store.get();
};

module.exports = {
	setStore,
	getSingleStore,
	getStore,
	STORE_LOOKUP
};
