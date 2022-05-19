// pages/addExperience/addExperience.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg:'',
        timer:null
    },
    /* 获取文本框内容并判断字数是否超过限制 */
    bindinput(e){
        var msg = this.data.msg
        //清除上一个定时器
        clearTimeout(this.timer),
        //设置一个延时器
        this.timer = setTimeout(function(){
            this.msg = e.detail.value;
            msg = e.detail.value
            console.log(msg)
            if(msg.length > 100){
                wx.showToast({
                  title: '字数太多啦~',
                  icon:'error'
                })
            }
        },1000),
        this.setData({
            msg:e.detail.value
        })
        
    },
    /* 提交函数 */
    submit(e) {
        var msg = this.data.msg
        if(msg == ''){
            wx.showToast({
              title: '还没有输入~',
              icon:'none'
            })
        }
        else if(msg.length > 100) {
            wx.showToast({
              title: '超过文字限制了哟~',
              icon:'error'
            })
        }
        else{
            wx.request({
              url: 'http://101.200.199.153:8082/Api/ExExchange/Create',
              data: {
                "exDetails": msg,
                "avatarUrl": app.appData.userInfo.avatarUrl,
                "userId":app.appData.userId
              },
              header: {
                  token:'123456'
              },
              method: 'POST',
              timeout: 0,
              success: (res) => {
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
                        if(res.confirm){
                            wx.redirectTo({
                              url: '/pages/addExperience/addExperience',
                            })
                        }
                        if(res.cancel){
                            wx.redirectTo({
                                url: '/pages/share/share',
                              })
                        }
                    },
                  })
              },
              fail: (res) => {},
              complete: (res) => {},
            })
            console.log(msg)
            
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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