//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    date:'',
    week:'',
    income1:'',
    income2:'',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    wx.hideHomeButton()
    this.getDate()
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    //   this.getIncome()
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     app.globalData.userInfo = res.data.user
    //     this.setData({
    //       userInfo: res.data.user,
    //       hasUserInfo: true
    //     })
    //     this.getIncome()
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.data.user
    //       this.setData({
    //         userInfo: res.data.user,
    //         hasUserInfo: true
    //       })
    //       this.getIncome()
    //     }
    //   })
    // }
    
  },
  getDate() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1);
    let date = new Date().getDate() > 9 ? new Date().getDate() : '0' + new Date().getDate();
    let week = ['日', '一', '二', '三', '四', '五', '六'];
    this.setData({
      date: year + '年' + month + '月' + date + '日',
      week: week[new Date().getDay()]
    })
  },
  // 获取配镜收入
  getIncome() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().globalData.url + '/rest/sys/income',
      method: 'post',
      header: {
        // "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      success: function (res) {
        if (res.data.code == 335) {
          wx.showToast({
            title: '请充值后使用',
            icon:'none'
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/my/my',
            })
          }, 1000)
          return
        } else if (res.data.code == 305 ){
          wx.reLaunch({
            url: '/pages/regist/regist?openid=' + app.globalData.openid + '&avatarUrl=' + app.globalData.avatarUrl,
          })
          return
        }
          that.setData({
            income1: res.data.income1,
            income2: res.data.income2
          })
        wx.hideLoading()
      },
      fail: function () {
        console.log('系统错误');
      }
    })
  },
  onShow:function(){
    if (app.globalData.userInfo) {
      console.log(1)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.getIncome()
    } else if (this.data.canIUse) {
      console.log(2)
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(app)
        app.globalData.userInfo = res.data.user
        this.setData({
          userInfo: res.data.user,
          hasUserInfo: true
        })
        this.getIncome()
      }
    } else {
      console.log(3)
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.data.user
          this.setData({
            userInfo: res.data.user,
            hasUserInfo: true
          })
          this.getIncome()
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
