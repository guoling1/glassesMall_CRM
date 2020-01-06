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
    this.getDate()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.getIncome()
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.data.user
        this.setData({
          userInfo: res.data.user,
          hasUserInfo: true
        })
        this.getIncome()
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
          this.getIncome()
        }
      })
    }
    
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
