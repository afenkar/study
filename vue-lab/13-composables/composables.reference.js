/**
 * 参考答案 — 做完后再对照
 */
import { ref } from 'vue';

export function useCounterReference() {
  const count = ref(0);
  function increment() {
    count.value += 1;
  }
  return { count, increment };
}

export function useToggleReference(initial = false) {
  const isOpen = ref(initial);
  function toggle() {
    isOpen.value = !isOpen.value;
  }
  return { isOpen, toggle };
}
