const path = require('path');
const fsExtra = require('fs-extra');

// 声明配置文件内容
const config = {
  name: '',
  mirror: '',
};
const confPath = path.resolve(__dirname, '../chartreux-config.json');

async function defConfig() {
  try {
    await fsExtra.outputJson(confPath, config);
  } catch(err) {
    console.error(err);
    process.exit();
  }
}

module.exports = defConfig;
