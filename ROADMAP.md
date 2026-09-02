# 前端中级提升 · 总体目标与路线图

> 创建日期：2026-07-02  
> 预计周期：16 周（约 4 个月）+ H5/小程序冲刺  
> 每日投入：3 小时  
> 当前阶段：**第 4 阶段 · 求职冲刺**（40WEB 面试化 + **H5/小程序 15 日补齐**）

---

## 一、个人现状（勿忘起点）

| 项目 | 情况 |
|------|------|
| 工作经验 | 2 年，管理后台 + 官网，能交付但偏「搜着做」 |
| 技术栈 | Vue 3 为主，少量 Vue 2 维护旧项目 |
| 基础水平 | HTML / CSS / JS / Vue 都能用，**原理已系统补过**（JS/Vue/工程化完成） |
| 学习方式 | 除大学外无系统学习，用时才查文档 → 正用 Study 仓库纠正 |
| 主攻方向 | **Vue 3** + 求职期补 **H5 / 微信小程序**（投移动向岗位用） |
| 已知缺口 | 工作偏后台；**缺可演示的 H5 适配 + 小程序项目** |
| 最终目标 | **换工作**，合格中级 Vue 前端；能投 H5/小程序向 JD |

---

## 二、终极目标（4 个月后应达到）

### 能力标准

- [ ] **JavaScript**：能讲清闭包、this、原型、异步、事件循环；能手写 Promise 简易版
- [ ] **Vue 3**：理解响应式原理；熟练使用组合式 API、Router、Pinia；能设计组件与 composable
- [ ] **工程化**：懂 Vite 构建、环境变量、打包产物；会用 ESLint、Git 分支协作
- [ ] **浏览器与网络**：HTTP、缓存、跨域、Token 鉴权能口头说清楚；XSS/CSRF 各能讲 30 秒
- [ ] **移动向（求职补齐）**：H5 适配（rem/vw、flex/grid、兼容坑）+ 微信小程序（组件/API/`setData`/性能）各有可演示 demo
- [ ] **项目**：**40WEB** 讲 15 分钟；**BUSINESS** 作副项目；**H5 demo + 小程序 demo** 作移动向证据
- [ ] **面试**：能稳定回答 50+ 道常见 JS / Vue 面试题

### 求职产出物

1. **现有项目面试化**：40WEB 主项目 + BUSINESS 副项目（`interview/project-portfolio.md`）
2. **移动向双 demo**（待你放入仓库后一起评审）：H5 落地页 + 微信小程序业务流
3. **个人知识库**（`notes/` 目录持续更新）
4. **简历**突出：2 年经验 + Vue 深度项目 + H5/小程序可演示物

### 刻意不做（防止分散）

- ❌ 现阶段不主攻 React（入职后再学）
- ❌ 不追新框架 / 不刷短视频式碎片化教程（uni-app 仅作加分摸底，主线仍是原生小程序）
- ❌ 不只看不做——**每天都要写代码**
- ❌ 小程序/H5 demo 未完成前，不海投「H5/小程序主责」类 JD

---

## 三、每日 3 小时时间分配（固定习惯）

### 默认（巩固期）

| 模块 | 内容 | 时长 |
|------|------|------|
| 输入 | 看书 / 官方文档 / 老师图文讲解 | 45–60 分钟 |
| 输出 | 手写代码、实验、项目 | 60–90 分钟 |
| 巩固 | 面试题自测 + 复盘笔记 | 30–45 分钟 |

### 第 4 阶段 · H5/小程序冲刺期（优先用这张）

| 模块 | 内容 | 时长 |
|------|------|------|
| 移动专项 | H5 或小程序写代码 / 改 demo | 90–120 分钟 |
| 面试巩固 | 40WEB 讲稿 / JS·Vue 面试题 | 45–60 分钟 |
| 复盘 | 笔记 3～5 条「能讲给面试官」 | 20–30 分钟 |

### 每日复盘模板（复制到当天笔记底部）

```markdown
## 复盘 · YYYY-MM-DD
- 今天学了：
- 搞懂的一个概念：
- 还不清楚的：
- 明天优先：
```

---

## 四、16 周分阶段路线图

### 第 1 阶段：JavaScript 地基（第 1–4 周）

> **为什么先 JS？** Vue 的响应式、组件通信、异步请求都建立在 JS 原理之上。基础不牢，Vue 永远「似懂非懂」。

| 周 | 主题 | 验收标准 |
|----|------|----------|
| 第 1 周 | 作用域、闭包、var/let/const | 能解释循环 + var 的坑；完成 `js-lab/01-scope-closure` |
| 第 2 周 | 执行上下文、this、call/apply/bind | 能判断 5 段代码的 this 指向 |
| 第 3 周 | 原型链、继承、class | 能画原型链；理解 new 做了什么 |
| 第 4 周 | 异步：Promise、async/await、事件循环 | 能手写简易 Promise；说清宏任务/微任务 |

**阶段项目：** 纯 JS Todo（无框架，模块化，localStorage 持久化）  
**目录：** `js-lab/02-pure-js-todo/`

**推荐资料：**

- 《JavaScript 高级程序设计》第 4 版 — 第 4、10、11、24、27 章
- MDN（查概念用，比短视频可靠）

---

### 第 2 阶段：Vue 3 深度 + 生态（第 5–10 周）

| 周 | 主题 | 验收标准 |
|----|------|----------|
| 第 5 周 | 响应式原理：ref / reactive / computed / watch | 能对比四者使用场景 |
| 第 6 周 | 组件设计：props、emit、插槽、v-model 本质 | 能设计可复用组件 |
| 第 7 周 | Vue Router：守卫、动态路由、权限 | 能实现登录 + 路由权限 |
| 第 8 周 | Pinia 状态管理 | 能说清何时用 Pinia vs 组件 state |
| 第 9 周 | 组合式 API + composable 最佳实践 | 至少写 2 个可复用 composable |
| 第 10 周 | 性能优化 + Vue DevTools 调试 | 知道 v-if/v-show、key、懒加载场景 |

**阶段项目：** 用 **40WEB** 作 Vue 3 代表作（已有：登录鉴权、Pinia、Router 守卫、Vite 工程化）  
**目录：** 本机 `RT9800_NOOS\40WEB` · Study 内 `interview/project-portfolio.md`  
**不再要求** 从零新建 `vue-admin/`

**推荐资料：**

- Vue 3 官方文档（精读两遍）
- 《Vue.js 设计与实现》霍春阳 — 第 1–7 章

---

### 第 3 阶段：工程化 + 浏览器 + 网络（第 11–14 周）

| 周 | 主题 | 验收标准 |
|----|------|----------|
| 第 11 周 | Vite 构建、环境变量、打包分析 | 能解释 dev 和 build 的区别 |
| 第 12 周 | HTTP、跨域、缓存、Cookie/Token | 能画鉴权流程图 |
| 第 13 周 | 浏览器渲染、事件循环、Web 性能指标 | 知道 FCP、LCP 是什么 |
| 第 14 周 | Git 协作、ESLint、Mock 数据 | 能规范提交、解决简单冲突 |

**推荐资料：**

- 《HTTP 权威指南》选读：方法、状态码、缓存、CORS
- Vite 官方文档

---

### 第 4 阶段：求职冲刺（第 15–16 周 · Day 52 起）

#### A. 项目面试化（原计划，继续）

| 天 | 任务 |
|----|------|
| Day 52 | **40WEB** 结构梳理 + 鉴权讲稿（`notes/week15-day52-project-40web.md`） |
| Day 53 | **BUSINESS** 全栈讲稿 + JWT 流程 |
| Day 54–55 | `interview/vue-p0` + `vue-p1`，**每题尽量用 40WEB 举例** |
| Day 56+ | 简历定稿 + 模拟面试 + 投递（H5/小程序岗等双 demo 就绪后再主投） |

| 任务 | 说明 |
|------|------|
| 项目档案 | `interview/project-portfolio.md` + `project-40web-faq.md` |
| 面试题 | 原理题 + 项目追问，能指到具体文件 |
| 模拟面试 | 发「模拟面试」让我按 40WEB 追问 |
| 投递 | Vue 后台向可先投；**H5/小程序向等双 demo** |

#### B. H5 + 微信小程序 · 15 日补齐（2026-09-02 起）

> **为什么加？** 目标 JD 主责是小程序 + H5 适配；你已有 Vue/JS/Vite/HTTP，缺口是**可演示的移动端交付物**。  
> **两个 demo**：你完成后放进仓库（或发路径），一起做代码评审 + 面试话术。

| 日 | 主题 | 验收标准 |
|----|------|----------|
| D1–2 | H5 适配体系 | 说清 rem vs vw；flex/grid 各写一屏布局 |
| D3–4 | 移动兼容坑 | 安全区、`100vh`、点击穿透、微信内置浏览器至少踩过并记下对策 |
| D5–7 | **Demo1 · H5 落地页** | 多机宽（375/414）可看；表单+列表+弹层；懒加载或首屏优化任选 1 |
| D8–10 | 小程序基础 | 生命周期、自定义组件、路由、`wx.request`、登录流程口述 |
| D11–13 | **Demo2 · 小程序业务流** | 列表→详情→提交（可 mock）；能讲 `setData` 注意点 / 分包或为何暂不分包 |
| D14 | Web 安全口述 | XSS、CSRF、Token 存放、HTTPS 各约 30 秒 |
| D15 | 包装投递 | 简历加移动向条目；`project-portfolio` 写入双 demo；开始投 H5/小程序岗 |

**Demo 存放约定（你放入后告诉我路径即可）：**

```
Study/
├── h5-lab/                 ← Demo1：移动 H5（待你添加）
└── miniprogram-lab/        ← Demo2：微信小程序（待你添加）
```

**资料优先：**

- 微信小程序官方文档（指南 + 框架 + API）
- MDN：viewport / flex / 相对单位
- 安全：OWASP 入门级 XSS/CSRF 即可，不深挖

**React：** 拿到 offer 或入职后再启动，不占用主线。

---

## 五、目录结构（学习仓库规范）

```
Study/
├── ROADMAP.md              ← 本文件：总体目标，迷路时先看这个
├── js-lab/                 ← JS 原理实验与小项目
├── vue-lab/                ← Vue 3 实验（CDN）
├── vite-lab/               ← Vite 工程化实验（第 11 周）
│   ├── 01-vite-basics/     ← Day 37
│   ├── 02-env-bundle/      ← Day 38
│   └── 03-week11-review/   ← Day 39
├── web-lab/                ← HTTP / 浏览器 / 网络（第 12 周起）
│   ├── 01-http-basics/     ← Day 40：HTTP 入门
│   ├── 02-cors-cache/      ← Day 41：CORS + 缓存
│   ├── 03-cookie-token/    ← Day 42：Cookie / Token
│   ├── 04-week12-review/    ← Day 43：HTTP 周复盘
│   ├── 05-browser-render/   ← Day 44：浏览器渲染
│   ├── 06-web-vitals/       ← Day 45：FCP / LCP
│   └── 07-week13-review/    ← Day 46：浏览器周复盘
├── git-lab/                ← Git 协作（第 14 周）
│   ├── 01-git-basics/      ← Day 47：Git 入门
│   └── 02-git-branch-conflict/ ← Day 48：分支与冲突
├── eslint-lab/             ← ESLint（第 14 周）
│   └── 01-eslint-basics/   ← Day 49：ESLint 入门
├── mock-lab/               ← Mock 数据（第 14 周）
│   ├── 01-mock-basics/     ← Day 50：Mock 入门
│   └── 02-week14-review/   ← Day 51：工程化周复盘
├── h5-lab/                 ← 第 4 阶段：H5 核心笔记 + 落地页 demo
│   ├── notes-core.md
│   └── 01-landing/
├── miniprogram-lab/        ← 第 4 阶段：小程序核心笔记 + 预约 demo
│   ├── notes-core.md
│   └── demo-booking/
├── notes/                  ← 每日学习笔记（Day 52 起：项目面试化）
│   └── week01-day01-scope-closure.md
└── interview/              ← 面试题 + 项目档案
    ├── project-portfolio.md   ← 40WEB / BUSINESS / 双 demo 定位与简历模板
    └── project-40web-faq.md   ← 主项目追问清单
```

---

## 六、学习原则（防止重蹈「用时才查」）

### 旧习惯 ❌

```
遇到问题 → 搜索 → 复制能用 → 继续
```

### 新习惯 ✅

```
遇到问题 → 搜索 → 能用 → 【追问为什么】→ 写 3 行笔记 → 做小实验验证
```

### 三条铁律

1. **先预测，再运行** — 看代码先猜输出，再 F12 验证
2. **能讲出来才算会** — 每学一个概念，用一句话讲给「未来的面试官」听
3. **项目驱动** — 每阶段必须有可运行的验收项目，不只看理论

---

## 七、中级 vs 初级对照（自我定位用）

| 维度 | 初级（我之前的水平） | 中级（目标） |
|------|---------------------|--------------|
| HTML/CSS | 会写静态页 | 语义化、Flex/Grid 熟练、响应式 |
| JavaScript | 语法 + 简单 DOM | 闭包/原型/异步/事件循环能讲清 |
| Vue | 跟着文档写 CRUD | 组件设计、Pinia、composable、懂原理 |
| 工程 | 会用脚手架 | 懂构建、环境、基础性能优化 |
| 协作 | 较少 | Git 分支、能读他人代码、Review 意识 |

---

## 八、进度追踪

### 当前进度

| 阶段 | 状态 | 备注 |
|------|------|------|
| 第 1 阶段 · JS 地基 | ✅ 已完成 | Day 19 总复盘 12/12 |
| 第 2 阶段 · Vue 深度 | ✅ 已完成 | Day 36 总复盘 12/12 |
| 第 3 阶段 · 工程化 | ✅ 已完成 | Day 51 第 14 周复盘 |
| 第 4 阶段 · 求职冲刺 | 🟡 进行中 | 40WEB 面试化 + H5/小程序 15 日 |
| 第 4B · H5 + 小程序 | 🟡 进行中 | Demo 已脚手架：`h5-lab/01-landing` + `miniprogram-lab/demo-booking` |
| Vue 面试旁路（方案 B） | 🟡 进行中 | 与 Day 54+ 面试题合并推进 |

### 里程碑打卡

- ✅ 完成 `js-lab/01-scope-closure` 全部实验
- ✅ 完成纯 JS Todo 项目（Day 6）
- ✅ 第 1 周复盘自测（Day 7）
- ✅ 手写简易 Promise（Day 8）
- ✅ 手写 bind（Day 9）
- ✅ Class 与继承（Day 10）
- ✅ 深拷贝与浅拷贝（Day 11）
- ✅ 手写 new（Day 12）
- ✅ 防抖与节流（Day 13）
- ✅ 第 2–3 周复盘自测（Day 14）
- ✅ Promise.all / race（Day 15）
- ✅ async/await 串行执行（Day 16）
- ✅ 事件循环进阶输出题（Day 17）
- ✅ 第 4 周复盘自测（Day 18）
- ✅ 第 1 阶段总复盘（Day 19）
- ✅ Vue 3 ref / reactive（Day 20）
- ✅ Vue 3 computed / watch（Day 21）
- ✅ 第 5 周响应式复盘（Day 22）
- ✅ Vue 3 props / emit（Day 23）
- ✅ Vue 3 slot 插槽（Day 24）
- ✅ Vue 3 v-model 本质（Day 25）
- ✅ 第 6 周组件通信复盘（Day 26）
- ✅ Vue Router 入门（Day 27）
- ✅ Vue Router 动态路由与守卫（Day 28）
- ✅ 第 7 周 Router 复盘（Day 29）
- ✅ Pinia 入门（Day 30）
- ✅ 第 8 周 Pinia 复盘（Day 31）
- ✅ composable 入门（Day 32）
- ✅ 第 9 周 composable 复盘（Day 33）
- ✅ 性能优化入门（Day 34）
- ✅ 第 10 周性能 + DevTools 复盘（Day 35）
- ✅ 第 2 阶段总复盘（Day 36）
- ✅ Vite 入门 dev / build（Day 37）
- ✅ 环境变量 + 打包分析（Day 38）
- ✅ 第 11 周 Vite 复盘（Day 39）
- ✅ HTTP 入门（Day 40）
- ✅ 跨域 CORS + 缓存（Day 41）
- ✅ Cookie / Token 鉴权（Day 42）
- ✅ 第 12 周 HTTP 复盘（Day 43）
- ✅ 浏览器渲染入门（Day 44）
- ✅ Web 性能指标 FCP / LCP（Day 45）
- ✅ 第 13 周浏览器与性能复盘（Day 46）
- ✅ Git 协作入门（Day 47）
- ✅ Git 分支与冲突（Day 48）
- ✅ ESLint 入门（Day 49）
- ✅ Mock 数据入门（Day 50）
- ✅ 第 14 周工程化协作复盘（Day 51）
- [ ] Vue 3 官方文档精读第一遍
- [ ] 40WEB 项目面试化（15 分钟讲稿 + FAQ，`interview/project-portfolio.md`）
- [ ] 过 50 道面试题（Vue 旁路：`interview/vue-p0` + `vue-p1` ≈ 60 题）
- [ ] Vue 面试 14 日日程打卡完成（`interview/vue-schedule-14d.md`）
- [ ] **H5 demo** 本地跑通并对照 `h5-lab/notes-core.md` 能口述（`h5-lab/01-landing`）
- [ ] **小程序 demo** 开发者工具导入跑通并口述（`miniprogram-lab/demo-booking`）
- [ ] 安全口述（XSS/CSRF/Token/HTTPS）过一遍
- [ ] 更新简历（含移动向）并开始投递 H5/小程序岗

---

## 九、遇到问题怎么办

1. **概念看不懂** → 回来看 ROADMAP 当前阶段对应周主题，不要跳太远
2. **代码跑不通** → 把代码/报错发给老师（AI），要求逐行讲解
3. **想放弃/想换方向** → 重读「二、终极目标」，只看下一小步，不要想 16 周
4. **工作中遇到 Vue 2 老代码** → 当作练手，对照 Vue 3 文档理解差异
5. **H5/小程序 demo 做完了** → 把路径发过来，做代码评审 + 面试讲稿，再改 `project-portfolio.md`

---

## 十、修订记录

| 日期 | 变更 |
|------|------|
| 2026-07-02 | 初版：基于 2 年经验、Vue 3 主攻、JS 基础补起、每日 3 小时 |
| 2026-07-28 | 增加 Vue 面试旁路方案 B：`interview/vue-*`，与第 3 阶段并行 |
| 2026-08-03 | Day 52 起：取消新建 vue-admin，改用 40WEB + BUSINESS 项目面试化 |
| 2026-09-02 | 第 4 阶段增加 **H5 + 微信小程序 15 日补齐** |
| 2026-09-02 | 落地双 demo + 核心笔记：`h5-lab/`、`miniprogram-lab/` |

---

**迷路时只看三行：**

> 主攻 Vue 3 · 补齐 H5/小程序 demo · 换工作  
> 今天 3 小时 · 移动专项 + 面试巩固 · 双 demo 就绪再海投移动岗
