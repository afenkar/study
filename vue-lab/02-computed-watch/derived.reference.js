/**
 * 参考答案 — 做完后再对照
 */
import { ref, computed, watch } from 'vue';

export function createCartSummaryReference() {
  const price = ref(100);
  const quantity = ref(2);
  const total = computed(() => price.value * quantity.value);
  return { price, quantity, total };
}

export function createStockWatcherReference() {
  const stock = ref(20);
  const alerts = ref([]);
  watch(stock, (newStock) => {
    if (newStock < 10) alerts.value.push(`库存告急: ${newStock}`);
  });
  function decrease(n = 1) {
    stock.value -= n;
  }
  return { stock, alerts, decrease };
}
