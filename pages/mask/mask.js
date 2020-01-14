// pages/mask/mask.js
const app = getApp()
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
                        if (res.data.success) { //注册过
                          var data = res.data;
                          that.globalData.userInfo = data.user;
                          that.globalData.token = data.token;
                        } else { //未注册过，跳转注册页面
                          console.log('2解密失败')
                          app.globalData.openid = res.data.openid;
                          app.globalData.avatarUrl = res.data.avatarUrl;
                          wx.reLaunch({
                            url: '/pages/regist/regist?openid=' + res.data.openid + '&avatarUrl=' + res.data.avatarUrl,
                          })
                        }
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        if (that.userInfoReadyCallback) {
                          that.userInfoReadyCallback(res)
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