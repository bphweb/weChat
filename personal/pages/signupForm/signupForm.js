import WxValidate from "../../../utils/WxValidate.js";
import config from "../../../utils/config.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageTitle: {
      nameTitle: '请输入您的姓名 (必填)',
      telnumberTitle: '请输入您的手机号 (必填)',
      ageTitle: '请选择您的年龄 (必填)',
      cityTitle: '请输入您的城市 (必填)',
      professTitle: '请输入您的职业(必填)'
    },
    form: {
      name: '',
      telnumber: '',
      age: '',
      city: '',
      professional: ''
    },
    flagName: true,
    flag: true,
    region: ['浙江省', '杭州市', '西湖区'],
    customItem: '',
    selectData: [{ id: 0, text: '退休' },{id:1,text:'在职'}]
  },

  getData(e){
    console.log("e-1------------->",e)
    let professional = this.data.form.professional;
    this.setData({
      professional:e.detail.nowText
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate();
  },
  initValidate() {
    const rules = {
      name: {
        require: true,
        maxlength: 10
      },
      telnumber: {
        require: true,
        number: true
      },
      age: {
        require: true,
        range: [0, 110]
      },
      city: {
        require: true
      },
      professional: {
        require: true
      }
    }

    const messages = {
      // name: {
      //   require: '请输入姓名',
      //   name: '请输入正确的姓名'
      // },
      // telnumber: {
      //   require: '请输入电话号码',
      //   tel: '请输入正确的电话号码'
      // },
      // age: {
      //   require: '请输入年龄',
      //   age: '请输入正确的格式'
      // },
      // city: {
      //   require: '请输入城市',
      //   city: '请输入正确的城市'
      // },
      // professional: {
      //   require: '请输入职业',
      //   profess: '请输入正确的职位'
      // },
    }

    this.WxValidate = new WxValidate(rules, messages)
  },
  formSubmit(e) {
    console.log("e----------->", e)
    let params = e.detail.value;
    wx.request({
      url: `${config.api}enter/activity`,
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data:{
        userName: params.name,
        sex: params.sex,
        age: params.age,
        telphone:params.telnumber,
        activtyId:'',
        regionId:'',
        vocation:''
      },
      success: res => {
        console.log('res----signup------>',res)
      }
    })



    if (!this.WxValidate.checkForm(params)) {
      let error = this.WxValidate.errorList[0];
      console.log("error------>", error)
      switch (error.param) {
        case 'name':
          this.setData({
            flagName: false,
            'messageTitle.nameTitle': "请输入正确的姓名"
          })
          break;
        case 'telnumber':
          this.setData({
            flag: false,
            'messageTitle.telnumberTitle': error.msg
          })
          break;
          console.log(222222222)
        case 'age':
          this.setData({
            flag: false,
            'messageTitle.ageTitle': error.msg
          })
          break;
        case 'city':
          this.setData({
            flag: false,
            'messageTitle.cityTitle': error.msg
          })
          break;
        case 'professional':
          this.setData({
            flag: false,
            'messageTitle.professTitle': error.msg
          })
          break;
      }
    }
    return false;
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      region: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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