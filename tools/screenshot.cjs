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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
        var browser, page, url, rootPath, thumbnail, thumbnailPath, bigImgPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch({ headless: 'new' })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    url = project.frontend || project.backend;
                    return [4 /*yield*/, page.goto(url)];
                case 3:
                    _a.sent();
                    // 调整视口大小以适应截图
                    return [4 /*yield*/, page.setViewport({ width: 1280, height: 720 })];
                case 4:
                    // 调整视口大小以适应截图
                    _a.sent();
                    rootPath = (0, process_1.cwd)();
                    thumbnail = project.thumbnail;
                    thumbnailPath = path.join(rootPath, thumbnail);
                    bigImgPath = thumbnailPath.replace('-thumbnail', '');
                    if (!renew) return [3 /*break*/, 7];
                    return [4 /*yield*/, page.screenshot({ path: bigImgPath })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, sharp(bigImgPath).resize(300).toFile(thumbnailPath)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 7:
                    if (!!fs.existsSync(bigImgPath)) return [3 /*break*/, 10];
                    return [4 /*yield*/, page.screenshot({ path: bigImgPath })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, sharp(bigImgPath).resize(300).toFile(thumbnailPath)];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: 
                // 调整缩略图大小
                return [4 /*yield*/, browser.close()];
                case 11:
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
                tasks = projects.map(function (project) { return __awaiter(void 0, void 0, void 0, function () {
                    var error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, generateThumbnail(renew, project)];
                            case 1:
                                _a.sent();
                                console.log('缩略图生成成功！');
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                console.error('生成缩略图时出错：', error_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(tasks)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
