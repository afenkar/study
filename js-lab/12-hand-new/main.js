import { myNew } from './myNew.js';
import { runNewTests, runConceptChecks, conceptAnswers } from './exercise.js';

// 实验 A：new 四步
document.getElementById('btn-a').addEventListener('click', () => {
  const lines = [];

  function Person(name) {
    this.name = name;
  }
  Person.prototype.sayHi = function () {
    return `Hi, ${this.name}`;
  };

  // 手动模拟 new 四步
  const obj = Object.create(Person.prototype);
  Person.call(obj, '李四');

  lines.push('手动四步（不用 new）：');
  lines.push(`obj.name → ${obj.name}`);
  lines.push(`obj.sayHi() → ${obj.sayHi()}`);
  lines.push(`obj instanceof Person → ${obj instanceof Person}`);
  lines.push('');
  lines.push('1 建对象  2 连原型  3 当 this 调构造函数  4 返回对象');

  document.getElementById('out-a').textContent = lines.join('\n');
});

// 实验 B：return 对象 vs 原始值
document.getElementById('btn-b').addEventListener('click', () => {
  const lines = [];

  function A() {
    this.x = 1;
    return { y: 2 };
  }
  function B() {
    this.x = 1;
    return 123;
  }

  const a = new A();
  const b = new B();

  lines.push(`new A() 且 return {y:2} → ${JSON.stringify(a)}（用返回的对象）`);
  lines.push(`new B() 且 return 123  → ${JSON.stringify(b)}（忽略原始值，用 this）`);
  lines.push('');
  lines.push('规则：只有 return「对象」才会替换 new 的结果');

  document.getElementById('out-b').textContent = lines.join('\n');
});

// 实验 C：myNew 对比
document.getElementById('btn-c').addEventListener('click', () => {
  const lines = [];

  function Dog(name) {
    this.name = name;
  }
  Dog.prototype.bark = function () {
    return `${this.name}: wang`;
  };

  try {
    const native = new Dog('旺财');
    const custom = myNew(Dog, '旺财');

    lines.push(`原生 new:  ${native.bark()}`);
    lines.push(`myNew:     ${custom.bark()}`);
    lines.push(`自定义 instanceof Dog → ${custom instanceof Dog}`);
    lines.push(`原型相同？ ${Object.getPrototypeOf(native) === Object.getPrototypeOf(custom)}`);
    lines.push('');
    lines.push(
      custom.name === '旺财' && custom instanceof Dog
        ? '✅ myNew 行为对齐原生 new'
        : '❌ 还不对，检查 myNew.js'
    );
  } catch (e) {
    lines.push(`❌ ${e.message}`);
    lines.push('先完成 myNew.js 的 TODO');
  }

  document.getElementById('out-c').textContent = lines.join('\n');
});

// 练习 E
document.getElementById('btn-e').addEventListener('click', () => {
  const out = document.getElementById('out-e');
  const newErrors = runNewTests();
  const conceptErrors = runConceptChecks(conceptAnswers);
  const all = [...newErrors, ...conceptErrors];

  out.textContent = all.length === 0
    ? '✅ myNew + 概念题全部通过！'
    : '❌ ' + all.join('；');
});
