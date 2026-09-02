Component({
  properties: {
    item: {
      type: Object,
      value: {},
    },
  },
  methods: {
    onTap() {
      // 自定义事件把 id 抛给页面，页面再 navigateTo
      this.triggerEvent("tapcard", { id: this.data.item.id });
    },
  },
});
