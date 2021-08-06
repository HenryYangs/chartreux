const fsExtra = require('fs-extra');
const path = require('path');
const setConfig = require('./config');

const jsonPath = path.resolve(__dirname, '../chartreux-config.json');

// 读取镜像配置
async function mirrorAction(link) {
    try {
      // 读取config.json文件
      const jsonConfig = await fsExtra.readJson(jsonPath);

      // 将参数写入jsonConfig
      jsonConfig.mirror = link;
      // 将配置写入文件
      await fsExtra.writeJson(jsonPath, jsonConfig);
      console.log('Set mirror successful.');
    } catch(err) {
      console.log(chalk.red(`Set mirror failed. ${err}`));
      process.exit();
    }
}

async function setMirror(link) {
  // 判断config.json是否存在
  const isExisted = await fsExtra.pathExists(jsonPath);

  if (!isExisted) {
    await setConfig();
  }

  mirrorAction(link);
}

module.exports = setMirror;
