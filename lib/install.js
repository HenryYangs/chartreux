'use strict';

const path = require('path');
const chalk = require('chalk');
const fsExtra = require('fs-extra');
const ora = require('ora');
const fetch = require('./fetch');

const processPath = (path) => {
  return path.startsWith('.') ? path : `./${path}`;
};

const install = async (tpl, targetPath) => {
  if (!tpl) {
    console.log(chalk.red('Template name is missing.'));
    return;
  }

  const tplDir = path.resolve(__dirname, `../templates/${tpl}`);

  if (!(fsExtra.pathExistsSync(tplDir))) {
    await fetch(tpl);
  }

  const installPath = targetPath ? path.resolve(process.cwd(), processPath(targetPath)) : process.cwd();
  const spinner = ora(chalk.cyan('Installing template...'));

  try {
    spinner.start();
    fsExtra.copySync(tplDir, installPath);
    spinner.text = 'Install succeed';
    spinner.succeed();
  } catch (err) {
    spinner.text = `Install template of ${tpl} fail.`;
    spinner.fail();
    console.log(chalk.red(err));
    return;
  }
};

module.exports = install;
