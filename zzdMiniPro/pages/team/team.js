// pages/zuidui/index.js
// 获取全局变量
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      matchnames:[],
      matchname:'',
      msg:'',
      status:''
  },
  /* 下拉框筛选 */
  bindchange(e){
      var that = this
      console.log(e);
      console.log('picker发送选择改变，携带值为',e.detail.value)
      var that = this
      this.setData({
          index:e.detail.value,
          matchname:that.data.matchnames[e.detail.value]
      })
      console.log(this.data.matchnames[e.detail.value])
      /* 向后台传递比赛名称 */
      wx.request({
        url: 'http://101.200.199.153:8082/Api/TeamNeed/TeamNeedList',
        data: {
            "matchName":this.data.matchname,
        },
        header: {
            token:'123456'
        },
        method: 'GET',
        timeout: 0,
        success: (res) => {
            this.setData({
                msg:res.data.data.list
            })
        },
        fail: (res) => {},
        complete: (res) => {},
      })
  },
  /* 获取用户信息 */
  hasuserInfo(e){
    if(app.appData.userInfo == null){
        wx.getUserProfile({
          desc: '获取昵称和头像',
          success: (res) => {
            app.appData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo:true
            }),
            console.log(app.appData.token)
            console.log(res.userInfo.avatarUrl)
            console.log(res.userInfo)
            console.log(app.appData.userInfo.avatarUrl)
            wx.redirectTo({
              url: '/pages/new/new',
              success: (res) => {},
              fail: (res) => {},
              complete: (res) => {},
            })
          },
          /* 用户拒绝提示内容 */
          fail: (res) => {
              wx.showModal({
                cancelColor: '#666',
                cancelText: '我再想想',
                confirmColor: '#00b26a',
                confirmText: '我要授权',
                content: '不授权不能发布组队信息哟~',
                editable: false,
                showCancel: true,
                title: '提示',
                success: (result) => {
                    if(result.confirm){
                        wx.getUserProfile({
                          desc: '获取昵称和头像',
                          success: (res) => {
                            app.appData.userInfo = res.userInfo
                            this.setData({
                              userInfo: res.userInfo,
                              hasUserInfo:true
                            }),
                            console.log(res.userInfo.avatarUrl)
                            console.log(res.userInfo)
                            console.log(app.appData.userInfo.avatarUrl)
                            wx.redirectTo({
                              url: '/pages/new/new',
                              success: (res) => {
                                  console.log("跳转成功")
                              },
                              fail: (res) => {},
                              complete: (res) => {},
                            })
                          },
                          fail: (res) => {},
                          complete: (res) => {},
                        })
                    }
                    if(result.cancel){
                        console.log("我再想想")
                    }
                },
              })
          },
          complete: (res) => {},
        })
    }else{
        wx.redirectTo({
          url: '/pages/new/new',
          success: (result) => {
              console.log("跳转成功")
          },
          fail: (res) => {
              console.log("跳转失败")
          }
        })
    }
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        this.setData ({
            matchnames:app.appData.matchnames,
        })
        /* 获取组队信息请求 */
        wx.request({
          url: 'http://101.200.199.153:8082/Api/TeamNeed/TeamNeedList',
          data: {
            
          },
          header:{
            token:app.appData.token
        },
          method: 'GET',
          success: (res) => {
            console.log(res)
            that.setData({
                msg:res.data.data.list
            })
            if(that.data.msg.length == 0){
                console.log("没有数据")
                that.setData({
                    status:false,
                })
            }
            else{
                that.setData({
                    status:true,
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
        var that = this
        wx.request({
            url: 'http://101.200.199.153:8082/Api/TeamNeed/TeamNeedList',
            data: {
                "matchName":this.data.matchname,
            },
            header:{
              token:app.appData.token
          },
            method: 'GET',
            success: (res) => {
              console.log("刷新成功");
              that.setData({
                  msg:res.data.data.list,
              })
              if (that.data.msg.length == 0) {
                  that.setData({
                      status:false,
                  })
              }
              else{
                that.setData({
                    status:true,
                })
              }
              wx.showToast({
                title: '',
                icon:"loading"
              })
              wx.stopPullDownRefresh({
                success: (res) => {
                    console.log("停止刷新")
                },
              })
            }
          })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        wx.showToast({
          title: '不要再滑啦~',
          icon:'none'
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})