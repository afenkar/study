# 第 12 周 · Day 42：Cookie / Token 鉴权入门

> Day 40–41 HTTP / 跨域 / 缓存已学。今天搞清登录后**身份怎么保持**：Cookie Session vs Token（JWT）。

## 今日目标

- ✅ 说清 Cookie 是什么、常见属性
- ✅ 能画 Token 鉴权流程（登录 → 存 token → 带 token 请求）
- ✅ 对比 Cookie Session 和 Token 的适用场景
- ✅ 完成 `web-lab/03-cookie-token` 场景自测（10 题）
- ✅ 填写本笔记底部复盘

## 实验位置

`web-lab/03-cookie-token/index.html`（Live Server 打开）

**得分 10/10** ✅

---

## Cookie 是什么（必背）

服务器通过响应头 **`Set-Cookie`** 让浏览器存一小段数据，之后**同源请求自动带上** `Cookie` 头。

```
Set-Cookie: sessionId=abc123; Path=/; HttpOnly; Secure; SameSite=Lax
```

| 属性 | 干什么 |
|------|--------|
| **HttpOnly** | JS 读不到（防 XSS 偷 cookie） |
| **Secure** | 仅 HTTPS 传输 |
| **SameSite** | 限制跨站携带（防 CSRF） |
| **Path / Domain** | 哪些 URL 会带上 |

### Cookie Session 鉴权（传统）

```
1. 登录 POST /login → 服务器验证账号密码
2. 服务器 Set-Cookie: sessionId=xxx
3. 之后每次请求浏览器自动带 Cookie
4. 服务器查 sessionId 对应用户
5. 退出 → 服务器删 session + 清 Cookie
```

> 状态在**服务器**（session 存储）；Cookie 只是「会话 id 凭证」。

---

## Token 鉴权（现代前后端分离常用）

登录成功后服务器返回 **Token**（常见 JWT），前端存起来，之后**每次请求手动带上**。

### JWT 鉴权流程（必画）

```
┌─────────┐                    ┌─────────┐
│  前端   │                    │  后端   │
└────┬────┘                    └────┬────┘
     │  1. POST /login              │
     │  { username, password }      │
     │ ───────────────────────────▶ │
     │                              │ 验证通过
     │  2. 200 { token: "eyJ..." }  │
     │ ◀─────────────────────────── │
     │                              │
     │  3. 存 token（内存/Pinia/    │
     │     localStorage 等）        │
     │                              │
     │  4. GET /api/users           │
     │  Authorization: Bearer eyJ...│
     │ ───────────────────────────▶ │
     │                              │ 验 token → 401/200
     │  5. 200 数据 / 401 跳登录    │
     │ ◀─────────────────────────── │
```

### 前端常见代码

```javascript
// 登录后存 token
localStorage.setItem('token', res.data.token);

// 之后请求带上
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// 或 axios 拦截器统一加
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### 和 Vue 项目的关系

| 层 | 干什么 |
|----|--------|
| Pinia user store | 存 token、用户信息 |
| axios 拦截器 | 自动带 Authorization |
| Router `beforeEach` | 没 token 跳 `/login`（Day 28 学过） |
| 401 响应拦截 | token 过期 → 清 token → 跳登录 |

---

## Cookie Session vs Token（必背）

| | Cookie Session | Token（JWT） |
|--|----------------|--------------|
| 凭证放哪 | 浏览器 Cookie 自动带 | 前端存，手动放 Header |
| 状态存哪 | **服务器** session | 服务器无状态 / 只验签名 |
| 跨域 | Cookie 跨域麻烦 | Header 好配 CORS |
| 前后端分离 | 较少用 | **常用** |
| 防 XSS | HttpOnly Cookie 较安全 | token 放 localStorage 可被 XSS 读走 |

### 一句话

> **Cookie Session = 服务器记状态，Cookie 带 sessionId；Token = 服务器发凭证，前端每次 Authorization 带上。**

---

## 和状态码的关系（复习）

| 码 | 鉴权场景 |
|----|----------|
| **401** | 没 token / token 无效 / 过期 → 跳登录 |
| **403** | 有 token 但没权限 → 提示无权限 |

---

## 场景自测（10 题 · 闭卷）

在实验页选题验证。**得分 10/10**。

---

## 笔记区

### Token 鉴权流程你怎么画？（自己的话）

前端 POST 登录 → 后端返回 token → 前端保存 → 之后请求带 `Authorization: Bearer token` → 后端验 token，有效返回数据，无效/过期 **401** 跳登录。

### Cookie Session 和 Token 你怎么选？（自己的话）

- **Cookie Session**：Cookie 自动带凭证，状态在服务器；同源方便，跨域麻烦；HttpOnly 防 XSS 较好
- **Token**：前端存、Header 手动带；无状态、配 CORS 方便；**前后端分离常用**；token 若放 localStorage 需注意 XSS

## 复盘 · 2026-07-28

- 今天学了：Cookie / Token 鉴权、401 vs 403、和 Pinia / Router 守卫串联
- 搞懂的一个概念：Token 流程能画能讲
- 还不清楚的：无
- 明天优先：Day 43 · 第 12 周 HTTP 复盘
