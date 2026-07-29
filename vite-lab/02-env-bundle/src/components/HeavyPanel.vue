<script setup>
// 故意写大一点，build 时更容易在 dist/assets/ 里看到独立 chunk
const rows = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  label: `数据行 ${i + 1}`,
  value: Math.random().toFixed(4),
}));
</script>

<template>
  <div class="heavy">
    <p class="ok">✅ HeavyPanel 已通过动态 import 加载（单独 chunk）</p>
    <p class="hint">本组件约 {{ rows.length }} 行模拟数据，便于观察拆包体积。</p>
    <ul>
      <li v-for="row in rows.slice(0, 8)" :key="row.id">
        {{ row.label }} — {{ row.value }}
      </li>
    </ul>
    <p class="hint">（列表只展示前 8 条，避免页面太长）</p>
  </div>
</template>
