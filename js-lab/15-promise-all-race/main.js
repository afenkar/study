import { myAll, myRace } from './promiseCombo.js';
import { runComboTests, runConceptChecks, conceptAnswers } from './exercise.js';

function delay(ms, value, shouldReject = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) reject(value);
      else resolve(value);
    }, ms);
  });
}

// 实验 A
document.getElementById('btn-a').addEventListener('click', async () => {
  const out = document.getElementById('out-a');
  out.textContent = '运行中…';
  try {
    const result = await myAll([
      delay(80, '用户'),
      delay(40, '订单'),
      delay(20, '权限'),
    ]);
    out.textContent = `all 成功 → [${result.join(', ')}]\n（耗时约等于最慢的那个）`;
  } catch (e) {
    out.textContent = `❌ ${e.message}`;
  }
});

// 实验 B
document.getElementById('btn-b').addEventListener('click', async () => {
  const out = document.getElementById('out-b');
  out.textContent = '运行中…';
  try {
    await myAll([
      delay(50, 'ok'),
      delay(20, '接口挂了', true),
      delay(80, '不会等到我'),
    ]);
    out.textContent = '❌ 预期应失败';
  } catch (e) {
    out.textContent = `all 短路失败 → ${e}\n（有一个 reject，整体立刻失败）`;
  }
});

// 实验 C
document.getElementById('btn-c').addEventListener('click', async () => {
  const out = document.getElementById('out-c');
  out.textContent = '运行中…';
  try {
    const winner = await myRace([
      delay(100, '慢接口'),
      delay(30, '快接口'),
    ]);
    out.textContent = `race 胜出 → ${winner}\n（谁先完成用谁，常见于超时控制）`;
  } catch (e) {
    out.textContent = `❌ ${e.message}`;
  }
});

// 练习 E
document.getElementById('btn-e').addEventListener('click', async () => {
  const out = document.getElementById('out-e');
  out.textContent = '验证中…';
  const comboErrors = await runComboTests();
  const conceptErrors = runConceptChecks(conceptAnswers);
  const all = [...comboErrors, ...conceptErrors];

  out.textContent = all.length === 0
    ? '✅ myAll / myRace + 概念题全部通过！'
    : '❌ ' + all.join('；');
});
