// pages/student/strength.js
import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
// 绘制雷达图
function initRadarChart(canvas, width, height, dpr) {
  const radarChart1 = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(radarChart1);

  var option = {
    // backgroundColor: "#ffffff",
    color: ["#f53939", "#FF9F7F"],
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      // shape: 'circle',
      indicator: [{
        name: '公共英语',
        max: 100
      },
      {
        name: '管理学',
        max: 100
      },
      {
        name: '物流学',
        max: 100
      }
      ],
      // radius: 80
    },
    series: [{
      
      type: 'radar',
      tooltip: {
        trigger: 'item'
    },
    areaStyle: {},
      data: [{
        value: [60, 70, 90],
        // name: '预算'
      }
      ]
    }]
  };

  radarChart1.setOption(option);
  return radarChart1;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radarEC1: {
      onInit: initRadarChart
    }
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