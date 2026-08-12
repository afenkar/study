# 40WEB 项目 · 追问清单

> 主项目：`Z:\RTC\01_RT9000\01MAC\RT9800_NOOS\40WEB`（已按源码核对）  
> 每题用 **40WEB 真实代码** 回答。档案见 `interview/project-portfolio.md`  
> **用法：** 先盖住口述稿闭卷说 → 对照 → 勾选。

---

## 源码已确认（无需再猜）

核对路径：`RT9800_NOOS\40WEB`（含 `navigationAbort` / `tabNavigationAbort` 的那份）。

| 项 | 结论（来自代码） |
|----|------------------|
| Cookie / httpOnly | **非 httpOnly**。`utils/auth.js` 用 `js-cookie` 的 `Cookies.get/set`，前端可读 |
| Cookie key / 请求头 | key = **`Root-Token`**；请求头 **`X-Token`**（`request.js`）。README 里写的 `Admin-Token` 已过时，面试用代码为准 |
| `.env` | 主变量 **`VITE_BACKEND_API_BASE_URL`**（现多为 `/cgi`）；另有 `VITE_LOG_LEVEL`、`VITE_API_TRACE`、`VITE_ALT_UPLOAD_PORT=1120` |
| lint / pre-commit | 有 `npm run lint` / `format`，**无 husky / lint-staged / CI 强制** |
| mock 目录 | **仓库里没有 `mock/`**；仅语言包残留 mockjs 文案。联调靠 `.env` 指 `/cgi` 或设备 IP |
| composables | **无 `src/composables/`**；取消请求等在 `utils/` |
| Hash 路由 | `createWebHashHistory` ✅ |
| ensureAuth / abort | `router/index.js` beforeEach + `user.ensureAuth` + `resetNavigationRequests` ✅ |
| i18n | `src/lang/zh.js`、`en.js`（另有 es/ja），不是 `lang/zh/` 目录 |
| Upgrade 页现状 | 固件升级：打开设备 `/ul.html`（iframe）；基站包：新窗口打开 **1120** 端口 `/ul.html`；页内 `.7z` 弹窗上传**已停用**；另有 `upgradeMips`、改密、重启、备份 |

---

## 经历已确认（C / E / H）

| # | 你的口径 |
|---|----------|
| **C** | 用户 = **客户工程师**（浏览器访问设备做配置/监控） |
| **E** | 前端 build + **虚拟机里用 Eclipse 打固件包** 都参与；dist 由设备 Boa 托管 |
| **H** | Upgrade：主要维护；个人侧重 **1120 基站升级跳转**、**upgradeMips**；别把已停用的页内 `.7z` 弹窗当现行方案 |

---

## 项目概述

### 1. 这个项目做什么？用户是谁？
- [ ]

**口述稿：**  
这是 RT9800 系列设备的嵌入式 Web 网管前端。设备上提供 Web 服务，**客户工程师**用浏览器访问设备 IP，做登录、参数/载波配置、固件升级、状态监控等。我负责 Vue3 前端。

**要点：** 单机/自组网设备 Web 网管 · 客户工程师 · 配置与监控。

---

### 2. 为什么用 Hash 路由而不是 History？
- [ ]

**口述稿：**  
设备里 Web 服务是 **Boa**，轻量静态服务器，不像 Nginx 能配 `try_files` 把任意路径回退到 `index.html`。  
History 下刷新 `/home/mac1`，Boa 会当真实文件找 → **404**。  
Hash 是 `/#/home/mac1`，`#` 后面不发给服务器，刷新始终打 `/`，Boa 只回 `index.html`，前端路由接管。所以我们用 `createWebHashHistory`。

**要点：** Boa 无 History 回退 → Hash 刷新不 404。  
**易错：** 刷新后仍登录 **不是** Hash 的功劳，是 Cookie + ensureAuth（见 Q9）。

---

### 3. 技术栈为什么选 Vue 3 + Vite + Pinia？
- [ ]

**口述稿：**  
旧网管是 Vue2 + Vuex，维护成本高。新项目用 Vue3 + Vite + Pinia：组合式 API 好按功能聚合，Pinia 比 Vuex 轻、无 mutations；Vite 开发体验好。整体是主流稳定方案，方便迭代。

**要点：** 替代 Vue2 老栈 · 可维护 · Pinia/Vite 工程体验。

---

## 登录与 Token

### 4. Token 存在哪？`getToken` / `setToken` 怎么实现？
- [ ]

**口述稿：**  
Token 存在 Cookie，key 是 **`Root-Token`**。`utils/auth.js` 用 **`js-cookie`**：`Cookies.get` / `Cookies.set` / `Cookies.remove` 封装成 `getToken` / `setToken` / `removeToken`。  
axios 在 `utils/request.js` 请求拦截里把 token 写到请求头 **`X-Token`**。

**要点：** js-cookie · `Root-Token` · 头 `X-Token` · **前端可读（非 httpOnly）**。

---

### 5. 登录流程：`Login.vue` → API → store 发生了什么？
- [ ]

**口述稿：**  
登录页调 `userStore.login` → 打登录 API → 后端返回 token → `setToken` 写入 Cookie → 再调 `getInfo` 拉设备信息、roles → 写入 `user` store，同时 `globalValue.syncFromRoles` 同步机型/能力相关字段。然后进业务页。

**要点：** login → setToken → getInfo → user + globalValue.syncFromRoles。

---

### 6. 401 / Token 失效怎么处理？`resetToken` 做什么？
- [ ]

**口述稿：**  
响应拦截器里遇到 401 或登录失效：提示并跳回登录。  
`resetToken` 清 Cookie token、清 store 里的 token/roles，并让 `globalValue.syncFromRoles([])` 清掉权限相关全局状态，避免脏数据留在内存。

**要点：** 拦截器跳登录 · resetToken 清 Cookie + store + globalValue。

---

### 7. Cookie vs localStorage 存 Token，你们为什么这样选？
- [ ]

**口述稿：**  
我们用 Cookie + `js-cookie`，**不是 httpOnly**（前端要读出来塞进 `X-Token` 头）。  
选型上主要是 **沿用旧版网管习惯**，和历史方案一致，改动小。  
和 localStorage 比，都是前端可读写；我们没靠 httpOnly 做防 XSS，安全上更依赖短时失效、401 清票、以及设备网络环境本身。面试别吹 httpOnly。

**要点：** 沿用历史 · 非 httpOnly · 前端读 Cookie 填 `X-Token`。

---

## 路由与权限

### 8. `router.beforeEach` 里做了什么？
- [ ]

**口述稿：**  
路由 path 真的变了时，先 `resetNavigationRequests()`，把上一页还在飞的请求 abort 掉。  
如果有 token，就 `ensureAuth()` 拉/恢复用户信息；失败则 `resetToken` 回登录。  
鉴权和「切页取消请求」都挂在这个守卫里。

**要点：** abort 旧请求 → ensureAuth → 失败 resetToken。

---

### 9. 刷新页面后为什么还能保持登录？
- [ ]

**口述稿：**  
**不是因为 Hash。**  
刷新后 Pinia 内存没了，但 Cookie 里 `Root-Token` 还在 → `beforeEach` 里 `getToken()` 读得到 → `ensureAuth()` 发现 roles 空了就调 `getInfo()` 写回 store，所以仍是登录态。

**要点：** Cookie 存活 + ensureAuth/getInfo 重建 store。

---

### 10. `authReadyPromise` 是干什么的？
- [ ]

**口述稿：**  
刷新后 roles 为空需要 `getInfo`。守卫短时间可能触发多次，如果每次都打会并发重复。  
`user` store 里用 **同一个 `authReadyPromise`**：第一次创建请求，后续共用；roles 已有就直接 resolve。这样只发一次 getInfo。

**要点：** 共用 Promise · 防并发重复 getInfo。

---

### 11. `permission` store 和 `user.roles` 什么关系？
- [ ]

**口述稿：**  
`user.roles` 来自 `getInfo`，表示当前账号/设备能力。  
`permission` store 预留了按 roles 过滤动态路由。  
但当前 40WEB **路由表是静态写死在 router 里的**，权限主要靠 roles + `globalValue.syncFromRoles` 控制页面/字段展示。

**要点：** roles 是真相；permission 预留；现网静态路由 + 展示控制。

---

## 状态管理（Pinia）

### 12. 哪些放 Pinia，哪些放组件 local state？
- [ ]

**口述稿：**  
跨页共享的放 Pinia：user（token/roles）、globalValue（机型/能力）、settings、tagsView 等。  
只在本页用的放组件：表单临时输入、表格某行编辑态、弹窗开闭。

**要点：** 共享 → Pinia；局部 UI → 组件。

---

### 13. `user` / `settings` / `globalValue` 各管什么？
- [ ]

**口述稿：**  
user：登录态、用户信息、roles、`ensureAuth`。  
settings：主题、布局类配置。  
globalValue：全局业务状态（机型、能力位等），`syncFromRoles` 从 roles 同步过来，很多配置页靠它决定展示。

**要点：** user 鉴权 · settings 外观 · globalValue 业务能力。

---

### 14. Pinia 和 Vuex（30_WEB）你会怎么对比？
- [ ]

**口述稿：**  
30_WEB 是 Vue2 + Vuex + Options。Vuex 有 mutations，模块要 namespaced。  
40WEB 用 Pinia：无 mutations，多 store 自然拆，和 Composition 更搭。Vue3 新项目官方更推 Pinia。

**要点：** 无 mutations · 多 store · Vue3 推荐；旧项目继续 Vuex。

---

## 请求与工程化

### 15. axios 封装在哪？拦截器做了啥？
- [ ]

**口述稿：**  
封装在 `utils/request.js`。  
请求拦截：挂 `X-Token`，并合并 `navigationAbort` 的 `signal`。  
响应拦截：处理业务 code、401 走登出/跳登录；被 abort 的请求用 `shouldSuppressHttpError` **不弹 toast**，避免切页刷屏报错。

**要点：** Token · abort signal · 401 · 静默 abort 错误。

---

### 16. `.env.development` / `.env.production` 各配什么？
- [ ]

**口述稿：**  
两边都配 **`VITE_BACKEND_API_BASE_URL`**，现在常见是同源 **`/cgi`**；开发也可改成 `http://设备IP/cgi` 直连。  
另外还有日志级别 `VITE_LOG_LEVEL`、请求跟踪 `VITE_API_TRACE`，以及升级相关的 **`VITE_ALT_UPLOAD_PORT`（1120）**。用 `import.meta.env` 读取，改完要重启 dev。

**要点：** `/cgi` 基地址 · 分环境 · 1120 上传端口。

---

### 17. `npm run build` 产物怎么用？
- [ ]

**口述稿：**  
前端 `npm run build` / `vite build` 打出 `dist`，由设备上的 **Boa** 托管静态资源。  
发布时我还会在**虚拟机服务器里用 Eclipse 把前后端打进固件包**，再给设备升级。所以不只交前端产物，固件打包链路我也走得通。

**要点：** dist → Boa · 虚拟机 Eclipse 打固件 · 前后端一起进包。

---

### 18. ESLint + Prettier 怎么配？提交前跑 lint 吗？
- [ ]

**口述稿：**  
有 `eslint.config.js`（flat）和 Prettier，脚本 `npm run lint`、`lint:check`、`format`。  
**没有** husky / lint-staged 强制 pre-commit，日常是按需跑，靠自觉和 Code Review。

**要点：** 已配置 · 按需跑 · 无强制门禁。

---

### 19. mock 目录什么时候用？和真设备 API 怎么切换？
- [ ]

**口述稿：**  
当前仓库 **没有独立 mock 目录**；开发联调直接把 `VITE_BACKEND_API_BASE_URL` 指到 `/cgi` 或设备 IP，走真接口。  
早期/别的分支若用过页面内假数据，那是临时手段，不是现在主路径。别说「我们有一套 mock 服务」——源码里没有。

**要点：** 无 mock 目录 · env 切真机 `/cgi`。

---

## 业务与难点

### 20. Mac 配置页最复杂的是什么？
- [ ]

**口述稿：**  
最复杂是 **norm 表格**。别的页多是表单；norm 要点击进编辑态、按模式控制能不能改，还要 **按设备型号切换不同表头**。用 v-if 按机型挂载，表头文案用 computed + i18n 的 `t()` 派生。

**要点：** 编辑态 + 机型表头 + i18n computed。

---

### 21. Upgrade 升级流程前端要注意什么？
- [ ]

**口述稿（按源码 + 你的职责）：**  
升级页我主要是维护，个人更熟两块：

1. **1120 基站升级**：点上传包会 `window.open` 到 `VITE_ALT_UPLOAD_PORT`（默认 1120）的 `/ul.html`，跨端口打开设备上传页，要注意 hostname/端口和 CORS 配置。  
2. **upgradeMips**：调 `getServDat('upgradeMips', ...)`，成功后再按环境跳到对应地址（内网 `10.7.81.*` 有特殊目标，否则常见 `:9728`）。

另外页面上还有 iframe 打开 `/ul.html` 的固件升级入口，以及改密、重启、备份。以前页内弹窗传 `.7z` 的流程**已停用**，面试按现行 1120 / upgradeMips 讲就行。

**要点：** 主维护 · 突出 1120 + upgradeMips · 旧弹窗勿提。

---

### 22. 路由切换时 `resetNavigationRequests` 解决什么问题？
- [ ]

**口述稿：**  
设备性能有限，快速切页会堆很多未完成请求，后端排队超时，前端满屏报错。  
`navigationAbort.js` 对旧请求 `abort()`，新请求绑新的 `AbortController.signal`；`request.js` 里 abort 错误走 `shouldSuppressHttpError`，不再弹 toast。细节见 Q24。

**要点：** 切页 abort · 降压 · 静默取消错误。

---

### 23. 国际化 vue-i18n 怎么组织的？
- [ ]

**口述稿：**  
语言包在 `src/lang/`，主要是 **`zh.js` / `en.js`**（还有 es/ja）。切换语言改 locale。  
像 norm 表头这种依赖文案的配置，用 computed 包一层 `t()`，locale 一变列配置自动更新。

**要点：** `lang/zh.js` · `en.js` · computed + t()。

---

### 24. 说一个你踩过的 bug 和怎么修的。
- [ ]

**口述稿（完整版，面试主打）：**  
**现象：** Mac 子页 / Tab 切很快时，上一页 list 还没返回，新页又发请求，设备扛不住，频繁 timeout 弹窗。  
**原因：** 旧请求没取消，超时或乱序响应仍走统一错误提示。  
**修复：**  
① `beforeEach` 里 `resetNavigationRequests()`；  
② `request.js` 默认带 navigation 的 abort signal；  
③ Tab 内 list 用 `tabNavigationAbort.js` 的 `beginTabRequest(tabKey)`，只取消同 tab 上一次；  
④ `httpError.js` 里 abort/导航静默期 `shouldSuppressHttpError` 不提示。  
**结果：** 切页不再满屏超时，后端压力也小了。

**要点：** 现象→原因→四步修复→结果（能报文件名）。

---

### 25. 为什么用 computed 而不是 method？（举项目例子）
- [ ]

**口述稿：**  
method 每次渲染都跑；computed 有依赖缓存，依赖不变不算。  
项目里 **norm 表头国际化**：locale 或机型变了才重算列配置，模板直接用 computed 更干净。

**要点：** 缓存 · norm 表头例子。

---

### 26. 有没有抽 composable？没有的话你会抽啥？
- [ ]

**口述稿：**  
目前 **没有** `composables/` 目录，取消请求这类逻辑放在 `utils/`（`navigationAbort`、`tabNavigationAbort`、`httpError`）。  
若重构会抽：`useNormTable`（机型表头 + 编辑态 + 提交）、`useTabListFetch`（beginTabRequest + list）。登录态已有 `userStore.ensureAuth`，继续放 store 即可。

**要点：** 现状 utils · 重构方向 useNormTable / useTabListFetch。

---

### 27. 大表单 / 多 Tab 有没有性能考虑？
- [ ]

**口述稿：**  
有。不同机型表头差异大，用 **v-if** 只挂载当前机型那一套。  
不需要保留输入的场景就不包 keep-alive。列表请求配合 abort，避免无效更新和误报错。

**要点：** 机型用 v-if · 慎用 keep-alive · 请求可取消。

---

## 回答方式（模板）

> **结论一句** → **在项目里哪（文件/函数）** → **为什么这样** → **还可优化啥**

---

## 自测

| 题号范围 | 能流利答 | 需回看代码 |
|----------|----------|------------|
| 1–7 登录 | ☐ | ☐ |
| 8–14 路由/状态 | ☐ | ☐ |
| 15–19 工程化 | ☐ | ☐ |
| 20–27 业务/原理 | ☐ | ☐ |
