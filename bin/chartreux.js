#!/usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
const leven = require('leven');
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

program
  .command('upgrade')
  .description('upgrade chartreux')
  .action(() => {
    require('../lib/upgrade')();
  });

program
  .command('fetch [tpl...]')
  .description('fetch specific template from remote')
  .action((tpl) => {
    require('../lib/fetch')(tpl);
  });

program
  .command('install <tpl> [path]')
  .description('install specific template')
  .action((tpl, path) => {
    require('../lib/install')(tpl, path);
  });

// output help information on unknown commands
program.on('command:*', ([cmd]) => {
  program.outputHelp();
  console.log('  ' + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
  suggestCommands(cmd);
  process.exitCode = 1;
});

// add some useful info on help
program.on('--help', () => {
  console.log();
  console.log(`  Run ${chalk.cyan('chartreux <command> --help')} for detailed usage of given command.`);
  console.log();
});

program.parse(process.argv);


function suggestCommands (unknownCommand) {
  const availableCommands = program.commands.map(cmd => cmd._name);

  let suggestion;

  availableCommands.forEach(cmd => {
    const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand);
    if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
      suggestion = cmd;
    }
  });

  if (suggestion) {
    console.log('  ' + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`));
  }
}
