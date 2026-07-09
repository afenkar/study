// ========== 实验 A：var 变量提升 ==========
document.getElementById('btn-a').addEventListener('click', () => {
  const lines = [];

  lines.push('--- 代码等价于下面这样执行 ---');
  lines.push('// 创建阶段：var a 被提升，初始值 undefined');
  lines.push('// 执行阶段：');

  var a;
  lines.push(`第1行 console.log(a) → ${a}`); // undefined

  a = 10;
  lines.push(`第2行 a = 10 之后 → ${a}`);

  document.getElementById('out-a').textContent = lines.join('\n');
});

// ========== 实验 B：let 暂时性死区 ==========
document.getElementById('btn-b').addEventListener('click', () => {
  const lines = [];

  try {
    // eslint-disable-next-line no-undef
    lines.push(`console.log(b) → ${b}`);
  } catch (e) {
    lines.push(`console.log(b) 报错：${e.message}`);
    lines.push('');
    lines.push('原因：let 虽也提升，但在声明前处于「暂时性死区」');
    lines.push('      不能访问，所以是 ReferenceError 而不是 undefined');
  }

  let b = 20;
  lines.push(`let b = 20 之后 → b = ${b}`);

  document.getElementById('out-b').textContent = lines.join('\n');
});

// ========== 实验 C：函数声明 vs 函数表达式 ==========
document.getElementById('btn-c').addEventListener('click', () => {
  const lines = [];

  // 函数声明：整体提升，创建阶段就可用
  lines.push(`声明式 foo() → ${foo()}`);

  function foo() {
    return '函数声明：创建阶段就可用';
  }

  // 函数表达式：只有 var fn 提升为 undefined，赋值在执行阶段
  lines.push(`表达式 bar 的类型 → ${typeof bar}`);

  try {
    lines.push(`调用 bar() → ${bar()}`);
  } catch (e) {
    lines.push(`调用 bar() 报错：${e.message}`);
  }

  var bar = function () {
    return '函数表达式：执行到赋值后才能用';
  };

  lines.push(`赋值后 bar() → ${bar()}`);

  document.getElementById('out-c').textContent = lines.join('\n');
});

// ========== 实验 D：创建阶段 vs 执行阶段 ==========
document.getElementById('btn-d').addEventListener('click', () => {
  const lines = [];

  lines.push('函数执行分两步：');
  lines.push('1. 创建阶段：扫描变量/函数声明，分配内存');
  lines.push('2. 执行阶段：逐行运行赋值和调用');
  lines.push('');

  var x = 1;

  function demo() {
    lines.push('--- 进入 demo() ---');
    lines.push('创建阶段：var y 提升；function inner 整体提升');

    lines.push(`执行：console.log(y) → ${y}`); // undefined

    var y = 2;
    lines.push(`执行：y = 2 后 → ${y}`);

    lines.push(`执行：inner() → ${inner()}`);

    function inner() {
      return 'inner 可用';
    }
  }

  demo();
  document.getElementById('out-d').textContent = lines.join('\n');
});
