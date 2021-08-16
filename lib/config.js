'use strict';

const path = require('path');
const chalk = require('chalk');
const fsExtra = require('fs-extra');
const configPath = path.resolve(__dirname, '../config.json');

const getConfig = (action, config) => {
  const errorSupportedList = `Current supported template list: ${Object.keys(config)}`;

    if (!action) {
      console.log(chalk.red('Please input specific template name.'));
      console.log(errorSupportedList);
      return;
    }

    if (!config[action]) {
      console.log(chalk.red(`${action}'s template has not supported yet.`));
      console.log(errorSupportedList);
      return;
    }

    console.log(JSON.stringify(config[action], null, 2));
};

const setConfig = (action, options, conf) => {
  if (!action) {
      console.log(chalk.red('Please input specific template name.'));
      return;
    }

    if (!conf[action]) {
      conf[action] = {
        url: options.set,
        default: options.set,
      };
    } else {
      conf[action].url = options.set;
    }

    fsExtra.writeJsonSync(configPath, conf, { spaces: 2 });
    console.log(chalk.green(`Mirror of ${action} is updated to: ${options.set}`));
};

const reset = (action, conf ) => {
  if (!action) {
      Object.keys(conf).forEach((template) => {
        conf[template].url = conf[template].default;
      });
    } else {
      conf[action].url = conf[action].default;
    }

    fsExtra.writeJsonSync(configPath, conf, { spaces: 2 });
    console.log(chalk.green(action ? `Mirror of ${action} is reset` : 'All mirrors are reset'));
};

async function config(action, options) {
  const currentConfig = fsExtra.readJsonSync(configPath);

  // input "chartreux config" only
  if (!action && !Object.keys(options).length) {
    options.json = true;
  }

  if (options.json) {
    console.log(chalk.green(JSON.stringify(currentConfig, null, 2)));
    return;
  }

  if (options.get) {
    getConfig(action, currentConfig);
    return;
  }

  if (options.set !== undefined) {
    setConfig(action, options, currentConfig);
    return;
  }

  if (options.edit) {
    require('launch-editor')(configPath);
    return;
  }

  if (options.reset) {
    reset();
    return;
  }
}

module.exports = config;
