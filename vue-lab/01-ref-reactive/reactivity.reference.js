/**
 * 参考答案 — 做完后再对照
 */
import { ref, reactive } from 'vue';

export function createCounterReference() {
  const count = ref(0);
  function increment() {
    count.value += 1;
  }
  return { count, increment };
}

export function createUserFormReference() {
  const user = reactive({ name: '', email: '' });
  function setName(name) {
    user.name = name;
  }
  return { user, setName };
}
