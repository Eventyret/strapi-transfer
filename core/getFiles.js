const fs = require('fs');
const path = require('path');
const ora = require('ora');
const alert = require('cli-alerts');

const listEndpoints = async dirPath => {
	// dir path that contains all your json file
	const spinner = ora('Getting endpoiints').info();
	const files = fs.readdirSync(dirPath);
	const arr = [];
	const failedColl = [];
	files.forEach((val, i) => {
		if (!fs.existsSync(path.join(dirPath, val, 'config/routes.json'))) {
			spinner.fail(`Can't find endpoint for ${val}`);
			failedColl.push(val);
			return;
		}
		const file = JSON.parse(
			fs.readFileSync(
				path.join(dirPath, val, 'config/routes.json'),
				'utf8'
			)
		);
		arr.push(file.routes[0].path.replace('/', ''));
	});
	console.log(
		`Found ${files.length} total collections

✅ Found ${arr.length} endpoints

❌ ${failedColl.length} was not found`
	);
	return arr;
};

module.exports = { listEndpoints };
