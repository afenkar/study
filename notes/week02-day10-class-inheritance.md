# 第 2 周 · Day 10：Class 与继承

> Day 4 你学了**原型链**；`class` 是原型继承的**语法糖**，写起来像 Java，底层仍是 prototype。

## 今日目标

- [ ] 说清 `class` 和构造函数 + prototype 的等价关系
- [ ] 会用 `extends` / `super` 实现继承
- [ ] 完成 `js-lab/10-class-inheritance/shapes.js` 中 3 个 TODO
- [ ] 通过练习 E 验证
- [ ] 填写本笔记底部复盘

## 实验位置

`js-lab/10-class-inheritance/index.html`（Live Server 打开）

---

## class 是语法糖（必背）

```javascript
// ES6 class 写法
class Person {
  constructor(name) { this.name = name; }
  sayHi() { return `Hi, ${this.name}`; }
}

// 等价于 Day 4 写法
function Person(name) { this.name = name; }
Person.prototype.sayHi = function () { return `Hi, ${this.name}`; };
```

**底层没变：** `new Person()` 仍走 new 四步；方法仍在 `Person.prototype` 上。

---

## extends + super

```javascript
class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} makes a sound`; }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);           // 必须先调！相当于 Animal.call(this, name)
    this.breed = breed;
  }
  speak() {
    return `${super.speak()} (${this.breed})`;  // 调父类方法
  }
}
```

| 关键字 | 作用 |
|--------|------|
| `extends` | 建立原型链：`Dog.prototype.__proto__ → Animal.prototype` |
| `super()` | 在子类 constructor 里调父类 constructor |
| `super.method()` | 在子类方法里调父类方法 |

---

## static 静态方法

```javascript
class MathUtil {
  static add(a, b) { return a + b; }
}
MathUtil.add(1, 2);  // 3 — 挂在类上，不在实例上
```

---

## 今日 TODO（shapes.js）

1. 完成 `Animal` 的 `constructor` 和 `area()`
2. 完成 `class Circle extends Shape`（super + 重写 area）
3. 完成 `class Rect extends Shape`

---

## 笔记区

### class 和 prototype 的关系（自己的话）
class 原理是prototype+new
# class是语法糖；方法在prototype上；new四步不变

### super 为什么必须在 constructor 里先调用？
要先绑定父类
（填写）
# 子类constructor必须先super()，否则this未初始化，不能访问this.xxx

## 复盘 · YYYY-MM-DD

- 今天学了：
- 搞懂的一个概念：
- 还不清楚的：
- 明天优先：Day 11 · 深拷贝与浅拷贝
