// ========== 实验 A：隐式绑定 ==========
document.getElementById('btn-a').addEventListener('click', () => {
  const lines = [];

  const user = {
    name: '张三',
    sayHi() {
      lines.push(`user.sayHi() → this.name = ${this.name}`);
    },
  };

  user.sayHi();

  const fn = user.sayHi;
  try {
    fn();
    lines.push(`fn = user.sayHi 再 fn() → this.name = ${this.name ?? '(空)'}`);
  } catch (e) {
    lines.push(`fn() 报错：${e.message}`);
  }

  lines.push('');
  lines.push('规则：函数作为对象方法调用 → this 指向该对象');
  lines.push('      赋值给变量再普通调用 → this 丢失（浏览器非严格模式指向 window）');

  document.getElementById('out-a').textContent = lines.join('\n');
});

// ========== 实验 B：this 丢失 ==========
document.getElementById('btn-b').addEventListener('click', () => {
  const lines = [];

  const counter = {
    count: 0,
    add() {
      this.count += 1;
      return this.count;
    },
  };

  lines.push(`counter.add() → ${counter.add()}`);

  setTimeout(counter.add, 0);
  lines.push('setTimeout(counter.add, 0) 后 count 仍是 0（this 丢失）');
  lines.push(`当前 counter.count = ${counter.count}`);

  setTimeout(() => {
    lines.push(`--- 100ms 后 ---`);
    lines.push(`counter.count 还是 ${counter.count}（add 没加到 counter 上）`);

    counter.add();
    lines.push(`改回 counter.add() → ${counter.count}`);

    const boundAdd = counter.add.bind(counter);
    boundAdd();
    lines.push(`bind 后 boundAdd() → ${counter.count}`);

    document.getElementById('out-b').textContent = lines.join('\n');
  }, 100);

  document.getElementById('out-b').textContent = lines.join('\n');
});

// ========== 实验 C：call / apply / bind ==========
document.getElementById('btn-c').addEventListener('click', () => {
  const lines = [];

  function greet(greeting, punct) {
    return `${greeting}，我是 ${this.name}${punct}`;
  }

  const a = { name: 'Alice' };
  const b = { name: 'Bob' };

  lines.push(`call:  ${greet.call(a, '你好', '!')}`);
  lines.push(`apply: ${greet.apply(b, ['Hi', '.'])}`);

  const greetAlice = greet.bind(a);
  lines.push(`bind:  ${greetAlice('哈喽', '~')}`);
  lines.push(`bind:  ${greetAlice.call({ name: '其他人' }, '测', '试')}`);

  lines.push('');
  lines.push('call(fn, thisArg, ...args)  — 立刻调用，参数逐个传');
  lines.push('apply(fn, thisArg, [args]) — 立刻调用，参数用数组');
  lines.push('bind(fn, thisArg)         — 返回新函数，this 永久绑定');

  document.getElementById('out-c').textContent = lines.join('\n');
});

// ========== 实验 D：箭头函数 ==========
document.getElementById('btn-d').addEventListener('click', () => {
  const lines = [];

  const obj = {
    name: '对象',
    regular() {
      lines.push(`regular: this.name = ${this.name}`);

      setTimeout(function () {
        lines.push(`regular 里 setTimeout 普通函数: this.name = ${this.name ?? '(undefined/window)'}`);
      }, 0);

      setTimeout(() => {
        lines.push(`regular 里 setTimeout 箭头函数: this.name = ${this.name}`);
        lines.push('');
        lines.push('箭头函数没有自己的 this，继承外层（定义时）的 this');
        document.getElementById('out-d').textContent = lines.join('\n');
      }, 50);
    },
  };

  obj.regular();
  document.getElementById('out-d').textContent = '运行中...';
});
