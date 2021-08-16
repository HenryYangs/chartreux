'use strict';

const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000, // 1 second
});

const updateCheck = () => {
  if (notifier.update) {
    console.log(`New version available: ${chalk.cyan(notifier.update.latest)}, please update before using.`);
  } else {
    console.log('You are using the latest version.');
  }
};

module.exports = updateCheck;
