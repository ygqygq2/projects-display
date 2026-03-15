# 项目总览

## 这是什么项目

`projects-display` 是一个个人项目展示站点，负责把项目列表、项目截图、项目入口地址整理成可浏览的页面。

当前实现是一个 **Astro + Vue 组件混合渲染** 的静态站点：

- Astro 负责页面骨架和站点构建；
- Vue 组件负责渲染项目卡片与交互；
- `config.yaml` 作为项目数据源；
- `tools/screenshot.ts` 负责把配置转成前端可用数据，并生成项目截图。

## 维护主链路

平时维护只需要记住这条主链路：

1. 改 `config.yaml`
2. 跑 `pnpm sync:projects`
3. 本地看效果
4. 构建并部署

如果你只记住一句话，那就是：**这是个配置驱动的网站，页面内容不是手写在组件里，而是从配置和生成文件里来的。**

## 核心目录

### 根目录

- `package.json`：项目脚本与依赖。
- `astro.config.mjs`：Astro 站点配置，包含线上站点地址。
- `config.yaml`：项目列表的唯一主数据源。
- `README.md`：项目快速说明。
- `docs/`：维护文档。

### 页面与组件

- `src/pages/index.astro`：首页，挂载展示组件。
- `src/components/CardContent.vue`：项目卡片列表。
- `src/components/ContactSidebar.vue`：左侧联系方式悬浮入口。
- `src/components/Header.astro` / `Footer.astro`：顶部导航与底部备案信息。

### 数据与资源

- `tools/config.data.ts`：由脚本生成，前端组件直接读取。
- `public/images/`：项目原图和缩略图。
- `tools/screenshot.ts`：同步配置、抓取页面截图、生成缩略图。

## 关键文件之间的关系

### 数据流

1. 你在 `config.yaml` 中维护项目。
2. `tools/screenshot.ts` 读取 `config.yaml`。
3. 脚本把 `projects` 数组写入 `tools/config.data.ts`。
4. `src/components/CardContent.vue` 从 `tools/config.data.ts` 导入 `data` 并渲染。

也就是说，**前端最终读的是生成文件，不是直接读 YAML**。

### 图片流

1. 每个项目在 `config.yaml` 里声明一个缩略图路径，例如：`/public/images/demo-thumbnail.png`。
2. 脚本会自动推导出原图路径：把 `-thumbnail` 去掉，得到 `/public/images/demo.png`。
3. 若图片不存在，脚本会访问项目地址并生成原图与缩略图。
4. 页面渲染时，组件会把图片路径里的 `/public` 去掉，最终以 `/images/...` 的形式在站点中访问。

## 当前项目的几个特征

- 展示数据以项目列表为主，没有复杂后台。
- 配置文件里一个项目可以同时有 `frontend` 和 `backend` 两个入口。
- 页面目前以中文内容为主，但 `src/pages/index.astro` 的根标签仍是 `lang="en"`，后续如果继续中文化可以一起调整。
- 根目录下的 `index.md` 和 `api-examples.md` 是历史示例文件，不是当前页面路由来源。

## 建议你优先记住的三个入口

- 改内容：`config.yaml`
- 生成数据和缩略图：`pnpm sync:projects`
- 看最终结果：`pnpm dev`
