# 截图与数据生成机制

## 这份文档解决什么问题

如果你忘了“为什么改了 YAML 页面却没更新”，或者“不确定截图是怎么生成的”，看这份就够了。

## 一条命令背后做了什么

`pnpm sync:projects` 会执行：

1. `pnpm run tsc-tools`
2. `node tools/screenshot.cjs`

它的目的不是只有“截图”，而是一次完成两类同步。

## 第一步：把 TypeScript 工具脚本转成可执行文件

`tools/screenshot.ts` 是 TypeScript 文件，先通过 `tsc` 编译，再把输出改名成 `.cjs`，保证可以直接被 Node 运行。

这一步对应脚本：

- `tsc-tools`

## 第二步：真正执行同步脚本

`tools/screenshot.ts` 内部会做几件事：

### 1. 读取 `config.yaml`

脚本通过 `js-yaml` 读取项目配置。

### 2. 生成 `tools/config.data.ts`

脚本把 YAML 中的 `projects` 直接序列化成：

- `export const data = [...]`

这样前端 Vue 组件可以直接 import，不需要在浏览器里再解析 YAML。

### 3. 逐个项目生成截图

脚本会对每个项目：

- 优先访问 `frontend`，如果没有就退到 `backend`；
- 生成原图；
- 用 `sharp` 压缩出缩略图。

### 4. 是否重跑取决于 `renew`

- `renew: false`：只在文件缺失时生成；
- `renew: true`：无论是否已有文件，都重新截图。

## 图片文件规则

假设 `thumbnail` 写的是：

- `/public/images/demo-thumbnail.png`

那么脚本会自动推导：

- 原图：`/public/images/demo.png`
- 缩略图：`/public/images/demo-thumbnail.png`

组件展示时又会把 `/public` 去掉，所以浏览器最终访问：

- `/images/demo-thumbnail.png`

## 什么时候必须跑同步脚本

下面这些情况都建议重新执行：

- 新增项目
- 修改标题或描述
- 修改跳转地址
- 新增截图
- 批量刷新所有项目图

严格来说，标题和描述改动不会影响图片，但会影响 `tools/config.data.ts`，所以也必须同步。

## 失败时怎么排查

### 打不开目标页面

原因通常是：

- 地址写错；
- 目标站点临时不可访问；
- 页面有登录态或防爬限制；
- 网络环境不稳定。

### 图片没更新

先看是不是还在用 `renew: false`。

如果文件已经存在，脚本会跳过，不会自动刷新旧图。

### 页面内容没更新

优先确认 `tools/config.data.ts` 是否已经被重新生成。

如果没有，说明同步脚本没完整执行成功。

## 维护建议

- 平时把 `renew` 保持为 `false`。
- 只有在你明确需要批量重截时，才临时改成 `true`。
- 跑完后恢复为 `false`，避免后续每次都重新抓图，浪费时间。
