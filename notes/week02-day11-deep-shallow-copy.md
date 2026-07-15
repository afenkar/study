# 第 2 周 · Day 11：深拷贝与浅拷贝

> 对象赋值传的是**引用**。改副本却改到原对象——面试高频坑。今天要分清浅拷贝 / 深拷贝，并手写一个 `deepClone`。

## 今日目标

- [x] 说清赋值、浅拷贝、深拷贝三者区别（一句话）
- [x] 知道 `Object.assign` / 展开运算只是浅拷贝
- [x] 知道 `JSON.parse(JSON.stringify)` 的局限
- [x] 完成 `js-lab/11-deep-shallow-copy/deepClone.js` 中 TODO
- [x] 通过练习验证
- [x] 填写本笔记底部复盘

## 实验位置

`js-lab/11-deep-shallow-copy/index.html`（Live Server 打开）

---

## 赋值 vs 浅拷贝 vs 深拷贝（必背）

```javascript
const a = { x: 1, nest: { y: 2 } };

// 1. 赋值：同一个引用
const b = a;
b.x = 9;          // a.x 也变了

// 2. 浅拷贝：第一层新对象，嵌套仍共享
const c = { ...a };           // 或 Object.assign({}, a)
c.x = 9;          // a.x 不变 ✅
c.nest.y = 9;     // a.nest.y 也变了 ❌

// 3. 深拷贝：每一层都新建
const d = deepClone(a);
d.nest.y = 9;     // a.nest.y 不变 ✅
```

| 方式 | 第一层 | 嵌套对象 |
|------|--------|----------|
| `=` 赋值 | 共享 | 共享 |
| 浅拷贝 | 新的 | **仍共享** |
| 深拷贝 | 新的 | **也是新的** |

### 一句话

> **浅拷贝只复制一层；深拷贝递归复制所有层，改副本不影响原对象。**

---

## 常见浅拷贝写法

```javascript
const copy1 = { ...obj };
const copy2 = Object.assign({}, obj);
const arrCopy = [...arr];
```

数组的 `slice`、`concat` 也是浅拷贝。

---

## JSON 深拷贝的坑

```javascript
const clone = JSON.parse(JSON.stringify(obj));
```

能拷普通对象/数组，但会丢：

| 类型 | 结果 |
|------|------|
| `undefined` / `function` / `Symbol` | 丢失或变成 `null` |
| `Date` | 变成字符串 |
| `Map` / `Set` / `RegExp` | 变成 `{}` |
| 循环引用 | 直接报错 |

面试可以说：**简单数据用 JSON 够用；要稳就手写递归 / 用 structuredClone。**

---

## 手写 deepClone 思路

```javascript
function deepClone(value) {
  if (value === null || typeof value !== 'object') return value; // 原始类型直接返回
  if (Array.isArray(value)) return value.map((item) => deepClone(item));
  const result = {};
  for (const key of Object.keys(value)) {
    result[key] = deepClone(value[key]);
  }
  return result;
}
```

今日要求：支持**普通对象 + 数组 + 嵌套**即可（Date / 循环引用进阶，先不要求）。

---

## 今日 TODO（deepClone.js）

实现 `deepClone(value)`：

1. 原始类型（含 `null`）直接返回
2. 数组：逐项递归
3. 普通对象：逐 key 递归

---

## 笔记区

### 赋值 / 浅拷贝 / 深拷贝区别（自己的话）
赋值：同一个引用，第一层和嵌套都共享
浅拷贝：第一层新建，嵌套对象仍共享
深拷贝：每一层都新建，改副本不影响原对象

### 为什么 `{ ...obj }` 改 nest 会影响到原对象？
因为这是浅拷贝，只新建了第一层；`nest` 仍是同一个引用，所以改 `nest.y` 会动到原对象

## 复盘 · 2026-07-14

- 今天学了：赋值 / 浅拷贝 / 深拷贝区别，JSON 深拷贝的坑，手写 deepClone
- 搞懂的一个概念：浅拷贝只拷一层，嵌套仍共享；深拷贝递归新建每一层
- 还不清楚的：无
- 明天优先：Day 12 · 手写 new
