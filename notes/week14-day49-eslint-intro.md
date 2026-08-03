# 第 14 周 · Day 49：ESLint 入门

> Day 47–48 Git 协作已过关。代码能跑还不够——团队要用 **ESLint** 在提交前发现错误、统一风格。

## 今日目标

- ✅ 说清 ESLint 干什么、和 Prettier 的区别
- ✅ 会在项目里跑 `npm run lint` / `lint:fix`
- ✅ 认识常见规则：`no-unused-vars`、`no-console`、`eqeqeq`
- ✅ 完成 `eslint-lab/01-eslint-basics/quiz` 场景自测（10 题）
- ✅ 填写本笔记底部复盘

## 实验位置

| 实验 | 路径 |
|------|------|
| 动手（lint） | `eslint-lab/01-eslint-basics/` |
| 概念自测 | `eslint-lab/01-eslint-basics/quiz/index.html`（Live Server，勿看 `check.js`） |

**得分 10/10** ✅ · `sample.js` lint 通过 ✅

---

## ESLint 是什么（必背）

**ESLint** = JavaScript / Vue 等代码的**静态检查工具**（不运行代码，只分析语法和模式）。

| | 说明 |
|--|------|
| 查什么 | 未使用变量、用 `==`、多余 `console`、潜在 bug |
| 何时跑 | 保存时（IDE）、`npm run lint`、CI 流水线 |
| 价值 | 提前发现问题、团队规范一致、Review 更聚焦逻辑 |

### 一句话

> **ESLint 在代码运行前帮你找问题和坏习惯。**

---

## ESLint vs Prettier（必背 · 易混）

| | ESLint | Prettier |
|--|--------|----------|
| 主要管 | **代码质量 / 逻辑规范** | **代码格式**（缩进、换行、引号） |
| 例子 | 禁止 `==`、未使用变量 | 单行超 80 字符自动换行 |
| 关系 | 常一起用；Prettier 管排版，ESLint 管对错 | |

> 一句话：**Prettier 管好看，ESLint 管对不对。**

---

## 项目里怎么用（必背）

### 安装（了解）

```bash
npm install -D eslint @eslint/js
```

### 配置 · flat config（ESLint 9+ 推荐）

`eslint.config.js`：

```javascript
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'warn',
      eqeqeq: 'error',
    },
  },
];
```

### package.json scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

| 命令 | 干什么 |
|------|--------|
| `npm run lint` | 检查，有问题报 error / warn |
| `npm run lint:fix` | 能自动修的帮你修（**不是所有规则都可 fix**） |

### 哪些能 `--fix`？（必背）

**核心：`--fix` 只改「不用人做判断」的写法**，例如 `let`→`const`、`==`→`===`、多余分号。  
**不能**替你决定「删不删变量」「留不留 console」。

| 规则 | 能否自动修 | 例子 |
|------|------------|------|
| `prefer-const` | ✅ 能 | `let x = 1` 且从未 `x = …` → `const x = 1` |
| `eqeqeq` | ⚠️ **分情况** | 见下方「eqeqeq 为什么 == 不自动改」 |
| `quotes` / `semi` 等格式类 | ✅ 常能 | 引号统一、补分号 |
| `no-unused-vars` | ❌ 不能 | 不知删变量还是你漏写 |
| `no-console` | ❌ 不能 | 不知你要不要保留调试 |

### eqeqeq 为什么 `a == b` 不会 `--fix`？（必背）

ESLint 源码里：**只有两个变量/参数比较时，只给 suggest，不给自动 fix**。

原因：`"1" == 1` 为 true，改成 `===` 就变成 false，**语义会变**。工具不敢替你改，要人手改。

| 写法 | `--fix` 会改吗 |
|------|----------------|
| `typeof x == 'string'` | ✅ 会（typeof 比较安全） |
| `1 == 2`（同类型字面量） | ✅ 会 |
| `a == b`（变量 / 参数） | ❌ **不会**，终端只报 error，需手改或 IDE 里点 Quick Fix |

**副作用：** `if (1 == 2)` 被 `--fix` 改成 `if (1 === 2)` 后，会再触发 **`no-constant-condition`**——条件恒为真/假（死代码）。

| 规则 | 报什么 |
|------|--------|
| `no-constant-condition` | `if (false)`、`if (1 === 2)` 等**常量条件** |

---

## 常见规则（必背）

| 规则 | 级别 | 含义 |
|------|------|------|
| `no-unused-vars` | error | 声明了变量却没用 |
| `no-console` | warn / error | 提醒别留 `console.log` 进生产 |
| `eqeqeq` | error | 要求用 `===` / `!==`，禁止 `==` |
| `no-undef` | error | 用了未定义的变量 |

### 规则级别

| 值 | 含义 |
|----|------|
| `off` / `0` | 关闭 |
| `warn` / `1` | 警告（一般不阻断 build） |
| `error` / `2` | 错误（CI 常设为失败） |

---

## 单行禁用（了解）

确实需要破例时：

```javascript
// eslint-disable-next-line no-console
console.log('debug only');
```

**不要滥用**——Review 时会问为什么关规则。

---

## 实验 A · 跑 lint（约 20 分钟）

在 `eslint-lab/01-eslint-basics/`（需 **Node 18+**，与 Vite 项目相同）：

```bash
npm install
npm run lint
npm run lint:fix
npm run lint          # 手改 sample.js 直到通过
```

---

## 和 Vite / Vue 项目的关系（了解）

真实 Vue 项目常见：

```bash
npm install -D eslint eslint-plugin-vue @eslint/js
```

会配 Vue 专用规则（如 `vue/multi-word-component-names`）。今天先懂**概念 + 基础 JS 规则**，进 `vue-admin` 时再扩。

---

## 场景自测（10 题 · 闭卷）

在 `eslint-lab/01-eslint-basics/quiz/index.html` 选题验证。**得分 10/10** ✅

---

## 笔记区

### ESLint 和 Prettier 你怎么区分？（自己的话）

Prettier 管排版；ESLint 管代码规则和质量。

### 你改代码后最先跑什么命令查问题？（自己的话）

`npm run lint`；能 auto-fix 的先 `npm run lint:fix`，剩下的手改。

## 复盘 · 2026-07-31

- 今天学了：ESLint 配置、lint/lint:fix、常见规则、--fix 边界
- 搞懂的一个概念：`--fix` 只改安全项；变量 `==`、unused、console 要手改
- 还不清楚的：无
- 明天优先：Day 50 · Mock 数据入门
