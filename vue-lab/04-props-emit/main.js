import { createApp } from 'vue';
import { ScoreBoard } from './components.js';
import { runComponentTests, runConceptChecks, conceptAnswers } from './exercise.js';

// 实验 A：ScoreBoard 父子通信
try {
  createApp(ScoreBoard).mount('#app-a');
} catch (e) {
  document.getElementById('app-a').innerHTML =
    `<p class="hint">❌ ${e.message} — 先完成 components.js 的 TODO</p>`;
}

// 练习 E
document.getElementById('btn-e').addEventListener('click', async () => {
  const out = document.getElementById('out-e');
  out.textContent = '验证中…';
  const fnErrors = await runComponentTests();
  const conceptErrors = runConceptChecks(conceptAnswers);
  const all = [...fnErrors, ...conceptErrors];

  out.textContent = all.length === 0
    ? '✅ props/emit + 概念题全部通过！'
    : '❌ ' + all.join('；');
});
