// pages/customEdit/customEdit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: '请选择',
    sexList: ['女', '男'],
    peijingdate: '请选择创建时间',
    id:'',
    fullname:'',
    age: '',
    phone: '',
    jianpin: '',
    address: ''
  },
  bindSexChange(e) {
    this.setData({
      sex: this.data.sexList[e.detail.value]
    })
  },
  bindTime(e) {
    this.setData({
      peijingdate: e.detail.value
    })
  },
  // 获取客户信息
  getCustom(){
    var that = this;
    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })
    wx.request({
      url: app.globalData.url + '/rest/sys/customers/get',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: {
        id:that.data.id,
        page:1,
        rows:10
      },
      success: function (res) {
        if (res.data.success) {
          var data = res.data.sysCustomers
          that.setData({
            fullname: data.fullname,
            sex: that.data.sexList[data.sex],
            age: data.age,
            phone: data.phone,
            jianpin: data.jianpin,
            address: data.address,
            peijingdate: data.peijingdate
          })
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
  },
  formSubmit(e) {
    var data = e.detail.value;
    data.peijingdate = this.data.peijingdate;
    var flag = true;
    for (var i in data) {
      if (data[i] === '' || data[i] == '请选择创建时间') {
        flag = false;
      }
    }
    if (flag) {
      data.id = this.data.id
      wx.showLoading({
        title: '加载中',
        icon: 'none'
      })
      wx.request({
        url: app.globalData.url + '/rest/sys/customers1',
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
            setTimeout(function () {
              wx.navigateBack({})
            })
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
      console.log(data)
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getCustom()
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