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
    console.log("options: hard " + options.easy + ",mid " + options.hard + ",easy " + options.mid + ",n " + options.n);
    this.setData({
      n: options.n,
      nHard: options.hard,
      nEasy: options.easy,
      nMid: options.mid
    })
    this.echartsComponnet = this.selectComponent('#mychart-dom-pie');
    // this.getData();
    this.init_echarts();
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
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
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
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
    },
      legend: {
        orient: 'vertical',
        bottom: 'bottom'
      },
      backgroundColor: "#ffffff",
      color: ["#91cc75", "#fac858", "#ee6666", ],
      series: [{
        type: 'pie',
        radius: "70%",
        data: [{
          value: this.data.nEasy,
          name: '熟悉'
        }, {
          value: this.data.nMid,
          name: '知道'
        }, {
          value: this.data.nHard,
          name: '陌生'
        }]
      }]
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
      url: '/pages/student/progress',
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