# projects-display

这是一个基于 Astro 的项目展示站点，用来集中展示个人项目，并通过 `config.yaml` 维护项目数据、通过脚本生成展示缩略图。

## 项目是怎么运作的

这个仓库的维护主线很简单：

1. 在 `config.yaml` 里维护项目列表。
2. 运行同步脚本，把项目数据写入 `tools/config.data.ts`，并按需生成截图与缩略图。
3. 本地预览确认页面展示正常。
4. 构建产物并部署。

页面展示层主要由以下部分组成：

- `src/pages/index.astro`：站点首页入口。
- `src/components/CardContent.vue`：读取 `tools/config.data.ts`，渲染项目卡片。
- `src/components/ContactSidebar.vue`：左侧联系方式悬浮入口。
- `public/images/`：项目原图和缩略图资源目录。
- `tools/screenshot.ts`：根据 `config.yaml` 生成数据文件和截图。

## 常用命令

项目使用 `pnpm` 管理依赖。

| 命令 | 作用 |
| :--- | :--- |
| `pnpm install` | 安装依赖并启用 git hooks |
| `pnpm dev` | 启动本地开发服务器 |
| `pnpm check` | 运行 Astro 类型检查 |
| `pnpm build` | 构建生产版本 |
| `pnpm preview` | 本地预览构建结果 |
| `pnpm lint` | 修复 `src/` 下的 ESLint 问题 |
| `pnpm sync:projects` | 根据 `config.yaml` 同步项目数据并生成截图/缩略图 |

## 日常维护最短路径

### 新增或修改项目

1. 编辑 `config.yaml` 中的 `projects` 列表。
2. 为每个项目填写：
	- `title`
	- `description`
	- `thumbnail`
	- `frontend` 或 `backend`
3. `thumbnail` 必须使用 `/public/images/*-thumbnail.png` 命名。
4. 运行 `pnpm sync:projects`。
5. 运行 `pnpm dev` 或 `pnpm build` 检查页面。

### 更新项目截图

- 默认情况下，脚本只会在原图或缩略图不存在时生成图片。
- 如果想强制刷新全部截图，把 `config.yaml` 中的 `renew` 改为 `true`，然后运行 `pnpm sync:projects`。
- 更新完成后建议把 `renew` 改回 `false`，避免每次都全量重跑。

## 文档索引

更详细的维护说明见 `docs/`：

- `docs/01-overview.md`：项目结构总览
- `docs/02-content-maintenance.md`：项目数据维护
- `docs/03-asset-generation.md`：截图与数据生成机制
- `docs/04-release-checklist.md`：发布前检查清单

## 补充说明

- 仓库根目录下的 `index.md`、`api-examples.md` 是早期示例文件，当前 Astro 站点不会直接使用它们。
- 当前站点地址配置在 `astro.config.mjs` 的 `site` 字段中：`https://www.ygqygq2.com`。
- 提交前会通过 `simple-git-hooks` + `lint-staged` 自动处理部分格式化与检查。
