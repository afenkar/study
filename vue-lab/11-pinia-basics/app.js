/**
 * Day 30 · 演示组件
 */
import { defineComponent } from 'vue';
import { useCounterStore, useUserStore } from './stores.js';

export const AppDemo = defineComponent({
  name: 'AppDemo',
  setup() {
    const counter = useCounterStore();
    const user = useUserStore();

    function onNameInput(e) {
      user.setName(e.target.value);
    }

    return { counter, user, onNameInput };
  },
  template: `
    <section>
      <p class="count">计数：{{ counter.count }}</p>
      <button class="inc-btn" @click="counter.increment">+1</button>
    </section>
    <section>
      <input class="name-input" :value="user.name" @input="onNameInput" placeholder="用户名" />
      <p class="greet">你好，{{ user.name || '访客' }}</p>
    </section>
  `,
});
