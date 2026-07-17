import { createApp } from 'vue';
import { createCartSummary, createStockWatcher } from './derived.js';
import { runDerivedTests, runConceptChecks, conceptAnswers } from './exercise.js';

// 实验 A：computed 购物车总价
try {
  const { price, quantity, total } = createCartSummary();
  createApp({
    setup() {
      return { price, quantity, total };
    },
    template: `
      <p>
        单价 <input type="number" v-model.number="price" min="0" style="width:5rem" />
        × 数量 <input type="number" v-model.number="quantity" min="0" style="width:4rem" />
      </p>
      <p>总价（computed）：<strong>{{ total }}</strong></p>
    `,
  }).mount('#app-a');
} catch (e) {
  document.getElementById('app-a').innerHTML =
    `<p class="hint">❌ ${e.message} — 先完成 createCartSummary</p>`;
}

// 实验 B：watch 库存预警
try {
  const { stock, alerts, decrease } = createStockWatcher();
  createApp({
    setup() {
      return { stock, alerts, decrease };
    },
    template: `
      <p>当前库存：{{ stock }}</p>
      <button @click="decrease(5)">出库 5 件</button>
      <button @click="decrease(1)">出库 1 件</button>
      <ul v-if="alerts.length">
        <li v-for="(msg, i) in alerts" :key="i">{{ msg }}</li>
      </ul>
      <p v-else class="hint">库存充足，暂无告警</p>
    `,
  }).mount('#app-b');
} catch (e) {
  document.getElementById('app-b').innerHTML =
    `<p class="hint">❌ ${e.message} — 先完成 createStockWatcher</p>`;
}

// 练习 E
document.getElementById('btn-e').addEventListener('click', async () => {
  const out = document.getElementById('out-e');
  out.textContent = '验证中…';
  const fnErrors = await runDerivedTests();
  const conceptErrors = runConceptChecks(conceptAnswers);
  const all = [...fnErrors, ...conceptErrors];

  out.textContent = all.length === 0
    ? '✅ computed/watch + 概念题全部通过！'
    : '❌ ' + all.join('；');
});
