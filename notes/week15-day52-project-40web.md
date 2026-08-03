# 第 15 周 · Day 52：40WEB 项目（启动）

> 第 3 阶段工程化已复盘完。不再从零做 `vue-admin`——用你手上的 **RT9800 网管（40WEB）** 当求职主项目，今天做**结构梳理 + 鉴权流程讲稿**。

## 今日目标

- [ ] 读 `interview/project-portfolio.md`，确认三个项目定位
- [ ] 打开 40WEB，对照笔记填「我负责的模块」和「3 个亮点」
- [ ] 闭卷口述：登录 → 进页 → 刷新恢复（5 分钟）
- [ ] 过 `interview/project-40web-faq.md` 前 11 题（登录 + 路由）
- [ ] 填写本笔记底部复盘

## 项目位置（本机 · 勿提交 Study）

| 项目 | 路径 |
|------|------|
| **主项目 40WEB** | `Z:\RTC\01_RT9000\01MAC\RT9800_NOOS\40WEB` |
| 副项目 BUSINESS | `Z:\RTC\01_RT9000\04GUI\xiongy\BUSINESS` |
| 维护 30_WEB | `Z:\RTC\01_RT9000\04GUI\30_WEB` |

Study 内文档：

| 文档 | 用途 |
|------|------|
| `interview/project-portfolio.md` | 项目档案 + 简历模板 |
| `interview/project-40web-faq.md` | 40WEB 面试追问清单 |

---

## 40WEB 技术栈（必记）

| 类别 | 选型 |
|------|------|
| 框架 | Vue 3.5 + Composition API |
| 构建 | Vite 5 |
| 状态 | Pinia（user / permission / settings …） |
| 路由 | Vue Router 4 · **Hash 模式** |
| UI | Ant Design Vue 4 |
| 请求 | axios |
| 规范 | ESLint + Prettier |
| 其他 | vue-i18n、mock |

---

## 目录速查

```
40WEB/src/
├── router/index.js      ← beforeEach 鉴权
├── stores/user.js       ← login / ensureAuth / getInfo
├── utils/auth.js        ← Token 读写
├── api/user.js          ← 登录接口
├── views/Login.vue
├── views/home/          ← 嵌套子路由
├── views/Mac/           ← 设备配置（业务重点）
└── views/Upgrade/       ← 升级
```

---

## 鉴权流程（必背 · 对照代码）

```
用户打开 /
    ↓
Login → login API → setToken → userStore
    ↓
进入 /home/* 
    ↓
beforeEach: getToken() 
    ↓ 有 token
userStore.ensureAuth() → getInfo() → roles 写入
    ↓ 失败
resetToken() → 重定向 /
```

### 代码锚点（打开对照）

| 步骤 | 文件 |
|------|------|
| 守卫入口 | `router/index.js` → `beforeEach` |
| 刷新恢复 | `stores/user.js` → `ensureAuth`、`authReadyPromise` |
| Token | `utils/auth.js` |
| 登出清理 | `userStore.resetToken` |

### 面试一句话

> **Hash 路由部署简单；Token + beforeEach ensureAuth；刷新用 getInfo 恢复 roles，失败清空回登录。**

---

## 今日作业（填进 portfolio）

打开 `interview/project-portfolio.md`，补充：

### 1. 你最熟的 2～3 个模块（40WEB）

| 模块 | 我负责的内容 |
|------|----------------|
| （例：Login + 鉴权） | |
| | |
| | |

### 2. 三个亮点 / 难点（STAR 各一行）

1. **S** 情境 **T** 任务 **A** 做法 **R** 结果  
2.  
3.  

### 3. BUSINESS 补充（可选）

- 是否上线：已上线
- 最熟后台页：

---

## 口述清单（5 分钟 × 2 遍）

1. 40WEB 做什么？谁用？
2. 为什么 Vue3 + Vite + Pinia？
3. 登录到进首页数据流？
4. 刷新为什么还能登录？
5. 和 30_WEB（Vue2）比，你更熟悉哪套？

---

## 笔记区

### 今天对照代码新搞懂的一点

（自己填）

### project-40web-faq 前 11 题自评

- 能答：__ / 11
- 需回看代码题号：

## 复盘 · YYYY-MM-DD

- 今天学了：
- 搞懂的一个概念：
- 还不清楚的：
- 明天优先：Day 53 · BUSINESS 全栈讲稿 + 简历项目描述
