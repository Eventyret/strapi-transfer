const fs = require('fs');
const path = require('path');
const ora = require('ora');
const alert = require('cli-alerts');

const listEndpoints = async dirPath => {
	// dir path that contains all your json file
	const spinner = ora().start();
	alert({
		type: `info`,
		msg: `Getting Endpoints`
	});
	const files = fs.readdirSync(dirPath);
	const arr = [];
	files.forEach((val, i) => {
		if (!fs.existsSync(path.join(dirPath, val, 'config/routes.json'))) {
			spinner.fail(`Can't find endpoint for ${val}`);
			return;
		}
		const file = JSON.parse(
			fs.readFileSync(
				path.join(dirPath, val, 'config/routes.json'),
				'utf8'
			)
		);
		spinner.succeed(`Found Endpoint for ${val}`);
		arr.push(file.routes[0].path.replace('/', ''));
	});
	console.log('\n');
	return arr;
};

module.exports = { listEndpoints };
