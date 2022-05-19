// pages/jiaoliu/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg: '',
        list: '',
        id: '',
        exList: '',
        status: ''
    },
    /* 获取输入框内容 */
    bindinput(e) {
        this.setData({
            msg: e.detail.value,
        })
    },
    /* 清除输入框文字 */
    clear() {
        if (!this.data.msg == '') {
            this.setData({
                msg: ''
            })
        }
    },
    /* 发布评论 */
    bindtap(e) {
        var that = this
        /* 获取用户信息 */
        if (this.data.msg == '') {
            wx.showToast({
                title: '你还没有输入哟~',
                icon: 'none'
            })
        }
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
                    /* 向后台发送数据 */
                    wx.request({
                        url: 'http://101.200.199.153:8082/Api/Comments/CreateComment',
                        data: {
                            "details": this.data.msg,
                            "needId": this.data.id,
                            "avatarUrl": app.appData.userInfo.avatarUrl,
                            "userId": app.appData.userId
                        },
                        header: {
                            token: '123456'
                        },
                        method: 'POST',
                        timeout: 0,
                        success: (result) => {
                            console.log("上传成功200");
                            console.log(this.data.msg)
                            console.log(this.data.id)
                            /* 发送成功之后刷新页面 */
                            that.onShow();
                        },
                        fail: (res) => {},
                        complete: (res) => {
                            that.onShow();
                        },
                    })
                    /* 发送成功清除文本框评论 */
                    this.clear();
                },
                /* 用户拒绝提示内容 */
                fail: (res) => {
                    wx.showModal({
                        cancelColor: '#666',
                        cancelText: '我再想想',
                        confirmColor: '#00b26a',
                        confirmText: '我要授权',
                        content: '不授权不能发表评论哟~',
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
                                        /* 向后台发送数据 */
                                        wx.request({
                                            url: 'http://101.200.199.153:8082/Api/Comments/CreateComment',
                                            data: {
                                                "details": this.data.msg,
                                                "userId": app.appData.userId
                                            },
                                            header: {
                                                token: '123456'
                                            },
                                            method: 'POST',
                                            timeout: 0,
                                            success: (result) => {},
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
        }
        /* 如果用户已经授权直接向后台发送数据 */
        else {
            /* 向后台发送数据 */
            wx.request({
                url: 'http://101.200.199.153:8082/Api/Comments/CreateComment',
                data: {
                    "details": this.data.msg,
                    "needId": this.data.id,
                    "avatarUrl": app.appData.userInfo.avatarUrl,
                    "userId": app.appData.userId
                },
                header: {
                    token: '123456'
                },
                method: 'POST',
                timeout: 0,
                success: (result) => {
                    this.onShow();
                    console.log("上传成功200");
                    console.log(this.data.msg)
                    console.log(this.data.id)
                },
                fail: (res) => {},
                complete: (res) => {
                    this.onShow();
                },
            })
            /* 发送成功清除文本框评论 */
            this.clear();
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (id) {
        console.log("详情页获取到的item", id.item);
        this.setData({
            id: id.item,
        })
        /* 获取后端评论数据以及发送id */
        wx.request({
            url: 'http://101.200.199.153:8082/Api/Comments/GetCommentList',
            data: {
                "needId": this.data.id
            },
            header: {
                token: '123456'
            },
            method: 'GET',
            timeout: 0,
            success: (res) => {
                console.log("success")
                console.log(res);
                this.setData({
                    exList: res.data.data.ex,
                    list: res.data.data.commentsList
                })
                if (this.data.list.length == 0) {
                    console.log("没有数据")
                    this.setData({
                        status: false,
                    })
                } else {
                    this.setData({
                        status: true,
                    })
                }
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
        console.log("调用成功");
        wx.request({
            url: 'http://101.200.199.153:8082/Api/Comments/GetCommentList',
            data: {
                "needId": this.data.id
            },
            header: {
                token: '123456'
            },
            method: 'GET',
            timeout: 0,
            success: (res) => {
                console.log("success")
                console.log(res);
                this.setData({
                    exList: res.data.data.ex,
                    list: res.data.data.commentsList
                })
                if (this.data.list.length == 0) {
                    console.log("没有数据")
                    this.setData({
                        status: false,
                    })
                } else {
                    this.setData({
                        status: true,
                    })
                }
            },
            fail: (res) => {},
            complete: (res) => {},
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


    /* 刷新功能 */
    onPullDownRefresh: function () {
        wx.request({
            url: 'http://101.200.199.153:8082/Api/Comments/GetCommentList',
            data: {
                "needId": this.data.id
            },
            header: {
                token: '123456'
            },
            method: 'GET',
            timeout: 0,
            success: (res) => {
                console.log(res)
                this.setData({
                    exList: res.data.data.ex,
                    list: res.data.data.commentsList
                })
                if (this.data.list.length == 0) {
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