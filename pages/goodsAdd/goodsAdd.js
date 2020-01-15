// pages/goodsAdd/goodsAdd.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dictName:'',
    typeList: ['请选择商品类型', '镜框类型', '镜片类型', '隐形类型'],
    typeIndex: 0,
    dictInfo: '',
    id:'',
    title:'新增商品',
    url:'/rest/sys/dict/saveOrUpdate'//新增商品
  },
  // 选择商品类型
  bindType(e) {
    this.setData({
      typeIndex: e.detail.value,
      dictInfo: this.data.typeList[e.detail.value]
    })
  },
  formSubmit(e) {
    var data = e.detail.value;
    data.dictInfo = this.data.dictInfo;
    var flag = true;
    for (var i in data) {
      if (data[i] === '' || data[i] == '请选择商品类型') {
        flag = false;
      }
    }
    if (flag) {
      data.id = this.data.id
      if (this.data.title =='周边产品'){
        data={
          id: this.data.id,
          peripheryInfo: this.data.dictInfo,
          peripheryName: e.detail.value.dictName
        }
      }
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: app.globalData.url + this.data.url,
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
    if (options.title) {
      wx.setNavigationBarTitle({
        title: '周边产品记录',
      })
      this.setData({
        title: options.title,
        url: '/rest/sys/periphery/saveOrUpdate', //新增周边产品
        typeList: ['请选择商品类型', '老花镜', '太阳镜', '镜框类型', '镜片类型', '防蓝光成品镜', '负离子镜', '眼疲劳用品', '护理液', '眼镜盒布', '按摩仪', '弱视用品', '矫正姿势类', '眼药','其他'],
      })
    }
    if(options.id){
      var ind;
      for(var i=0;i<this.data.typeList.length;i++){
        if (this.data.typeList[i] == options.dictInfo){
          ind = i
        }
      }
      this.setData({
        id:options.id,
        dictName:options.dictName,
        dictInfo: options.dictInfo,
        typeIndex:ind
      })
    }
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