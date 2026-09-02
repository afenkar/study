const { getBoothById } = require("../../utils/mock");

Page({
  data: {
    booth: null,
  },

  onLoad(query) {
    const booth = getBoothById(query.id);
    // 局部更新：一次 set 整个 booth 对象即可，勿循环 setData
    this.setData({ booth });
    if (booth) {
      wx.setNavigationBarTitle({ title: booth.name });
    }
  },

  goSubmit() {
    const { booth } = this.data;
    if (!booth) return;
    wx.navigateTo({
      url: `/pages/submit/submit?id=${booth.id}&name=${encodeURIComponent(booth.name)}`,
    });
  },

  goBack() {
    wx.navigateBack();
  },
});
