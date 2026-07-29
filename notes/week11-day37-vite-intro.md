# 第 11 周 · Day 37：Vite 入门 · dev 与 build

> 第 2 阶段 Vue 已过关。之前用 CDN + Live Server 做实验；真实项目用 **Vite** 开发、打包、配环境变量。

## 今日目标

- ✅ 说清 Vite `dev` 和 `build` 的区别
- ✅ 在 `vite-lab/01-vite-basics` 跑通 `npm run dev` / `build` / `preview`
- ✅ 理解环境变量 `VITE_` 前缀与 `import.meta.env`
- ✅ 完成场景自测（8 题）
- ✅ 填写本笔记底部复盘

## 实验位置

| 实验 | 路径 |
|------|------|
| Vite 项目（动手） | `vite-lab/01-vite-basics/` |
| 概念自测 | `vite-lab/01-vite-basics/quiz/index.html` |

---

## Vite 是什么（必背）

| | 说明 |
|--|------|
| **定位** | 现代前端**构建工具** + 开发服务器 |
| **dev** | 本地开发：`npm run dev`，支持 HMR、`.vue` 编译 |
| **build** | 生产打包：`npm run build`，输出到 `dist/` |
| **preview** | 本地预览打包结果：`npm run preview` |

### 和 CDN + Live Server 对比

| | CDN + Live Server | Vite |
|--|-------------------|------|
| `.vue` 单文件 | ❌ 不方便 | ✅ |
| 热更新 HMR | ❌ 整页刷新 | ✅ 改代码局部更新 |
| 环境变量 | ❌ | ✅ `.env` |
| 生产打包 | ❌ | ✅ 压缩、拆包、tree-shaking |

---

## dev vs build（必背）

| | `npm run dev` | `npm run build` |
|--|---------------|-----------------|
| 目的 | 开发调试 | 上线部署 |
| 产物 | 内存里按需编译，**不写** dist | 生成 `dist/` 静态文件 |
| 速度 | 冷启动快（原生 ESM） | 全量打包，较慢 |
| 代码 | 未压缩，含 source map | 压缩、优化 |
| 环境 | 读 `.env.development` | 读 `.env.production` |

### 一句话

> **dev 边写边看；build 出 dist 给服务器；preview 本地验 dist。**

---

## 环境变量（必背）

文件名（项目根目录）：

```
.env                 # 所有模式共用
.env.development     # npm run dev
.env.production      # npm run build
```

**规则：**

- 只有 **`VITE_` 开头**的变量会暴露给前端
- 代码里用：`import.meta.env.VITE_XXX`
- 内置：`import.meta.env.MODE`（`development` / `production`）、`import.meta.env.DEV`、`import.meta.env.PROD`

```javascript
// ❌ 不会暴露给浏览器
SECRET=abc

// ✅ 前端可读
VITE_APP_TITLE=我的后台
```

```javascript
console.log(import.meta.env.VITE_APP_TITLE);
console.log(import.meta.env.MODE);
```

---

## 动手步骤（约 40 分钟）

在终端进入项目目录：

```bash
cd vite-lab/01-vite-basics
npm install
npm run dev
```

> 若 `npm install` 报 EPERM（缓存写在 `Program Files` 无权限）：本项目已配 `.npmrc`，缓存用项目内 `.npm-cache/`，不影响你其他项目。

1. 浏览器打开终端显示的本地地址（通常 `http://localhost:5173`）
2. 看页面标题是否为 **`[DEV]`** 后缀
3. 改 `src/App.vue` 里一行文字 → 保存 → 观察**不刷新整页**就更新（HMR）
4. `Ctrl+C` 停 dev，再执行：

```bash
npm run build
npm run preview
```

5. preview 页面标题应为 **`[PROD]`** 后缀

---

## 场景自测（8 题 · 闭卷）

打开 `vite-lab/01-vite-basics/quiz/index.html`，选题后点「验证答案」。

---

## 笔记区

### dev 和 build 你怎么理解？（自己的话）

**dev** 开发环境边写边看（HMR）；**build** 打包成 `dist/` 给服务器上线。

### 为什么环境变量要 VITE_ 前缀？（自己的话）

Vite **故意**只把 `VITE_` 开头的变量打进前端包；没前缀的（如密钥）不会暴露给浏览器，防泄密。

## 复盘 · 2026-07-23

- 今天学了：Vite dev / build / preview、环境变量、`import.meta.env`
- 搞懂的一个概念：dev 按需编译不写 dist；build 出 dist 上线
- 还不清楚的：无（npm EPERM 已用项目 `.npmrc` 解决）
- 明天优先：Day 38 · 环境变量深入 / 打包分析
