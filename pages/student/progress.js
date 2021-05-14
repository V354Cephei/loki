// pages/student/result.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    n: 0,
    nEasy: 0,
    nHard: 0,
    nMid: 0,
    ec: {
      lazyLoad: true,
      // onInit: initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
    })
    this.echartsComponnet1 = this.selectComponent('#mychart-dom-line-course1');
    this.echartsComponnet2 = this.selectComponent('#mychart-dom-line-course2');
    // this.getData();
    this.init_echarts1();
    this.init_echarts2();
  },
  /**
   * getdata from remote db 
   */
  getData: function () {
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        dataList = res.data;
        this.init_echarts(); //初始化图表
      }
    });
  },
  /**
   * 图表初始化
   */
  init_echarts1: function () {
    this.echartsComponnet1.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  init_echarts2: function () {
    this.echartsComponnet2.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  /**
   * prepare chart options
   */
  getOption: function () {
    var option = {
      tooltip: {
          trigger: 'axis'
      },
      // legend: {
      //     data: ['总数', '熟悉', '知道', '陌生'],
      //     bottom: 'bottom'
      // },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
          type: 'value'
      },
      series: [
          {
              name: '总数',
              type: 'line',
              stack: '总量',
              data: [20, 20, 50, 50, 20, 20, 20],
              lineStyle: {color: '#FFFFFF'},
              smooth: true
          },
          {
              name: '熟悉',
              type: 'line',
              stack: '总量',
              data: [10, 12, 11, 40, 30, 18, 16],
              smooth: true
          },
          {
              name: '知道',
              type: 'line',
              stack: '总量',
              data: [5, 3, 6, 8, 11, 1, 2],
              smooth: true
          },
          {
              name: '陌生',
              type: 'line',
              stack: '总量',
              data: [5, 5, 3, 2, 9, 1, 2],
              smooth: true
          },
      ]
  };
    return option;
  },

  /**
   * 返回主页
   */
  goHome: function () {
    wx.redirectTo({
      url: '/pages/student/index',
    });
  },

  /**
   * 再来一局
   */
  playAgain: function () {
    wx.redirectTo({
      url: '/pages/student/flipcard',
    })
  },

  /**
   * 看进度
   */
  openMyProgress: function () {
    wx.redirectTo({
      url: '/pages/course/index',
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