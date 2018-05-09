// pages/room/room.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomId: 0,
    userList: null,
    numTotal: 0,        //创建者设置的游戏总人数
    numCurrent: 1,      //当前加入的人数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      roomId: app.globalData.roomId,
      userList: app.globalData.userList,
      numTotal: options.numTotal
    })

    /*
    if(!app.globalData.roomId){
      wx.request({
        url: 'http://localhost/room',
        method: 'POST',
        data: {
          code: app.globalData.code,
          name: app.globalData.userInfo.nickName,
          avatarUrl: app.globalData.userInfo.avatarUrl
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        //请求成功，创建并进入房间
        success: res => {
          console.log(res)
          app.globalData.roomId = res.data.roomId
          app.globalData.userList = res.data.userList
          const numCurrent = this.data.numCurrent++
          this.setData({
            roomId: app.globalData.roomId,
            userList: app.globalData.userList,
            numTotal: options.numTotal,
            numCurrent: numCurrent
          })
        },
        //请求失败，返回设置页面
        fail: res => { 
          wx.showModal({
            title: 'Error!',
            content: '请检查网络设置！',
            showCancel: false,
            success: () => {
              wx.navigateBack()
            }
          })
          console.log(res)
        }
      })
    }
    */
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
    app.globalData.roomId = 0
    app.globalData.userList = null
    //创建者离开房间，房间销毁
    wx.request({
      url: app.globalData.serverAddress + '/room/' + this.data.roomId,
      method: 'DELETE',
      success: res => {
        console.log(res)
      }
    })
  
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