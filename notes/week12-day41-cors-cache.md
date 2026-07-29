# 第 12 周 · Day 41：跨域 CORS + 缓存入门

> Day 40 搞清了 HTTP 基础。今天解决两个前端天天碰的问题：**跨域报错** 和 **浏览器缓存**。

## 今日目标

- ✅ 说清同源策略、跨域是什么、CORS 谁来解决
- ✅ 知道强缓存 vs 协商缓存的区别
- ✅ 完成 `web-lab/02-cors-cache` 场景自测（10 题）
- ✅ 填写本笔记底部复盘

## 实验位置

`web-lab/02-cors-cache/index.html`（Live Server 打开）

---

## 同源 vs 跨域（必背）

**同源** = 协议 + 域名 + 端口 **三者都相同**。

| URL A | URL B | 跨域？ |
|-------|-------|--------|
| `http://a.com:80` | `http://a.com:80/api` | ❌ 同源 |
| `http://a.com` | `https://a.com` | ✅ 协议不同 |
| `http://a.com` | `http://b.com` | ✅ 域名不同 |
| `http://a.com:5173` | `http://a.com:3000` | ✅ 端口不同 |

### 浏览器同源策略

浏览器默认：**JS 只能读同源服务器的响应**。跨域请求发得出去，但 JS **读不到**响应 → 控制台报 CORS 错误。

---

## CORS 跨域资源共享（必背）

**CORS** = 服务器通过响应头告诉浏览器：「我允许这个源访问」。

### 关键响应头

```
Access-Control-Allow-Origin: https://your-app.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

| 角色 | 干什么 |
|------|--------|
| **浏览器** | 检查响应头，决定是否把结果给 JS |
| **服务器** | 配 CORS 响应头（**后端解决**） |
| **前端** | 正常发请求；dev 阶段可用 **Vite proxy** 转发 |

### 简单请求 vs 预检（了解）

| | 简单请求 | 非简单请求（如带自定义头、PUT） |
|--|----------|----------------------------------|
| 流程 | 直接发 | 先发 **OPTIONS** 预检，通过后再发真实请求 |
| 预检 | 无 | 服务器返回 Allow-Origin / Allow-Methods 等 |

### dev 常见解法

```javascript
// vite.config.js — 开发时把 /api 代理到后端，浏览器看来是同源
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
```

> **经典一句：** 跨域是浏览器安全策略；生产靠后端 CORS；本地 dev 常用 Vite proxy。

---

## HTTP 缓存（必背）

目的：**少发请求、加快加载**。

### 强缓存 vs 协商缓存

| | 强缓存 | 协商缓存 |
|--|--------|----------|
| 问服务器吗 | **不问**，直接用本地 | **要问**服务器资源有没有变 |
| 关键 Header | `Cache-Control: max-age=3600` | `ETag` / `Last-Modified` |
| 命中时 | 200 (from disk cache) | **304** Not Modified，用本地副本 |
| 失效时 | 过期后进入协商或直接下载 | **200** + 新内容 |

#### 易错澄清

- **强缓存命中**：在 `max-age` 内 → **不问服务器**，DevTools 显示 `200 (from cache)`
- **协商缓存命中**：强缓存过期后 → **问服务器** → 没变返回 **304**（不传完整文件），变了返回 **200 + 新文件**
- 协商缓存不是看「过没过期」，而是看「资源变没变」

### Cache-Control 常见值

| 值 | 意思 |
|----|------|
| `max-age=31536000` | 1 年内强缓存（适合带 hash 的 js/css） |
| `no-cache` | 可以存，但用前必须协商 |
| `no-store` | 完全不缓存 |

### 和 Vite build 的关系

`dist/assets/index-xxxxx.js` 文件名带 **hash** → 可以设长期强缓存；`index.html` 通常 **不缓存** 或短缓存，保证能拉到最新入口。

---

## 场景自测（10 题 · 闭卷）

在实验页选题验证。**得分：完成 ✅**

---

## 笔记区

### 跨域是谁的问题，谁来解决？（自己的话）

**浏览器**同源策略限制 JS 读跨域响应；**后端**配 `Access-Control-Allow-Origin` 等响应头；dev 可用 Vite proxy。

### 强缓存和协商缓存你怎么记？（自己的话）

- **强缓存**：`max-age` 内不问服务器，直接用本地（200 from cache）；过期后再协商或重新下载
- **协商缓存**：问服务器变没变；**没变 → 304 用本地**；**变了 → 200 下新文件**

## 复盘 · 2026-07-27

- 今天学了：同源 / CORS / 强缓存 vs 协商缓存、Vite proxy
- 搞懂的一个概念：304 = 问了服务器、内容没变、继续用本地
- 还不清楚的：无（协商缓存「问变没变」已理清）
- 明天优先：Day 42 · Cookie / Token 鉴权入门
