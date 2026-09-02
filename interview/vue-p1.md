# Vue  · P1 常考（约 28 题）

> 方案 B · 第 2 周主攻  
> 先过完 P0 再开；仍按「盖住口述稿 → 对照口述稿 + 要点 → 勾选」。

---

## A. 性能与编译（Day 8）

### P1-01 🆕 解释 PatchFlags
- [ ]

**口述稿（约 40～50 秒）：**

PatchFlags 是编译期优化。模板编译时，给动态节点打上标记，比如这段只要更新文本、这段只要更新 class 或 props。

运行时 patch 就只动带 flag 的那部分，静态节点直接跳过。比 Vue2 那种更粗的全量对比更细粒度，所以更新更快。

**要点：** 模板编译时给动态节点打标（如只要更新 TEXT / CLASS / PROPS）。运行时 patch **只动带 flag 的部分**，跳过静态，比 Vue2 更细粒度。

**口诀：** 编译打标 → 运行时定点更新。

**我的坑：**

---

### P1-02 🆕 静态提升（static hoist）是什么？
- [ ]

**口述稿（约 40 秒）：**

纯静态的子树，编译时会提升到渲染函数外面，只创建一次 vnode。

组件每次重新渲染时，直接复用这份静态 vnode，不用反复创建、也不用反复比对，减少开销。

**要点：** 纯静态子树提升到渲染函数外只创建一次，每次 re-render 复用同一 vnode，减少创建与比对成本。

**我的坑：**

---

### P1-03 🆕 Tree-shaking 对 Vue3 有什么意义？
- [ ]

**口述稿（约 40～50 秒）：**

Vue3 的 API 是 ESM 具名导出。你项目里没用到的 `watch`、`onMounted` 等，打包时可以摇掉，不进最终包。

Options API 那种挂在全局上的能力更难摇干净。思路和按需引入一样：用多少打多少，有利于控制包体积。

**要点：** API 以 ESM 具名导出，没用到的 `watch`/`onMounted` 等可不打进包；Options 全局能力更难摇掉。和「按需引入」一个思路。

**我的坑：**

---

### P1-04 ✅ v-if vs v-show；列表 key 为什么重要？
- [ ]

**口述稿（约 50～60 秒）：**

v-if 是条件为假就销毁，为真再创建，切换有真实的创建/销毁成本；v-show 只是用 CSS 显隐，DOM 一直在。

频繁切换偏向 v-show；很少出现、或者初始就可能不渲染的用 v-if 更合适。

列表的 key 是给 diff 用的身份标识，帮助判断能不能复用节点。要用稳定唯一的 id，忌用 index——乱序或删除时容易错位，把状态安到错误的那一项上。

**要点：** v-if 条件销毁/创建；v-show 仅 CSS 切换。频繁切换偏 v-show；不常出现偏 v-if。  
`key` 帮助 diff 识别节点身份；列表用稳定唯一 id，忌用 index（乱序/删除易错位）。

**我的坑：**

---

### P1-05 🆕 v-memo 做什么？
- [ ]

**口述稿（约 40 秒）：**

v-memo 用来缓存一块子树：你给的依赖数组不变，这块就跳过更新。

适合大列表里某一项局部其实大多是静态的场景。但别滥用，优先合理拆组件、用好 key；memo 是锦上添花。

**要点：** 缓存子树；依赖数组不变则跳过该块更新。适合大列表项里局部静态多的场景。别滥用，先合理拆组件/`key`。

**我的坑：**

---

### P1-06 🆕 首屏/包体积常见优化（Vue 向）
- [ ]

**口述稿（约 50～60 秒）：**

Vue 向我常提这些：路由懒加载、`defineAsyncComponent` 拆重型组件；大组件继续拆；图片和静态资源优化；Pinia 按模块组织，别一股脑全打进首包；用 `rollup-plugin-visualizer` 看哪些依赖胖；还有避免无必要的深 watch 整份大列表。

和项目结合可以说：设备网管页按路由拆，升级包页面等重逻辑异步加载。

**要点：** 路由懒加载、`defineAsyncComponent`、拆大组件、图片/资源、Pinia 按模块、分析 `rollup-plugin-visualizer`（你 Vite 周已接触）、减少无必要的深 watch。

**我的坑：**

---

## B. 内置能力（Day 9）

### P1-07 ✅ Teleport 用途
- [ ]

**口述稿（约 40 秒）：**

Teleport 让你逻辑还写在当前组件里，但真实 DOM 挂到别的地方，常见是 `body`。

弹窗、Toast、遮罩特别好用，可以躲开父级 `overflow: hidden` 或乱七八糟的 z-index 层叠问题。

**要点：** 逻辑在组件内，DOM 挂到别处（常 `body`）。弹窗、Toast、遮罩，躲父级 `overflow`/`z-index`。

**我的坑：**

---

### P1-08 ✅ Suspense 作用与场景
- [ ]

**口述稿（约 40～50 秒）：**

Suspense 用来等待异步依赖，比如 async setup 或异步组件，在等的时候用 `#fallback` 显示 loading。

适合页面级异步加载。不过生产环境还要配好错误处理；不少团队仍然自研 loading，Suspense 可以提，但别说成唯一方案。

**要点：** 等待异步依赖（async setup / 异步组件），用 `#fallback` 展示 loading。适合页面级异步；生产常配合错误处理，不少团队仍自研 loading。

**我的坑：**

---

### P1-09 ✅ 异步组件怎么定义？
- [ ]

**口述稿（约 40～50 秒）：**

用 `defineAsyncComponent`，loader 里 `() => import('./Heavy.vue')`，还可以配 loadingComponent、errorComponent、delay、timeout。

路由懒加载更常见：`component: () => import('./views/Foo.vue')`，访问到才下载对应 chunk。

**要点 / 写法：**
```js
import { defineAsyncComponent } from 'vue'
const Comp = defineAsyncComponent({
  loader: () => import('./Heavy.vue'),
  loadingComponent: Loading,
  errorComponent: Error,
  delay: 200,
  timeout: 10000,
})
```
路由：`component: () => import('./views/Foo.vue')`。

**我的坑：**

---

### P1-10 🆕 Fragment 与 attrs 透传注意
- [ ]

**口述稿（约 40～50 秒）：**

和多根 Fragment 相关：class、事件这些 attrs 不会自动落到某一个根上。

需要显式 `v-bind="$attrs"` 绑到目标元素；或者设 `inheritAttrs: false` 再手动决定绑哪里。面试和 P0-04 可以串着说。

**要点：** 多根时 class/事件等 attrs 不会自动落到某一个根；需显式 `v-bind="$attrs"` 到目标元素，或设 `inheritAttrs: false` 后手动绑。

**我的坑：**

---

### P1-11 🆕 动态组件 `<component :is>` + keep-alive
- [ ]

**口述稿（约 45～60 秒）：**

`<component :is="xxx">` 用来动态切换组件。外面再包 `keep-alive`，切换时可以缓存实例，不会每次都销毁重建，会触发 `onActivated` / `onDeactivated`。

注意缓存太多占内存，要用 `include` / `exclude` 或 `max` 控制范围。我们项目里 Tab 多、要保留表单输入时才考虑 keep-alive。

**要点：** `:is` 切换组件；包 `keep-alive` 可缓存实例，触发 `onActivated`/`onDeactivated`。缓存多了占内存，用 `include`/`max` 控制。

**我的坑：**

---

## C. 进阶响应式 API（Day 10）

### P1-12 ✅ shallowRef / shallowReactive
- [ ]

**口述稿（约 40～50 秒）：**

shallow 系列只对根层做响应式，深层内部改动不会触发视图更新。

适合大对象、图表实例、明确约定「只通过替换整个 `.value` 来更新」的场景，能降低代理开销。内部字段乱改是不会刷新的，这点要说清楚。

**要点：** 只对根层响应；深层突变不触发视图。适合大对象、图表实例、明确「只替换 `.value`」的场景，降开销。

**我的坑：**

---

### P1-13 ✅ readonly
- [ ]

**口述稿（约 35～45 秒）：**

`readonly` 包一层只读代理，外面改会告警且改不动。

常见用法是 `provide(readonly(state))`，让后代能读、不能乱改；真正改状态通过你暴露的方法或 store action。

**要点：** 只读代理，修改告警。常 `provide(readonly(state))` 防后代乱改；配合单独暴露改状态的方法。

**我的坑：**

---

### P1-14 ✅ customRef 何时用？
- [ ]

**口述稿（约 40 秒）：**

当你需要自己控制 track 和 trigger 时机，用 customRef。

经典场景是防抖输入：输入过程可以 track，但等停了 N 毫秒再 trigger，避免每个按键都触发依赖更新。一般业务用普通 debounce 函数也行，这题知道思路即可。

**要点：** 自定义 track/trigger。经典：防抖输入 ref——输入过程 track，停 N ms 再 trigger。

**我的坑：**

---

### P1-15 🆕 nextTick 作用？和 watch flush post 关系
- [ ]

**口述稿（约 40～50 秒）：**

nextTick 是等 DOM 更新队列刷完之后，再读或改 DOM。常用 `await nextTick()`。

和 `watch(..., { flush: 'post' })` 都是「更新后」执行；区别是 nextTick 更偏一次性等待某次更新，flush post 是这个 watch 每次都在更新后跑。

**要点：** 等 DOM 更新后再读/改 DOM。`await nextTick()` 常用。与 `watch(..., { flush: 'post' })` 都是「更新后」，nextTick 更偏一次性等待。

**我的坑：**

---

### P1-16 🆕 unref / toValue / isRef（口答即可）
- [ ]

**口述稿（约 35～45 秒）：**

`isRef` 判断是不是 ref。`unref(x)`：是 ref 就返回 `.value`，否则原样返回。

较新的 `toValue` 还能处理 getter。写 composable 时参数可能是 ref 也可能是裸值，用它们统一处理更方便。

**要点：** `unref(x)`：若是 ref 返 `.value` 否则返自身。`toValue`（较新）还可处理 getter。写 composable 时方便兼容 ref 与裸值参数。

**我的坑：**

---

## D. Router（Day 11）

### P1-17 ✅ 导航守卫执行顺序怎么口述？
- [ ]

**口述稿（约 50～60 秒）：**

简化版我会这样说：先失活组件的 `beforeRouteLeave`，再全局 `beforeEach`，然后是重用组件的 `beforeRouteUpdate`，再到路由配置上的 `beforeEnter`，接着全局 `beforeResolve`，最后 `afterEach`。

组合式里还有 `onBeforeRouteUpdate` / `onBeforeRouteLeave`，思路类似。

面试最常抓住一点就行：**登录鉴权一般写在全局 beforeEach**。我们 40WEB 就是在 beforeEach 里做 token、ensureAuth、以及切页取消请求。

**要点（简化版）：** 失活组件 `beforeRouteLeave` → 全局 `beforeEach` → 重用组件 `beforeRouteUpdate` → 路由配置 `beforeEnter` → 全局 `beforeResolve` → 全局 `afterEach`；组件内 `onBeforeRouteUpdate`/`Leave` 等同思路。  
面试抓住：**全局 beforeEach 做登录鉴权** 最常问。

**我的坑：** 别背完整顺序却说不出 beforeEach 鉴权。

---

### P1-18 ✅ 路由鉴权常见写法
- [ ]

**口述稿（约 45～60 秒）：**

常见是路由 meta 标 `requiresAuth`，在 `beforeEach` 里查 cookie/token 或 Pinia 用户信息；没登录就跳登录，最好带上 `redirect` 回跳。

如果是动态路由，登录成功后再 `addRoute`；还要处理刷新后路由表丢了要重新注入的问题。

我们项目路由表目前是静态的，权限更多靠 roles 控制展示；但鉴权入口同样在 beforeEach。

**要点：** `meta.requiresAuth`；`beforeEach` 查 token/Pinia user；无权限 `next('/login')` 或 `return { name: 'login', query: { redirect } }`。动态路由：登录后 `addRoute`，注意刷新要重新注入。

**我的坑：**

---

### P1-19 🆕 params vs query；hash vs history
- [ ]

**口述稿（约 50～60 秒）：**

params 在路径里，要在路由表声明，比如 `/user/:id`；query 在 `?` 后面，更灵活。

history 模式 URL 好看，但服务器要把任意路径回退到 index.html；hash 模式是 `/#/xxx`，`#` 后面不发给服务器，兼容简单。

很多后台用 history；我们设备网管用 Hash，因为 Boa 这种轻量服务配不了 try_files，刷新 History 路径会 404。

**要点：** params 在路径里（需路由声明）；query 在 `?` 后。history 需服务端回退到 index；hash 兼容简单。现代后台多用 history。

**我的坑：** 一定能串到 40WEB 为什么用 Hash。

---

### P1-20 🆕 路由懒加载原理一句话
- [ ]

**口述稿（约 30 秒）：**

`component: () => import('./Foo.vue')` 返回一个 Promise，打包工具会打成异步 chunk，只有访问到该路由时才下载执行，减小首包。

**要点：** `() => import()` 返回 Promise，打包打成异步 chunk，访问该路由才下载。

**我的坑：**

---

### P1-21 🆕 页面刷新后动态路由丢失怎么办？
- [ ]

**口述稿（约 45～60 秒）：**

动态路由是运行时 `addRoute` 加进内存的，一刷新内存就没了，所以会丢。

解决办法：入口根据 token 再拉一次菜单或权限，重新 `addRoute`；404 通配路由要放在动态路由加完之后。通常和 Pinia 用户模块、路由初始化一起做。

我们项目路由是静态写死的，刷新保持登录靠 Cookie 里的 token + ensureAuth 拉回 roles，这一点可以对比着讲。

**要点：** 权限路由存在内存；刷新要在入口根据 token 再拉菜单/`addRoute`，或配通配 404 前保证已 add。常与 Pinia + 路由模块初始化一起答。

**我的坑：**

---

## E. Pinia 与全局通信（Day 12）

### P1-22 🆕 Option Store vs Setup Store
- [ ]

**口述稿（约 40～50 秒）：**

Option Store 是对象写法：`state` / `getters` / `actions`，类似以前的 Vuex 心智。

Setup Store 像组件 setup：里面用 `ref`、`computed`，更灵活，也好复用 composable。

两种官方都支持，看团队习惯；新代码我更偏向 Setup Store。

**要点：** Option：`state/getters/actions` 对象写法。Setup：像组件 setup，用 `ref`/`computed`，灵活，易复用 composable。两者官方都支持。

**我的坑：**

---

### P1-23 🆕 Pinia 里异步请求放哪？如何重置 state？
- [ ]

**口述稿（约 40 秒）：**

异步请求放在 **actions** 里，action 可以直接写成 async。

重置：Option Store 有 `$reset()`；Setup Store 没有自动的，需要自己保存初始值函数，或者手动把各字段赋回初始值。

**要点：** 放 **actions**（可 async）。重置：`$reset()`（option store）；setup store 需自写初始值函数或手动赋。

**我的坑：**

---

### P1-24 ✅ Vue3 全局事件总线推荐方案
- [ ]

**口述稿（约 40 秒）：**

优先还是 Pinia、provide/inject、props/emit。真要发布订阅再用 **mitt**。

不要再用空 Vue 实例当 bus，因为 `$on` / `$off` 已经移除了。

**要点：** 优先 Pinia / provide-inject / props。真要发布订阅用 **mitt**。禁止空 Vue 实例当 bus（API 已无 `$on`）。

**我的坑：**

---

### P1-25 🆕 storeToRefs 为什么要用？
- [ ]

**口述稿（约 40～50 秒）：**

从 store 直接解构 `state` 或 getters，会丢掉响应式，拿到的是普通值。

用 `storeToRefs(store)` 解构出来的才是还连着 store 的 ref。注意 **actions 不要**丢进 storeToRefs，action 直接 `store.login()` 这样调用就行。

**要点：** 从 store 解构 state/getters 会丢响应式；`storeToRefs(store)` 保持响应式。**actions 不要**放进 storeToRefs，直接 `store.xxx()`。

**我的坑：** 和解构 reactive 丢响应式是同一类坑。

---

## F. Diff / 综合易错（Day 13）

### P1-26 🆕 Vue diff 直觉（面试版，别背源码行号）
- [ ]

**口述稿（约 45～60 秒）：**

面试版我说直觉就行：同层比较；靠 `key` 判断节点能不能复用；Vue3 还有静态标记，静态部分直接跳过；组件则先比类型和 key，再更新 props。

列表如果没 key，或者用 index 当 key，删除乱序时容易把内部状态安错项。不需要背源码行号。

**要点：** 同层比较；`key` 判断是否可复用节点；静态标记跳过；组件则比类型与 key 再更新 props。列表无 key 或 index key 易导致状态错乱。

**我的坑：**

---

### P1-27 🆕 为什么 data 在 Options 里必须是函数？
- [ ]

**口述稿（约 35～45 秒）：**

因为每个组件实例需要自己的一份数据。如果 data 是对象，多实例会共享同一引用，改一个污染另一个。

写成函数，每次创建实例调用一次，返回新对象。Composition 里 setup 每次执行新建 `ref`，也是同样道理。

**要点：** 每个组件实例一份独立数据；若对象共享，多实例会互相污染。Composition 的 `ref` 在 setup 每次执行也是新引用，同理。

**我的坑：**

---

### P1-28 🆕 说一次「项目里做过的 Vue 优化/踩坑」（模板句）
- [ ]

**口述稿（约 60～90 秒，按你真实经历改）：**

我一般准备三条，结合 40WEB：

第一，切页太快时旧请求还在飞，设备端扛不住、前端满屏 timeout。我们在 `beforeEach` 里 `resetNavigationRequests` abort 旧请求，响应拦截里静默 abort 错误，不再乱弹 toast。

第二，Mac 配置页 norm 表格按机型切换表头，用 v-if 只挂当前机型那一套，避免无用 DOM；表头国际化用 computed，locale 变了才重算。

第三，路由用 Hash，是因为设备 Boa 配不了 History 回退，刷新不会 404；登录态刷新靠 Cookie token + ensureAuth，不是因为 Hash。

**要点 / 自备 3 条（改成你真实经历）：**
1. 大表：分页 + 路由懒加载 + 避免深 watch 整个列表
2. 弹窗：Teleport 到 body，修滚动穿透
3. 权限：Pinia user + `beforeEach` + 动态 `addRoute`，处理刷新重注入

（上面口述以你 40WEB 真实经历为准，比通用模板更有说服力。）

**我的坑：** 别只背通用优化清单，一定要能落到你们仓库里的文件名/函数名。

---

## Day 14 总测记录

日期：________  
抽题（P0+P1）：________  
合格数：__ / 15  
5 条项目挂钩句：

1.  
2.  
3.  
4.  
5.  
