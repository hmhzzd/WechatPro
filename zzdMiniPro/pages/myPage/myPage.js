// pages/myPage/myPage.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: 'true',
        avatarUrl: '',
        userName: '',
        userId: '',
        commentsCount: '',
        teemNeedCount: '',
        exChangeCount: '',
    },
    /* 获取用户信息 */
    hasUserInfo() {
        if (app.appData.userInfo == null) {
            wx.getUserProfile({
                desc: '获取昵称和头像',
                success: (res) => {
                    console.log(res);
                    console.log(res.userInfo.avatarUrl);
                    app.appData.userInfo = res.userInfo;
                    this.setData({
                        userInfo: res.userInfo,
                        avatarUrl: res.userInfo.avatarUrl,
                        userName: res.userInfo.nickName,
                        status: false
                    })
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this;
        this.setData({
            avatarUrl: app.appData.userInfo.avatarUrl,
            userName: app.appData.userInfo.nickName
        })
        wx.request({
            url: 'http://101.200.199.153:8082/Api/Home/GetList',
            data: {
                "userId": app.appData.userId
            },
            header: {
                token: '123456'
            },
            method: 'GET',
            success: (res) => {
                console.log(res);
                that.setData({
                    commentsCount: res.data.data.commentsCount,
                    teemNeedCount: res.data.data.teemNeedCount,
                    exChangeCount: res.data.data.exChangeCount,
                })
            },
            fail: (res) => {},
            complete: (res) => {},
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
        var that = this;
        this.setData({
            avatarUrl: app.appData.userInfo.avatarUrl,
            userName: app.appData.userInfo.nickName
        })
        wx.request({
            url: 'http://101.200.199.153:8082/Api/Home/GetList',
            data: {
                "userId": app.appData.userId
            },
            header: {
                token: '123456'
            },
            method: 'GET',
            success: (res) => {
                console.log(res);
                that.setData({
                    commentsCount: res.data.data.commentsCount,
                    teemNeedCount: res.data.data.teemNeedCount,
                    exChangeCount: res.data.data.exChangeCount,
                })
            },
            fail: (res) => {},
            complete: (res) => {},
        })
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
    /* 刷新功能 */
    onPullDownRefresh() {
        var that = this;
        this.setData({
            avatarUrl: app.appData.userInfo.avatarUrl,
            userName: app.appData.userInfo.nickName
        })
        wx.request({
            url: 'http://101.200.199.153:8082/Api/Home/GetList',
            data: {
                "userId": app.appData.userId
            },
            header: {
                token: '123456'
            },
            method: 'GET',
            success: (res) => {
                console.log(res);
                that.setData({
                    commentsCount: res.data.data.commentsCount,
                    teemNeedCount: res.data.data.teemNeedCount,
                    exChangeCount: res.data.data.exChangeCount,
                })
                console.log("刷新成功");
                wx.stopPullDownRefresh({
                    success: (res) => {
                        console.log("停止刷新");
                    },
                })
            },
            fail: (res) => {},
            complete: (res) => {},
        })
        wx.showToast({
            title: '',
            icon: "loading",
        })
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