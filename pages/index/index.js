// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    isLogin: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: true,
    // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
    canIUseOpenData: false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    console.log("Index: onLoad");
    console.log(app.globalData.userInfo);
    app.watch(this.cbGetUserData);
    if(app.globalData.isLogin){
      console.log("index:onLoad: logged in");
    } else {
      console.log("index:onLoad: not logged in");   
    }
    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: true
    //   })
    // }
  },
  cbGetUserData: function(value) {
    console.log("=== index page isLogin: ", value );
    console.log("=== index page userInfo: ", app.globalData.userInfo);
    // set page data here. 
    this.setData({
      isLogin: value,
      userInfo: app.globalData.userInfo
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    console.log("getUserProfile");
    let that = this;
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.login({
          success (res) {
            console.log(res);
            if (res.code) {
              //发起网络请求
              wx.request({
                url: app.globalData.apiURL + '/user/wxlogin',
                data: {
                  code: res.code,
                },
                success: function(res) {
                  console.log(res);
                  wx.removeStorageSync('sessionid') 
                  wx.setStorageSync("userinfo", res.userinfo) //设置本地缓存
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
        
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    console.log("XXXX: called getUserInfo");
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
