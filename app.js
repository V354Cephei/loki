// app.js
var log = require('./logs.js')

App({
  globalData: {
    userInfo: {}, // user information from wx api
    userData: {},   // user information from our api
    isLogin: false,
    apiURL: "http://192.168.0.102:5000"
  },
  getUserData: function(sessionCode) {
    let that = this;
    let loginURL = this.globalData.apiURL + '/user/wxlogin';
    var header = {
      'content-type': 'application/json; charset=utf-8',
      'cookie': wx.getStorageSync("sessionid")
    };
    // 从服务器获取最新用户数据
    wx.request({
      url: loginURL,
      header: header,
      data: {
        code: sessionCode
      },
      success: function(res) {
        // if success, set the userData
        // 后续页面根据userData参数进行判定
        if (res.data.code == 1001){
          wx.redirectTo({
            url: '/pages/index/verify',
          });
          return;
        }
        var cookie = res.header["Set-Cookie"];
        if (cookie != null) {
          wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
        }
        that.globalData.userData = res.data.userData;
        that.globalData.isLogin = true;
      },
      fail: function(res) {
        console.log("wx.request failed");
        wx.reLaunch({
          url: '/pages/index/404',
        });
      }
    })
  },
  onLaunch() {
    let that = this;
    // 检查sessionid 是否存在，存在则可能说明已经在srv成功登陆过，此次使用session信息登陆则可
    // 不存在则调用wx.login获取code去直接发送到后端进行
    let sessionid = wx.getStorageSync("sessionid")
    if (sessionid){
      that.getUserData(null);
    } else {
      wx.login({
        success (res) {
          console.log(res);
          if (res.code) {
            console.log("wx.login 成功");
            that.getUserData(res.code);
          } else {
            console.log('wx.login 失败！' + res.errMsg);
            // TODO：如何处理？弹出提醒吗？再次请求吗？
          }
        }
      }); //重新登录     
    }
  },
  watch: function (cbFn) {
    var obj = this.globalData
    Object.defineProperty(obj, 'isLogin', {
      set: function (value) {
        this._isLogin = value;
        cbFn(value);
      },
      get: function () {
        return this._isLogin;
      }
    })
  },
  
})
