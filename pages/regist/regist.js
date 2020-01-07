// pages/regist/regist.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'请选择',
    typeList: ["老店","新店"],
    sex: '请选择',
    sexList: ['男', '女'],
    openid: '',
    avatarUrl: '',
    loginName: '',
    name:'',
    password:'',
    password1:'',
    shopName:'',
    phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: options.openid,
      avatarUrl: options.avatarUrl
    })
  },
  bindSexChange(e) {
    this.setData({
      sex: this.data.sexList[e.detail.value]
    })
  },
  bindTypeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      type: this.data.typeList[e.detail.value]
    })
  },
  formSubmit(e){
    console.log(JSON.stringify(e.detail.value))
    var data = e.detail.value;
    if(this.data.type=="老店"){
      data.type = 1;
    } else if (this.data.type == "新店") {
      data.type = 0;
    }
    data.openid = this.data.openid;
    data.avatarUrl = this.data.avatarUrl;
    if (this.data.sex == "男") {
      data.sex = 1;
    } else if (this.data.type == "女") {
      data.sex = 0;
    }
    var flag = true;
    for (var i in data) {
      if (data[i]==='') {
        flag = false;
      }
    }
    if (flag) {
      if (data.password != data.password1){
        wx.showToast({
          title: '密码不一致',
          icon: 'none'
        })
        return;
      }
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: app.globalData.url + '/register',
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: data,
        success: function (res) {
          if (res.data.success) {
            app.globalData.token = res.data.token;
            app.globalData.userInfo = res.data.user;
            wx.reLaunch({
              url: '/pages/index/index',
            })
          } else {
            wx.showToast({
              title: res.data.content,
              icon: 'none'
            })
          }
          wx.hideLoading()
        },
        fail: function () {
          console.log('系统错误');
        }
      })
    } else {
      console.log(data)
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
    }
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