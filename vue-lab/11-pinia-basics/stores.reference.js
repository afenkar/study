/**
 * 参考答案 — 做完后再对照
 */
import { defineStore } from 'pinia';

export const useCounterStoreReference = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count += 1;
    },
  },
});

export const useUserStoreReference = defineStore('user', {
  state: () => ({ name: '' }),
  actions: {
    setName(name) {
      this.name = name;
    },
  },
});
