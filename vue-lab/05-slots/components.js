/**
 * Day 24 练习：插槽 slot
 */
import { defineComponent } from 'vue';

// TODO 1: BaseCard
export const BaseCard = defineComponent({
  props: { title: { type: String, required: true } },
  template: `
    <div class="card">
      <h3 class="card-title">{{ title }}</h3>
      <div class="card-body">
      <slot></slot>
      </div>
    </div>
  `,
});

// TODO 2: PageShell
export const PageShell = defineComponent({
  props: { title: { type: String, required: true } },
  template: `
    <header class="header">管理后台</header>
    <section class="content"><slot></slot></section>
  `,
});

export const DemoApp = defineComponent({
  components: { BaseCard, PageShell },
  template: `
    <BaseCard title="个人资料">
      <p class="profile">李四 · Vue 开发者</p>
    </BaseCard>
    <PageShell>
      <p class="main-text">这是主内容区</p>
    </PageShell>
  `,
});
