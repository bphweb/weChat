import {Config} from './utils/config.js';

var qqmap = require('./utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var code='';
var baseUrl=Config.restUrl

App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.checkSession({
      success: function (res) {
        //存在登陆态
      },
      fail: function () {
        //不存在登陆态
        onLogin()
      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
         code = res.code;
        wx.request({
          url:baseUrl + '/log/authCode?code=' + code,
          success:function (res) {
            console.log('-------1----',res)
            //wx.setStorageSync('sessionId', res.data.session_key);
          }
        })
      }
    })
    // 获取用户信息，wx.getSetting用户授权检测，拒绝和未同意状态下res.authSetting值为空，
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log('-------2-------',res)
              // 可以将 res 发送给后台解码出 unionId
              wx.request({
                url: baseUrl + '/log/smallRoutine/authCode',
                header: { "Content-Type": "application/x-www-form-urlencoded" },
                method: "POST",
                data: { 
                  code: code,
                  encryptedData: res.encryptedData,
                  iv: res.iv
                 },
                success: res => {
                  console.log('res--login-11-->',res)
                }
              })
              //console.log('res-------info--------->',res)
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // 获取位置信息
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        let location = res.latitude + ',' + res.longitude;
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            "key": "KXTBZ-MI5KP-B3GDM-LWIDA-YG7W5-MLFP5",
            "location": location
          }, 
          success: res => {
            let localCity = res.data.result.address_component.city;
            if(localCity.endsWith('市')){
              localCity=localCity.substring(0,localCity.length-1)
            }
            this.globalData.localCity = localCity;
          }
        })
      },
      fail: function (e) {
        console.log("e----11------>", e)
      }
    })
  },
  // getLocal(latitude, longitude) {

  // },
  globalData: {
    userInfo: null,
    localCity: null
  }
})