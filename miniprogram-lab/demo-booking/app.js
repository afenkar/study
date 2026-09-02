App({
  onLaunch() {
    // 冷启动一次：可在此检查更新、读缓存
    const cache = wx.getStorageSync("bookingDraft");
    this.globalData.draft = cache || null;
  },
  globalData: {
    draft: null,
  },
});
