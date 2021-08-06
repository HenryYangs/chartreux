const fsExtra = require('fs-extra');
const ora = require('ora');
const chalk = require('chalk');
const inquirer = require('inquirer');
// const handlebars = require('handlebars');
const path = require('path');
const downloadTpl = require('./download');

async function init(name) {
  const nameLowerCase = name.toLowerCase();

  try {
    const isExisted = await fsExtra.pathExists(nameLowerCase);

    if (isExisted) {
      console.log(chalk.red(`${nameLowerCase} is already existed.`));
    } else {
      inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Set name of your project',
          default: 'Default',
        }
      ])
        .then(async function(answers) {
          console.log('answers', answers); // TODO
          const initSpinner = ora(chalk.cyan('Initializing project...'));

          initSpinner.start();

          const tplPath = path.resolve(__dirname, '../template');
          const isTplExisted = await fsExtra.pathExists(tplPath);

          if (!isTplExisted) {
            await downloadTpl();
          }

          try {
            const curPath = process.cwd(); // 返回当前工作目录的路径
            const targetPath = `${curPath}/${nameLowerCase}`;

            await fsExtra.copy(tplPath, targetPath);
          } catch(err) {
            console.log(chalk.red(`Copy template failed. ${err}`));
            process.exit();
          }

          initSpinner.text = 'Initialize successful.';
          initSpinner.succeed();
        })
    }
  } catch(err) {
    initSpinner.text = 'Initialize failed.';
    initSpinner.fail();
    console.log(chalk.red(err));
    process.exit();
  }
}

module.exports = init;
