// pages/mask/mask.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  getUserInfo: function(e) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.login({
            success: function(res) {
              var code = res.code; //登录凭证
              if (code) {
                wx.getUserInfo({ //2、调用获取用户信息接口
                  success: function(res) {
                    //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
                    wx.request({
                      url: getApp().globalData.url + '/decodeUserInfo',
                      method: 'get',
                      header: {
                        "Content-Type": "applciation/json"
                      },
                      data: {
                        encryptedData: res.encryptedData,
                        iv: res.iv,
                        code: code
                      },
                      success: function(res) {
                        wx.hideLoading()
                        if (res.data.code == 200) {
                          var data = res.data.data;
                          getApp().globalData.userInfo = data.user;
                          getApp().globalData.token = data.token;
                          getApp().getData()
                          if (data.user.status == 1) {
                            wx.reLaunch({
                              url: '/pages/auth/auth',
                            })
                          } else if (data.user.status == 2) {
                            wx.reLaunch({
                              url: '/pages/wait/wait',
                            })
                          } else {
                            wx.reLaunch({
                              url: '/pages/index/index',
                            })
                          }
                        } else {
                          console.log('2解密失败')
                        }
                      },
                      fail: function() {
                        console.log('1系统错误')
                      }
                    })
                  },
                  fail: function() {
                    console.log('获取用户信息失败')
                    wx.reLaunch({
                      url: '/pages/mask/mask',
                    })
                  }
                })
              } else {
                console.log('获取用户登录态失败！' + r.errMsg)
              }
            },
            fail: function() {
              console.log('登陆失败')
            }
          })
        }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})