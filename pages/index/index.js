//index.js

// const { userInfo } = require("os");

//获取应用实例
const app = getApp()

Page({
  //点击跳转详情页面
  //获取点击的id
catchTapCategory: function (e) {
    var goodsId = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '/pages/detail/detail?goods_id='+goodsId
    })
  },
  
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  data: {
    motto: '123',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //轮播图开始
    background: ["/images/discount-banner.jpg","/images/draw-banner.jpg","/images/nursing-banner.jpg"],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    //轮播图结束
    //下拉刷新
    list :[],
    page : 1,   //开始页数
    pagesize :10 //每页几条数据

  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //请求后台数据的接口
  getGoodsList:function(){
    let _this = this;//定义一个变量
    wx.request({
      url: 'https://www.259775.top/api/goods', //商品的接口
      header: {
        'content-type': 'application/json' // 默认值
      },
      data :{
       page : _this.data.page,
       size : _this.data.pagesize,
      },
      success (res) {
        // console.log(res);
        let new_goods_name = _this.data.list.concat(res.data.data)
       _this.setData({
         list : new_goods_name
       })
      }
    })
  },
  //下拉触发刷新事件
  onReachBottom : function(){
    console.log(123);
      this.data.page++;
      this.getGoodsList();
  },
  //页面加载事件
  onLoad: function () {
    let userinfo = wx.getStorageSync('userInfo');
    if(userinfo==""){
      wx.showModal({
        title: '提示',
        content: '请先登录',
        success (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/my/my',
              success(){
                let page = getCurrentPages().pop(); //跳转页面成功之后
                if (!page) return;
                page.onLoad(); //如果页面存在，则重新刷新页面
                }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    //调用商品数据封装的函数
    this.getGoodsList();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          wx.setStorage({
            data: res,
            key: 'userinfos',
          })
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

})
