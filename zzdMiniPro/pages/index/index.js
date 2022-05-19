//Page Object
const app = getApp();
Page({

    data: {
        msg: '',
        token: '',
        status: '',
    },
    //options(Object)
    onLoad: function (options) {
        var app = getApp()
        var that = this
        wx.login({
            success(res) {
                if (res.code) {
                    //发起网络请求
                    wx.request({
                        url: 'http://101.200.199.153:8082/Api/User/WxLogin',
                        data: {
                            code: res.code
                        },
                        success(res) {
                            app.appData.userId = res.data.data.username
                            console.log(app.appData.userId);
                            console.log(res);
                            that.setData({
                                userId: res.data.data.username
                            })
                            app.appData.token = res.data.data.token
                            //获取组队信息请求
                            wx.request({
                                url: 'http://101.200.199.153:8082/Api/TeamNeed/List',
                                header: {
                                    token: app.appData.token
                                },
                                data: {},
                                success(res) {
                                    console.log(res)
                                    that.setData({
                                        msg: res.data.data.list,
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
                                    }
                                }
                            })
                        }
                    })

                } else {
                    console.log('登录失败！' + res.errMsg)
                }

            }
        })

    },
    /* 获取用户信息 */
    hasuserInfo(e) {
        if (app.appData.userInfo == null) {
            wx.getUserProfile({
                desc: '获取昵称和头像',
                success: (res) => {
                    app.appData.userInfo = res.userInfo
                    console.log(app.appData.userInfo);
                    this.setData({
                            userInfo: res.userInfo,
                            hasUserInfo: true
                        }),
                        console.log(res.userInfo.avatarUrl)
                    console.log(res.userInfo)
                    console.log(app.appData.userInfo.avatarUrl)
                    wx.navigateTo({
                        url: '/pages/myPage/myPage',
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
                        content: '不授权不能进入个人中心哟~',
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
                                            url: '/pages/myPage/myPage',
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
            wx.navigateTo({
                url: '/pages/myPage/myPage',
                success: (result) => {
                    console.log("跳转成功")
                },
                fail: (res) => {
                    console.log("跳转失败")
                }
            })
        }
    },
    onReady: function () {

    },

    onShow: function () {},
    onHide: function () {

    },
    onUnload: function () {

    },
    /* 刷新功能 */
    onPullDownRefresh: function () {
        wx.request({
            url: 'http://101.200.199.153:8082/Api/TeamNeed/List',
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
                    console.log("没有数据")
                    this.setData({
                        status: false,
                    })
                } else {
                    this.setData({
                        status: true,
                    })
                }
                console.log("刷新成功")
                wx.stopPullDownRefresh({
                    success: (res) => {
                        console.log("停止刷新")
                    },
                })
            },
            fail: (res) => {},
            complete: (res) => {},
        })
        wx.showToast({
            title: '',
            icon: "loading"
        })
    },
    onReachBottom: function () {
        wx.showToast({
            title: '不要再滑啦~',
            icon: "none"
        })
    },
    onShareAppMessage: function () {

    },
    onPageScroll: function () {

    },
    //item(index,pagePath,text)
    onTabItemTap: function (item) {

    }
});