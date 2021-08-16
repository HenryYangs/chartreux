#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .usage('<command> [options]');

program
  .command('config [tpl]')
  .description('inspect and custom config')
  .option('-g, --get', 'get config of template')
  .option('-s, --set <url>', 'set config of template')
  .option('-e, --edit', 'open editor to edit config')
  .option('-r, --reset', 'reset config of template')
  .option('--json', 'output current config')
  .action((value, options) => {
    require('../lib/config')(value, options);
  });

program.parse();
