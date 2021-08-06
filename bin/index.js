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

// set mirror
const setMirror = require('../lib/mirror');

commander.command('set-mirror <template_mirror>')
          .description('Set template mirror')
          .action(function(mirror) {
            setMirror(mirror);
          });

// download template
const downloadTpl = require('../lib/download');

commander.command('download-tpl')
          .description('Download template from mirror')
          .action(function() {
            downloadTpl();
          });

commander.parse(process.argv);