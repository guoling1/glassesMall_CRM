// pages/myShop/myShop.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    description: '',
    videoUrl: ''
  },
  getData(type) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().globalData.url + '/rest/sys/help/activate/view',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data:{
        type: type
      },
      success: function (res) {
        if (res.data.code == 200) {
          var data = res.data.data;
          that.setData({
            description: data.description
          })
          if (data.videoUrl) {
            that.setData({
              videoUrl: app.globalData.url + data.videoUrl
            })
          }
          WxParse.wxParse('description', 'html', data.sysHelpFrom.description, that, 15);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }
        wx.hideLoading()
      },
      fail: function () {
        console.log('系统错误');
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.setNavigationBarTitle({ title: options.title })
      var type = 1;
      if (options.title == '我的商城') {
        type = 2
      } else if (options.title == '帮助') {
        type = 3
      }
    
    this.getData(type)
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