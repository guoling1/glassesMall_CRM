// pages/purchaseAdd/purchaseAdd.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    peripherySaleId: '',
    purchaseName:'',
    saleMoney: '',
    createTime: '请选择配镜日期',
    nameList:['lhj','tyj','jk','jp','flg','flz','ypl','hly','yjh','amy','rs','jz','qt','yy'],
    indexlhj:0,
    indextyj: 0,
    indexjk: 0,
    indexjp: 0,
    indexflg: 0,
    indexflz: 0,
    indexypl: 0,
    indexhly: 0,
    indexyjh: 0,
    indexamy: 0,
    indexrs: 0,
    indexjz: 0,
    indexqt: 0,
    indexyy: 0,
    type1: '',
    type2: '',
    type3: '',
    type4: '',
    type5: '',
    type6: '',
    type7: '',
    type8: '',
    type9: '',
    type10: '',
    type11: '',
    type12: '',
    type13: '',
    type14: '',
    typeList: ['老花镜', '太阳镜', '镜框类型', '镜片类型', '防蓝光成品镜', '负离子镜', '眼疲劳用品', '护理液', '眼镜盒布', '按摩仪', '弱视用品', '矫正姿势类', '其他','眼药'],
    lensData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pid: options.pid,
      peripherySaleId: options.peripherySaleId || ''
    })
    if (options.peripherySaleId) {
      this.getLensData(options.peripherySaleId)
    }
    this.getDate()
    var that = this
    for(var i=0;i<this.data.typeList.length;i++){
      (function (num) { that.getSelectList(that.data.typeList[num], 'list' + that.data.nameList[num], that.data.nameList[num],num+1)})(i)
    }
    
  },
  getDate() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1);
    let date = new Date().getDate() > 9 ? new Date().getDate() : '0' + new Date().getDate();
    this.setData({
      createTime: year + '-' + month + '-' + date
    })
  },
  bindData(e){
    var obj = {}
    obj['type'+e.currentTarget.dataset.num] = this.data[e.currentTarget.dataset.list][e.detail.value].id
    obj['index' + e.currentTarget.dataset.name] = e.detail.value
    this.setData(obj)
  },
  formSubmit(e) {
    var data = this.data;
    var obj={
      peripherySaleId: data.peripherySaleId,
      purchaseName: e.detail.value.purchaseName,
      saleMoney: e.detail.value.saleMoney,
      createTime: data.createTime,
      type1: data.type1,
      type2: data.type2,
      type3: data.type3,
      type4: data.type4,
      type5: data.type5,
      type6: data.type6,
      type7: data.type7,
      type8: data.type8,
      type9: data.type9,
      type10: data.type10,
      type11: data.type11,
      type12: data.type12,
      type13: data.type13,
      type14: data.type14
    }
    
    var flag = true;
    if (flag) {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: app.globalData.url + '/rest/sys/peripherySale/saveOrUpdate',
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'X-AUTH-TOKEN': app.globalData.token
        },
        data: obj,
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
  getLensData(peripherySaleId) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.url + '/rest/sys/peripherySale/get',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: {
        id: peripherySaleId
      },
      success: function (res) {
        if (res.data.code == 200) {
          var data = res.data.data;
          that.setData({
            lensData: data,
            createTime: data.createTime,
            saleMoney: data.saleMoney,
            purchaseName: data.purchaseName,
            type1:data.type1,
            type2: data.type2,
            type3: data.type3,
            type4: data.type4,
            type5: data.type5,
            type6: data.type6,
            type7: data.type7,
            type8: data.type8,
            type9: data.type9,
            type10: data.type10,
            type11: data.type11,
            type12: data.type12,
            type13: data.type13,
            type14: data.type14
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
      createTime: e.detail.value
    })
  },
  // 获取下拉内容
  getSelectList(peripheryInfo,name,name1,ind) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/rest/sys/periphery/allPeripheryByInfo1',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: {
        peripheryInfo: peripheryInfo
      },
      success: function (res) {
        var data = JSON.parse(res.data.data);
        data.unshift({
          peripheryName: '请选择',
          id: ''
        })
        if (res.data.code == 200) {
          var obj={}
          obj[name]=data
          that.setData(obj)
          if (that.data.peripherySaleId) {
            var index = 0,
              data1 = data;
            for (var i = 0; i < data1.length; i++) {
              if (data1[i].id == that.data.lensData['type'+ind]) {
                index = i;
              }
            }
            obj = {}
            obj['index' + name1] = index
            that.setData(obj)
          }
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