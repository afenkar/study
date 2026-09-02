const { getBooths } = require("../../utils/mock");

Page({
  data: {
    list: [],
  },

  onLoad() {
    // 只 set 列表需要的字段（mock 已裁剪），避免把详情大字段塞进列表
    this.setData({ list: getBooths() });
  },

  onTapCard(e) {
    const { id } = e.detail;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    });
  },
});
