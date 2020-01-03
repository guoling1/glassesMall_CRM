//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    income1:'',
    income2:'',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.data.user
        this.setData({
          userInfo: res.data.user,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.data.user
          this.setData({
            userInfo: res.data.user,
            hasUserInfo: true
          })
        }
      })
    }
    this.getIncome()
  },
  // 获取配镜收入
  getIncome() {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/rest/sys/income',
      method: 'post',
      header: {
        // "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            income1: res.data.data.income1,
            income2: res.data.data.income2
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
})
