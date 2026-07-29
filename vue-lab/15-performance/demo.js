/**
 * Day 34 · v-if / v-show + keep-alive 演示
 */
import { createApp, ref, computed, defineComponent } from 'vue';

const IfDemo = defineComponent({
  setup() {
    const visible = ref(true);
    return { visible };
  },
  template: `
    <div class="demo-box">
      <p><strong>v-if</strong> — 隐藏时 DOM 节点会消失</p>
      <button @click="visible = !visible">切换</button>
      <p v-if="visible" class="tag if-tag">我在 DOM 里（F12 查看）</p>
      <p v-else class="hint">（节点已销毁）</p>
    </div>
  `,
});

const ShowDemo = defineComponent({
  setup() {
    const visible = ref(true);
    return { visible };
  },
  template: `
    <div class="demo-box">
      <p><strong>v-show</strong> — 隐藏时节点还在，只是 display:none</p>
      <button @click="visible = !visible">切换</button>
      <p v-show="visible" class="tag show-tag">我一直存在于 DOM（F12 查看）</p>
    </div>
  `,
});

const TabA = defineComponent({
  name: 'TabA',
  setup() {
    const text = ref('');
    return { text };
  },
  template: `
    <div class="tab-panel">
      <p>Tab A 面板</p>
      <input v-model="text" placeholder="在这里输入，再切换 Tab…" />
      <p class="tab-status">当前输入：{{ text || '（空）' }}</p>
    </div>
  `,
});

const TabB = defineComponent({
  name: 'TabB',
  setup() {
    const text = ref('');
    return { text };
  },
  template: `
    <div class="tab-panel">
      <p>Tab B 面板</p>
      <input v-model="text" placeholder="Tab B 也可以输入" />
      <p class="tab-status">当前输入：{{ text || '（空）' }}</p>
    </div>
  `,
});

function mountTabDemo(mountId, withKeepAlive) {
  createApp(defineComponent({
    components: { TabA, TabB },
    setup() {
      const tab = ref('a');
      const activeComp = computed(() => (tab.value === 'a' ? TabA : TabB));
      return { tab, activeComp, withKeepAlive };
    },
    template: `
      <div class="demo-box">
        <p><strong>${withKeepAlive ? '有 keep-alive' : '无 keep-alive'}</strong></p>
        <div class="tab-btns">
          <button type="button" :class="{ active: tab === 'a' }" @click="tab = 'a'">Tab A</button>
          <button type="button" :class="{ active: tab === 'b' }" @click="tab = 'b'">Tab B</button>
        </div>

        <component v-if="!withKeepAlive" :is="activeComp" :key="tab" />
        <keep-alive v-else>
          <component :is="activeComp" :key="tab" />
        </keep-alive>

        <p class="tab-status ${withKeepAlive ? 'ok' : 'warn'}">
          ${withKeepAlive ? '切走再回来，输入会保留' : '切走再回来，输入会清空（组件被销毁）'}
        </p>
      </div>
    `,
  })).mount(mountId);
}

createApp(IfDemo).mount('#demo-if');
createApp(ShowDemo).mount('#demo-show');
mountTabDemo('#demo-no-keep', false);
mountTabDemo('#demo-keep', true);
