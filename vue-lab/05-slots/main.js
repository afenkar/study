import { createApp } from 'vue';
import { DemoApp } from './components.js';
import { runSlotTests, runConceptChecks, conceptAnswers } from './exercise.js';

try {
  createApp(DemoApp).mount('#app-a');
} catch (e) {
  document.getElementById('app-a').innerHTML =
    `<p class="hint">❌ ${e.message}</p>`;
}

document.getElementById('btn-e').addEventListener('click', async () => {
  const out = document.getElementById('out-e');
  out.textContent = '验证中…';
  const fnErrors = await runSlotTests();
  const conceptErrors = runConceptChecks(conceptAnswers);
  const all = [...fnErrors, ...conceptErrors];

  out.textContent = all.length === 0
    ? '✅ slot + 概念题全部通过！'
    : '❌ ' + all.join('；');
});
