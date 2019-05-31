import config from "../../utils/config.js";
import {Index} from "index-model.js"

var index = new Index()
//获取应用实例
const app = getApp()
Page({
  data: {
    city:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },


  toSearch() {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  openSetting:function(){
    wx.openSetting({
      success: res => {}
    })
  },
  onLoad: function () {
    this.getData();
    this._loadData(); 
    setTimeout (()=>{
      this.setData({
        city: app.globalData.localCity
      })
    },1000)

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  _loadData:function(callback){ 
    var that=this
    index.getBannerData((data)=>{
      that.setData({
        bannerArr:data
      })
    })
  },
  getData(){
    wx.request({
      // 前台活动列表
      url: `${config.api}activitylist`,
      method: 'POST',
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      success: res => {
        console.log("res----activitylist------>", res)
      },
    })
    wx.request({
      url: `${config.api}collect/wxactivity`,
      method: 'POST',
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      success: res => {
        console.log("res----collect/wxactivity------>", res)
      },
    })
    wx.request({
      url: `${config.api}collect/wxactivitylist`,
      method: 'POST',
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      success: res => {
        console.log("res----collect/wxactivitylist------>", res)
      },
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changeSignup(){
    wx.navigateTo({
      url: '/personal/pages/signupForm/signupForm',
    })
  },
})
