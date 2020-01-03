// pages/customList/customList.js
const app = getApp();
var page = 0,
  rows = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSearch: false,
    customList: [],
    search: '',
    jianpin: '',
    fullname: '',
    phone: '',
    fromTime: '统计开始时间',
    toTime: '统计结束时间'
  },
  // 获取客户列表
  getCustomList() {
    var that = this;
    wx.showLoading({
      title: '玩命加载中',
    })
    page = page + 1;
    var fromTime = '',
      toTime = '';
    if (this.data.fromTime != '统计开始时间') {
      fromTime = this.data.fromTime;
    }
    if (this.data.toTime != '统计结束时间') {
      toTime = this.data.toTime;
    }
    wx.request({
      url: getApp().globalData.url + '/rest/sys/customers/view',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: {
        page: page,
        rows: rows,
        jianpin: this.data.jianpin,
        fullname: this.data.fullname,
        phone: this.data.phone,
        fromTime: fromTime,
        ToTime: toTime,
        searchStr: this.data.search
      },
      success: function(res) {
        var list = that.data.customList
        if (res.data.code == 0) {
          that.setData({
            customList: list.concat(res.data.rows)
          })
        } else {
          console.log('')
        }
        
        wx.hideLoading();
      },
      fail: function() {
        console.log('系统错误');
      }
    })
  },
  searchEdit(e) {
    this.setData({
      search: e.detail.value
    })
  },
  // 搜索框输入完成
  searchConfirm(e) {
    page = 0;
    this.setData({
      customList: [],
      jianpin: '',
      fullname: '',
      phone: '',
      fromTime: '统计开始时间',
      toTime: '统计结束时间'
    })
    this.getCustomList()
  },
  closeMask(e) {
    this.setData({
      isSearch: false
    })
  },
  toHighSearch() {
    this.setData({
      isSearch: true
    })
  },
  jpedit(e) {
    this.setData({
      jianpin: e.detail.value,
    })
  },
  fullnameedit(e) {
    console.log(e.detail.value)
    this.setData({
      fullname: e.detail.value,
    })
  },
  phoneedit(e) {
    this.setData({
      phone: e.detail.value,
    })
  },
  bindFromTime(e) {
    this.setData({
      fromTime: e.detail.value
    })
  },
  bindToTime(e) {
    this.setData({
      toTime: e.detail.value
    })
  },
  // 高级搜索
  highSearch() {
    page=0;
    this.setData({
      customList: [],
      isSearch: false,
      search:''
    })
    this.getCustomList();
  },
  showDetail(e) {
    wx.navigateTo({
      url: '/pages/customInfo/customInfo?id=' + e.currentTarget.dataset.id,
    })
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {
    //开始触摸时 重置所有删除
    let data = app.touch._touchstart(e, this.data.customList)
    this.setData({
      customList: data
    })
  },

  //滑动事件处理
  touchmove: function(e) {
    let data = app.touch._touchmove(e, this.data.customList)
    this.setData({
      customList: data
    })
  },

  //删除事件
  del: function(e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认要删除此条信息么？',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中',
          })
          wx.request({
            url: getApp().globalData.url + '/rest/sys/customers/delete',
            method: 'post',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'X-AUTH-TOKEN': app.globalData.token
            },
            data: {
              ids: e.currentTarget.dataset.id
            },
            success: function (res) {
              if (res.data.code == 200) {
                wx.showToast({
                  title:'删除成功'
                })
                page=0;
                that.setData({
                  customList: []
                })
                that.getCustomList()
              } else {
                console.log('')
              }
              wx.hideLoading();
            },
            fail: function () {
              console.log('系统错误');
            }
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  //修改
  edit: function(e) {
    wx.navigateTo({
      url: '/pages/customEdit/customEdit?id=' + e.currentTarget.dataset.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // page = 0;
    // this.setData({
    //   customList:[]
    // })
    // this.getCustomList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    page = 0;
    this.setData({
      customList: []
    })
    this.getCustomList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getCustomList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})