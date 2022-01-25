const Table = require('cli-table');
const table = new Table({
	head: ['Collection', 'Status']
});

const STATUS = {
	200: '✅  Access Granted',
	403: '⛔️ Permission Denied',
	404: '❓ Not Found',
	500: '❌ Error'
};

const createTable = data => {
	table.push(data);
};
const printTable = () => {
	console.log(table.toString());
};

const reportApi = async (collection, statusCode) => {
	createTable([collection, STATUS[statusCode]]);
};
module.exports = { reportApi, printTable, createTable };
