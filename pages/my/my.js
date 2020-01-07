// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  recharge(){
    var that = this;
    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })
    wx.request({
      url: getApp().globalData.url + '/payment',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: {
        Openid: this.data.userInfo.openid
      },
      success: function (res) {
        if (res.data.code == 200) {
          var data = res.data.data;
          wx.requestPayment(
            {
              'timeStamp': data.timeStamp,
              'nonceStr': data.nonceStr,
              'package': data.package,
              'signType': 'MD5',
              'paySign': data.paySign,
              'success': function (res) {
                wx.hideLoading()
                that.getData()
               },
              'fail': function (res) { },
              'complete': function (res) { }
            })
        } else {
          wx.hideLoading()
        }
        wx.hideLoading();
      },
      fail: function () {
        console.log('系统错误');
      }
    })
  },
  getData() {
    var that = this;
    wx.showLoading({
      title: '加载中',
      icon:'none'
    })
    wx.request({
      url: getApp().globalData.url + '/rest/sys/users/getUser',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: {
        Openid: app.globalData.userInfo.openid
      },
      success: function (res) {
        if (res.data.code == 200) {
          var data = res.data.data;
          app.globalData.userInfo = data;
        } else {
          console.log('')
        }
        wx.hideLoading()
      },
      fail: function () {
        console.log('系统错误');
      }
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
    this.setData({
      userInfo: app.globalData.userInfo
    })
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