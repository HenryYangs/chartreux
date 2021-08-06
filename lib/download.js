const download = require('download');
const ora = require('ora');
const chalk = require('chalk');
const fsExtra = require('fs-extra');
const path = require('path');
const defConfig = require('./config');
const jsonPath = path.resolve(__dirname, '../chartreux-config.json');
const tplPath = path.resolve(__dirname, '../template'); // 模板目录

async function downloadTpl() {
  const isExisted = await fsExtra.pathExists(jsonPath);

  if (!isExisted) {
    await defConfig();
  }

  await downloadAction();
}

async function downloadAction() {
  try {
    await fsExtra.remove(tplPath);
  } catch(err) {
    console.error(err);
    process.exit();
  }

  const downloadSpinner = ora(chalk.cyan('Downloading template...'));

  downloadSpinner.start();

  try {
    const jsonConf = await fsExtra.readJson(jsonPath);
    await download(
      jsonConf.mirror, path.resolve(__dirname, '../template'),
      { extract: true }
    );
  } catch(err) {
    downloadSpinner.text = chalk.red(`Download template failed. ${err}`);
    downloadSpinner.fail();
    process.exit();
  }

  downloadSpinner.text = 'Download template successful.';
  downloadSpinner.succeed();
}

module.exports = downloadTpl;
