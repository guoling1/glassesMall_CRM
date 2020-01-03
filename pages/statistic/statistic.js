// pages/statistic/statistic.js
// let Charts = require('../../utils/echarts.js');
import * as echarts from '../../ec-canvas/echarts';
const app = getApp()
var lastData = [], thisData=[];
function initChart(canvas, width, height) {

  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  const option = {
    title: {
      text: '客户人数统计',
      textStyle: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14
      },
      left: 30,
      top: 15
    },
    color: ['#2ea4df', '#f15e4c'],
    legend: {
      data: [{
        name: '去年',
        textStyle: {
          fontSize: 10
        }
      }, {
        name: '今年',
        textStyle: {
          fontSize: 10
        }
      }],
      left: 40,
      top: 40,
      itemHeight: 2,
      itemWidth: 9
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#c8cdd6'
        }
      },
      axisLabel: {
        color: '#000',
        fontSize: 7,
        margin: 4
      },
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    },
    yAxis: [{
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#c8cdd6'
        }
      },
      axisLabel: {
        color: '#000',
        fontSize: 8,
        margin: 4
      },
      axisTick: {
        length: 1
      }
    }],
    series: [{
        name: '去年',
        type: 'bar',
        barGap: '1%',
        data: lastData
      },
      {
        name: '今年',
        type: 'bar',
        data: thisData
      }
    ]
  };

  canvas.setChart(chart);
  chart.setOption(option);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countData:[],
    fromTime:'统计开始时间',
    toTime: '统计结束时间',
    ec: {
      onInit: initChart
    }
  },
  bindFromTime(e){
    this.setData({
      fromTime: e.detail.value
    })
  },
  bindToTime(e) {
    this.setData({
      toTime: e.detail.value
    })
  },
  // 获取人数统计
  getIncome() {
    var that = this;
    var fromTime='',
      toTime='';
    if (this.data.fromTime !='统计开始时间'){
      fromTime = this.data.fromTime;
    }
    if (this.data.toTime != '统计结束时间') {
      toTime = this.data.toTime;
    }
    wx.request({
      url: getApp().globalData.url + '/rest/sys/statistics/patDet1',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data:{
        page:1,
        rows:12,
        fromTime: fromTime,
        ToTime: toTime
      },
      success: function(res) {
        lastData=[];
        thisData=[]
        if (res.data.code == 0) {
          for (var i = 0; i < res.data.rows.length;i++){
            lastData.push(res.data.rows[i].lastPatCount ? res.data.rows[i].lastPatCount:0)
            thisData.push(res.data.rows[i].thisPatCount ? res.data.rows[i].thisPatCount: 0)
          }
          that.setData({
            countData: res.data.rows
          })
        } else {
          console.log('')
        }
      },
      fail: function() {
        console.log('系统错误');
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getIncome()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})