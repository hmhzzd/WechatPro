//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    year: 2022,
    mes: [],
  },
  //进入页面
  btn:function(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  


  onLoad: function () {
    var that = this;
    that.setData({
      year: new Date().getFullYear()
    });
  },
  onShow: function () {

  },
  onReady: function () {
    
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);


  }
  ,
 
});