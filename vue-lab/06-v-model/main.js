import { createApp } from 'vue';
import { FormDemo } from './components.js';
import { runVModelTests, runConceptChecks, conceptAnswers } from './exercise.js';

try {
  createApp(FormDemo).mount('#app-a');
} catch (e) {
  document.getElementById('app-a').innerHTML =
    `<p class="hint">❌ ${e.message}</p>`;
}

document.getElementById('btn-e').addEventListener('click', async () => {
  const out = document.getElementById('out-e');
  out.textContent = '验证中…';
  const fnErrors = await runVModelTests();
  const conceptErrors = runConceptChecks(conceptAnswers);
  const all = [...fnErrors, ...conceptErrors];

  out.textContent = all.length === 0
    ? '✅ v-model + 概念题全部通过！'
    : '❌ ' + all.join('；');
});
