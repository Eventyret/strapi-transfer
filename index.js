#!/usr/bin/env node

/**
 * strapi-transfer
 * Transfer data from mongodb to postgres for strapi
 *
 * @author Simen Daehlin <https://www.dehlin.dev>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const ask = require('./utils/ask');
const { checkAPI } = require('./core/transfer');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	input.includes(`permissions`) && ask('noPermissions');
	input.includes(`notfound`) && ask('notFound');
	input.length === 0 && checkAPI();
	debug && log(flags);
})();
