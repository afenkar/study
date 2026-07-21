import { createApp, ref } from 'vue';
import { createAppRouter } from './router.js';
import { AppShell } from './pages.js';
import { runGuardTests, runConceptChecks, conceptAnswers } from './exercise.js';

const loggedIn = ref(false);

try {
  createApp({
    components: { AppShell },
    setup() {
      function toggleLogin() {
        loggedIn.value = !loggedIn.value;
      }
      return { loggedIn, toggleLogin };
    },
    template: `<AppShell :logged-in="loggedIn" @toggle-login="toggleLogin" />`,
  })
    .use(createAppRouter(() => loggedIn.value))
    .mount('#app');
} catch (e) {
  document.getElementById('app').innerHTML =
    `<p class="hint">❌ ${e.message}</p>`;
}

document.getElementById('btn-e').addEventListener('click', async () => {
  const out = document.getElementById('out-e');
  out.textContent = '验证中…';
  const fnErrors = await runGuardTests();
  const conceptErrors = runConceptChecks(conceptAnswers);
  const all = [...fnErrors, ...conceptErrors];

  out.textContent = all.length === 0
    ? '✅ 动态路由 + 守卫 + 概念题全部通过！'
    : '❌ ' + all.join('；');
});
