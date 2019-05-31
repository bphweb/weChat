import {Config} from "../../../utils/config.js";
import {ActivityForm} from "activityForm-model.js"

var activityForm = new ActivityForm()
var util = require('../../../utils/util.js');

var adds = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    date: '',
    windowHeight: '',
    imageData: [],
    title: {
      picture: '请添加图片',
      theme: '请输入主题活动',
      activityType: '请选择活动类型',
      activityStartTime: '请选择活动开始时间',
      activityEndTime: '请选择活动结束时间',
      signupStartTime: '请选择活动报名开始时间',
      signupEndTime: '请选择活动报名结束时间',
      activityDesc: '请加入活动描述',
      signupNumber: '请选择报名人数',
      telphone: '请输入联系人电话',
      placeHolder: '请选择举办方',
      activityAddress: '请输入活动地址'
    },
    form: {
      theme: '',
      desc: '',
      number: '',
      telphone: '',
      address: '',
      activityStartTime: '',
      activityEndTime: '',
      signupStartTime: '',
      signupEndTime: ''
    },
    activityType: [ //活动类型
      {
        id: 1,
        text: '行业'
      }, {
        id: 2,
        text: '生活'
      }, {
        id: 3,
        text: '展览'
      }
    ],
    placeHolder: [ //举办方
      {
        id: 1,
        text: '个人'
      }, {
        id: 2,
        text: '单位/机构组织'
      }
    ],
    flagActivityTime: true,
    flagActivitySignupTime: true,
    formData: ''
  },
  //活动时间改变
  startTimeChange: function(e) {
    this.setData({
      'form.activityStartTime': e.detail.value
    })
  },
  endTimeChange: function(e) {
    this.setData({
      'form.activityEndTime': e.detail.value
    })
    if (this.data.form.activityStartTime > this.data.form.activityEndTime) {
      this.setData({
        flagActivityTime: false,
        'title.activityEndTime': '活动结束时间不能早于活动开始时间'
      })
    }
  },
  signupStartTimeChange: function(e) {
    this.setData({
      'form.signupStartTime': e.detail.value
    })
  },
  signupEndTimeChange: function(e) {
    this.setData({
      'form.signupEndTime': e.detail.value
    })
    if (this.data.form.signupStartTime > this.data.form.signupEndTime) {
      this.setData({
        flagActivitySignupTime: false,
        'title.signupEndTime': '活动报名结束时间不能早于活动报名开始时间'
      })
    }
  },
  // 获取select组件选中的值
  getData(e) {
    console.log('e----------select---------->', e);
    this.setData({
      activityKindId: e.detail.id,
      sponsor: e.detail.nowText
    })
  },

  //  生命周期函数--监听页面加载
  onLoad: function(options) {
    let date = util.formatTime(new Date());
    this.setData({
      'form.activityStartTime': date,
      'form.activityEndTime': date,
      'form.signupStartTime': date,
      'form.signupEndTime': date
    })
  },
  chooseImage(e) {
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'], //指定原图还是压缩图，默认二者皆有
      sourceType: ['album', 'camera'], //来源是相册还是相机，默认二者皆有
      success: res => {
        console.log('res----------->', res)
        let imageData = this.data.imageData;
        const tempFilePaths = res.tempFilePaths[0]; //图片的本地临时文件路径列表
        imageData.unshift(tempFilePaths);
        this.setData({
          imageData: imageData
        })
        wx.request({
          url: Config.restUrl + '/store/file',
          data: {
            file: tempFilePaths,
            path: 'key'
          },
          method: 'POST',
          success:res => {
            console.log('res---------img-------->',res)
          }
        })
      },
    })
  },
  formSubmit(e) {
    let value = e.detail.value;
    adds = e.detail.value;
    adds.areasId = 1;
    adds.activityKindId = this.data.activityKindId;
    adds.sponsor = this.data.sponsor;
    console.log('e---------->', adds)

    //     wx.showToast({
    //       title: '服务器网络错误!',
    //       icon: 'loading',
    //       duration: 1500
    //     })
    //   }

    this.uploadFile();
  },
  uploadFile() {
    for (let i = 0; i < this.data.imageData.length; i++) {
      console.log('imgUrl----->', this.data.imageData[i])
      wx.uploadFile({
        url: Config.restUrl +'/wxactivity/foundactivity',
        filePath: this.data.imageData[i],
        name: 'imgUrl',
        header: {
          'content-type': 'application/json;charset=UTF-8'
        },
        formData: adds,
        success: res => {
          console.log('res------------->', res)
          if (res.status) {
            wx.navigateTo({
              url: '../submitSuccess/submitSuccess',
            })
          }
        },
        fail: res => {
          console.log('res-----fail-------->', res)
        }
      })
    }
    // this.setData({
    //   formdata: ''
    // })
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