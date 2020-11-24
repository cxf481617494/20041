// pages/login/login.js
Page({
  handleGetUserInfo (e) {
    // console.log(e);
    const { userInfo } = e.detail;
    wx.setStorageSync('userInfo', userInfo);
     //登录
     wx.login({
      success (res) {
        if (res.code) {
          console.log(wx.getStorageSync('userInfo'));
          //发起网络请求
          wx.request({
            url: 'https://www.259775.top/api/login',
            data: {
              userInfo: wx.getStorageSync('userInfo'),
              code: res.code
            },
            
            success(res){
              console.log (res);
              //将token存入本地存储
                wx.setStorage({
                  data: res.data.token,
                  key: 'token',
                })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    wx.navigateBack({
      delta: 1
    });
  },

})