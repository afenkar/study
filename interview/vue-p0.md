# Vue  · P0 必背（约 32 题）

> 方案 B · 第 1 周主攻  
> 每题：先口述 → 再看要点 → 勾选。口诀尽量用自己的话改写到「我的坑」。

**图例：** ✅ 你上次答对方向 · ⚠️ 易答偏 · 🆕 需新背

---

## A. Vue2 vs Vue3（Day 1）

### P0-01 ⚠️ Vue3 相对 Vue2 的核心优势？
- [ ]

**标准答要点：**
1. 响应式：Proxy（可监听增删属性、数组下标）  
2. Composition API：按功能聚合 + 更好 TS + 替代 mixin  
3. 性能：编译静态提升、PatchFlags、Tree-shaking  
4. 新能力：Fragment 多根、Teleport、Suspense  
5. 生态：官方推 Pinia；Vue2 已 EOL（2023-12）仍常考对比  

**口诀：** Proxy + 组合式 + 编译优化 + 新内置 + Pinia  

**我的坑：** 只说「选项式变组合式」不够；Vue3 **仍支持** Options API。

---

### P0-02 ✅ Composition API 比 Options 好在哪？何时仍可用 Options？
- [ ]

**要点：** 按功能组织；composable 复用无命名冲突；TS 友好；Tree-shaking。  
小叶组件、逻辑极简单 → Options 完全可接受，可共存渐进迁移。

---

### P0-03 🆕 Vue2 哪些常见 API 在 Vue3 没了 / 换了？
- [ ]

**要点：**  
- `$on` / `$off` / `$once` 移除 → mitt / Pinia / provide  
- filters 移除 → computed / 方法  
- `.sync` 移除 → `v-model:xxx`  
- `$listeners` 并入 `$attrs`  
- `beforeDestroy` → `beforeUnmount`；`destroyed` → `unmounted`

---

### P0-04 🆕 Fragment（多根节点）有什么用？注意点？
- [ ]

**要点：** 组件可不包一层多余 `div`，减少 DOM。注意：多根时 `$attrs` 默认不自动落到单一根，需 `v-bind="$attrs"` 或明确落点。

---

### P0-05 🆕 mixin 有什么问题？composable 如何替代？
- [ ]

**要点：** mixin 命名冲突、来源不清、数据来源难追。composable：`useXxx()` 显式导入返回值，无冲突、可组合。

---

### P0-06 ⚠️ 迁移时 Options 和 Composition 能混用吗？
- [ ]

**要点：** 能。新文件用 Composition；老 Options 可留。Vue 2.7 也有 Composition。面试强调「渐进」比「一夜重写」更专业。

---

## B. 响应式基础（Day 2）

### P0-07 ⚠️ ref 和 reactive 区别？（你上次：ref 只能基本类型 —— 错）
- [ ]

**要点：**  
- `ref`：**任意类型**；script 用 `.value`；可整体替换仍响应式  
- `reactive`：仅对象/数组；直接改属性；**整体替换引用易丢响应式**  
- 拿不准优先 `ref`

---

### P0-08 🆕 为什么 template 里 ref 不用 `.value`？
- [ ]

**要点：** 模板编译会自动解包 ref。script / 嵌套在 reactive 里的 ref 访问规则不同（嵌套 ref 在 reactive 里访问会自动解包）。

---

### P0-09 ✅ toRef / toRefs 作用与差异
- [ ]

**要点：**  
- `toRef(obj,'key')`：单个属性 → ref，双向联动原对象  
- `toRefs(obj)`：每个属性都变 ref  
场景：解构 `reactive` 会丢响应式 → 先 `toRefs` 再解构。

---

### P0-10 🆕 解构 reactive 为什么丢响应式？怎么修？
- [ ]

**要点：** 解构得到的是普通值拷贝，断开 Proxy。修：`toRefs` / `toRef`，或不要解构、始终 `state.xxx`。

---

### P0-11 🆕 Proxy 相对 defineProperty 的优势
- [ ]

**要点：** 可拦截 get/set/has/deleteProperty 等；支持属性增删、数组下标；初始化不必递归劫持所有 key（懒代理）。Vue2 需 `Vue.set` / 变异方法 hack。

---

### P0-12 ⚠️ 「Proxy 监听不到」怎么答才不过时？
- [ ]

**要点（推荐口径）：**  
- 基本类型不能直接当 Proxy 目标 → 用 `ref`  
- 解构 / 替换整个 reactive 引用 → 丢更新  
- Map/Set：**Vue3 已支持**（别背「Proxy 完全不能」）  
- 第三方带私有字段的实例 → 常改用 `shallowRef` 只换引用

---

## C. computed / watch（Day 3）

### P0-13 ✅ computed vs watch
- [ ]

**要点：** computed = 派生 + **缓存** + 有返回值；watch = 副作用、可拿新旧值、无缓存。能算的优先 computed。

---

### P0-14 ✅ watch 听 reactive 对象为何常不用 deep？
- [ ]

**要点：** 直接 `watch(reactiveObj, cb)` **默认深层**。`deep: true` 多用于 ref 包对象或强制深听。精确场景优先 `watch(() => state.x, ...)`。

---

### P0-15 ✅ watchEffect vs watch
- [ ]

**要点：** watchEffect **自动收集依赖**、默认立即执行、无新旧值；watch **手动指定源**、默认可不立即、有新旧值。

---

### P0-16 🆕 watch 的 flush：`pre` / `post` / `sync`？
- [ ]

**要点：** 默认 `pre`（组件更新前）；需要 DOM 更新后读节点用 `flush: 'post'`（或 `watchPostEffect`）；`sync` 同步触发少用（易多次）。

---

### P0-17 🆕 computed 能有副作用吗？能直接改 computed 吗？
- [ ]

**要点：** 不应写副作用（请求等放 watch）。默认只读；需要时可写 computed get/set，set 里改源数据。

---

## D. setup 与生命周期（Day 4）

### P0-18 ⚠️ setup 执行时机？能否 this？
- [ ]

**要点：** 在 `beforeCreate` 之前（props 已解析）；**无 this**（undefined）。用 `setup(props, ctx)` 或 `<script setup>`。

---

### P0-19 ⚠️ 组合式生命周期完整常用列表
- [ ]

**要点：**  
`onBeforeMount` / `onMounted`  
`onBeforeUpdate` / `onUpdated`  
`onBeforeUnmount` / `onUnmounted`  
`onActivated` / `onDeactivated`（keep-alive）  
`onErrorCaptured`  
调试：`onRenderTracked` / `onRenderTriggered`  
SSR：`onServerPrefetch`  
**没有** `onBeforeCreate` / `onCreated` → 由 setup 本身承担。

---

### P0-20 ✅ onMounted 能否拿 DOM？
- [ ]

**要点：** 能。挂载完成，模板 ref 已指向真实 DOM。`onBeforeMount` 时尚无 DOM。

---

### P0-21 ✅ `<script setup>` 相对普通 setup 的便利
- [ ]

**要点：** 顶层绑定自动暴露给模板；`defineProps`/`defineEmits`/`defineExpose`/`defineModel`；更少样板；更好的作用域与性能倾向。

---

### P0-22 🆕 生命周期钩子为何必须在 setup 同步注册？
- [ ]

**要点：** 组合式钩子依赖当前活跃实例；放进 `setTimeout`/异步回调再 `onMounted` 会丢失关联或告警。异步逻辑写在钩子**回调内部**，不要异步才注册钩子。

---

## E. 组件 API（Day 5）

### P0-23 ⚠️ defineProps 默认值与类型校验
- [ ]

**运行时：**
```js
defineProps({
  title: { type: String, default: '' },
  user: { type: Object, default: () => ({}) }, // 对象/数组必须工厂函数
})
```
**TS：** `withDefaults(defineProps<{...}>(), { ... })`

---

### P0-24 ✅ defineEmits 用法；和 Vue2 `$emit` 差异
- [ ]

**要点：** `const emit = defineEmits(['change'])` 或带校验对象；`emit('change', payload)`。  
Vue3 **推荐声明 emits**；未声明事件会进 attrs。script setup 无 `this.$emit`。

---

### P0-25 ✅ v-model 在 Vue3 的原理；和 Vue2 区别
- [ ]

**要点：** 默认 `modelValue` + `update:modelValue`。  
多 v-model：`v-model:title` → `title` + `update:title`。  
Vue2 默认 `value`+`input`，另有 `.sync`。较新可用 `defineModel()`。

---

### P0-26 ✅ defineExpose 做什么？
- [ ]

**要点：** script setup 默认不对外暴露。父级 `ref` 子组件时，只能访问 `defineExpose({...})` 列出的内容（如打开弹窗方法、表单 ref）。

---

### P0-27 🆕 defineModel 是什么？（近年变高频）
- [ ]

**要点：** 简化子组件 v-model 的语法糖，内部等价于 prop + emit。例：`const model = defineModel()`；`const title = defineModel('title')`。

---

### P0-28 🆕 props 是单向的，子组件能否改 prop？
- [ ]

**要点：** 不应直接改。改用 emit / v-model；若是对象，改嵌套属性 technically 能改但破坏单向流，面试应说「反模式」。

---

## F. 通信与 Pinia（Day 6）

### P0-29 ✅ provide / inject 注意点；如何保持响应式？
- [ ]

**要点：** 注入普通值不响应式；provide `ref`/`reactive` 才响应式。防篡改用 `readonly`。用 Symbol 作 key 防冲突。仅祖先→后代。

---

### P0-30 🆕 Vue3 组件通信方式怎么答一串？
- [ ]

**要点：** 父子 props/emit（v-model）；跨多层 provide/inject；全局状态 Pinia；偶尔 mitt；`$parent`/`$children` 不推荐；事件总线不再用 Vue 实例。

---

### P0-31 ✅ Pinia vs Vuex（必背对比表）
- [ ]

| | Pinia | Vuex |
|--|--|--|
| 官方态度 | Vue3 推荐 | 维护向，偏旧项目 |
| API | state / getters / actions | + mutations |
| TS | 优秀 | 繁琐 |
| 模块 | 多 store 自然拆分 | namespaced 模块 |
| 体积 | 更小 | 更大 |

---

### P0-32 🆕 何时用组件 state / composable / Pinia？
- [ ]

**要点：**  
- 仅本组件：`ref`/`reactive`  
- 多组件复用**逻辑**：composable（可多份实例）  
- 全局**同一份**状态（用户信息、权限）：Pinia  

---

## Day 7 周测记录

日期：________  
抽题号：________  
合格数：__ / 10  
不及格回炉题号：________  
