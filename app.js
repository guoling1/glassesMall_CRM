//app.js
import touch from '/pages/goodsInfo/touch.js'
App({
  touch: new touch(),
  onLaunch: function () {
    this.getUser()
    
  },
  onLoad(){
  },
  globalData: {
    userInfo: null,
    token:'',
    url: 'http://www.jingduoduoyanjing.com',
    // url:'http://btkwmi.natappfree.cc',
    openid:''
  },
  // 获取登录信息
  getUser() {
    var that = this;
    wx.getSetting({
      success: function (reg) {
        if (reg.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          
          wx.login({
            success: function (res) {
              var code = res.code; //登录凭证
              if (code) {
                wx.getUserInfo({  //2、调用获取用户信息接口
                  success: function (res) {
                    var _this = this;
                    //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
                    wx.request({
                      url: that.globalData.url + '/decodeUserInfo',
                      method: 'get',
                      header: {
                        "Content-Type": "applciation/json"
                      },
                      data: {
                        encryptedData: res.encryptedData,
                        iv: res.iv,
                        code: code
                      },
                      success: function (res) {
                        if (res.data.success) { //注册过
                          var data = res.data;
                          that.globalData.userInfo = data.user;
                          that.globalData.token = data.token;
                        } else { //未注册过，跳转注册页面
                          console.log('2解密失败')
                          that.globalData.openid = res.data.openid;
                          that.globalData.avatarUrl = res.data.avatarUrl;
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
                      fail: function () {
                        console.log('1系统错误')
                      }
                    })
                  },
                  fail: function () {
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
            fail: function () {
              console.log('登陆失败')
            }
          })
        }else{
          wx.reLaunch({
            url: '/pages/mask/mask',
          })
        }
      }
    })
    
  },
})