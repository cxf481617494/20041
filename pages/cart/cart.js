import { request } from "../../request/request.js"
//获取应用实例
// const app = getApp()
Page({
  data: {
    userAddress: {},
    cartArr:[],
    totalPrice: 0,
    totalGoodsNum: 0,
    allChecked: true
  },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //取出详情商品id
    let goods_id = wx.getStorageSync('detail_goods_id')
    let _this = this;//定义一个变量
    wx.request({
      url: 'https://www.259775.top/api/cart',
    data :{
      goods_id : goods_id,
      goods_num : 1,
      token : wx.getStorageSync('token')
    },
    success (res) {
      // console.log(res);
      _this.setData({
        cartArr : res.data,
       
      })
     }
    })
  },

  onShow () {
    let userAddress = wx.getStorageSync('userAddress');
    let cartArr = wx.getStorageSync('cartArr');
    this.setData({
      userAddress
    })
    this.setCartData(cartArr);
  },

  handleAddress () {
    let flag;
    wx.getSetting({
      success: (result) => {
        flag = result.authSetting['scope.address'];
      }
    })
    if (flag === false) {
      wx.openSetting({
        success: (result) => {
          console.log(result);
        }
      })
    }
    wx.chooseAddress({
      success: (result) => {
        let addressInfo = result;
        addressInfo.all = result.provinceName + result.cityName + result.countyName + result.detailInfo;
        wx.setStorageSync('userAddress', addressInfo);
      }
    });   
  },
  setCartData (cartArr) {
    let allChecked = true;
    let totalPrice = 0;
    let totalGoodsNum = 0;
    cartArr.forEach(v => {
      if (v.checked) {
        totalPrice += v.goods_num * v.shop_price;
        totalGoodsNum += v.goods_num
      } else {
        allChecked = false;
      }
    });
    allChecked = cartArr.length !== 0 ? allChecked : false;
    this.setData({
      cartArr,
      allChecked,
      totalPrice,
      totalGoodsNum
    })  
    wx.setStorageSync('cartArr', cartArr)
  },

  handleCheckedChange (e) {
    let goods_id = e.currentTarget.dataset.id;
    let { cartArr } = this.data;
    let index = cartArr.findIndex(v => v.goods_id === goods_id);
    cartArr[index].checked = !cartArr[index].checked;
    this.setCartData(cartArr);
  },

  handleAllChecked () {
    let { cartArr, allChecked } = this.data;
    allChecked = !allChecked;
    cartArr.forEach(v => {
      v.checked = allChecked;
    });
    this.setCartData(cartArr);
  },

  handleOptionNumber (e) {
    
    let { id, optionnum } = e.currentTarget.dataset;
    let { cartArr } = this.data;
    let index = cartArr.findIndex(v => v.goods_id === id);
    if (cartArr[index].goods_num === 1 && optionnum === -1) {
      return false;
    } else {
      cartArr[index].goods_num += optionnum;
     wx.request({
       url: 'https://www.259775.top/api/carts',
       data:{
         goods_num : cartArr[index].goods_num,
         goods_id : cartArr[index].goods_id
       },
       success(res){
        console.log(res); 
       }
     })
      this.setCartData(cartArr);
    }
  }

})