// ========== 实验 A：原型链查找 ==========
document.getElementById('btn-a').addEventListener('click', () => {
  const lines = [];

  const animal = { eats: true };
  const rabbit = { jumps: true };

  Object.setPrototypeOf(rabbit, animal);

  lines.push(`rabbit.jumps = ${rabbit.jumps}`);
  lines.push(`rabbit.eats = ${rabbit.eats}  ← rabbit 自身没有，沿原型链找到 animal`);

  lines.push('');
  lines.push('查找顺序：rabbit 自身 → rabbit.__proto__(animal) → ... → null');

  lines.push('');
  lines.push(`Object.getPrototypeOf(rabbit) === animal ? ${Object.getPrototypeOf(rabbit) === animal}`);

  document.getElementById('out-a').textContent = lines.join('\n');
});

// ========== 实验 B：prototype 与 __proto__ ==========
document.getElementById('btn-b').addEventListener('click', () => {
  const lines = [];

  function Person(name) {
    this.name = name;
  }

  Person.prototype.sayHi = function () {
    return `Hi, ${this.name}`;
  };

  const p = new Person('张三');

  lines.push('三个容易混的概念：');
  lines.push(`p.__proto__ === Person.prototype → ${p.__proto__ === Person.prototype}`);
  lines.push(`Person.prototype.constructor === Person → ${Person.prototype.constructor === Person}`);
  lines.push(`Person.prototype 是对象，挂共享方法 sayHi`);
  lines.push('');
  lines.push(`p.sayHi() → ${p.sayHi()}`);
  lines.push(`p 自身有 sayHi 吗？ ${Object.hasOwn(p, 'sayHi')}`);
  lines.push(`Person.prototype 有 sayHi 吗？ ${Object.hasOwn(Person.prototype, 'sayHi')}`);

  document.getElementById('out-b').textContent = lines.join('\n');
});

// ========== 实验 C：new 四步 ==========
document.getElementById('btn-c').addEventListener('click', () => {
  const lines = [];

  function Dog(name) {
    this.name = name;
  }
  Dog.prototype.bark = function () {
    return `${this.name} 汪!`;
  };

  const d = new Dog('旺财');

  lines.push('new Dog("旺财") 大致做 4 件事：');
  lines.push('1. 创建空对象 {}');
  lines.push('2. 新对象.__proto__ 指向 Dog.prototype');
  lines.push('3. 以新对象为 this 执行 Dog(name)');
  lines.push('4. 若构造函数没 return 对象，则返回新对象');
  lines.push('');
  lines.push(`d.name → ${d.name}`);
  lines.push(`d.bark() → ${d.bark()}`);
  lines.push(`d instanceof Dog → ${d instanceof Dog}`);

  document.getElementById('out-c').textContent = lines.join('\n');
});

// ========== 实验 D：instanceof ==========
document.getElementById('btn-d').addEventListener('click', () => {
  const lines = [];

  function Animal() {}
  function Dog() {}
  Dog.prototype = Object.create(Animal.prototype);
  Dog.prototype.constructor = Dog;

  const d = new Dog();

  lines.push(`d instanceof Dog → ${d instanceof Dog}`);
  lines.push(`d instanceof Animal → ${d instanceof Animal}`);
  lines.push('');
  lines.push('instanceof 原理：沿 d 的原型链找，能否遇到 X.prototype');
  lines.push('');
  lines.push('原型链：d → Dog.prototype → Animal.prototype → Object.prototype → null');

  document.getElementById('out-d').textContent = lines.join('\n');
});
