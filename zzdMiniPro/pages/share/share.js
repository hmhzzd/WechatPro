const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg: '',
        status: ''
    },
    view(e) {
        console.log(e.currentTarget.dataset.item);
        wx.navigateTo({
            url: '/pages/review/review?item=' + e.currentTarget.dataset.item.id,
        })
    },
    msgView(e) {
        wx.navigateTo({
            url: '/pages/review/review?item=' + e.currentTarget.dataset.item.id,
        })
    },
    hasuserInfo(e) {
        /* 获取用户信息 */
        if (app.appData.userInfo == null) {
            wx.getUserProfile({
                desc: '获取昵称和头像',
                success: (res) => {
                    app.appData.userInfo = res.userInfo
                    this.setData({
                            userInfo: res.userInfo,
                            hasUserInfo: true
                        }),
                        console.log(res.userInfo.avatarUrl)
                    console.log(res.userInfo)
                    console.log(app.appData.userInfo.avatarUrl)
                    wx.redirectTo({
                        url: '/pages/addExperience/addExperience',
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
                        content: '不授权不能发布自己的经验哟~',
                        editable: false,
                        showCancel: true,
                        title: '提示',
                        success: (result) => {
                            if (result.confirm) {
                                wx.getUserProfile({
                                    desc: '获取昵称和头像',
                                    success: (res) => {
                                        app.appData.userInfo = res.userInfo
                                        this.setData({
                                                userInfo: res.userInfo,
                                                hasUserInfo: true
                                            }),
                                            console.log(res.userInfo.avatarUrl)
                                        console.log(res.userInfo)
                                        console.log(app.appData.userInfo.avatarUrl)
                                        wx.redirectTo({
                                            url: '/pages/addExperience/addExperience',
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
                            if (result.cancel) {
                                console.log("我再想想")
                            }
                        },
                    })
                },
                complete: (res) => {},
            })
        } else {
            wx.redirectTo({
                url: '/pages/addExperience/addExperience',
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
        wx.request({
            url: 'http://101.200.199.153:8082/Api/ExExchange/List',
            data: {

            },
            header: {
                token: 123456
            },
            method: 'GET',
            timeout: 0,
            success: (res) => {
                var msg = this.data.msg
                console.log(res)
                this.setData({
                    msg: res.data.data.list
                });
                if (this.data.msg.length == 0) {
                    console.log("没有数据")
                    this.setData({
                        status: false,
                    })
                } else {
                    this.setData({
                        status: true,
                    })
                }
                console.log(msg);
            },
            fail: (res) => {},
            complete: (res) => {},
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
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    /* 刷新功能 */
    onPullDownRefresh: function () {
        wx.request({
            url: 'http://101.200.199.153:8082/Api/ExExchange/List',
            data: {},
            header: {
                token: '123456'
            },
            method: 'GET',
            timeout: 0,
            success: (res) => {
                console.log(res)
                this.setData({
                    msg: res.data.data.list,
                })
                if (this.data.msg.length == 0) {
                    this.setData({
                        status: false,
                    })
                } else {
                    this.setData({
                        status: true,
                    })
                }
                console.log("刷新成功")
                wx.showToast({
                    title: '',
                    icon: "loading"
                })
                wx.stopPullDownRefresh({
                    success: (res) => {
                        console.log("停止刷新")
                    },
                })
            },
            fail: (res) => {},
            complete: (res) => {},
        })

    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        wx.showToast({
            title: '人家也是有底线的~',
            icon: "none"
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})