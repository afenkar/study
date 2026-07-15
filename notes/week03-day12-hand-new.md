# 第 3 周 · Day 12：手写 new

> Day 4 你知道 `new` 会建对象；Day 10 用 `class` 仍靠 `new`。今天**自己实现** `myNew`，把四步彻底讲清。

## 今日目标

- [x] 默写 `new` 做的 4 件事
- [x] 理解：构造函数若 `return` 对象，则以该对象为准
- [x] 完成 `js-lab/12-hand-new/myNew.js` 中 TODO
- [x] 通过练习验证
- [x] 填写本笔记底部复盘

## 实验位置

`js-lab/12-hand-new/index.html`（Live Server 打开）

---

## new 四步（必背）

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function () {
  return `Hi, ${this.name}`;
};

const p = new Person('张三');
```

`new Person('张三')` 内部等价于：

```javascript
// 1. 新建空对象
const obj = {};
// 2. 挂上原型：obj.__proto__ = Person.prototype
Object.setPrototypeOf(obj, Person.prototype);
// 3. 用 obj 当 this 执行构造函数
const result = Person.call(obj, '张三');
// 4. 若构造函数返回「对象」，用返回值；否则用 obj
return (result !== null && typeof result === 'object') ? result : obj;
```

| 步骤 | 做什么 |
|------|--------|
| 1 | 创建空对象 |
| 2 | 让空对象的原型指向构造函数的 `prototype` |
| 3 | 把空对象当作 `this` 执行构造函数 |
| 4 | 构造函数返回对象则用返回值，否则用步骤 1 的对象 |

### 一句话

> **new = 建对象 → 连原型 → 当 this 调构造函数 → 决定返回谁。**

---

## 返回值的坑（面试常问）

```javascript
function A() { this.x = 1; return { y: 2 }; }
function B() { this.x = 1; return 123; }

new A(); // → { y: 2 }   返回了对象，丢弃 this
new B(); // → { x: 1 }   返回原始值，忽略，仍用 this
```

---

## 手写 myNew 思路

```javascript
function myNew(Ctor, ...args) {
  const obj = Object.create(Ctor.prototype); // 步骤 1+2
  const result = Ctor.apply(obj, args);      // 步骤 3
  return (result !== null && typeof result === 'object')
    ? result
    : obj;                                   // 步骤 4
}
```

`Object.create(proto)` = 新建对象并把 `[[Prototype]]` 设为 `proto`，一步完成 1+2。

---

## 今日 TODO（myNew.js）

实现 `myNew(Ctor, ...args)`，行为对齐原生 `new`。

---

## 笔记区

### new 四步（自己的话）

1. 创建新对象
2. 新对象连接 prototype（`Object.setPrototypeOf` / `Object.create`）
3. 新对象当做 this 执行构造函数
4. 如果构造函数返回对象则用返回值，否则返回新对象

### 构造函数 `return { a: 1 }` 时，new 的结果是什么？为什么？

结果是 `{ a: 1 }`。因为构造函数返回了对象，new 会用该返回值，丢弃步骤 1 建的 this。

## 复盘 · 2026-07-15

- 今天学了：手写 myNew，new 四步，构造函数 return 对象 vs 原始值
- 搞懂的一个概念：new = 建对象 → 连原型 → 当 this 调构造函数 → 决定返回谁
- 还不清楚的：无
- 明天优先：Day 13 · 防抖与节流
