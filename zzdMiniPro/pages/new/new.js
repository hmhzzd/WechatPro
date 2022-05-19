//获取全局变量
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        matchname: '',
        matchnames: [],
        form: {
            name: '',
            tel: '',
            msg: '',
        },
        avatarUrl: '',
        timer: null,
        change: true
    },
    bindinput: function (e) {
        var that = this
        var form = that.data.form
        var key = e.currentTarget.dataset.key
        var value = e.detail.value
        form[key] = value
    },
    //监测输入文字是否超过字数限制
    hasOver(e) {
        var that = this
        //清除延时器
        clearTimeout(this.timer)
        //设置一个延时器
        this.timer = setTimeout(function () {
            that.data.form.msg = e.detail.value;
            console.log(that.data.form.msg)
            if (that.data.form.msg.length > 100) {
                wx.showToast({
                    title: '字数太多啦~',
                    icon: 'error'
                })
            }
        }, 500)
    },
    submit: function () {
        var app = getApp()
        var that = this
        var form = that.data.form
        var match = this.data.matchname
        if (form.name == '') {
            wx.showToast({
                title: '请输入姓名',
                icon: 'none'
            })
        } else if (form.tel == '') {
            wx.showToast({
                title: '请输入联系方式',
                icon: 'none'
            })
        } else if (match == '') {
            wx.showToast({
                title: '请选择比赛',
                icon: 'none'
            })
        } else if (form.msg == '') {
            wx.showToast({
                title: '请输入的组队要求',
                icon: 'none'
            })
        } else if (form.msg.length > 100) {
            wx.showToast({
                title: '超过文字限制了哟',
                icon: 'error'
            })
        } else {
            var that = this
            console.log(form, this.data.matchname)
            console.log(app.appData.userInfo.avatarUrl)
            /* 上传表单数据 */
            wx.request({
                url: 'http://101.200.199.153:8082/Api/TeamNeed/CreateTeamNeed',
                data: {
                    "matchName": that.data.matchname,
                    "needDetails": form.msg,
                    "tel": form.tel,
                    "userName": form.name,
                    "avatarUrl": app.appData.userInfo.avatarUrl,
                    "userId": app.appData.userId
                },
                header: {
                    token: app.appData.token
                },
                method: "POST",
                timeout: 100000,
                success: (result) => {
                    console.log("上传成功")
                    wx.showModal({
                        cancelColor: '#666',
                        cancelText: '返回',
                        confirmColor: '#00b26a',
                        confirmText: '我还要发',
                        content: '发布成功',
                        editable: false,
                        showCancel: true,
                        title: '提示',
                        success: (res) => {
                            if (res.confirm) {
                                wx.redirectTo({
                                    url: '/pages/new/new',
                                })
                            }
                            if (res.cancel) {
                                wx.redirectTo({
                                    url: '/pages/team/team',
                                })
                            }
                        },
                    })
                },
                fail: (res) => {
                    console.log("上传失败")
                }
            })
        }

    },
    bindchange(e) {
        var that = this
        console.log(e)
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var that = this;
        this.setData({
            index: e.detail.value,
            matchname: that.data.matchnames[e.detail.value]
        })
        console.log(this.data.matchnames[e.detail.value])
    },
    hasChange(e) {
        this.setData({
            change: false
        })
    },
    other(e) {
        var that = this;
        if (this.data.form.msg == '') {
            that.setData({
                change: true
            })
        } else {
            that.setData({
                change: false
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            matchnames: app.appData.matchnames
        })
        this.setData({
            change: true
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

    }
})