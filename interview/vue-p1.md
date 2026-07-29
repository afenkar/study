# Vue 面试 · P1 常考（约 28 题）

> 方案 B · 第 2 周主攻  
> 先过完 P0 再开；仍按「口述 → 对照 → 勾选」。

---

## A. 性能与编译（Day 8）

### P1-01 🆕 解释 PatchFlags
- [ ]

**要点：** 模板编译时给动态节点打标（如只要更新 TEXT / CLASS / PROPS）。运行时 patch **只动带 flag 的部分**，跳过静态，比 Vue2 更细粒度。

**口诀：** 编译打标 → 运行时定点更新。

---

### P1-02 🆕 静态提升（static hoist）是什么？
- [ ]

**要点：** 纯静态子树提升到渲染函数外只创建一次，每次 re-render 复用同一 vnode，减少创建与比对成本。

---

### P1-03 🆕 Tree-shaking 对 Vue3 有什么意义？
- [ ]

**要点：** API 以 ESM 具名导出，没用到的 `watch`/`onMounted` 等可不打进包；Options 全局能力更难摇掉。和「按需引入」一个思路。

---

### P1-04 ✅ v-if vs v-show；列表 key 为什么重要？
- [ ]

**要点：** v-if 条件销毁/创建；v-show 仅 CSS 切换。频繁切换偏 v-show；不常出现偏 v-if。  
`key` 帮助 diff 识别节点身份；列表用稳定唯一 id，忌用 index（乱序/删除易错位）。

---

### P1-05 🆕 v-memo 做什么？
- [ ]

**要点：** 缓存子树；依赖数组不变则跳过该块更新。适合大列表项里局部静态多的场景。别滥用，先合理拆组件/`key`。

---

### P1-06 🆕 首屏/包体积常见优化（Vue 向）
- [ ]

**要点：** 路由懒加载、`defineAsyncComponent`、拆大组件、图片/资源、Pinia 按模块、分析 `rollup-plugin-visualizer`（你 Vite 周已接触）、减少无必要的深 watch。

---

## B. 内置能力（Day 9）

### P1-07 ✅ Teleport 用途
- [ ]

**要点：** 逻辑在组件内，DOM 挂到别处（常 `body`）。弹窗、Toast、遮罩，躲父级 `overflow`/`z-index`。

---

### P1-08 ✅ Suspense 作用与场景
- [ ]

**要点：** 等待异步依赖（async setup / 异步组件），用 `#fallback` 展示 loading。适合页面级异步；生产常配合错误处理，不少团队仍自研 loading。

---

### P1-09 ✅ 异步组件怎么定义？
- [ ]

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

---

### P1-10 🆕 Fragment 与 attrs 透传注意
- [ ]

**要点：** 多根时 class/事件等 attrs 不会自动落到某一个根；需显式 `v-bind="$attrs"` 到目标元素，或设 `inheritAttrs: false` 后手动绑。

---

### P1-11 🆕 动态组件 `<component :is>` + keep-alive
- [ ]

**要点：** `:is` 切换组件；包 `keep-alive` 可缓存实例，触发 `onActivated`/`onDeactivated`。缓存多了占内存，用 `include`/`max` 控制。

---

## C. 进阶响应式 API（Day 10）

### P1-12 ✅ shallowRef / shallowReactive
- [ ]

**要点：** 只对根层响应；深层突变不触发视图。适合大对象、图表实例、明确「只替换 `.value`」的场景，降开销。

---

### P1-13 ✅ readonly
- [ ]

**要点：** 只读代理，修改告警。常 `provide(readonly(state))` 防后代乱改；配合单独暴露改状态的方法。

---

### P1-14 ✅ customRef 何时用？
- [ ]

**要点：** 自定义 track/trigger。经典：防抖输入 ref——输入过程 track，停 N ms 再 trigger。

---

### P1-15 🆕 nextTick 作用？和 watch flush post 关系
- [ ]

**要点：** 等 DOM 更新后再读/改 DOM。`await nextTick()` 常用。与 `watch(..., { flush: 'post' })` 都是「更新后」，nextTick 更偏一次性等待。

---

### P1-16 🆕 unref / toValue / isRef（口答即可）
- [ ]

**要点：** `unref(x)`：若是 ref 返 `.value` 否则返自身。`toValue`（较新）还可处理 getter。写 composable 时方便兼容 ref 与裸值参数。

---

## D. Router（Day 11）

### P1-17 ✅ 导航守卫执行顺序怎么口述？
- [ ]

**要点（简化版）：** 失活组件 `beforeRouteLeave` → 全局 `beforeEach` → 重用组件 `beforeRouteUpdate` → 路由配置 `beforeEnter` → 全局 `beforeResolve` → 全局 `afterEach`；组件内 `onBeforeRouteUpdate`/`Leave` 等同思路。  
面试抓住：**全局 beforeEach 做登录鉴权** 最常问。

---

### P1-18 ✅ 路由鉴权常见写法
- [ ]

**要点：** `meta.requiresAuth`；`beforeEach` 查 token/Pinia user；无权限 `next('/login')` 或 `return { name: 'login', query: { redirect } }`。动态路由：登录后 `addRoute`，注意刷新要重新注入。

---

### P1-19 🆕 params vs query；hash vs history
- [ ]

**要点：** params 在路径里（需路由声明）；query 在 `?` 后。history 需服务端回退到 index；hash 兼容简单。现代后台多用 history。

---

### P1-20 🆕 路由懒加载原理一句话
- [ ]

**要点：** `() => import()` 返回 Promise，打包打成异步 chunk，访问该路由才下载。

---

### P1-21 🆕 页面刷新后动态路由丢失怎么办？
- [ ]

**要点：** 权限路由存在内存；刷新要在入口根据 token 再拉菜单/`addRoute`，或配通配 404 前保证已 add。常与 Pinia + 路由模块初始化一起答。

---

## E. Pinia 与全局通信（Day 12）

### P1-22 🆕 Option Store vs Setup Store
- [ ]

**要点：** Option：`state/getters/actions` 对象写法。Setup：像组件 setup，用 `ref`/`computed`，灵活，易复用 composable。两者官方都支持。

---

### P1-23 🆕 Pinia 里异步请求放哪？如何重置 state？
- [ ]

**要点：** 放 **actions**（可 async）。重置：`$reset()`（option store）；setup store 需自写初始值函数或手动赋。

---

### P1-24 ✅ Vue3 全局事件总线推荐方案
- [ ]

**要点：** 优先 Pinia / provide-inject / props。真要发布订阅用 **mitt**。禁止空 Vue 实例当 bus（API 已无 `$on`）。

---

### P1-25 🆕 storeToRefs 为什么要用？
- [ ]

**要点：** 从 store 解构 state/getters 会丢响应式；`storeToRefs(store)` 保持响应式。**actions 不要**放进 storeToRefs，直接 `store.xxx()`。

---

## F. Diff / 综合易错（Day 13）

### P1-26 🆕 Vue diff 直觉（面试版，别背源码行号）
- [ ]

**要点：** 同层比较；`key` 判断是否可复用节点；静态标记跳过；组件则比类型与 key 再更新 props。列表无 key 或 index key 易导致状态错乱。

---

### P1-27 🆕 为什么 data 在 Options 里必须是函数？
- [ ]

**要点：** 每个组件实例一份独立数据；若对象共享，多实例会互相污染。Composition 的 `ref` 在 setup 每次执行也是新引用，同理。

---

### P1-28 🆕 说一次「项目里做过的 Vue 优化/踩坑」（模板句）
- [ ]

**自备 3 条（改成你真实经历）：**  
1. 大表：分页 + 路由懒加载 + 避免深 watch 整个列表  
2. 弹窗：Teleport 到 body，修滚动穿透  
3. 权限：Pinia user + `beforeEach` + 动态 `addRoute`，处理刷新重注入  

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
