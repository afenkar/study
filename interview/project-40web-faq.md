# 40WEB 项目 · 追问清单

> 主项目 RT9800 网管。每题用 **40WEB 真实代码** 回答，不要只背概念。  
> 档案详见 `interview/project-portfolio.md`

---

## 项目概述

1. 这个项目做什么？用户是谁？
单机设备 Web 网管，客户通过浏览器改参数、升级固件
2. 为什么用 **Hash 路由**（`createWebHashHistory`）而不是 History？
设备里 Web 服务用的是 **Boa**（轻量静态服务器），不像 Nginx 能配 `try_files` 把任意路径回退到 `index.html`。History 模式下刷新 `/home/mac1` 这类路径，Boa 会去找真实文件 → **404**。Hash 模式下 URL 是 `/#/home/mac1`，`#` 后面变化不发给服务器，刷新始终请求 `/`，Boa 只返回 `index.html`，由前端路由接管，所以不会报错。
3. 技术栈为什么选 Vue 3 + Vite + Pinia？
主流稳定方案，方便迭代；旧项目是 Vue2 维护成本高。组合式 API、Pinia 更轻，和 Vue2 老项目比可维护性更好。

---

## 登录与 Token

4. Token 存在哪？`getToken` / `setToken` 怎么实现？
存在 Cookie，key 是 `Root-Token`，读写封装在 `utils/auth.js`；axios 请求头里用 `X-Token` 带上。
5. 登录流程：`Login.vue` → API → store 发生了什么？
Login 调 `userStore.login` → 后端返回 token → `setToken` 写 Cookie → 再调 `getInfo` 拉设备信息、roles → 写入 userStore 和 globalValue。
6. 401 / Token 失效怎么处理？`resetToken` 做什么？
拦截器里 401 / 登录失效码 → 提示并跳登录；`resetToken` 清 Cookie、清 token/roles、清 globalValue 里的权限相关状态。
7. Cookie vs localStorage 存 Token，你们为什么这样选？
Cookie 可设 httpOnly 更安全；我们沿用历史方案，和旧版网管一致。

---

## 路由与权限

8. `router.beforeEach` 里做了什么？（`ensureAuth`、`resetNavigationRequests`）
路由变化且 path 真的变了时，先 `resetNavigationRequests()` 取消上一页还在飞的请求；有 token 则 `ensureAuth()` 拉/恢复用户信息，失败则 `resetToken` 回登录。
9. 刷新页面后为什么还能保持登录？`ensureAuth` + `getInfo` 流程？
**不是因为 Hash**。Cookie 里 token 刷新后还在 → `beforeEach` 里 `getToken()` 能读到 → `ensureAuth()` 发现 roles 空了就调 `getInfo()` 写回 store，所以仍是登录态。
10. `authReadyPromise` 是干什么的？（防并发重复 getInfo）
刷新后 roles 为空需要调 `getInfo`；若守卫短时间触发多次，**共用同一个 Promise**，只发一次请求，避免并发重复 getInfo；roles 已有则直接 resolve 不再请求。
11. `permission` store 和 `user.roles` 什么关系？
`user.roles` 来自 `getInfo`，表示当前账号/设备能力；`permission` store 预留 **按 roles 过滤动态路由**（`generateRoutes` + `filterAsyncRoutes`）。当前 40WEB **路由表是静态写死在 router 里的**，权限主要靠 roles + `globalValue.syncFromRoles` 控制页面/字段展示；`changeRoles` 是扩展能力。

---

## 状态管理（Pinia）

12. 哪些放 Pinia，哪些放组件 local state？
**Pinia**：user（token/roles）、globalValue（机型/能力开关）、settings（主题布局）、tagsView 等跨页共享。**组件内**：表单输入临时值、表格某一行的编辑态、弹窗开闭等只在本页用的 UI 状态。
13. `user` / `settings` / `globalValue` 各管什么？
user：登录态、用户信息、roles；settings：主题/布局类配置；globalValue：全局业务状态（机型、能力位、getInfo 同步下来的字段）。
14. Pinia 和 Vuex（30_WEB）你会怎么对比？
Pinia 是 Vue3 官方推荐，无 mutations、按 store 模块拆、TS 友好；Vuex 适合 Vue2 老项目，30_WEB 就是 Vuex + Options API。

---

## 请求与工程化

15. axios 封装在哪？拦截器做了啥（Token 头、错误统一处理）？
`utils/request.js`：请求拦截挂 `X-Token`、合并 `navigationAbort` 的 signal；响应拦截处理业务 code、401 跳登录；被 abort 的超时不弹 toast（`shouldSuppressHttpError`）。
16. `.env.development` / `.env.production` 各配什么？
主要配 `VITE_BACKEND_API_BASE_URL` 等 API 地址；开发/生产指向不同后端。联调前曾在页面里写假数据，后续可抽到 mock 目录。
17. `npm run build` 产物怎么用（设备里怎么部署）？
Ubuntu 环境把前后端一起打包，随设备固件上传升级；Boa 托管 dist 静态资源。
18. ESLint + Prettier 怎么配？提交前跑 lint 吗？
项目已配 `eslint.config.js` + Prettier，脚本 `npm run lint` / `format`；日常开发可按需跑，Study 里系统补过 lint 规则。
19. mock 目录什么时候用？和真设备 API 怎么切换？
mock 用于后端未就绪时前端自测；真机联调用 `.env` 里的 API 地址指向设备后端。两者是 **假数据来源** vs **请求地址** 的区别。

---

## 业务与难点（结合你填的 3 亮点）

20. Mac 配置页最复杂的是什么？
**norm 表格**：其他页多是表单；表格要点击进编辑态、按模式控制可编辑，还要**按设备型号切换不同表头**（配合 v-if + computed 国际化表头）。
21. Upgrade 升级流程前端要注意什么？
上传正确类型/版本的升级包到对应 API；上传成功后触发升级请求；注意超时、进度提示和失败回滚提示。
22. 路由切换时 `resetNavigationRequests` 解决什么问题？
设备性能有限，快速切页会堆很多未完成请求，后端排队导致超时、前端满屏报错。`navigationAbort.js` 里对旧请求 `abort()`，新请求绑新的 `AbortController.signal`；`request.js` 里 abort 的错误用 `shouldSuppressHttpError` **不再弹 toast**（见 Q24）。
23. 国际化 vue-i18n 怎么组织的？
中英文两套，`lang/zh`、`lang/en`；切换语言改 locale；表头等用 computed + `t()` 派生。
24. 说一个你踩过的 bug 和怎么修的。
**现象**：Mac 子页 / Tab 切很快时，上一页 list 请求还没返回，新页又在发请求，设备端扛不住，频繁 **timeout 弹窗**，体验很差。  
**原因**：旧请求没取消，响应乱序或超时仍走统一错误提示。  
**修复**：① `router.beforeEach` 里 `resetNavigationRequests()`；② `request.js` 默认带上 navigation 的 abort signal；③ Tab 内 list 用 `tabNavigationAbort.js` 的 `beginTabRequest(tabKey)` 只取消同 tab 的上一次；④ `httpError.js` 里 abort/导航静默期的错误 `shouldSuppressHttpError` 不提示用户。  
**结果**：切页不再满屏超时，后端压力也小了。
25. 某页列表数据变化，为什么用 computed 而不是 method？（举项目里的例子）
method 每次渲染都会重新执行；computed 有缓存。比如 **norm 表头国际化**：locale 或机型变了，computed 才重新算列配置，模板里直接用更省事。
26. 有没有抽 composable？没有的话，你会把哪段逻辑抽出来？
**目前没有独立 `composables/` 目录**，类似逻辑放在 `utils/`（如 `navigationAbort`、`tabNavigationAbort`）。若重构会抽：① **useNormTable**（机型表头 + 编辑态 + 提交）；② **useTabListFetch**（`beginTabRequest` + list 请求 + 重试）；③ 登录态已有 `userStore.ensureAuth`，可保持 store，不必硬抽。

27. 大表单 / 多 Tab 有没有性能考虑（v-if vs v-show、keep-alive）？
有。不同机型表头差异大，用 **v-if** 按机型只挂载当前那一套（不频繁切换）；不需要 keep-alive 保输入的场景就不包，减少 DOM 和监听开销。

---

## 回答方式（模板）

> **结论一句** → **在项目里哪** → **为什么这样** → **还有啥可优化**

---

## 自测

| 题号范围 | 能流利答 | 需回看代码 |
|----------|----------|------------|
| 1–7 登录 | ☐ | ☐ |
| 8–14 路由/状态 | ☐ | ☐ |
| 15–19 工程化 | ☐ | ☐ |
| 20–27 业务/原理 | ☐ | ☐ |
