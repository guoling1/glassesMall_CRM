// pages/lensAdd/lensAdd.js
const app = getApp();
var page = 0;
var rows = 20;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lensData: [],
    index:0,
    jiangpian:'请选择商品类型',
    fromTime: '统计开始时间',
    toTime: '统计结束时间',
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
  bindJingpian(e){
    this.setData({
      index: e.detail.value,
      jiangpian:this.data.typeList[e.detail.value].id
    })
  },
  // 获取商品类型
  getTypes() {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/rest/sys/dict/allDictByInfo1',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: {
        dictInfo: '镜片类型'
      },
      success: function (res) {
        var data = JSON.parse(res.data.data);
        data.unshift({ dictName: '请选择商品类型', id: '' })
        if (res.data.code == 200) {
          that.setData({
            typeList: data
          })
        } else {
          console.log('')
        }
      },
      fail: function () {
        console.log('系统错误');
      }
    })
  },
  getLens() {
    var that = this;
    var fromTime = '',
      toTime = '',
      jiangpian = '';
    if (this.data.fromTime != '统计开始时间') {
      fromTime = this.data.fromTime;
    }
    if (this.data.toTime != '统计结束时间') {
      toTime = this.data.toTime;
    }
    if (this.data.jiangpian != '请选择商品类型') {
      jiangpian = this.data.jiangpian;
    }
    wx.showLoading({
      title: '玩命加载中',
    })
    page = page + 1;
    wx.request({
      url: getApp().globalData.url + '/rest/sys/replenishment1',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: {
        page: page,
        rows: rows,
        fromTime: fromTime,
        toTime: toTime,
        jiangpian: jiangpian
      },
      success: function (res) {
        var list = that.data.lensData
        if (res.data.code == 0) {
          that.setData({
            lensData: list.concat(res.data.rows)
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
  search(){
    page = 0;
    this.setData({
      lensData: []
    })
    this.getLens()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = 0;
    this.getTypes();
    this.getLens();
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
    var that = this;
    that.getLens();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})