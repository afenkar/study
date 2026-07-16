import { createApp } from 'vue';
import { createCounter, createUserForm } from './reactivity.js';
import { runReactivityTests, runConceptChecks, conceptAnswers } from './exercise.js';

// 实验 A：ref 计数器
try {
  const { count, increment } = createCounter();
  createApp({
    setup() {
      return { count, increment };
    },
    template: `
      <p>count: {{ count }}</p>
      <button @click="increment">+1</button>
    `,
  }).mount('#app-a');
} catch (e) {
  document.getElementById('app-a').innerHTML =
    `<p class="hint">❌ ${e.message} — 先完成 createCounter</p>`;
}

// 实验 B：reactive 表单
try {
  const { user, setName } = createUserForm();
  createApp({
    setup() {
      return {
        user,
        onInput(e) {
          setName(e.target.value);
        },
      };
    },
    template: `
      <input :value="user.name" @input="onInput" placeholder="输入姓名" />
      <p>你好，{{ user.name || '访客' }}</p>
    `,
  }).mount('#app-b');
} catch (e) {
  document.getElementById('app-b').innerHTML =
    `<p class="hint">❌ ${e.message} — 先完成 createUserForm</p>`;
}

// 练习 E
document.getElementById('btn-e').addEventListener('click', () => {
  const out = document.getElementById('out-e');
  const fnErrors = runReactivityTests();
  const conceptErrors = runConceptChecks(conceptAnswers);
  const all = [...fnErrors, ...conceptErrors];

  out.textContent = all.length === 0
    ? '✅ ref/reactive + 概念题全部通过！'
    : '❌ ' + all.join('；');
});
