import { createApp } from 'vue';
import { AppDemo } from './app.js';
import { runComposableTests, runConceptChecks, conceptAnswers } from './exercise.js';

try {
  createApp(AppDemo).mount('#app');
} catch (e) {
  document.getElementById('app').innerHTML =
    `<p class="hint">❌ ${e.message}</p>`;
}

document.getElementById('btn-e').addEventListener('click', async () => {
  const out = document.getElementById('out-e');
  out.textContent = '验证中…';
  const fnErrors = await runComposableTests();
  const conceptErrors = runConceptChecks(conceptAnswers);
  const all = [...fnErrors, ...conceptErrors];

  out.textContent = all.length === 0
    ? '✅ composable + 概念题全部通过！'
    : '❌ ' + all.join('；');
});
