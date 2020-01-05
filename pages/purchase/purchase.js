// pages/purchase/purchase.js
const app = getApp();
var page=0,
rows=10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromTime: '统计开始时间',
    toTime: '统计结束时间',
    purchaseName:'',
    goodsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  nameedit(e) {
    this.setData({
      purchaseName: e.detail.value,
    })
  },
  // 获取商品列表
  getGoodsList() {
    var that = this;
    wx.showLoading({
      title: '玩命加载中',
    })
    var fromTime = '',
      toTime = '';
    if (this.data.fromTime != '统计开始时间') {
      fromTime = this.data.fromTime;
    }
    if (this.data.toTime != '统计结束时间') {
      toTime = this.data.toTime;
    }
    page = page + 1;
    wx.request({
      url: getApp().globalData.url + '/rest/sys/peripherySale/view',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: {
        page: page,
        rows: rows,
        fromTime: fromTime,
        ToTime: toTime,
        purchaseName: that.data.purchaseName
      },
      success: function (res) {
        var list = that.data.goodsList
        if (res.data.code == 0) {
          that.setData({
            goodsList: list.concat(res.data.rows)
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
    page=0;
    this.setData({
      goodsList: []
    })
    this.getGoodsList()
  },
  
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    let data = app.touch._touchstart(e, this.data.goodsList)
    this.setData({
      goodsList: data
    })
  },

  //滑动事件处理
  touchmove: function (e) {
    let data = app.touch._touchmove(e, this.data.goodsList)
    this.setData({
      goodsList: data
    })
  },

  //删除事件
  del: function (e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认要删除此条信息么？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中',
          })
          wx.request({
            url: getApp().globalData.url + '/rest/sys/peripherySale/delete?ids=' + e.currentTarget.dataset.id,
            method: 'DELETE',
            header: {
              // "Content-Type": "application/x-www-form-urlencoded",
              'X-AUTH-TOKEN': app.globalData.token
            },
            success: function (res) {
              if (res.data.code == 200) {
                wx.showToast({
                  title: '删除成功'
                })
                page = 0;
                that.setData({
                  goodsList: []
                })
                that.getGoodsList()
              } else {
                console.log('')
              }
              wx.hideLoading();
            },
            fail: function () {
              console.log('系统错误');
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //修改
  edit: function (e) {
    console.log(JSON.stringify(e.currentTarget.dataset))
    wx.navigateTo({
      url: '/pages/purchaseAdd/purchaseAdd?peripherySaleId=' + e.currentTarget.dataset.id
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    page = 0;
    this.setData({
      goodsList: []
    })
    this.getGoodsList()
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
    this.getGoodsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})