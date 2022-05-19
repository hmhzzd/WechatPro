// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //延时器的timer id
        timer: null,
        str:'',
        focus:true,
    },
    /* 获取搜索框内容 */
        handleInput(e){
            //  清除延时器
            clearTimeout(this.timer),
            // 设置一个延时器
            this.timer = setTimeout(function () {
                this.str = e.detail.value;
                console.log(this.str);
                console.log(e);
            },1000),
            this.setData({
                str:e.detail.value
            })
        },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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