/**
 * Day 32 练习：composable 入门
 */
import { ref } from 'vue';

// TODO 1: useCounter
export function useCounter() {
  // throw new Error('TODO 1');
  const count = ref(0)
  function increment(){
    count.value ++;
  }
  return{count,increment}
}

// TODO 2: useToggle
export function useToggle(initial = false) {
  // throw new Error('TODO 2');
  const isOpen = ref(initial)
  function toggle(){
    isOpen.value = !isOpen.value
  }
  return{isOpen,toggle}
}
