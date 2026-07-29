/**
 * Day 32 · 演示组件
 */
import { defineComponent } from 'vue';
import { useCounter, useToggle } from './composables.js';

export const AppDemo = defineComponent({
  name: 'AppDemo',
  setup() {
    const { count, increment } = useCounter();
    const { isOpen, toggle } = useToggle(false);
    return { count, increment, isOpen, toggle };
  },
  template: `
    <section>
      <p class="count">计数：{{ count }}</p>
      <button class="inc-btn" @click="increment">+1</button>
    </section>
    <section>
      <p class="toggle-status">面板：{{ isOpen ? '开' : '关' }}</p>
      <button class="toggle-btn" @click="toggle">切换</button>
    </section>
  `,
});
