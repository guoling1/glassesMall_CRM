// pages/customAdd/customAdd.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: '男',
    sexList: ['女','男'],
    peijingdate:'请选择创建时间'
  },
  bindSexChange(e){
    this.setData({
      sex: this.data.sexList[e.detail.value]
    })
  },
  bindTime(e) {
    this.setData({
      peijingdate: e.detail.value
    })
  },
  getDate() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1);
    let date = new Date().getDate() > 9 ? new Date().getDate() : '0' + new Date().getDate();
    this.setData({
      peijingdate: year + '-' + month + '-' + date
    })
  },
  formSubmit(e) {
    var data = e.detail.value;
    data.peijingdate = this.data.peijingdate;
    var flag = true;
    for (var i in data) {
      if(i!='address'){
        if (data[i] === '' || data[i] == '请选择创建时间') {
          flag = false;
        }
      }
      
    }
    if (flag) {
      data.id=''
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
          if (res.data.code==200) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            setTimeout(function(){
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
    this.getDate()
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