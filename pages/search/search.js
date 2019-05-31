
Page({
  data: {
    inputValue:'', //搜索输入值
    searchHistoryData:[], //搜索历史数据
    hotSearchData:{
      hotKeys: ['电子峰会', '世界无烟日', "美食", '美食', '杭州社区活动举办时间', '杭州社区活动举办时间']
    },
    storageFlag: false, //显示历史搜索记录标志位 
  },

  onLoad: function (options) {
    this.getStorageData();
  },
  getStorageData: function () {
    this.setData({
      searchHistoryData: wx.getStorageSync('searchData') || [],
      storageFlag:true
    })
    // console.log("searchHistoryData--------->", this.data.searchHistoryData)
  },
  // 搜索框输入时的操作
  searchInput(e){
    this.setData({
      inputValue: e.detail.value
    })
  },
  // 清除搜索功能数据
  clearInput() {
    this.setData({
      inputValue: ""
    })
  },
  //回车的操作时添加缓存
  searchConfirm(e) {
    let value = e.detail.value;
    let searchData = this.data.searchHistoryData;
    if (!value || value.length == 0){
      return;
    }else{
      searchData.unshift({ id: searchData.length,value:value});
      wx.setStorageSync('searchData', searchData);
      this.getStorageData();
    }
  },
  searchDeleteAll(){
    wx.removeStorageSync('searchData');
    this.setData({
      searchHistoryData:[],
      storageFlag:false
    })
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})