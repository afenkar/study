// ========== 实验 A：var / let / const ==========
document.getElementById('btn-a').addEventListener('click', () => {
  const lines = [];

  if (true) {
    var a = 'var 在函数作用域';
    let b = 'let 在块级作用域';
    const c = 'const 在块级作用域';
    lines.push(`块内: a=${a}, b=${b}, c=${c}`);
  }

  lines.push(`块外 var a 能访问: ${a}`);
  try {
    // eslint-disable-next-line no-undef
    lines.push(`块外 let b: ${b}`);
  } catch (e) {
    lines.push(`块外 let b 报错: ${e.message}`);
  }

  document.getElementById('out-a').textContent = lines.join('\n');
});

// ========== 实验 B：闭包计数器 ==========
function createCounter(initial = 0) {
  let count = initial; // 被内部函数「关住」的变量

  return {
    increment() {
      count += 1;
      return count;
    },
    decrement() {
      count -= 1;
      return count;
    },
    getValue() {
      return count;
    },
  };
}

const counter = createCounter(0);
const outB = document.getElementById('out-b');

document.getElementById('btn-inc').addEventListener('click', () => {
  counter.increment();
  outB.textContent = `当前值：${counter.getValue()}`;
});

document.getElementById('btn-dec').addEventListener('click', () => {
  counter.decrement();
  outB.textContent = `当前值：${counter.getValue()}`;
});

// ========== 实验 C：循环 + var 的经典坑 ==========
document.getElementById('btn-c').addEventListener('click', () => {
  const container = document.getElementById('buttons-c');
  container.innerHTML = '';

  console.group('实验 C：var 在 for 循环中');
  for (var i = 0; i < 3; i++) {
    const btn = document.createElement('button');
    btn.textContent = `按钮 ${i}`;
    btn.addEventListener('click', () => {
      console.log('var 版本点击，i =', i); // 三个按钮都会打印 3
    });
    container.appendChild(btn);
  }
  console.log('循环结束后 i =', i); // 3
  console.groupEnd();

  console.group('对比：let 版本（自己可以在控制台试）');
  console.log(`
for (let j = 0; j < 3; j++) {
  // 每次迭代 j 都是新的绑定，闭包记住各自的 j
}
  `);
  console.groupEnd();
});
