Page({
  data: {
    boothId: "",
    boothName: "",
    name: "",
    phone: "",
    submitting: false,
  },

  onLoad(query) {
    this.setData({
      boothId: query.id || "",
      boothName: decodeURIComponent(query.name || ""),
    });

    const draft = wx.getStorageSync("bookingDraft");
    if (draft && draft.boothId === query.id) {
      this.setData({
        name: draft.name || "",
        phone: draft.phone || "",
      });
    }
  },

  onName(e) {
    // 只更新变化字段，不要 setData({ ...this.data, name })
    this.setData({ name: e.detail.value });
  },

  onPhone(e) {
    this.setData({ phone: e.detail.value });
  },

  onSubmit() {
    const { boothId, boothName, name, phone } = this.data;
    if (!name.trim()) {
      wx.showToast({ title: "请填写联系人", icon: "none" });
      return;
    }
    if (!/^1\d{10}$/.test(phone)) {
      wx.showToast({ title: "手机号不正确", icon: "none" });
      return;
    }

    this.setData({ submitting: true });

    // 模拟请求：真实项目 wx.request
    const payload = {
      boothId,
      boothName,
      name: name.trim(),
      phone,
      at: Date.now(),
    };

    setTimeout(() => {
      wx.setStorageSync("bookingDraft", payload);
      wx.setStorageSync("bookingLast", payload);
      getApp().globalData.draft = payload;

      this.setData({ submitting: false });
      wx.showToast({ title: "预约成功", icon: "success" });

      setTimeout(() => {
        wx.navigateBack({ delta: 2 });
      }, 500);
    }, 400);
  },
});
