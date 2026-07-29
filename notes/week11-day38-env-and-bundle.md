# 第 11 周 · Day 38：环境变量深入 + 打包分析

> Day 37 跑通了 dev / build。今天搞清 **.env 优先级**、**.env.local`**，并学会 **看 dist 产物** 和 **动态 import 拆包**。

## 今日目标

- ✅ 说清 `.env` / `.env.development` / `.env.local` 的加载优先级
- ✅ 在 `vite-lab/02-env-bundle` 用 `.env.development.local` 覆盖变量并观察变化
- ✅ 执行 `npm run build`，读懂终端输出的文件体积
- ✅ 观察动态 import 如何产生独立 chunk
- ✅ 完成场景自测（8 题）
- ✅ 填写本笔记底部复盘

## 实验位置

| 实验 | 路径 |
|------|------|
| 环境变量 + 拆包 | `vite-lab/02-env-bundle/` |
| 概念自测 | `vite-lab/02-env-bundle/quiz/index.html` |

---

## .env 文件优先级（必背 · 易错）

### ⚠️ 勘误（Day 38 初版写错了）

初版笔记写「**.env.local 优先级最高**」——**这是错的**，导致你改了 `.env.local` 界面却不变。

**正确规则：后加载的文件覆盖先加载的；dev 下最高是 `.env.development.local`，不是 `.env.local`。**

---

Vite **按顺序加载，后加载的覆盖先加载的**：

**`npm run dev` 时：**

```
.env                      ← ① 最低
.env.local                ← ②
.env.development          ← ③（若写了同一变量，会盖掉 ②）
.env.development.local    ← ④ dev 下最高 ✅
```

**`npm run build` 时：**

```
.env → .env.local → .env.production → .env.production.local
```

| 文件 | 何时加载 | 是否提交 git |
|------|----------|--------------|
| `.env` | 所有模式 | ✅ 公共默认值 |
| `.env.local` | 所有模式 | ❌ 不提交（**不是**最高优先级） |
| `.env.development` | `npm run dev` | ✅ |
| `.env.development.local` | `npm run dev` | ❌ **dev 本地覆盖，用这个** |
| `.env.production` | `npm run build` | ✅ |
| `.env.production.local` | `npm run build` | ❌ build 本地覆盖 |

### 一句话（修正版）

> **dev 下想覆盖团队 development 配置 → 用 `.env.development.local`；改完必须重启 dev。**

> **本实验** 故意不在 `.env.development` 里写 `VITE_API_BASE`，这样你只改 `.env.local` 也能生效——真实项目 development 里常有配置，那时单靠 `.env.local` 不够。

### 改 env 不变？ checklist

1. 改的是 **`vite-lab/02-env-bundle`** 不是 Day 37 的 `01-vite-basics`
2. 保存文件后 **Ctrl+C 停 dev，再 `npm run dev`**（HMR **不会**热更新 env）
3. 浏览器 **Ctrl+F5** 硬刷新

---

## 环境变量规则（复习 + 加深）

```bash
# ✅ 前端可读
VITE_API_BASE=http://localhost:3000/api

# ❌ 不会打进浏览器包（没有 VITE_ 前缀）
DB_PASSWORD=secret
```

```javascript
import.meta.env.VITE_API_BASE  // 字符串
import.meta.env.PROD            // build 后为 true
import.meta.env.DEV             // dev 时为 true
```

---

## 打包产物 dist/（必背）

`npm run build` 后：

```
dist/
├── index.html          ← 入口 HTML（引用带 hash 的资源）
└── assets/
    ├── index-xxxxx.js  ← 主包
    ├── index-xxxxx.css
    └── HeavyPanel-xxxxx.js  ← 动态 import 拆出的 chunk（实验 B）
```

| 现象 | 含义 |
|------|------|
| 文件名带 hash | 内容变 → hash 变 → 浏览器缓存失效（**缓存刷新**） |
| 终端列 gzip 体积 | 实际上线传输大约这么大 |
| 多个 `.js` chunk | 路由懒加载 / 动态 import **拆包**，首屏更小 |

### 动态 import 拆包

```javascript
// 点击时才加载，build 时单独打一个 chunk
const HeavyPanel = defineAsyncComponent(() =>
  import('./components/HeavyPanel.vue')
);
```

> **易错：** build 拆几个 chunk 由源码里的 `import()` 决定，**不是** dev 里点没点按钮。

---

## 场景自测（8 题 · 闭卷）

在实验页选题验证。**得分：完成 ✅**

---

## 笔记区

### .env.local 为什么不提交 git？（自己的话）

每人本机配置不同（端口、API 地址等），提交会冲突；也可能含私人信息，所以放 `.gitignore`。

### 动态 import 拆包有什么好处？（自己的话）

按需加载，首屏只下主包，减小首屏体积、加快加载。

## 复盘 · 2026-07-27

- 今天学了：env 加载优先级、`.env.development.local`、dist 产物、动态 import 拆 chunk
- 搞懂的一个概念：dev 下最高是 `.env.development.local`；build 有 2 个 js 就是拆包成功
- 还不清楚的：无（env 优先级踩坑已搞懂）
- 明天优先：Day 39 · 第 11 周 Vite 复盘
