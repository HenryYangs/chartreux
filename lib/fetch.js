'use strict';

const path = require('path');
const chalk = require('chalk');
const download = require('download');
const fsExtra = require('fs-extra');
const ora = require('ora');
const { isUrl } = require('../utils');

const dirPath = path.resolve(__dirname, '../templates');

const fetch = async (tpl) => {
  const config = fsExtra.readJsonSync(path.resolve(__dirname, '../config.json'));
  let waitingList = [];

  if (tpl.length) {
    tpl.forEach(t => {
      if (config[t]) {
        waitingList.push({
          name: t,
          url: config[t].url,
        });
      }
    });
  } else {
    Object.keys(config).forEach(key => {
      waitingList.push({
        name: key,
        url: config[key].url,
      });
    });
  }

  if (!waitingList.length) {
    console.log(`${chalk.red('No template config found, please check template name.')}`);
    return;
  }

  fsExtra.ensureDirSync(dirPath);

  const spinner = ora(chalk.cyan('Fetching templates...'));

  spinner.start();

  const fetchList = [];

  waitingList.forEach(async template => {
    fetchList.push(fetchTpl(template));
  });

  Promise.allSettled(fetchList).then((result) => {
    const hasError = result.some(item => item.status === 'rejected');

    if (hasError) {
      // format error message
      const errInfo = [];

      result.forEach(item => {
        if (item.status === 'rejected') {
          const { reason } = item;

          errInfo.push(chalk.red(`${reason.name}: ${reason.message}`));
        }
      });
      spinner.text = `
        Error list:
        ${errInfo.join('\n')}
      `;
      spinner.fail();
    } else {
      spinner.text = 'All templates are fetched';
      spinner.succeed();
    }
  });
};

const fetchTpl = async (tplItem) => {
  return new Promise((resolve, reject) => {
    if (!isUrl(tplItem.url)) {
      reject({
        name: tplItem.name,
        message: 'Url is invalid',
      });
    }

    const path = `${dirPath}/${tplItem.name}`;

    fsExtra.ensureDirSync(path);
    download(tplItem.url, path, {
      extract: true,
      /**
       * Remove leading directory components from extracted files.
       * ref: https://github.com/kevva/decompress#strip
       */
      strip: 1,
    })
      .then(() => {
        console.log(chalk.green(`fetch ${tplItem.name} successful.`));
        resolve();
      })
      .catch((err) => {
        reject({
          name: tplItem.name,
          message: err.message,
        });
      });
  });
};

module.exports = fetch;
