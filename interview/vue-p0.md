# Vue · P0 必背（约 32 题）

> 方案 B · 第 1 周主攻  
> 每题：先盖住口述稿闭卷说 → 对照口述稿 + 要点 → 勾选。口误写进「我的坑」。

**图例：** ✅ 你上次答对方向 · ⚠️ 易答偏 · 🆕 需新背

---

## A. Vue2 vs Vue3（Day 1）

### P0-01 ⚠️ Vue3 相对 Vue2 的核心优势？
- ✅ （2026-08-12 口述过；通背轮再滚）

**口述稿（约 60～90 秒）：**

Vue3 相对 Vue2，我一般从五块说：

第一，响应式换成了 Proxy。能监听属性增删和数组下标修改；而且是懒代理，不用一上来递归劫持所有 key，初始化更快。Vue2 用 defineProperty，这些场景要靠 Vue.set 或数组方法 hack。

第二，Composition API。同一块业务逻辑可以写在一起，还能抽成 composable 复用；对 TypeScript 更友好。不过要注意：Vue3 仍然支持 Options API，不是只能用组合式。

第三，性能。编译期有静态提升、PatchFlags 这类优化，更新时少做无用 diff；再加上 Tree-shaking，没用到的 API 可以打不进包。

第四，新能力：Fragment 多根节点、Teleport、Suspense 等。

第五，生态上官方更推 Pinia；Vue2 已经 EOL，新项目优先 Vue3。

**标准答要点：**
1. 响应式：Proxy（可监听增删属性、数组下标）
2. Composition API：按功能聚合 + 更好 TS + 替代 mixin
3. 性能：编译静态提升、PatchFlags、Tree-shaking
4. 新能力：Fragment 多根、Teleport、Suspense
5. 生态：官方推 Pinia；Vue2 已 EOL（2023-12）仍常考对比

**口诀：** Proxy + 组合式 + 编译优化 + 新内置 + Pinia

**我的坑：** 别只说「Options 变 Composition」；要补一句「仍支持 Options」。

---

### P0-02 ✅ Composition API 比 Options 好在哪？何时仍可用 Options？
- ✅ （2026-08-12 口述过；通背轮再滚）

**口述稿（约 45～60 秒）：**

Composition 最大的好处是按功能组织代码：同一块逻辑不用拆到 data、methods、watch 里来回跳。抽 composable 时是显式导入、显式返回，来源清楚，也没有 mixin 那种命名冲突；再就是 TS 友好，按需导入还能 Tree-shaking。

Options 什么时候还能用？逻辑很简单的小展示组件，用 Options 更直观。迁移时也可以新旧混用，渐进改，不必一夜重写。

我自己的习惯：中大型、要复用逻辑、上 TS 的项目优先 Composition；小叶子组件 Options 完全没问题。

**要点：** 按功能组织；composable 复用无命名冲突；TS 友好；Tree-shaking。  
小叶组件、逻辑极简单 → Options 完全可接受，可共存渐进迁移。

**我的坑：**

---

### P0-03 🆕 Vue2 哪些常见 API 在 Vue3 没了 / 换了？
- ✅ （2026-08-12 口述过；通背轮再滚）

**口述稿（约 60～75 秒）：**

常考几类：

事件总线那套：`$on` / `$off` / `$once` 没了。小项目可以用 mitt；更大更推荐 Pinia，或者 provide/inject。

过滤器 filters 没了，改用 computed 或方法。

`.sync` 没了，改成 `v-model:xxx` 多 v-model。

`$listeners` 并进 `$attrs` 了；`$scopedSlots` 统一成 `$slots`。

生命周期名字变了：`beforeDestroy` → `beforeUnmount`，`destroyed` → `unmounted`。

另外 `$children` 也不建议用了，父子通信用 props/emits，拿实例用 ref。

**要点：**
- `$on` / `$off` / `$once` 移除 → mitt / Pinia / provide
- filters 移除 → computed / 方法
- `.sync` 移除 → `v-model:xxx`
- `$listeners` 并入 `$attrs`
- `beforeDestroy` → `beforeUnmount`；`destroyed` → `unmounted`

**我的坑：** 容易漏说 filters 和生命周期改名，按「删 / 换 / 改名」三类过一遍。

---

### P0-04 🆕 Fragment（多根节点）有什么用？注意点？
- ✅ （2026-08-12 口述过；通背轮再滚）

**口述稿（约 40～50 秒）：**

Fragment 就是组件可以有多个根节点，不用再包一层没意义的 div，DOM 更干净，样式也不容易被多余包裹层影响。

注意点：多根的时候，父组件传下来的 `$attrs` 不会自动落到某一个根上，需要你自己决定落在哪，比如给某个根写 `v-bind="$attrs"`，或者明确绑定到具体元素。

**要点：** 组件可不包一层多余 `div`，减少 DOM。注意：多根时 `$attrs` 默认不自动落到单一根，需 `v-bind="$attrs"` 或明确落点。

**我的坑：** 只说「可以多根」不够，一定要提 `$attrs` 落点。

---

### P0-05 🆕 mixin 有什么问题？composable 如何替代？
- ✅ （2026-08-12 口述过；通背轮再滚）

**口述稿（约 45～60 秒）：**

mixin 三个老问题：命名容易冲突、数据和方法从哪来的不清晰、多个 mixin 叠在一起难维护。

composable 的做法是写 `useXxx()`，显式 import，返回值解构出来用，来源清楚，也不会因为同名互相覆盖；还能组合多个 useXxx。本质上是用函数组合替代选项混入。

项目里比如请求加载态、取消请求，都可以抽成 useRequest 这类函数复用。

**要点：** mixin 命名冲突、来源不清、数据来源难追。composable：`useXxx()` 显式导入返回值，无冲突、可组合。

**我的坑：**

---

### P0-06 ⚠️ 迁移时 Options 和 Composition 能混用吗？
- ✅ （2026-08-12 口述过；通背轮再滚）

**口述稿（约 40～50 秒）：**

能混用。新文件可以先用 Composition 或 `<script setup>`，老的 Options 组件可以先留着，按模块渐进迁移。Vue 2.7 其实也带了 Composition API，迁移路径更平滑。

面试里我会强调：渐进迁移比一夜全部重写更稳妥，也更符合 Vue「渐进式」的思路。

**要点：** 能。新文件用 Composition；老 Options 可留。Vue 2.7 也有 Composition。面试强调「渐进」比「一夜重写」更专业。

**我的坑：** 别答「必须全改成 Composition」——那不专业。

---

## B. 响应式基础（Day 2）

### P0-07 ⚠️ ref 和 reactive 区别？（你上次：ref 只能基本类型 —— 错）
- [ ]

**口述稿（约 45～60 秒）：**

先纠正一个常见误解：ref 不是只能包基本类型，**任意类型**都行，对象、数组也可以。

ref 在 script 里要用 `.value` 读写；好处是可以整体替换 `xxx.value = 新对象`，仍然保持响应式。

reactive 只能用于对象或数组，改属性直接 `state.x = 1`，不用 `.value`；但如果你把整个 reactive 变量重新赋成一个新对象，原来的引用就断了，容易丢响应式。

拿不准时我优先用 ref，更稳。

**要点：**
- `ref`：**任意类型**；script 用 `.value`；可整体替换仍响应式
- `reactive`：仅对象/数组；直接改属性；**整体替换引用易丢响应式**
- 拿不准优先 `ref`

**我的坑：** 别再说「ref 只能基本类型」。

---

### P0-08 🆕 为什么 template 里 ref 不用 `.value`？
- [ ]

**口述稿（约 40 秒）：**

因为模板编译时会自动解包 ref，所以模板里直接写 `{{ count }}`，不用 `.value`。

在 script 里仍然要 `.value`。另外，如果把 ref 嵌进 reactive 对象里，访问那一层时也会自动解包，规则和单独用 ref 略有不同，面试提一句即可。

**要点：** 模板编译会自动解包 ref。script / 嵌套在 reactive 里的 ref 访问规则不同（嵌套 ref 在 reactive 里访问会自动解包）。

**我的坑：**

---

### P0-09 ✅ toRef / toRefs 作用与差异
- [ ]

**口述稿（约 45～60 秒）：**

它们都是为了在保持和原对象联动的前提下，把属性变成 ref。

`toRef(obj, 'key')` 是把某一个属性做成 ref，改这个 ref 会同步改原对象。

`toRefs(obj)` 是把对象每个属性都变成 ref，常用于解构：直接解构 reactive 会丢响应式，先 `toRefs` 再解构就不会断。

**要点：**
- `toRef(obj,'key')`：单个属性 → ref，双向联动原对象
- `toRefs(obj)`：每个属性都变 ref
- 场景：解构 `reactive` 会丢响应式 → 先 `toRefs` 再解构。

**我的坑：**

---

### P0-10 🆕 解构 reactive 为什么丢响应式？怎么修？
- [ ]

**口述稿（约 40～50 秒）：**

reactive 返回的是 Proxy。解构相当于把当前值拷出来赋给普通变量，断开了和 Proxy 的连接，所以后面改这个变量不会触发视图更新。

修法：用 `toRefs` 或 `toRef` 再解构；或者干脆不解构，始终通过 `state.xxx` 访问。

**要点：** 解构得到的是普通值拷贝，断开 Proxy。修：`toRefs` / `toRef`，或不要解构、始终 `state.xxx`。

**我的坑：**

---

### P0-11 🆕 Proxy 相对 defineProperty 的优势
- [ ]

**口述稿（约 50～60 秒）：**

Proxy 能拦截更多操作，比如 get、set、has、deleteProperty，所以属性新增、删除、数组下标修改都能直接监听到。

初始化也不必像 Vue2 那样一上来递归 defineProperty 所有 key，可以懒代理，用到再代理，性能更好。

Vue2 那边增删属性要 `Vue.set`，数组下标也要靠变异方法 hack，这些在 Vue3 里基本不用操心了。

**要点：** 可拦截 get/set/has/deleteProperty 等；支持属性增删、数组下标；初始化不必递归劫持所有 key（懒代理）。Vue2 需 `Vue.set` / 变异方法 hack。

**我的坑：**

---

### P0-12 ⚠️ 「Proxy 监听不到」怎么答才不过时？
- [ ]

**口述稿（约 50～60 秒）：**

不要背「Proxy 完全监听不到某某」。更稳妥的口径是：

基本类型不能直接当 Proxy 目标，所以用 ref 包一层。

解构 reactive、或者整体替换 reactive 的引用，会丢更新，这是用法问题，不是 Proxy 不行。

Map、Set 在 Vue3 已经支持了，别再说监不到。

第三方库那种带私有字段的大实例，常常用 `shallowRef`，只关心引用替换，不深代理内部。

**要点（推荐口径）：**
- 基本类型不能直接当 Proxy 目标 → 用 `ref`
- 解构 / 替换整个 reactive 引用 → 丢更新
- Map/Set：**Vue3 已支持**（别背「Proxy 完全不能」）
- 第三方带私有字段的实例 → 常改用 `shallowRef` 只换引用

**我的坑：** 别背过时结论「Proxy 不能监听 Map/Set」。

---

## C. computed / watch（Day 3）

### P0-13 ✅ computed vs watch
- [ ]

**口述稿（约 40～50 秒）：**

computed 用来做派生数据：有返回值、有缓存，依赖不变就不重新算。watch 用来做副作用：比如请求、改 DOM、打日志，可以拿到新旧值，但没有缓存。

能用计算属性算出来的，优先 computed；要「一变就去干一件事」才用 watch。

**要点：** computed = 派生 + **缓存** + 有返回值；watch = 副作用、可拿新旧值、无缓存。能算的优先 computed。

**我的坑：**

---

### P0-14 ✅ watch 听 reactive 对象为何常不用 deep？
- [ ]

**口述稿（约 40～50 秒）：**

直接 `watch(reactiveObj, cb)` 时，Vue 默认就是深层监听，所以常常不用再写 `deep: true`。

`deep: true` 更多出现在听一个 ref 包着的对象，或者你想强制深听的时候。

如果只关心某一个字段，更推荐 `watch(() => state.x, cb)`，更精确，也少跑无关更新。

**要点：** 直接 `watch(reactiveObj, cb)` **默认深层**。`deep: true` 多用于 ref 包对象或强制深听。精确场景优先 `watch(() => state.x, ...)`。

**我的坑：**

---

### P0-15 ✅ watchEffect vs watch
- [ ]

**口述稿（约 45～60 秒）：**

watchEffect 会自动收集回调里用到的响应式依赖，默认立刻执行一次，但拿不到新旧值。

watch 要你手动指定监听源，默认可以不立即执行，回调里能拿到 newValue / oldValue。

需要明确「听谁、对比新旧」用 watch；想图省事自动追踪、立刻跑一遍用 watchEffect。

**要点：** watchEffect **自动收集依赖**、默认立即执行、无新旧值；watch **手动指定源**、默认可不立即、有新旧值。

**我的坑：**

---

### P0-16 🆕 watch 的 flush：`pre` / `post` / `sync`？
- [ ]

**口述稿（约 45～60 秒）：**

flush 控制回调相对组件更新的时机。

默认是 `pre`，在组件更新之前跑。

如果要等 DOM 更新完再读节点，用 `flush: 'post'`，或者用 `watchPostEffect`。

`sync` 是同步触发，一改就跑，容易触发多次，一般少用。

**要点：** 默认 `pre`（组件更新前）；需要 DOM 更新后读节点用 `flush: 'post'`（或 `watchPostEffect`）；`sync` 同步触发少用（易多次）。

**我的坑：**

---

### P0-17 🆕 computed 能有副作用吗？能直接改 computed 吗？
- [ ]

**口述稿（约 40～50 秒）：**

computed 里不应该写副作用，比如发请求、改别的状态，那些放 watch。

默认 computed 是只读的，不能直接赋值。如果确实需要「可读可写」，可以写成 get/set 形式，在 set 里去改真正的源数据。

**要点：** 不应写副作用（请求等放 watch）。默认只读；需要时可写 computed get/set，set 里改源数据。

**我的坑：**

---

## D. setup 与生命周期（Day 4）

### P0-18 ⚠️ setup 执行时机？能否 this？
- [ ]

**口述稿（约 40～50 秒）：**

setup 执行得很早，在 `beforeCreate` 之前，此时 props 已经解析好了。

setup 里没有 this，是 undefined。所以要用 `setup(props, ctx)` 拿 props 和上下文，或者直接用 `<script setup>` 语法。

**要点：** 在 `beforeCreate` 之前（props 已解析）；**无 this**（undefined）。用 `setup(props, ctx)` 或 `<script setup>`。

**我的坑：**

---

### P0-19 ⚠️ 组合式生命周期完整常用列表
- [ ]

**口述稿（约 50～70 秒）：**

常用的是：

挂载：`onBeforeMount` / `onMounted`

更新：`onBeforeUpdate` / `onUpdated`

卸载：`onBeforeUnmount` / `onUnmounted`

keep-alive：`onActivated` / `onDeactivated`

还有 `onErrorCaptured`；调试用 `onRenderTracked` / `onRenderTriggered`；SSR 有 `onServerPrefetch`。

注意：没有 `onBeforeCreate` / `onCreated`，这两段由 setup 本身承担。

**要点：**
`onBeforeMount` / `onMounted`  
`onBeforeUpdate` / `onUpdated`  
`onBeforeUnmount` / `onUnmounted`  
`onActivated` / `onDeactivated`（keep-alive）  
`onErrorCaptured`  
调试：`onRenderTracked` / `onRenderTriggered`  
SSR：`onServerPrefetch`  
**没有** `onBeforeCreate` / `onCreated` → 由 setup 本身承担。

**我的坑：**

---

### P0-20 ✅ onMounted 能否拿 DOM？
- [ ]

**口述稿（约 30～40 秒）：**

能。`onMounted` 时组件已经挂载完成，模板里的 ref 已经指向真实 DOM，可以安全读写。

`onBeforeMount` 时还没有 DOM，这时候拿不到。

**要点：** 能。挂载完成，模板 ref 已指向真实 DOM。`onBeforeMount` 时尚无 DOM。

**我的坑：**

---

### P0-21 ✅ `<script setup>` 相对普通 setup 的便利
- [ ]

**口述稿（约 40～50 秒）：**

`<script setup>` 里顶层声明的变量、函数会自动暴露给模板，不用 return。

还有编译宏：`defineProps`、`defineEmits`、`defineExpose`、`defineModel`，样板代码更少，作用域也更清晰，对性能和 DX 都更友好。现在新组件我基本默认用它。

**要点：** 顶层绑定自动暴露给模板；`defineProps`/`defineEmits`/`defineExpose`/`defineModel`；更少样板；更好的作用域与性能倾向。

**我的坑：**

---

### P0-22 🆕 生命周期钩子为何必须在 setup 同步注册？
- [ ]

**口述稿（约 40～50 秒）：**

组合式的 `onMounted` 这类钩子，依赖「当前正在执行的组件实例」。必须在 setup 同步执行时注册，框架才能把钩子绑到这个实例上。

如果放到 `setTimeout` 或某个异步回调里再调用 `onMounted`，就丢失关联了，会告警或无效。

正确做法是：同步注册钩子，把异步逻辑写在钩子的**回调内部**。

**要点：** 组合式钩子依赖当前活跃实例；放进 `setTimeout`/异步回调再 `onMounted` 会丢失关联或告警。异步逻辑写在钩子**回调内部**，不要异步才注册钩子。

**我的坑：**

---

## E. 组件 API（Day 5）

### P0-23 ⚠️ defineProps 默认值与类型校验
- [ ]

**口述稿（约 45～60 秒）：**

运行时写法里，对象和数组的 default 必须是工厂函数，比如 `default: () => ({})`，否则多实例会共享同一个引用。

用 TS 时常用 `withDefaults(defineProps<{...}>(), { ... })` 给默认值。

面试提一句：props 要声明类型和默认值，对象默认值用工厂。

**运行时：**
```js
defineProps({
  title: { type: String, default: '' },
  user: { type: Object, default: () => ({}) }, // 对象/数组必须工厂函数
})
```
**TS：** `withDefaults(defineProps<{...}>(), { ... })`

**要点：** 对象/数组 `default` 必须工厂函数；TS 用 `withDefaults`。

**我的坑：**

---

### P0-24 ✅ defineEmits 用法；和 Vue2 `$emit` 差异
- [ ]

**口述稿（约 40～50 秒）：**

script setup 里用 `const emit = defineEmits(['change'])`，然后 `emit('change', payload)`。也可以写成带校验的对象形式。

和 Vue2 的差异：Vue3 **推荐显式声明 emits**；没声明的事件会落到 attrs 里。另外 script setup 没有 `this.$emit`，只能用 defineEmits 拿到的 emit。

**要点：** `const emit = defineEmits(['change'])` 或带校验对象；`emit('change', payload)`。  
Vue3 **推荐声明 emits**；未声明事件会进 attrs。script setup 无 `this.$emit`。

**我的坑：**

---

### P0-25 ✅ v-model 在 Vue3 的原理；和 Vue2 区别
- [ ]

**口述稿（约 45～60 秒）：**

Vue3 默认 v-model 是 `modelValue` 这个 prop，加上 `update:modelValue` 这个事件。

还可以多个：`v-model:title` 对应 prop `title` 和事件 `update:title`。

Vue2 默认是 `value` + `input`，另外还有 `.sync`。Vue3 把这套统一了。较新的写法还能用 `defineModel()` 简化子组件。

**要点：** 默认 `modelValue` + `update:modelValue`。  
多 v-model：`v-model:title` → `title` + `update:title`。  
Vue2 默认 `value`+`input`，另有 `.sync`。较新可用 `defineModel()`。

**我的坑：**

---

### P0-26 ✅ defineExpose 做什么？
- [ ]

**口述稿（约 40 秒）：**

`<script setup>` 默认不把内部东西暴露给父组件。父组件用 ref 拿子组件实例时，只能访问你在 `defineExpose({ ... })` 里列出来的方法或属性，比如打开弹窗、校验表单。

这是刻意封装，避免父组件乱摸子组件内部状态。

**要点：** script setup 默认不对外暴露。父级 `ref` 子组件时，只能访问 `defineExpose({...})` 列出的内容（如打开弹窗方法、表单 ref）。

**我的坑：**

---

### P0-27 🆕 defineModel 是什么？（近年变高频）
- [ ]

**口述稿（约 40 秒）：**

`defineModel` 是子组件写 v-model 的语法糖，内部等价于声明 prop + emit update。

比如 `const model = defineModel()` 对应默认的 modelValue；`const title = defineModel('title')` 对应具名 v-model。读写 `model.value` 就会同步到父组件。

**要点：** 简化子组件 v-model 的语法糖，内部等价于 prop + emit。例：`const model = defineModel()`；`const title = defineModel('title')`。

**我的坑：**

---

### P0-28 🆕 props 是单向的，子组件能否改 prop？
- [ ]

**口述稿（约 40～50 秒）：**

不应该直接改 prop，单向数据流：父传下来，子要通过 emit 或 v-model 通知父去改。

如果 prop 是对象，改嵌套属性技术上可能改动到父数据，但这是反模式，面试要明确说不该这么干，容易让数据流变乱、难排查。

**要点：** 不应直接改。改用 emit / v-model；若是对象，改嵌套属性 technically 能改但破坏单向流，面试应说「反模式」。

**我的坑：**

---

## F. 通信与 Pinia（Day 6）

### P0-29 ✅ provide / inject 注意点；如何保持响应式？
- [ ]

**口述稿（约 45～60 秒）：**

provide/inject 是祖先传给后代，跨多层很方便，但不是响应式魔法：如果你 provide 一个普通值，后代拿到的不会自动更新。

要保持响应式，应该 provide `ref` 或 `reactive`。怕被后代乱改，可以 `provide(readonly(state))`，再单独暴露修改方法。

key 可以用 Symbol 防冲突。注意它只能祖先 → 后代，不是任意兄弟通信。

**要点：** 注入普通值不响应式；provide `ref`/`reactive` 才响应式。防篡改用 `readonly`。用 Symbol 作 key 防冲突。仅祖先→后代。

**我的坑：**

---

### P0-30 🆕 Vue3 组件通信方式怎么答一串？
- [ ]

**口述稿（约 45～60 秒）：**

我会按场景说一串：

父子：props / emit，双向用 v-model。

跨多层：provide / inject。

全局同一份状态：Pinia。

偶尔发布订阅：mitt。

不推荐 `$parent` / `$children`，也不要用空 Vue 实例当事件总线——`$on` 已经没了。

**要点：** 父子 props/emit（v-model）；跨多层 provide/inject；全局状态 Pinia；偶尔 mitt；`$parent`/`$children` 不推荐；事件总线不再用 Vue 实例。

**我的坑：**

---

### P0-31 ✅ Pinia vs Vuex（必背对比表）
- [ ]

**口述稿（约 45～60 秒）：**

Pinia 是 Vue3 官方更推荐的方案；Vuex 更多出现在旧项目维护。

API 上 Pinia 就是 state、getters、actions，没有 mutations，心智更简单；TS 支持更好；多 store 自然拆分，不用搞一大套 namespaced 模块；体积也更小。

我在 Vue3 新项目直接用 Pinia；如果维护 Vue2 老项目才继续碰 Vuex。

**要点：**

| | Pinia | Vuex |
|--|--|--|
| 官方态度 | Vue3 推荐 | 维护向，偏旧项目 |
| API | state / getters / actions | + mutations |
| TS | 优秀 | 繁琐 |
| 模块 | 多 store 自然拆分 | namespaced 模块 |
| 体积 | 更小 | 更大 |

**我的坑：**

---

### P0-32 🆕 何时用组件 state / composable / Pinia？
- [ ]

**口述稿（约 40～50 秒）：**

只在本组件用的状态：`ref` / `reactive` 就够。

多处要复用**同一套逻辑**，但每处可以有自己的状态实例：抽 composable，比如 `useXxx()`。

全应用共享**同一份**数据，比如用户信息、权限、主题：用 Pinia。

一句话：局部状态放组件，复用逻辑放 composable，全局唯一状态放 Pinia。

**要点：**
- 仅本组件：`ref`/`reactive`
- 多组件复用**逻辑**：composable（可多份实例）
- 全局**同一份**状态（用户信息、权限）：Pinia

**我的坑：**

---

## Day 7 周测记录

日期：________  
抽题号：________  
合格数：__ / 10  
不及格回炉题号：________  
