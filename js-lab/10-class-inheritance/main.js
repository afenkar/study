import { runShapeTests, runConceptChecks, conceptAnswers } from './exercise.js';

// 实验 A
document.getElementById('btn-a').addEventListener('click', () => {
  const lines = [];

  class Person {
    constructor(name) { this.name = name; }
    sayHi() { return `Hi, ${this.name}`; }
  }

  const p = new Person('张三');

  lines.push('class 写法：');
  lines.push(`p.sayHi() → ${p.sayHi()}`);
  lines.push(`p.__proto__ === Person.prototype → ${p.__proto__ === Person.prototype}`);
  lines.push(`sayHi 在 prototype 上？ ${Object.hasOwn(Person.prototype, 'sayHi')}`);
  lines.push('');
  lines.push('结论：class 是语法糖，底层仍是 prototype + new');

  document.getElementById('out-a').textContent = lines.join('\n');
});

// 实验 B
document.getElementById('btn-b').addEventListener('click', () => {
  const lines = [];

  class Animal {
    constructor(name) { this.name = name; }
    speak() { return `${this.name} makes a sound`; }
  }

  class Dog extends Animal {
    constructor(name, breed) {
      super(name);
      this.breed = breed;
    }
    speak() {
      return `${super.speak()} (${this.breed})`;
    }
  }

  const d = new Dog('旺财', '柴犬');

  lines.push(`d.speak() → ${d.speak()}`);
  lines.push(`d instanceof Dog → ${d instanceof Dog}`);
  lines.push(`d instanceof Animal → ${d instanceof Animal}`);
  lines.push('');
  lines.push('extends 建立原型链：Dog.prototype → Animal.prototype');

  document.getElementById('out-b').textContent = lines.join('\n');
});

// 实验 C
document.getElementById('btn-c').addEventListener('click', () => {
  const lines = [];

  class Counter {
    constructor() { this.n = 0; }
    inc() { this.n += 1; }
    static create() { return new Counter(); }
  }

  const c = Counter.create();
  c.inc();

  lines.push(`Counter.create() → 静态工厂方法`);
  lines.push(`c.n → ${c.n}`);
  lines.push(`c.create 存在吗？ ${Object.hasOwn(c, 'create')}`);
  lines.push(`Counter.create 存在吗？ ${typeof Counter.create === 'function'}`);

  document.getElementById('out-c').textContent = lines.join('\n');
});

// 练习 E
document.getElementById('btn-e').addEventListener('click', () => {
  const out = document.getElementById('out-e');
  const shapeErrors = runShapeTests();
  const conceptErrors = runConceptChecks(conceptAnswers);
  const all = [...shapeErrors, ...conceptErrors];

  out.textContent = all.length === 0
    ? '✅ shapes + 概念题全部通过！'
    : '❌ ' + all.join('；');
});
