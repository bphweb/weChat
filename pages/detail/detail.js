// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readmore:{
      status:true,
      contentTip:"查看更多"
    }
  },
  changeSignup() {
    wx.navigateTo({
      url: '/personal/pages/signupForm/signupForm',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const query = wx.createSelectorQuery();
    query.select('.activity_detail-des').boundingClientRect(res => {
      const lineHeight = 19;
      const height = res.height;
      // const status = "readmore.status";
      this.setData({
        status: height / lineHeight > 5,
      })
    }).exec()
  },
  toggle() {
    const status = this.data.readmore.status;
    this.setData({
      readmore: {
        status: !status
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})