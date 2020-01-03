// pages/customQueryList/customQueryList.js
const app = getApp();
var page = 0;
var rows = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jianpin: '',
    fullname: '',
    phone: '',
    fromTime: '',
    toTime: '',
    customList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      jianpin: options.jianpin,
      fullname: options.fullname,
      phone: options.phone,
      fromTime: options.fromTime,
      toTime: options.toTime
    })
    page = 0;
    this.getList()
  },
  // 获取客户列表
  getList() {
    var that = this;
    wx.showLoading({
      title: '玩命加载中',
    })
    page = page + 1;
    wx.request({
      url: getApp().globalData.url + '/rest/sys/customers/view',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: {
        page: page,
        rows: rows,
        jianpin: this.data.jianpin,
        fullname: this.data.fullname,
        phone: this.data.phone,
        fromTime: this.data.fromTime,
        ToTime: this.data.toTime
      },
      success: function (res) {
        var list = that.data.customList
        if (res.data.code == 0) {
          that.setData({
            customList: list.concat(res.data.rows)
          })
        } else {
          console.log('')
        }
        wx.hideLoading();
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
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})