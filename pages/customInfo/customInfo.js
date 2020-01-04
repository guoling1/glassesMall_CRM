// pages/customInfo/customInfo.js
const app = getApp();
var page = 0,
  rows = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: '',
    customData:{},
    lensList:[]
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {
    //开始触摸时 重置所有删除
    let data = app.touch._touchstart(e, this.data.lensList)
    this.setData({
      lensList: data
    })
  },

  //滑动事件处理
  touchmove: function(e) {
    let data = app.touch._touchmove(e, this.data.lensList)
    this.setData({
      lensList: data
    })
  },

  //删除事件
  del: function(e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认要删除此条信息么？',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中',
          })
          wx.request({
            url: getApp().globalData.url + '/rest/sys/customersDetail/delete1',
            method: 'post',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'X-AUTH-TOKEN': app.globalData.token
            },
            data: {
              ids: e.currentTarget.dataset.id
            },
            success: function (res) {
              if (res.data.code == 200) {
                wx.showToast({
                  title: '删除成功'
                })
                page = 0;
                that.setData({
                  lensList: []
                })
                that.getCustom()
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
  edit: function(e) {
    wx.showToast({
      title: '编辑',
      icon: 'success',
      duration: 2000
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      pid: options.id
    })
  },
  // 获取客户信息
  getCustom() {
    var that = this;
    wx.showLoading({
      title: '玩命加载中',
    })
    page=page+1;
    wx.request({
      url: app.globalData.url + '/rest/sys/customers/get',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: {
        id: that.data.pid,
        page: page,
        rows: rows
      },
      success: function(res) {
        if (res.data.success) {
          var data = res.data,
          list=that.data.lensList;
          that.setData({
            customData: data.sysCustomers,
            lensList: list.concat(data.list.rows)
          })
        } else {
          wx.showToast({
            title: res.data.content,
            icon: 'none'
          })
        }
        wx.hideLoading()
      },
      fail: function() {
        console.log('系统错误');
      }
    })
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
    page = 0;
    this.setData({
      lensList: []
    })
    this.getCustom()
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
    this.getCustom()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})