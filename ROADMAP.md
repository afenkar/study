# 前端中级提升 · 总体目标与路线图

> 创建日期：2026-07-02  
> 预计周期：16 周（约 4 个月）+ 求职补齐  
> 每日投入：3 小时  
> 当前阶段：**第 4 阶段 · 求职冲刺**（**全栈 12 日优先** + 40WEB 面试化；H5/小程序降为加分）

---

## 一、个人现状（勿忘起点）

| 项目 | 情况 |
|------|------|
| 工作经验 | 2 年，管理后台 + 官网，能交付但偏「搜着做」 |
| 技术栈 | Vue 3 为主，少量 Vue 2 维护旧项目 |
| 基础水平 | HTML / CSS / JS / Vue 都能用，**原理已系统补过**（JS/Vue/工程化完成） |
| 学习方式 | 除大学外无系统学习，用时才查文档 → 正用 Study 仓库纠正 |
| 主攻方向 | **Vue 3**；求职主投 **偏前端全栈（Vue + Spring Boot）**；H5/小程序作加分 |
| 已知缺口 | 全栈：MySQL 联表/索引、Maven、Linux、部署口述；移动向：H5/小程序 demo 已有脚手架 |
| 最终目标 | **换工作**：合格中级 Vue + 能讲清 BUSINESS 全栈闭环 |

---

## 二、终极目标（4 个月后应达到）

### 能力标准

- [ ] **JavaScript**：能讲清闭包、this、原型、异步、事件循环；能手写 Promise 简易版
- [ ] **Vue 3**：理解响应式原理；熟练使用组合式 API、Router、Pinia；能设计组件与 composable
- [ ] **工程化**：懂 Vite 构建、环境变量、打包产物；会用 ESLint、Git 分支协作
- [ ] **浏览器与网络**：HTTP、缓存、跨域、Token 鉴权能口头说清楚；XSS/CSRF 各能讲 30 秒
- [ ] **全栈（求职主补）**：BUSINESS 能讲 8 分钟；MySQL 联表 + 简单索引；Maven 打包 + Linux/部署口述
- [ ] **移动向（加分）**：H5 适配 + 微信小程序各有可演示 demo（已有脚手架）
- [ ] **项目**：**投全栈岗 → BUSINESS 提到第一位**；**40WEB** 证明前端深度；H5/小程序按需写
- [ ] **面试**：能稳定回答 50+ 道常见 JS / Vue 面试题；全栈追问不装成 3 年后端

### 求职产出物

1. **现有项目面试化**：40WEB + BUSINESS（`interview/project-portfolio.md`）
2. **全栈补齐**：`fullstack-lab/` 笔记 + BUSINESS 讲稿 + SQL 练习
3. **移动向双 demo**（加分）：`h5-lab/01-landing` + `miniprogram-lab/demo-booking`
4. **简历**：2 年前端 + 独立 Vue3/Spring Boot 闭环；**不要写成「3 年全栈」**

### 刻意不做（防止分散）

- ❌ 现阶段不主攻 React（入职后再学）
- ❌ 不追新框架 / 不刷短视频式碎片化教程
- ❌ 不只看不做——**每天都要写代码**
- ❌ 全栈 12 日未完成前，不要把每天主时间砸在小程序上
- ❌ 小程序/H5 demo 未口述前，不海投「H5/小程序主责」类 JD

---

## 三、每日 3 小时时间分配（固定习惯）

### 默认（巩固期）

| 模块 | 内容 | 时长 |
|------|------|------|
| 输入 | 看书 / 官方文档 / 老师图文讲解 | 45–60 分钟 |
| 输出 | 手写代码、实验、项目 | 60–90 分钟 |
| 巩固 | 面试题自测 + 复盘笔记 | 30–45 分钟 |

### 第 4 阶段 · 全栈冲刺期（当前优先用这张）

| 模块 | 内容 | 时长 |
|------|------|------|
| 全栈专项 | BUSINESS 对照代码 / SQL / 部署笔记 | 90–120 分钟 |
| 面试巩固 | 40WEB 或 JS·Vue 题（可压缩） | 45–60 分钟 |
| 复盘 | 笔记 3～5 条「能讲给面试官」 | 20–30 分钟 |

### 第 4 阶段 · H5/小程序（全栈 12 日完成后再加码）

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
| Day 56+ | 简历定稿 + 模拟面试 + 投递（**全栈岗可先投**；H5/小程序岗等口述就绪） |

| 任务 | 说明 |
|------|------|
| 项目档案 | `interview/project-portfolio.md` + `project-40web-faq.md` |
| 面试题 | 原理题 + 项目追问，能指到具体文件 |
| 模拟面试 | 发「模拟面试」让我按 40WEB 或 BUSINESS 追问 |
| 投递 | **偏前端全栈岗主投**；Vue 纯前端岗可并行；H5/小程序向等口述 |

#### C. 偏前端全栈 · 12 日补齐（2026-09-03 起 · **当前最高优先级**）

> **为什么加？** 全栈 JD（Vue + Java + MySQL + Git/Maven/Linux）与 BUSINESS 最匹配；年限写 3 年可投但话术诚实。  
> **缺口：** SQL 联表/索引、Maven、Linux、部署；BUSINESS 要能指到具体类。  
> **代码仍在本机** `04GUI\xiongy\BUSINESS`；Study 只放脱敏笔记：`fullstack-lab/`。

| 日 | 主题 | 验收标准 |
|----|------|----------|
| C1–2 | BUSINESS 分层 | 能画：页面 → axios → Controller → Service → Mapper → 表 |
| C3–4 | JWT + 联调 | 登录发 token、过滤器、前端存放、401；开发期代理 vs 线上跨域各一句 |
| C5–6 | MySQL 基础 + JOIN | `fullstack-lab/sql-practice.md` 至少 5 条能手写、能解释 |
| C7–8 | 索引与 EXPLAIN | 主键/普通索引场景；「慢查询先看 EXPLAIN」能说 30 秒 |
| C9–10 | Maven + 打包 | 说清 `pom`、`mvn package`、产出 jar |
| C11 | Linux + 部署口述 | `java -jar`、看日志、Nginx 反代静态资源；最好真做一次 |
| C12 | 包装投递 | 简历：**投全栈时 BUSINESS 第一**；自称「2 年前端 + 独立全栈项目」 |

**笔记目录：**

```
Study/fullstack-lab/
├── README.md
├── notes-core.md      ← 先看：JWT / SQL / Maven / 部署口述
└── sql-practice.md    ← 联表练习（对照 BUSINESS 表名脱敏填写）
```

**资料优先：**

- 自己的 `springb/`：Jwt 过滤器、某一个 CRUD Controller
- MySQL：JOIN、索引、EXPLAIN（官方文档或《SQL 必知必会》选读）
- Maven / 部署：官方 Getting Started + 一次本机/服务器打 jar

#### B. H5 + 微信小程序 · 15 日补齐（加分，全栈 12 日让路）

> **定位：** 投移动向 JD 用；全栈主投期间每天最多挤 30 分钟复习 demo，不新开大功能。  
> Demo 已在：`h5-lab/01-landing`、`miniprogram-lab/demo-booking`。

| 日 | 主题 | 验收标准 |
|----|------|----------|
| D1–2 | H5 适配体系 | 说清 rem vs vw；flex/grid 各写一屏布局 |
| D3–4 | 移动兼容坑 | 安全区、`100vh`、点击穿透、微信内置浏览器 |
| D5–7 | **Demo1 · H5 落地页** | 已有：`h5-lab/01-landing`；375/414 跑通 + 口述 |
| D8–10 | 小程序基础 | 生命周期、组件、`setData`、登录口述 |
| D11–13 | **Demo2 · 小程序业务流** | 已有：`miniprogram-lab/demo-booking` |
| D14 | Web 安全口述 | XSS、CSRF、Token、HTTPS |
| D15 | 包装 | 仅投 H5/小程序岗时写入简历 |

**资料优先：** `h5-lab/notes-core.md`、`miniprogram-lab/notes-core.md`

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
├── fullstack-lab/          ← 第 4C：全栈笔记（对照本机 BUSINESS）
│   ├── notes-core.md
│   └── sql-practice.md
├── h5-lab/                 ← 第 4B：H5 核心笔记 + 落地页 demo
│   ├── notes-core.md
│   └── 01-landing/
├── miniprogram-lab/        ← 第 4B：小程序核心笔记 + 预约 demo
│   ├── notes-core.md
│   └── demo-booking/
├── notes/                  ← 每日学习笔记（Day 52 起：项目面试化）
│   └── week01-day01-scope-closure.md
└── interview/              ← 面试题 + 项目档案
    ├── project-portfolio.md   ← 40WEB / BUSINESS（全栈岗第一）/ 双 demo
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
| 第 4 阶段 · 求职冲刺 | 🟡 进行中 | 全栈 12 日优先 + 40WEB 面试化 |
| 第 4C · 偏前端全栈 | 🟡 待启动 | `fullstack-lab/` + BUSINESS 讲稿 |
| 第 4B · H5 + 小程序 | 🟡 让路中 | Demo 已有；全栈完成后再加码 |
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
- [ ] **BUSINESS 全栈讲稿**（8 分钟 + JWT 流程图，`fullstack-lab/notes-core.md`）
- [ ] **MySQL**：`fullstack-lab/sql-practice.md` 5 条 JOIN + 索引口述
- [ ] **Maven + Linux 部署**口述（最好打一次 jar）
- [ ] Vue 3 官方文档精读第一遍
- [ ] 40WEB 项目面试化（15 分钟讲稿 + FAQ，`interview/project-portfolio.md`）
- [ ] 过 50 道面试题（Vue 旁路：`interview/vue-p0` + `vue-p1` ≈ 60 题）
- [ ] Vue 面试 14 日日程打卡完成（`interview/vue-schedule-14d.md`）
- [ ] **H5 demo** 本地跑通并对照 `h5-lab/notes-core.md` 能口述
- [ ] **小程序 demo** 开发者工具导入跑通并口述
- [ ] 安全口述（XSS/CSRF/Token/HTTPS）过一遍
- [ ] 更新简历：全栈岗 BUSINESS 第一；开始主投偏前端全栈 JD

---

## 九、遇到问题怎么办

1. **概念看不懂** → 回来看 ROADMAP 当前阶段对应周主题，不要跳太远
2. **代码跑不通** → 把代码/报错发给老师（AI），要求逐行讲解
3. **想放弃/想换方向** → 重读「二、终极目标」，只看下一小步，不要想 16 周
4. **工作中遇到 Vue 2 老代码** → 当作练手，对照 Vue 3 文档理解差异
5. **H5/小程序 demo 做完了** → 把路径发过来，做代码评审 + 面试讲稿，再改 `project-portfolio.md`
6. **全栈卡住** → 打开 `fullstack-lab/notes-core.md`，对照 BUSINESS 源码填空，不要另起一套后端

---

## 十、修订记录

| 日期 | 变更 |
|------|------|
| 2026-07-02 | 初版：基于 2 年经验、Vue 3 主攻、JS 基础补起、每日 3 小时 |
| 2026-07-28 | 增加 Vue 面试旁路方案 B：`interview/vue-*`，与第 3 阶段并行 |
| 2026-08-03 | Day 52 起：取消新建 vue-admin，改用 40WEB + BUSINESS 项目面试化 |
| 2026-09-02 | 第 4 阶段增加 **H5 + 微信小程序 15 日补齐** |
| 2026-09-02 | 落地双 demo + 核心笔记：`h5-lab/`、`miniprogram-lab/` |
| 2026-09-03 | 第 4C：**偏前端全栈 12 日**（当前最高优先级）；H5/小程序让路 |

---

**迷路时只看三行：**

> 主投偏前端全栈 · BUSINESS 讲透 · 40WEB 证深度  
> 今天 3 小时 · SQL/JWT/部署 · H5 加分不抢主线
