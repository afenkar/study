# 第 10 周 · Day 34：性能优化入门

> 组合式 API 主线已走完。性能优化不是「一上来就优化」——先知道**常见手段**和**使用场景**。

## 今日目标

- ✅ 说清 v-if / v-show、key、懒加载的区别与场景
- ✅ 完成 `vue-lab/15-performance` 场景自测（10 题）
- ✅ 观察实验 A 中 v-if / v-show 的 DOM 差异
- ✅ 填写本笔记底部复盘

## 实验位置

`vue-lab/15-performance/index.html`（Live Server 打开）

---

## v-if vs v-show（必背）

| | v-if | v-show |
|--|------|--------|
| 原理 | 不满足时**不渲染** DOM | 始终渲染，用 CSS `display:none` 隐藏 |
| 切换开销 | 高（创建/销毁） | 低（只切 CSS） |
| 适用 | 很少出现的大块内容 | **频繁**切换的显隐 |

### 一句话

> **频繁切换用 v-show；很少渲染用 v-if。**

---

## list 的 key（必背）

```html
<li v-for="item in list" :key="item.id">{{ item.name }}</li>
```

- `:key` 要**稳定唯一**（用 id，别用 index）
- index 作 key：列表增删/排序时，可能**状态错乱**、多余 DOM 复用

---

## keep-alive（易错）

Tab 切换要**保留输入框 / 组件状态** → 用 `<keep-alive>` 缓存组件实例，不是只用 v-show。

### 实验 B：动手看效果

打开 `vue-lab/15-performance/index.html` → **实验 B**：

1. 在左边 **无 keep-alive** 的 Tab A 输入框打字
2. 切到 Tab B，再切回 Tab A → **输入被清空**（组件销毁重建）
3. 在右边 **有 keep-alive** 重复同样操作 → **输入还在**

```html
<!-- 无 keep-alive：切换 Tab 会销毁组件 -->
<component :is="activeComp" :key="tab" />

<!-- 有 keep-alive：只包一个子节点，缓存组件实例 -->
<keep-alive>
  <component :is="activeComp" :key="tab" />
</keep-alive>
```

> `<keep-alive>` 编译期只能有**一个**子组件；用 `<component :is>` 动态切换，并加 `:key="tab"` 分别缓存 Tab A / Tab B。

---

## 路由 / 组件懒加载（了解）

```javascript
{ path: '/admin', component: () => import('./AdminPage.vue') }
```

首屏不需要的页面，**按需加载**，减小首包体积。

---

## 其他常考点

| 手段 | 场景 |
|------|------|
| computed 缓存 | 派生数据，避免 template 里重复计算 |
| keep-alive | Tab 切换保留组件状态 |
| 先测量再优化 | DevTools / Performance，别盲目改 |

---

## 场景自测

在实验页选题验证。**得分 9/10**（第 9 题 keep-alive vs v-show 已搞懂）。

---

## 笔记区

### v-if 和 v-show 你怎么选？（自己的话）

频繁切换用 v-show（开销小）；很少切换用 v-if（不满足时不渲染 DOM）。

### 为什么 list 不建议用 index 当 key？（自己的话）

增删、排序时 index 会变，Vue 复用 DOM 容易状态错乱。

## 复盘 · 2026-07-22

- 今天学了：v-if/v-show、key、懒加载、keep-alive；场景自测 9/10
- 搞懂的一个概念：Tab 留状态用 keep-alive，不是 v-show
- 还不清楚的：无
- 明天优先：Day 35 · 第 10 周复盘 / 第 2 阶段小结
