# 项目档案 

> 代码在 `Z:\RTC\...`，Study 仓库只放**脱敏后的面试话术与结构**。  
> **投全栈岗：** BUSINESS 提到第一位。**投纯前端：** 40WEB 第一。  
> 全栈笔记：`fullstack-lab/notes-core.md`

---

## 项目一览

| 优先级 | 项目 | 本地路径 | 技术栈 | 简历角色 |
|--------|------|----------|--------|----------|
| ⭐ 全栈主 / 前端副 | 公司官网（前后端） | `04GUI\xiongy\BUSINESS` | vue3 + Spring Boot + JWT | **全栈从 0 到 1** |
| ⭐ 前端主 / 全栈副 | RT9800 单机 Web 网管 | `01MAC\RT9800_NOOS\40WEB` | Vue 3.5 + Vite + Pinia + Ant Design Vue + ESLint + i18n | **Vue 3 深度** |
| 📱 加分 | **H5 落地页 demo** | `Study/h5-lab/01-landing` | rem + flex/grid、表单/弹层、懒加载 | **H5/移动向** |
| 📱 加分 | **微信小程序 demo** | `Study/miniprogram-lab/demo-booking` | 列表→详情→提交、自定义组件 | **小程序向** |
| 亮点 | 远程网管 / 地图可视化 | `04GUI\xiongy\RE_base` | Vue 3 + Vite + Pinia + **AntV L7** + i18n | **图表 / GIS** |
| 补充 | 旧版网管维护 | `04GUI\30_WEB` | Vue 2 + Vuex + Element UI | 遗留维护 |

**不再新建 `Study/vue-admin`**——用现有项目深挖 + 面试化。  
**全栈 12 日：** `ROADMAP.md` 第 4C · `fullstack-lab/`。H5/小程序让路，不抢每天主时间。

---

## 主项目 · 40WEB（RT9800 网管）

### 技术栈（package.json 摘要）

- Vue 3.5 · Vite 5 · Pinia · Vue Router 4（Hash）
- Ant Design Vue 4 · axios · vue-i18n
- ESLint 10 + Prettier · mock 目录

### 目录结构（面试可画）

```
src/
├── api/           # 接口封装
├── router/        # 路由 + beforeEach 鉴权
├── stores/        # Pinia：user / permission / settings …
├── views/         # Login · home · Mac · Upgrade · base …
├── utils/         # auth · request · routeNavGate …
└── components/
```

### 核心模块（按重要程度）

| 模块 | 路径 | 可讲点 |
|------|------|--------|
| 登录鉴权 | `views/Login.vue` + `stores/user.js` | Token 存取、`login` / `getInfo` / `logout` |
| 路由守卫 | `router/index.js` | `beforeEach` → `ensureAuth` → 失败 `resetToken` |
| 权限/角色 | `stores/permission.js` + `user.roles` | 刷新后 roles 恢复、与全局状态联动 |
| 设备 MAC 配置 | `views/Mac/` | 业务复杂度、表单/状态 |
| 升级 | `views/Upgrade/` | 设备升级流程 UI |
| 首页/控制 | `views/home/` | 嵌套路由 children |

### 鉴权流程（15 分钟讲稿骨架）

```
1. 业务背景：嵌入式设备 Web 网管，浏览器访问设备 IP
2. 技术选型：Vue3 + Vite + Pinia，Hash 路由方便部署
3. 登录：Login → api/user login → setToken → userStore
4. 进页：beforeEach → getToken → ensureAuth → getInfo 拉 roles
5. 刷新：token 在 cookie/local，ensureAuth 防重复请求（authReadyPromise）
6. 失败：resetToken → 重定向登录
7. 工程化：ESLint/Prettier、env 分环境、mock 联调前开发
```

### 与 Study 课程对应

| Study | 40WEB 里 |
|-------|----------|
| Day 27–28 Router | `router/index.js` 守卫 |
| Day 30–31 Pinia | `stores/user.js` 等 |
| Day 37–38 Vite | `vite.config.js`、`.env.*` |
| Day 42 Token | `utils/auth.js` |
| Day 49 ESLint | `eslint.config.js`、`npm run lint` |
| Day 50 Mock | `mock/` 目录 |

### 待你填写的 3 个「难点/亮点」（Day 52 作业）

1. （例：刷新后 roles 恢复 / 路由切换 abort 请求）
2. 
3. 

---

## 亮点项目 · RE_base（远程网管 / 地图）

### 技术栈

- Vue 3 + Vite + Pinia + Ant Design Vue
- **@antv/l7** 地图可视化（`MapComponent.vue`、`TopGis.vue`）
- 设备管理、告警、安全等模块

### 面试怎么讲（3 分钟）

> 远程网管平台，除常规 CRUD 外，重点做了 **GIS 地图展示设备/基站**，用 AntV L7 渲染，配合 axios 拉实时数据。和 40WEB（单机网管）形成「远程 vs 单机」两条产品线对比。

### 和 40WEB 分工

| | 40WEB | RE_base |
|--|-------|---------|
| 场景 | 单设备本地 Web 管理 | 远程集中网管 |
| 亮点 | 参数配置、升级、norm 表格 | **地图、图表、多设备** |

---

### 结构

```
BUSINESS/
├── vue3/          # 前端：Vue 3 + Vite + Pinia + Ant Design Vue
│   └── src/view/front/*   # 官网展示
│   └── src/view/manage/*  # 后台：产品/新闻/方案/账号…
└── springb/       # 后端：Spring Boot + JWT
    └── controller/  JwtTokenController · Product · News …
```

### 可讲点

- **全栈**：前端管理 + 官网展示 + 后端 REST + JWT 过滤器
- **模块**：产品 CRUD、新闻、方案、用户登录（按你实际负责写）
- **和 40WEB 分工**：40WEB 偏设备网管复杂度；BUSINESS 偏 CMS + 全栈闭环

### 待你填写（第 4C 作业）

- 是否已上线：是 / 否
- 你最熟的 2 个后台页：________、________
- JWT 过滤器类名：________
- 一张核心表名（脱敏）：________
- 分层对照表：填 `fullstack-lab/notes-core.md` 第二节

---

## 补充 · 30_WEB（维护）

- vue-element-admin 系 Vue 2 项目
- **简历一行**：维护遗留 Vue2 网管，迭代功能、修 bug
- **面试**：被问到 Vue2/3 差异时可举例，不作主打

---

## 简历项目描述模板（脱敏）

### 投全栈岗 · 项目一 · 公司官网与内容管理

- 独立完成官网前台与管理后台（Vue3）及 Spring Boot 后端，JWT 鉴权与接口联调
- 负责产品/新闻/方案等模块的库表与 CRUD，前端对接 REST
- （补）Maven 打包 / Nginx 或 jar 部署按实际填写

### 投全栈岗 · 项目二 · RT9800 设备 Web 网管

- 负责 Vue 3 + Vite 设备管理前端，登录鉴权、配置、升级等模块
- Pinia + Router 守卫，工程化（ESLint、多环境、mock）

### 投纯前端岗 · 项目一 · RT9800 设备 Web 网管（主）

- 负责 Vue 3 + Vite 设备管理前端，含登录鉴权、设备配置、升级等模块
- 使用 Pinia 管理用户/权限状态，Router 守卫 + Token 刷新恢复
- 配置 ESLint/Prettier、多环境构建，mock 数据支持并行开发

### 投纯前端岗 · 项目二 · 公司官网与内容管理（副）

- 独立完成官网前端（Vue3）与 Spring Boot 后端，JWT 鉴权
- 实现产品/新闻/方案等内容管理与前台展示

---

## 面试自检清单

- [ ] BUSINESS 能讲 **8 分钟**（分层图 + JWT + 1 个 CRUD + 跨域）
- [ ] `fullstack-lab/sql-practice.md` 5 题写完
- [ ] Maven / Linux 部署能口述
- [ ] 40WEB 能讲满 **15 分钟**（背景→架构→鉴权→1 个业务模块→难点）
- [ ] H5 demo 能讲 **3–5 分钟**（投移动岗时）
- [ ] 小程序 demo 能讲 **5–8 分钟**（投移动岗时）
- [ ] 每个技术点能指到**具体文件/函数**
- [ ] `interview/project-40web-faq.md` 高频题过一遍
- [ ] 简历：全栈岗 BUSINESS 第一；年限不写成 3 年全栈
