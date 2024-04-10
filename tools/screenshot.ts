import { cwd } from 'process';

const puppeteer = require('puppeteer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

interface Project {
  title: string;
  description: string;
  thumbnail: string;
  frontend: string;
  backend: string;
}

async function readConfigFile() {
  const configFile = fs.readFileSync(path.join(__dirname, '../config.yaml'));
  const config: any = yaml.load(configFile);
  // 配置写到 config.data.ts 中，以便 vitepress 组件读取
  const contentStr = `export const data = ${JSON.stringify(config.projects)}`;
  fs.writeFileSync(path.join(__dirname, './config.data.ts'), contentStr);
  return config;
}

async function generateThumbnail(renew: boolean, project: Project): Promise<void> {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const url = project.frontend || project.backend;
  try {
    await page.goto(url);
  } catch (error) {
    console.error('访问网页时出错：', error);
    await browser.close();
    return;
  }

  // 调整视口大小以适应截图
  await page.setViewport({ width: 1280, height: 720 });

  // 获取图片文件名
  const rootPath = cwd();
  const { thumbnail } = project;
  const thumbnailPath = path.join(rootPath, thumbnail);
  const bigImgPath = thumbnailPath.replace('-thumbnail', '');

  // 判断是否需要更新缩略图
  if (renew) {
    console.log('正在生成缩略图...');
    await page.screenshot({ path: bigImgPath });
    await sharp(bigImgPath).resize(300).toFile(thumbnailPath);
  } else {
    // 先判断文件是否存在，不存在则创建，存在则根据是否需要更新缩略图生成
    if (!fs.existsSync(bigImgPath) || !fs.existsSync(thumbnailPath)) {
      console.log('文件不存在，正在生成...');
      await page.screenshot({ path: bigImgPath });
      await sharp(bigImgPath).resize(300).toFile(thumbnailPath);
    }
  }
  // 调整缩略图大小
  await browser.close();
}

(async () => {
  const config = await readConfigFile();
  console.log('🚀 ~ file: screenshot.ts:57 ~ config:', config);
  const { renew } = config;
  const projects: Project[] = config.projects;
  const tasks = projects.map((project) => {
    return generateThumbnail(renew, project)
      .then(() => {
        console.log('缩略图生成成功或已存在');
      })
      .catch((error) => {
        console.error('生成缩略图时出错：', error);
      });
  });

  await Promise.all(tasks);
})();
