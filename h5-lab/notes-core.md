# H5 移动适配 · 核心知识（面试口述版）

> 对应 JD：rem / vw/vh / flex/grid、多分辨率与浏览器兼容

---

## 1. 为什么要适配

手机屏宽从 ~320 到 ~430+，同一套 px 会「要么挤要么空」。目标是：**设计稿等比缩放 + 布局弹性**。

---

## 2. rem 方案（根字体驱动）

```text
设计稿 375px → 约定 1rem = 37.5px（或 100px，看团队）
某元素设计稿 75px → 75 / 37.5 = 2rem
屏宽变了 → 改 html font-size → 所有 rem 一起变
```

常见写法：`html { font-size: calc(100vw / 10) }`（375 时 ≈ 37.5px）。

**面试一句：** rem 适合「整页跟设计稿等比」；改根字号要小心影响全局。

---

## 3. vw / vh 方案

- `1vw` = 视口宽度的 1%
- 直接 `width: 20vw`，不依赖根字号
- `100vh` 在移动端常踩坑：地址栏显隐导致高度跳动 → 用 `100dvh` 或 JS 读 `window.innerHeight`

**rem vs vw：**

| | rem | vw |
|--|-----|-----|
| 依赖 | html font-size | 视口 |
| 控字号 | 方便统一 | 字号也用 vw 时极端屏会过大/过小 |
| 团队 | 老项目多 | 新项目渐多，常配合 clamp |

Demo 采用：**布局用 flex/grid + 间距用 rem；全宽区块可混 vw**。

---

## 4. Flex / Grid 怎么选

- **Flex**：单行/单列、导航、按钮组、卡片横滑
- **Grid**：明确行列的多栏（如 2×N 商品宫格）

不要为了用 Grid 而 Grid；JD 要的是「会选、会排坑」。

---

## 5. 必背兼容坑

| 坑 | 现象 | 对策 |
|----|------|------|
| 安全区 | 刘海/底部横条挡住按钮 | `env(safe-area-inset-*)` + `viewport-fit=cover` |
| 100vh | 微信/Safari 高度抖 | `dvh` 或 JS 设 `--vh` |
| 点击穿透 | 关遮罩后底层被点到 | 遮罩 `touch` 处理 / 延迟关 / `pointer-events` |
| 1px 线 | 视网膜屏看起来粗 | `transform: scaleY(0.5)` 或 `0.5px`（看兼容） |
| 微信浏览器 | 分享、字体、滚动回弹 | 真机调试；少用 hover |

---

## 6. 性能（Demo 用了懒加载）

列表多图时：`loading="lazy"` 或 `IntersectionObserver` 再赋 `src`，减首屏请求。

---

## 7. 30 秒面试稿

> 移动 H5 我一般设计稿按 375，根字号用 vw 算 rem，组件布局用 flex/grid。  
> 底部按钮会加 safe-area。高度不用死 100vh。  
> 弹层注意滚动锁定和点击穿透。多图用懒加载。  
> 真机至少覆盖 iOS Safari 和微信内置浏览器。
