// pages/deleteTeam/deleteTeam.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: 'true',
        msg:''
    },
    tap(e){
        console.log(e);
    },
    delete(e){
        console.log(e);
        var that = this;
        console.log(e.currentTarget.dataset.id);
        wx.showModal({
          cancelColor: '#808080',
          cancelText: '取消',
          confirmColor: '#FF0000',
          confirmText: '删除',
          content: '真的要删除吗？',
          showCancel: true,
          title: '提示',
          success: (res) => {
              if(res.confirm){
                  wx.request({
                    url: 'http://101.200.199.153:8082/Api/TeamNeed/Remove',
                    data: {
                        "id":e.currentTarget.dataset.id
                     },
                     header: {
                        token:'123456'
                    },
                    method: 'POST',
                    success: (result) => {
                        that.setData({
                            msg: result.data.data.list
                          })
                          wx.request({
                            url: 'http://101.200.199.153:8082/Api/TeamNeed/List',
                            data: {
                                "userId":app.appData.userId
                            },
                            header: {
                                token: app.appData.token
                            },
                            method: 'GET',
                            success: (res) => {
                                console.log(res)
                                that.setData({
                                    msg: res.data.data.list
                                })
                                if(res.data.data.list.length == 0){
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
                    fail: (res) => {},
                    complete: (res) => {},
                  })
              }
          },
          fail: (res) => {},
          complete: (res) => {},
        })
        /* wx.request({
          url: 'http://101.200.199.153:8082/Api/TeamNeed/Remove',
          data: {
             "id":e.currentTarget.dataset.id
          },
          header: {
              token:'123456'
          },
          method: 'POST',
          success: (res) => {
              console.log(res);
              var result = res;
              wx.showModal({
                cancelColor: 'gray',
                cancelText: '取消',
                confirmColor: 'red',
                confirmText: '删除',
                content: '真的要删除吗？',
                showCancel: true,
                title: '提醒',
                success: (res) => {
                    if(res.confirm){
                        that.setData({
                            msg: result.data.data.list
                          })
                          wx.request({
                            url: 'http://101.200.199.153:8082/Api/TeamNeed/List',
                            data: {
                                "userId":app.appData.userId
                            },
                            header: {
                                token: app.appData.token
                            },
                            method: 'GET',
                            success: (res) => {
                                console.log(res)
                                that.setData({
                                    msg: res.data.data.list
                                })
                                if(res.data.data.list.length == 0){
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
                    }
                },
                fail: (res) => {},
                complete: (res) => {},
              })
              
          },
          fail: (res) => {},
          complete: (res) => {},
        }) */
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this;
        wx.request({
            url: 'http://101.200.199.153:8082/Api/TeamNeed/List',
            data: {
                "userId":app.appData.userId
            },
            header: {
                token: app.appData.token
            },
            method: 'GET',
            success: (res) => {
                console.log(res)
                that.setData({
                    msg: res.data.data.list
                })
                if (that.data.msg.length == 0) {
                    console.log("没有数据")
                    that.setData({
                        status: false,
                    })
                } else {
                    that.setData({
                        status: true,
                    })
                    wx.showModal({
                        confirmColor: '#c2e1fe',
                        confirmText: '我知道了',
                        content: '长按可删除',
                        showCancel:false,
                        title: '提示',
                        success: (res) => {
                            if(res.confirm){
                                console.log("我知道了");
                            }
                        },
                        fail: (res) => {},
                        complete: (res) => {},
                      })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})