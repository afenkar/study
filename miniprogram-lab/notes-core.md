# 微信小程序 · 核心知识（面试口述版）

> 对应 JD：底层框架、组件、API、性能优化

---

## 1. 和 H5 最大的不同

小程序是 **双线程**：

- **逻辑层**（JS）：跑业务，不能直接操 DOM
- **渲染层**（WebView）：WXML/WXSS 渲染

通信靠桥：`setData` 把数据序列化后发给渲染层 → **频繁/大数据 setData 会卡**。

**面试一句：** 不是改了 data 就立刻像 Vue 那样细粒度更新；要想好「只传变化的字段」。

---

## 2. 必备结构

```text
app.js / app.json / app.wxss     全局
pages/xxx/xxx.js|json|wxml|wxss  页面四件套
components/                      自定义组件
```

`app.json` 配 `pages` 路由、窗口样式、tabBar（本 demo 无 tab）。

---

## 3. 生命周期（常考）

| 层级 | 常见钩子 |
|------|----------|
| App | `onLaunch` / `onShow` / `onHide` |
| Page | `onLoad`（一次，带 query）→ `onShow` → `onReady` → `onHide` → `onUnload` |

详情页用 `onLoad(options)` 读 `id`。

---

## 4. 组件

- 内置：`view` `text` `image` `button` `scroll-view` …
- 自定义：`Component({ properties, data, methods })`，页面 json 里 `usingComponents`

和 Vue 对比：properties ≈ props；没有完整 VDOM，更新靠 setData。

---

## 5. 常用 API

- 网络：`wx.request`（注意合法域名；开发期可勾「不校验」）
- 存储：`wx.setStorageSync` / `getStorageSync`
- 路由：`wx.navigateTo` / `redirectTo` / `navigateBack`
- 登录：`wx.login` → code 换 session（需后端；本 demo 用本地 mock）

---

## 6. 性能（能讲 3 点就够）

1. **少 setData**：合并字段；别把超大列表每次全量塞
2. **长列表**：分页 / 虚拟思路；图片加宽高，避免抖动
3. **分包**：主包只留启动必需；本 demo 仅 3 页，**暂不分包**，上线业务大了再拆 `subpackages`

---

## 7. 30 秒面试稿

> 小程序双线程，视图更新靠 setData，所以我写列表会控制字段粒度。  
> 页面用 onLoad 接参数，网络用 wx.request，登录走 wx.login + 后端换票。  
> 组件拆自定义组件复用。包体积大就主包+分包。  
> 和 Vue 后台经验能迁移的是工程意识与接口联调，差异在运行时模型。
