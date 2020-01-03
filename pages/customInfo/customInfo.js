// pages/customInfo/customInfo.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid:'',
    items: [
      {
        name: "1"
      },
      {
        name: "2"
      },
      {
        name: "3"
      }
    ]
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    let data = App.touch._touchstart(e, this.data.items)
    this.setData({
      items: data
    })
  },

  //滑动事件处理
  touchmove: function (e) {
    let data = App.touch._touchmove(e, this.data.items)
    this.setData({
      items: data
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
          console.log('用户点击确定')
          that.data.items.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            items: that.data.items
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //修改
  edit: function (e) {
    wx.showToast({
      title: '编辑',
      icon: 'success',
      duration: 2000
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      pid: options.id
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