const Table = require('cli-table3');
const { STORE_LOOKUP, getSingleStore } = require('./store');
const table = new Table({
	head: ['Collection', 'Status', 'Location']
});

const STATUS = {
	200: '✅  Access Granted',
	403: '⛔️ Permission Denied',
	404: '❓ Not Found',
	500: '❌ Error'
};

const _createTable = data => {
	table.push(data);
};
const printReport = () => {
	console.log(table.toString());
};

// Needs work
const createReport = async () => {
	_createTable([await getSingleStore(), STATUS[statusCode], STORE_LOOKUP]);
};
module.exports = { createReport, printReport };
