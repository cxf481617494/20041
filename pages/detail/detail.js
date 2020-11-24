// pages/detail/detail.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
   //轮播图开始
   indicatorDots: true,
   vertical: false,
   autoplay: true,
   interval: 2000,
   duration: 500,
   //轮播图结束
   //详情页
   
  },
  //图片改变事件
  swipperChange:function(e){
    let current = e.detail.current;
    this.setData({
      current :current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;//定义一个变量
    wx.request({
      url: 'https://www.259775.top/api/detail',
    data :{
      goods_id :options.goods_id,
      token : wx.getStorageSync('token')
    },
    success (res) {
      if(res.data.code==1111){
        //清除所有缓存
        wx.clearStorageSync();
        wx.showModal({
          title: '提示',
          content: '登陆信息过期,请重新登录',
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
      }else{
         _this.setData({
        goods : res.data,
        background: res.data.goods_imgs,
      })
      }
     
     }
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
// 轮播图滑动时触发，当前页索引改变
onSlideChange(e) {
  this.setData({
    lunboindex: e.detail.current + 1
  })
},
// 点击图片预览
bigImg(e) {
  wx.previewImage({
    urls: this.data.data.imagess,
  })
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
//加入购物车
carts:function(e){
  
  wx.showModal({
    title: '提示',
    content: '确定加入购物车?',
    success (res) {
      if (res.confirm) {
        let detail_goods_id = e.currentTarget.dataset.goodsid;
        wx.setStorage({
          data: detail_goods_id,
          key: 'detail_goods_id',
        })
        // console.log(goods_id);
        wx.switchTab({
          url: '/pages/cart/cart',
          success(res){
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
  //跳转路由

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

  },
  // 轮播图滑动时触发，当前页索引改变
  onSlideChange(e) {
    this.setData({
      lunboindex: e.detail.current + 1
    })
  },
})