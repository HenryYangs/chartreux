#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .usage('<command> [options]');

program.parse(process.argv);
