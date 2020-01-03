// pages/customQuery/customQuery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jianpin:'',
    fullname:'',
    phone:'',
    fromTime: '统计开始时间',
    toTime: '统计结束时间',
  },
  jpedit(e){
    this.setData({
      jianpin: e.detail.value,
    })
  },
  fullnameedit(e) {
    this.setData({
      fullname: e.detail.value,
    })
  },
  phoneedit(e) {
    this.setData({
      phone: e.detail.value,
    })
  },
  bindFromTime(e) {
    this.setData({
      fromTime: e.detail.value
    })
  },
  bindToTime(e) {
    this.setData({
      toTime: e.detail.value
    })
  },
  search(){
    var fromTime = '',
      toTime = '';
    if (this.data.fromTime != '统计开始时间') {
      fromTime = this.data.fromTime;
    }
    if (this.data.toTime != '统计结束时间') {
      toTime = this.data.toTime;
    }
    wx.navigateTo({
      url: '/pages/customQueryList/customQueryList?jianpin=' + this.data.jianpin + '&fullname=' + this.data.fullname + '&phone=' + this.data.phone + '&fromTime=' + fromTime + '&toTime=' + toTime,
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