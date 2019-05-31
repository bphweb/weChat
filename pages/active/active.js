// pages/active/active.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData:0,
    tabData: [
      {
      id: 0,
      title: '全部'
    }, {
      id: 1,
      title: '行业'
    }, {
      id: 2,
      title: '生活'
    }, {
      id: 3,
      title: '展览'
    }, {
      id: 4,
      title: '招募'
    }, {
      id: 5,
      title: '招募'
    }, {
      id: 6,
      title: '招募'
    }, {
      id: 7,
      title: '招募'
    }],
    timeList: ['时间', '今天', '明天', '本周', '本月'],
    rankList: ['综合排序', '最新发布', '热门排行', '最多参与'],
    timeSelected: '时间',
    rankSelected: '综合排序',
    status:null,
    hidden:true,
  },

  changeToggle(e) {
    this.setData({
      status: e.currentTarget.dataset.num,
      // hidden: true ,
    })
    console.log(this.data.hidden)
  },
  changeTimeSort(e){
    this.setData({
      timeSelected: e.currentTarget.dataset.current,
      status: null
    })
  },
  changeRankSort(e) {
    this.setData({
      rankSelected: e.currentTarget.dataset.current,
      status: null
    })
  },
  // tab和内容对应函数
  checkCurrent(e){
    this.setData({
      currentData:e.currentTarget.dataset.current
    })
    
  },
  bindchange(e){
    this.setData({
      currentData: e.detail.current
    })
  },

  changeDetail(){
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  changeSignup(){
      wx.navigateTo({
        url: '/personal/pages/signupForm/signupForm',
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})