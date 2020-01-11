// pages/customInfoDet/customInfoDet.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid: '',
    pid: '',
    rLuoyanshili: '',
    rQiujing: '',
    rZhujing: '',
    rZhouxiang: '',
    rJiaozhengshili: '',
    lLuoyanshili: '',
    lQiujing: '',
    lZhujing: '',
    lZhouxiang: '',
    lJiaozhengshili: '',
    yuanyongtongju: '',
    yongtu: '',
    jiangkuang: '',
    jiangpian: '',
    yinxing: '',
    price: '',
    createDate: '请选择配镜日期',
    typeListYT: ['请选择用途', '远视', '近视', '两用', '多用'],
    indexYT: 0,
    typeListJK: [],
    indexJK: 0,
    typeListJP: [],
    indexJP: 0,
    typeListYX: [],
    indexYX: 0,
    desc: '',
    lensData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pid: options.pid,
      cid: options.cid || ''
    })
    if (options.cid) {
      this.getLensData(options.cid)
    }
    this.getDate()
    this.getJKTypes()
    this.getJPTypes()
    this.getYXTypes()

  },
  getDate() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1);
    let date = new Date().getDate() > 9 ? new Date().getDate() : '0' + new Date().getDate();
    this.setData({
      createDate: year + '-' + month + '-' + date
    })
  },
  formSubmit(e) {
    var data = e.detail.value,
      that = this;
    if (data.jiangkuang !== '') {
      data.jiangkuang = this.data.typeListJK[data.jiangkuang].id
    }
    if (data.jiangpian !== '') {
      data.jiangpian = this.data.typeListJP[data.jiangpian].id
    }
    if (data.yinxing !== '') {
      data.yinxing = this.data.typeListYX[data.yinxing].id
    }
    if (data.createDate == '请选择配镜日期') {
      data.createDate = ''
    }
    var flag = true;
    if (flag) {
      data.pId = that.data.pid;
      data.cId = that.data.cid;
      wx.showLoading({
        title: '加载中',
        icon: 'none'
      })
      wx.request({
        url: app.globalData.url + '/rest/sys/customersDetail1',
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'X-AUTH-TOKEN': app.globalData.token
        },
        data: data,
        success: function (res) {
          if (res.data.code == 200) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            wx.navigateBack({})
          } else {
            wx.showToast({
              title: res.data.content,
              icon: 'none'
            })
          }
          wx.hideLoading()
        },
        fail: function () {
          console.log('系统错误');
        }
      })
    } else {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
    }
  },
  getLensData(cid) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })
    wx.request({
      url: app.globalData.url + '/rest/sys/customersDetail/get',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: {
        cId: cid
      },
      success: function (res) {
        if (res.data.code == 200) {
          var data = res.data.data;
          that.setData({
            lensData: data,
            rLuoyanshili: data.rLuoyanshili,
            rQiujing: data.rQiujing,
            rZhujing: data.rZhujing,
            rZhouxiang: data.rZhouxiang,
            rJiaozhengshili: data.rJiaozhengshili,
            lLuoyanshili: data.lLuoyanshili,
            lQiujing: data.lQiujing,
            lZhujing: data.lZhujing,
            lZhouxiang: data.lZhouxiang,
            lJiaozhengshili: data.lJiaozhengshili,
            yuanyongtongju: data.yuanyongtongju,
            jiangkuang: data.jiangkuang,
            jiangpian: data.jiangpian,
            yinxing: data.yinxing,
            price: data.price,
            createDate: new Date(data.createDate).toJSON().split('T')[0],
            indexYT: data.yongtu,
            desc: data.desc
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
  bindTime(e) {
    this.setData({
      createDate: e.detail.value
    })
  },
  bindYT(e) {
    this.setData({
      indexYT: e.detail.value,
      yongtu: e.detail.value
    })
  },
  // 获取商品类型
  getJKTypes() {
    var that = this;
    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })
    wx.request({
      url: app.globalData.url + '/rest/sys/dict/allDictByInfo1',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: {
        dictInfo: '镜框类型'
      },
      success: function (res) {
        var data = JSON.parse(res.data.data);
        data.unshift({
          dictName: '',
          id: ''
        })
        if (res.data.code == 200) {
          that.setData({
            typeListJK: data
          })
          if (that.data.cid) {
            var indexJK = 0;
            for (var i = 0; i < that.data.typeListJK.length; i++) {
              if (that.data.typeListJK[i].dictName == that.data.lensData.jiangkuang) {
                indexJK = i;
              }
            }
            that.setData({
              indexJK: indexJK
            })
          }
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
  bindJK(e) {
    this.setData({
      indexJK: e.detail.value,
      jiangkuang: this.data.typeListJK[e.detail.value].id
    })
  },
  getJPTypes() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.url + '/rest/sys/dict/allDictByInfo1',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: {
        dictInfo: '镜片类型'
      },
      success: function (res) {
        var data = JSON.parse(res.data.data);
        data.unshift({
          dictName: '',
          id: ''
        })
        if (res.data.code == 200) {
          that.setData({
            typeListJP: data
          })
          if (that.data.cid) {
            var indexJP = 0;
            for (var i = 0; i < that.data.typeListJP.length; i++) {
              if (that.data.typeListJP[i].dictName == that.data.lensData.jiangpian) {
                indexJP = i;
              }
            }
            that.setData({
              indexJP: indexJP
            })
          }

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
  bindJP(e) {
    this.setData({
      indexJP: e.detail.value,
      jiangpian: this.data.typeListJP[e.detail.value].id
    })
  },
  getYXTypes() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.url + '/rest/sys/dict/allDictByInfo1',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: {
        dictInfo: '隐形类型'
      },
      success: function (res) {
        var data = JSON.parse(res.data.data);
        data.unshift({
          dictName: '',
          id: ''
        })
        if (res.data.code == 200) {
          that.setData({
            typeListYX: data
          })
          if (that.data.cid) {
            var indexYX = 0;
            for (var i = 0; i < that.data.typeListYX.length; i++) {
              if (that.data.typeListYX[i].dictName == that.data.lensData.yinxing) {
                indexYX = i;
              }
            }
            that.setData({
              indexYX: indexYX
            })
          }
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
  bindYX(e) {
    this.setData({
      indexYX: e.detail.value,
      yinxing: this.data.typeListYX[e.detail.value].id
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