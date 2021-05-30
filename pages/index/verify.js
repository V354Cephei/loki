// pages/index/verify.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userData: {},
    mobile: null,
    code: null,
    loginCode: null
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
  mobileChange: function (e) {
    let value = e.detail.value
    this.setData({
      mobile: value
    })
  },
  codeChange: function (e) {
    let value = e.detail.value
    this.setData({
      code: value
    })
  },
  verify: function () {
    let that = this;
    let verifyURL = app.globalData.apiURL + '/user/verify';
    // 获取wx用户opendata的基础信息用来绑定新用户
    // avatar，nickname
    wx.getUserProfile({
      desc: '需要您的微信信息来绑定小程序', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        app.globalData.userInfo = res.userInfo;
        that.setData({
          userInfo: res.userInfo,
        });
        var header = {
          'content-type': 'application/json; charset=utf-8',
        };
        wx.login({
          success(res) {
            if (res.code) {
              console.log("verify api: ", that.data.mobile, that.data.code, that.data.userInfo);
              wx.request({
                url: verifyURL,
                method: "POST",
                header: header,
                data: {
                  mobile: that.data.mobile,
                  code: that.data.code,
                  loginCode: res.code,
                  userInfo: that.data.userInfo
                },
                success: function (res) {
                  // if success, set the userData
                  // 后续页面根据userData参数进行判定
                  console.log("verify request succeed.");
                  console.log(res);
                  if (res.data.code == 1000) {
                    // 验证失败
                    // 后期能返回各个校区联系人信息
                    console.log(res.data.msg);
                    wx.showModal({
                      title: '您输入的手机号或验证码错误!',
                      content: '如果不知道验证码请与你的报名人员联系。',
                      showCancel: false,
                      success (res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    });                    
                    return;
                  }
                  var cookie = res.header["Set-Cookie"];
                  if (cookie != null) {
                    wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
                  }
                  app.globalData.userData = res.data.userData;
                  app.globalData.isLogin = true;
                  // 验证成功，跳转到对应页面
                  console.log("verify success userinfo: ", res.data.userData);
                  let utype = res.data.userData["utype"]
                  switch(utype){
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
                      console.log("Verify returned unkonwn user type. please contact admin.")
                      break;
                  }
                },
                fail: function (res) {
                  console.log(res);
                }
              })
            } else {
              console.log("wx.login失败, " + res.errMsg);
            }
          }
        })
      }
    });
  },
  tapNotRegistered: function () {
    wx.redirectTo({
      url: '/pages/index/not_registered',
    })
  }
})