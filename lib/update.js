const updateNotifier = require('update-notifier');
const chalk = require('chalk');
const pkg = require('../package.json');

const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000, // 1s
});

function update() {
  if (notifier.update) {
    console.log(`New version available: ${chalk.cyan(notifier.update.latest)}, update this package before using it is recommended.`);
    notifier.notify();
  } else {
    console.log('You are using the latest version.');
  }
}

module.exports = update;
