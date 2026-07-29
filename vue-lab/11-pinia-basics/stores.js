/**
 * Day 30 练习：Pinia 入门
 */
import { defineStore } from 'pinia';

// TODO 1: useCounterStore
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions:{
    increment  () {
      this.count++;
    }
  }
});

// TODO 2: useUserStore
export const useUserStore = defineStore('user', {
  state: () => ({ name: '' }),
  actions: {
    setName(str){
      this.name = str;
    }
  }
});
