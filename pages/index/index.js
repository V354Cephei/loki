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
    console.log(app.globalData.isLogin);
    console.log(app.globalData.userInfo);
    app.watch(this.cbGetUserData);
    
    if (app.globalData.isLogin) {
      this.setData({
        userInfo: app.globalData.userInfo,
        isLogin: app.globalData.isLogin
      })
      if(this.isLogin){
        this.gotoUserIndex(userInfo["utype"]);
      }
    }
    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: true
    //   })
    // }
  },
  cbGetUserData: function (value) {
    // set page data here. 
    this.setData({
      isLogin: value,
      userInfo: app.globalData.userInfo
    });
    this.gotoUserIndex(app.globalData.userInfo['utype']);
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
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
          success(res) {
            console.log(res);
            if (res.code) {
              //发起网络请求
              wx.request({
                url: app.globalData.apiURL + '/user/wxlogin',
                data: {
                  code: res.code,
                },
                success: function (res) {
                  console.log(res);
                  wx.removeStorageSync('sessionid')
                  wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
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
  },
  tapLogin: function () {
    let that = this;
    // 检查sessionid 是否存在，存在则可能说明已经在srv成功登陆过，此次使用session信息登陆则可
    // 不存在则调用wx.login获取code去直接发送到后端进行
    let sessionid = wx.getStorageSync("sessionid")
    if (sessionid) {
      that.getUserData(null);
    } else {
      wx.login({
        success(res) {
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
  tapVerify: function () {
    wx.redirectTo({
      url: '/pages/index/verify',
    })
  },
  gotoUserIndex: function(utype) {
        switch (utype) {
          case 0:
            wx.redirectTo({
              url: '/pages/student/index',
            });
            break;
          case 1:
            wx.redirectTo({
              url: '/pages/advisor/index',
            })
            break;
          case 101:
            wx.redirectTo({
              url: '/pages/sadmin/index',
            });
            break;
          default:
            console.log("wxLogin returned unkonwn user type. please contact admin.")
            break;
        };
  },
  getUserData: function (sessionCode) {
    let that = this;
    let loginURL = app.globalData.apiURL + '/user/wxlogin';
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
      success: function (res) {
        // if success, set the userInfo
        // 后续页面根据userInfo参数进行判定
        if (res.data.code == 1001) {
          wx.redirectTo({
            url: '/pages/index/verify',
          });
          return;
        }
        var cookie = res.header["Set-Cookie"];
        if (cookie != null) {
          wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
        }
        app.globalData.userInfo = res.data.userInfo;
        app.globalData.isLogin = true;
        // 登陆成功，跳转到对应主页
        let utype = res.data.userInfo["utype"]
        that.gotoUserIndex(utype);
      },
      fail: function (res) {
        console.log("wx.request failed");
        console.log(res);
      }
    })
  },
})