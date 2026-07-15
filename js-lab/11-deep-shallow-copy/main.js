import { deepClone } from './deepClone.js';
import { runCloneTests, runConceptChecks, conceptAnswers } from './exercise.js';

// 实验 A：赋值 vs 浅拷贝
document.getElementById('btn-a').addEventListener('click', () => {
  const lines = [];
  const a = { x: 1, nest: { y: 2 } };

  const assigned = a;
  assigned.x = 9;
  lines.push(`赋值：assigned.x=9 → a.x=${a.x}（同一引用，一起变）`);

  a.x = 1; // 复位
  const shallow = { ...a };
  shallow.x = 9;
  shallow.nest.y = 9;
  lines.push(`浅拷贝：shallow.x=9 → a.x=${a.x}（第一层独立 ✅）`);
  lines.push(`浅拷贝：shallow.nest.y=9 → a.nest.y=${a.nest.y}（嵌套仍共享 ❌）`);
  lines.push('');
  lines.push('结论：{ ...obj } / Object.assign 只拷一层');

  document.getElementById('out-a').textContent = lines.join('\n');
});

// 实验 B：JSON 的坑
document.getElementById('btn-b').addEventListener('click', () => {
  const lines = [];
  const raw = {
    n: 1,
    d: new Date('2026-07-13'),
    fn: function hello() {},
    u: undefined,
  };

  const viaJson = JSON.parse(JSON.stringify(raw));

  lines.push(`原对象 keys: ${Object.keys(raw).join(', ')}`);
  lines.push(`JSON 后 keys: ${Object.keys(viaJson).join(', ')}`);
  lines.push(`Date 变成了: ${typeof viaJson.d} → ${JSON.stringify(viaJson.d)}`);
  lines.push(`fn 还在吗？ ${'fn' in viaJson}`);
  lines.push(`u 还在吗？ ${'u' in viaJson}`);
  lines.push('');
  lines.push('结论：JSON 深拷贝会丢 function / undefined，Date 变字符串');

  document.getElementById('out-b').textContent = lines.join('\n');
});

// 实验 C：手写 deepClone
document.getElementById('btn-c').addEventListener('click', () => {
  const lines = [];
  const a = { x: 1, nest: { y: 2 }, list: [3, { z: 4 }] };

  try {
    const d = deepClone(a);
    d.nest.y = 99;
    d.list[1].z = 88;

    lines.push(`deepClone 后改副本：`);
    lines.push(`a.nest.y=${a.nest.y}（应仍为 2）`);
    lines.push(`a.list[1].z=${a.list[1].z}（应仍为 4）`);
    lines.push(`d !== a → ${d !== a}`);
    lines.push(`d.nest !== a.nest → ${d.nest !== a.nest}`);
    lines.push('');
    lines.push(
      a.nest.y === 2 && a.list[1].z === 4
        ? '✅ 深拷贝生效，原对象未被污染'
        : '❌ 还不对，检查 deepClone.js'
    );
  } catch (e) {
    lines.push(`❌ ${e.message}`);
    lines.push('先完成 deepClone.js 的 TODO');
  }

  document.getElementById('out-c').textContent = lines.join('\n');
});

// 练习 E
document.getElementById('btn-e').addEventListener('click', () => {
  const out = document.getElementById('out-e');
  const cloneErrors = runCloneTests();
  const conceptErrors = runConceptChecks(conceptAnswers);
  const all = [...cloneErrors, ...conceptErrors];

  out.textContent = all.length === 0
    ? '✅ deepClone + 概念题全部通过！'
    : '❌ ' + all.join('；');
});
