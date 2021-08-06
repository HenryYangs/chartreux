#!/usr/bin/env node

const commander = require('commander');
const pkg = require('../package.json');

commander.version(pkg.version, '-v', '--version');
commander.parse(process.argv);
