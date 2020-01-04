// pages/customInfoAdd/customInfoAdd.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:'',
    pid:'',
    rLuoyanshili:'',
    rQiujing:'',
    rZhujing:'',
    rZhouxiang:'',
    rJiaozhengshili:'',
    lLuoyanshili:'',
    lQiujing:'',
    lZhujing:'',
    lZhouxiang:'',
    lJiaozhengshili:'',
    yuanyongtongju:'',
    yongtu:'',
    jiangkuang:'',
    jiangpian:'',
    yinxing:'',
    price:'',
    createDate:'请选择配镜日期',
    typeListYT: ['请选择用途','远视','近视','两用','多用'],
    indexYT: 0,
    typeListJK: [],
    indexJK: 0,
    typeListJP: [],
    indexJP: 0,
    typeListYX:[],
    indexYX:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.pid)
    this.setData({
      pid:options.pid
    })
    this.getJKTypes()
    this.getJPTypes()
    this.getYXTypes()
  },
  formSubmit(e) {
    // console.log(JSON.stringify(e.detail.value))
    var data = e.detail.value,
    that = this;
    if (data.jiangkuang!==''){
      data.jiangkuang = this.data.typeListJK[data.jiangkuang].id
    }
    if (data.jiangpian !== '') {
      data.jiangpian = this.data.typeListJP[data.jiangpian].id
    }
    if (data.yinxing !== '') {
      data.yinxing = this.data.typeListYX[data.yinxing].id
    }
    if (data.createDate =='请选择配镜日期'){
      data.createDate=''
    }
    // data.loginName = this.data.loginName;
    // data.name = this.data.name;
    // data.password = this.data.password;
    console.log(data)
    var flag = true;
    // for (var i in data) {
    //   if (data[i] === '') {
    //     flag = false;
    //   }
    // }
    if (flag) {
      data.pid = that.data.pid;
      data.cid = '';
      wx.request({
        url: app.globalData.url + '/rest/sys/customersDetail1',
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'X-AUTH-TOKEN': app.globalData.token
        },
        data: data,
        success: function (res) {
          if (res.data.code==200) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration:500
            })
            wx.navigateBack({})
          } else {
            wx.showToast({
              title: res.data.content,
              icon: 'none'
            })
          }
        },
        fail: function () {
          console.log('系统错误');
        }
      })
    } else {
      console.log(data)
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
    }
  },
  bindTime(e){
    this.setData({
      createDate:e.detail.value
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
        data.unshift({ dictName: '请选择镜框', id: '' })
        if (res.data.code == 200) {
          that.setData({
            typeListJK: data
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
  bindJK(e) {
    this.setData({
      indexJK: e.detail.value,
      jiangkuang: this.data.typeListJK[e.detail.value].id
    })
  },
  getJPTypes() {
    var that = this;
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
        data.unshift({ dictName: '请选择镜片', id: '' })
        if (res.data.code == 200) {
          that.setData({
            typeListJP: data
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
  bindJP(e) {
    this.setData({
      indexJP: e.detail.value,
      jiangpian: this.data.typeListJP[e.detail.value].id
    })
  },
  getYXTypes() {
    var that = this;
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
        data.unshift({ dictName: '请选择隐形', id: '' })
        if (res.data.code == 200) {
          that.setData({
            typeListYX: data
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