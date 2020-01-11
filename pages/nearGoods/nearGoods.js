// pages/nearGoods/nearGoods.js
const app = getApp();
var page = 0,
  rows = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {   
    typeList: ['请选择商品类型', '老花镜', '太阳镜', '镜框类型', '镜片类型', '防蓝光成品镜', '负离子镜', '眼疲劳用品', '护理液', '眼镜盒布', '按摩仪', '弱视用品', '矫正姿势类', '其他'],
    typeIndex: 0,
    dictInfo: '',
    goodsList: []
  },
  // 获取商品列表
  getGoodsList() {
    var that = this;
    wx.showLoading({
      title: '玩命加载中',
    })
    if (that.data.dictInfo == '请选择商品类型') {
      this.setData({
        dictInfo: ''
      })
    }
    page = page + 1;
    wx.request({
      url: getApp().globalData.url + '/rest/sys/periphery/view',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: {
        page: page,
        rows: rows,
        peripheryInfo: that.data.dictInfo
      },
      success: function (res) {
        var list = that.data.goodsList
        if (res.data.code == 0) {
          that.setData({
            goodsList: list.concat(res.data.rows)
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
        wx.hideLoading();
      },
      fail: function () {
        console.log('系统错误');
      }
    })
  },
  // 选择商品类型
  bindType(e) {
    this.setData({
      typeIndex: e.detail.value,
      dictInfo: this.data.typeList[e.detail.value],
      goodsList: []
    })
    page = 0;
    this.getGoodsList()
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    let data = app.touch._touchstart(e, this.data.goodsList)
    this.setData({
      goodsList: data
    })
  },

  //滑动事件处理
  touchmove: function (e) {
    let data = app.touch._touchmove(e, this.data.goodsList)
    this.setData({
      goodsList: data
    })
  },

  //删除事件
  del: function (e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认要删除此条信息么？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中',
          })
          wx.request({
            url: getApp().globalData.url + '/rest/sys/periphery/delete?ids=' + e.currentTarget.dataset.id,
            method: 'DELETE',
            header: {
              // "Content-Type": "application/x-www-form-urlencoded",
              'X-AUTH-TOKEN': app.globalData.token
            },
            success: function (res) {
              if (res.data.code == 200) {
                wx.showToast({
                  title: '删除成功'
                })
                page = 0;
                that.setData({
                  goodsList: []
                })
                that.getGoodsList()
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
              }
              wx.hideLoading();
            },
            fail: function () {
              console.log('系统错误');
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //修改
  edit: function (e) {
    console.log(JSON.stringify(e.currentTarget.dataset))
    wx.navigateTo({
      url: '/pages/goodsAdd/goodsAdd?id=' + e.currentTarget.dataset.id + '&dictName=' + e.currentTarget.dataset.dictname + '&dictInfo=' + e.currentTarget.dataset.dictinfo+"&title=周边产品"
    })
  },
  detail: function (e) {
    console.log(JSON.stringify(e.currentTarget.dataset))
    wx.navigateTo({
      url: '/pages/goodsDet/goodsDet?id=' + e.currentTarget.dataset.id + '&dictName=' + e.currentTarget.dataset.dictname + '&dictInfo=' + e.currentTarget.dataset.dictinfo + "&title=周边产品"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    page = 0;
    this.setData({
      goodsList: []
    })
    this.getGoodsList()
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
    this.getGoodsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})