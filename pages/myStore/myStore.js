 // pages/myStore/myStore.js
 const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginName:'',
    name: '',
    shopName: '',
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  getData() {
    var that = this;
    wx.showLoading({
      title: '加载中',
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
          that.setData({
            loginName: data.loginName,
            name: data.name,
            shopName: data.shopName,
            phone: data.phone
          })
         
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
        wx.hideLoading()
      },
      fail: function () {
        console.log('系统错误');
      }
    })
  },
  formSubmit(e) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().globalData.url + '/rest/sys/users/changeInfo',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data:  e.detail.value,
      success: function (res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          setTimeout(function () {
            wx.navigateBack({})
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
        wx.hideLoading()
      },
      fail: function () {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})