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
因为这是主流也是最新稳定的方案，方便以后迭代，我们旧项目就是vue2，很多对应功能是不在更新维修的。组合式 API、Pinia 更轻、与 Vue2 老项目对比可维护
---

## 登录与 Token

4. Token 存在哪？`getToken` / `setToken` 怎么实现？
token存在cookie，浏览器请求自动带上token，具体在 utils/auth.js，Cookie 名/key 是什么Root-Token
5. 登录流程：`Login.vue` → API → store 发生了什么？
登录->后台返回成功或失败，成功带token返回；前端cookie保存token，之后再请求getinfo返回基本设备信息，保存到store
6. 401 / Token 失效怎么处理？`resetToken` 做什么？
401重定向到登录页，resetToken是清空之前保存的token、userStore、roles。
7. Cookie vs localStorage 存 Token，你们为什么这样选？
Cookie 可设 httpOnly 更安全；我们沿用历史方案
---

## 路由与权限

8. `router.beforeEach` 里做了什么？（`ensureAuth`、`resetNavigationRequests`）
路由守卫，因为我们设备请求发多了会回不过来就会报错，避免页面不好的体验（再快速切换页面时发送很多请求，很多报错超时提示），所以设置了resetNavigationRequests中断当前周期内的请求，和更新基本信息ensureAuth
9. 刷新页面后为什么还能保持登录？`ensureAuth` + `getInfo` 流程？
因为是hash路由模式。每次刷新都会再次询问getinfo，更新基础信息store
10. `authReadyPromise` 是干什么的？（防并发重复 getInfo）
store里roles有信息的时候就不需要再重复询问了，但是如果被刷新掉就要重新询问
11. `permission` store 和 `user.roles` 什么关系？
40WEB 里 permission 目前是静态路由占位；user.roles 来自 getInfo，用于权限/全局状态（如 globalValue.syncFromRoles）。动态路由能力预留，主流程靠静态路由 + roles 控制展示
---

## 状态管理（Pinia）

12. 哪些放 Pinia，哪些放组件 local state？
pinia放在store里，
Pinia = user/token/roles、globalValue 机型权限；组件内 = 表单临时值、表格编辑态
13. `user` / `settings` / `globalValue` 各管什么？
user用户信息，settings主题/布局类配置，globalValue是我集中保存所有需要全局管理的状态。
14. Pinia 和 Vuex（30_WEB）你会怎么对比？
pinia是官方对准vue3的 vuex是对准vue2的 对应使用适配性会好很多；Pinia 无 mutations、TS 友好、模块按 store 拆分
---

## 请求与工程化

15. axios 封装在哪？拦截器做了啥（Token 头、错误统一处理）？
封装在request.js,拦截器验证是否有token，提醒登录情况，服务器回复错误同一处理，401 拦截 → 跳登录 / resetToken
16. `.env.development` / `.env.production` 各配什么？
好像都是配的api 因为我没有专门写一个mock数据，都是直接在每个页面对应写假数据测试的 虽然相对比较麻烦。
17. `npm run build` 产物怎么用（设备里怎么部署）？
我们设备是需要在ubuntu环境对前后端一起打包在进行设备上传升级。
18. ESLint + Prettier 怎么配？提交前跑 lint 吗？
我没有设置eslint+prettier 
19. mock 目录什么时候用？和真设备 API 怎么切换？
后端没准备好 前端需要测试时进行mock假数据测试；就用`.env.development` / `.env.production`就行，dev时用development的api，build用的是production的api。
---

## 业务与难点（结合你填的 3 亮点）

20. Mac 配置页最复杂的是什么？
是normm表格吧，其他都是简单可读性表单，表格需要点击修改，根据不同模式实现可编辑性，根据设备型号设置匹配不同表头。
21. Upgrade 升级流程前端要注意什么？
前端就上传正确的文件 对应正确的api，上传成功之后默认发送升级请求。
22. 路由切换时 `resetNavigationRequests` 解决什么问题？

23. 国际化 vue-i18n 怎么组织的？
就是一个中文一个英文 其他语言是没用上的；用index来分辨语言。zh/en来写国际化内容。
24. 说一个你踩过的 bug 和怎么修的。

---

## 与 Vue 原理结合

25. 某页列表数据变化，为什么用 computed 而不是 method？（举项目里的例子）
其实vue3里很少用method了 我的项目里都没用，method一般就是普通的方法。computed是实时可计算的派生数据，比如我的表头国际化，就需要computed来派生。
26. 有没有抽 composable？没有的话，你会把哪段逻辑抽出来？

27. 大表单 / 多 Tab 有没有性能考虑（v-if vs v-show、keep-alive）？
有，比如有要求根据对应机型有不同配置参数的表格表头。这时候用v-if来判断 因为一个机型就只用一种表头不会频繁变换。
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
