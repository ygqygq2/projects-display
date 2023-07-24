const puppeteer = require('puppeteer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 网址和文件名
const WEB_URLS: { name: string; url: string }[] = [{ url: 'https://wenjuan.ygqygq2.com', name: 'wenjuan.png' }];
// 是否更新缩略图
const RENEW: boolean = false;
// 保存缩略图的目录，相对于项目上根目录
const OUTPUT_PATH: string = './images';

async function generateThumbnail(url: string, outputPath: string): Promise<void> {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto(url);

  // 调整视口大小以适应截图
  await page.setViewport({ width: 1280, height: 720 });

  // 判断是否需要更新缩略图
  if (RENEW) {
    await page.screenshot({ path: outputPath });
    await sharp(outputPath).resize(300).toFile(outputPath.replace('.png', '-thumbnail.png'));
  } else {
    // 先判断文件是否存在，不存在则创建，存在则根据是否需要更新缩略图生成
    if (!fs.existsSync(outputPath)) {
      await page.screenshot({ path: outputPath });
      await sharp(outputPath).resize(300).toFile(outputPath.replace('.png', '-thumbnail.png'));
    }
  }
  // 调整缩略图大小
  await browser.close();
}

function getRootPath(): string {
  // 获取项目根目录
  const cwd = process.cwd();
  // 获取项目根目录下的 images 目录
  const imageRootPath: string = path.join(cwd, OUTPUT_PATH);
  // 判断 images 目录是否存在，不存在则创建
  if (!fs.existsSync(imageRootPath)) {
    fs.mkdirSync(imageRootPath);
  }
  return imageRootPath;
}

const imageRootPath = getRootPath();

(async () => {
  const tasks = WEB_URLS.map(async (url: { name: string; url: string }) => {
    try {
      const outputPath: string = path.join(imageRootPath, url.name);
      await generateThumbnail(url.url, outputPath);
      console.log('缩略图生成成功！');
    } catch (error) {
      console.error('生成缩略图时出错：', error);
    }
  });

  await Promise.all(tasks);
})();
