# 第 10 周 · Day 35：性能优化 + DevTools 复盘

> Day 34 性能入门——今天补上 **Vue DevTools**，再**闭卷自测**把第 10 周串起来。

## 今日目标

- ✅ 安装并打开 Vue DevTools，认 Components / Pinia 面板
- ✅ 完成 `vue-lab/16-week10-review` 自测（10 题）
- ✅ 闭卷口述：v-if/v-show、key、keep-alive、先测量再优化
- ✅ 错题回看 Day 34 笔记
- ✅ 填写本笔记底部复盘

## 实验位置

- 自测：`vue-lab/16-week10-review/index.html`（Live Server）
- 复习实验：`vue-lab/15-performance/index.html`（v-if / v-show DOM 对比）

---

## 知识地图（Day 34 + DevTools）

| 概念 | 一句话 |
|------|--------|
| v-if | 不满足时不渲染 DOM，切换开销大 |
| v-show | 始终渲染，CSS 隐藏，频繁切换用 |
| :key | 稳定唯一 id，别用 index |
| keep-alive | Tab 切换缓存组件实例、保留状态 |
| 懒加载 | `() => import()` 减小首包 |
| computed | 派生数据缓存，别在 template 里重复算 |
| DevTools | 先测量再优化，别盲目改代码 |

### 一句话串讲

> **频繁显隐 v-show，大块少用 v-if；列表 key 用 id；Tab 留状态 keep-alive；优化前开 DevTools 看。**

---

## Vue DevTools 入门（今天新学）

### 安装

1. Chrome / Edge 扩展商店搜 **Vue.js devtools**
2. 打开本地 Vue 页面（须 **Live Server** 或 dev server，不要直接 file://）
3. F12 → 顶部出现 **Vue** 标签

### 常用面板

| 面板 | 干什么 |
|------|--------|
| **Components** | 看组件树、props、data、computed |
| **Pinia** | 看 store 的 state / getters，改值调试 |
| **Timeline** | 看组件更新、事件（Vue 3 较新版本） |

### 调试习惯

1. **先看数据对不对** — Components 里找当前组件，看 ref 是否 `.value` 解包后的值
2. **再看谁触发了更新** — Timeline 或 Performance 面板
3. **别凭感觉优化** — 先定位慢在哪，再决定 v-if / computed / 懒加载

---

## 口述清单（15 分钟）

1. **v-if 和 v-show 怎么选？**

频繁切换 → v-show；很少出现的大块 → v-if。

2. **为什么 list 不用 index 当 key？**

增删、排序时 index 变，DOM 复用导致状态错乱。

3. **Tab 切换输入框内容要保留？**

`<keep-alive>` 缓存组件实例，不是只用 v-show。

4. **路由懒加载写法？**

`component: () => import('./Page.vue')`

5. **优化第一步？**

DevTools / Performance **先测量**，再改。

---

## 场景自测

在实验页选题验证。**得分 10/10** — 第 10 周过关。

---

## 笔记区

### 今天最容易忘的一点

DevTools 三步：先看值对不对 → 再看谁触发更新 → 最后才谈优化。

### 口述自检（过/不过）

- v-if / v-show：**过** — 频繁切换 v-show；不频繁 v-if（创建/销毁）
- key 与 index：**过** — key 用唯一 id；index 增删改时引用错乱
- keep-alive：**过** — 缓存组件实例
- DevTools 用途：**过** — 装插件，先看值再看触发源再优化

## 复盘 · 2026-07-23

- 今天学了：Vue DevTools 面板 + 第 10 周闭卷复盘 10/10
- 搞懂的一个概念：keep-alive 与 v-show 分工清楚；优化前先测量
- 还不清楚的：无
- 明天优先：Day 36 · 第 2 阶段总复盘
