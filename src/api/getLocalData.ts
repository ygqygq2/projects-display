import * as yaml from 'js-yaml';

async function readConfigFile() {
  try {
    const response = await fetch('../../config.yaml');
    const configFile = await response.text();
    const config: any = yaml.load(configFile);
    return config;
  } catch (error) {
    console.error('读取配置文件时出错：', error);
  }
}

export default readConfigFile;
