"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = require("process");
var puppeteer = require('puppeteer');
var sharp = require('sharp');
var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');
var SCREENSHOT_VIEWPORT = {
    width: 1440,
    height: 810,
    deviceScaleFactor: 2,
};
var THUMBNAIL_WIDTH = 960;
function readConfigFile() {
    return __awaiter(this, void 0, void 0, function () {
        var configFile, config, contentStr;
        return __generator(this, function (_a) {
            configFile = fs.readFileSync(path.join(__dirname, '../config.yaml'));
            config = yaml.load(configFile);
            contentStr = "export const data = ".concat(JSON.stringify(config.projects));
            fs.writeFileSync(path.join(__dirname, './config.data.ts'), contentStr);
            return [2 /*return*/, config];
        });
    });
}
function generateThumbnail(renew, project) {
    return __awaiter(this, void 0, void 0, function () {
        function writeImages() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, page.screenshot({ path: bigImgPath })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, sharp(bigImgPath)
                                    .resize({
                                    width: THUMBNAIL_WIDTH,
                                    withoutEnlargement: true,
                                    kernel: sharp.kernel.lanczos3,
                                })
                                    .sharpen()
                                    .png({ compressionLevel: 9 })
                                    .toFile(thumbnailPath)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        var browser, page, url, error_1, rootPath, thumbnail, thumbnailPath, bigImgPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch({ headless: 'new' })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.setViewport(SCREENSHOT_VIEWPORT)];
                case 3:
                    _a.sent();
                    url = project.frontend || project.backend;
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 8]);
                    return [4 /*yield*/, page.goto(url, { waitUntil: 'networkidle2' })];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 6:
                    error_1 = _a.sent();
                    console.error('访问网页时出错：', error_1);
                    return [4 /*yield*/, browser.close()];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
                case 8:
                    rootPath = (0, process_1.cwd)();
                    thumbnail = project.thumbnail;
                    thumbnailPath = path.join(rootPath, thumbnail);
                    bigImgPath = thumbnailPath.replace('-thumbnail', '');
                    if (!renew) return [3 /*break*/, 10];
                    console.log('正在生成缩略图...');
                    return [4 /*yield*/, writeImages()];
                case 9:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 10:
                    if (!(!fs.existsSync(bigImgPath) || !fs.existsSync(thumbnailPath))) return [3 /*break*/, 12];
                    console.log('文件不存在，正在生成...');
                    return [4 /*yield*/, writeImages()];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12: 
                // 调整缩略图大小
                return [4 /*yield*/, browser.close()];
                case 13:
                    // 调整缩略图大小
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var config, renew, projects, tasks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, readConfigFile()];
            case 1:
                config = _a.sent();
                console.log('🚀 ~ file: screenshot.ts:57 ~ config:', config);
                renew = config.renew;
                projects = config.projects;
                tasks = projects.map(function (project) {
                    return generateThumbnail(renew, project)
                        .then(function () {
                        console.log('缩略图生成成功或已存在');
                    })
                        .catch(function (error) {
                        console.error('生成缩略图时出错：', error);
                    });
                });
                return [4 /*yield*/, Promise.all(tasks)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
