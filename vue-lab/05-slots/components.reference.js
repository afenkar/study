/**
 * 参考答案 — 做完后再对照
 */
import { defineComponent } from 'vue';

export const BaseCardReference = defineComponent({
  props: { title: { type: String, required: true } },
  template: `
    <div class="card">
      <h3 class="card-title">{{ title }}</h3>
      <div class="card-body"><slot /></div>
    </div>
  `,
});

export const PageShellReference = defineComponent({
  template: `
    <header class="header">管理后台</header>
    <section class="content"><slot /></section>
  `,
});

export const DemoAppReference = defineComponent({
  components: {
    BaseCard: BaseCardReference,
    PageShell: PageShellReference,
  },
  template: `
    <BaseCard title="个人资料">
      <p class="profile">李四 · Vue 开发者</p>
    </BaseCard>
    <PageShell>
      <p class="main-text">这是主内容区</p>
    </PageShell>
  `,
});
