#!/usr/bin/env node

const commander = require('commander');
const pkg = require('../package.json');

// --version
commander.version(pkg.version, '-v', '--version');

// update
const update = require('../lib/update');

commander.command('update')
          .description('Check version of chartreux')
          .action(function() {
            update();
          });

commander.parse(process.argv);