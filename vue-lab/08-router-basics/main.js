import { createApp } from 'vue';
import { createAppRouter } from './router.js';
import { AppShell } from './pages.js';
import { runRouterTests, runConceptChecks, conceptAnswers } from './exercise.js';

try {
  createApp(AppShell).use(createAppRouter()).mount('#app');
} catch (e) {
  document.getElementById('app').innerHTML =
    `<p class="hint">❌ ${e.message}</p>`;
}

document.getElementById('btn-e').addEventListener('click', async () => {
  const out = document.getElementById('out-e');
  out.textContent = '验证中…';
  const fnErrors = await runRouterTests();
  const conceptErrors = runConceptChecks(conceptAnswers);
  const all = [...fnErrors, ...conceptErrors];

  out.textContent = all.length === 0
    ? '✅ Router + 概念题全部通过！'
    : '❌ ' + all.join('；');
});
