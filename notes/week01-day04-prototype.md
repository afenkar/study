# 第1周 · 第4天：原型链

> 关联 Day 3：`new Foo()` 时 this 指向新实例，且 `__proto__` 连到 `Foo.prototype`。

## 今日目标
- ✅ 理解原型链查找机制（自身 → __proto__ → ... → null）
- ✅ 分清 `prototype` / `__proto__` / `constructor`
- ✅ 能说出 new 的 4 步
- ✅ 理解 instanceof 原理
- ✅ 完成 `js-lab/04-prototype-chain` 全部实验
- ✅ 完成练习 E 并通过验证

## 笔记区

### 原型链一句话（自己的版本）
连接实例和构造函数

### 原型链一句话（精炼版，面试用）
> 访问属性时：先找自身，没有则沿 `__proto__` 向上，直到 `null`。

### prototype vs __proto__（自己的版本）
- `prototype` 是构造函数的，是对象，放共享方法
- `__proto__` 是实例的，指向构造函数的 `prototype`

### 关系式（必记）
```
p.__proto__ === Person.prototype
Person.prototype.constructor === Person
```

### new 四步
1. 创建空对象
2. 新对象 `__proto__` → `X.prototype`
3. 以新对象为 this 执行 `X()`
4. 构造函数没有 return 对象 → 返回新对象

### 练习 E
- 题1：p.val = 1，hasOwn = false ✅
- 题2：Object.create(parent) ✅
- 题3：instanceof Foo / Object 都是 true ✅

### 今天还不清楚的
（无则写「无」）

## 复盘 · 2026-07-06
- 今天学了：原型链、prototype/__proto__、new 四步、instanceof
- 搞懂的一个概念：p.val 能读到但 hasOwn 为 false — 属性在 prototype 上不在实例自身
- 还不清楚的：
- 明天优先：Day 5 · 异步与事件循环
