// pages/room/room.js
const app = getApp()
const SettingUtil = require('../../utils/SettingUtil.js')
const Error = require('../../Global/Error.js')
const API = require('../../Global/API.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomId: 0,
    userList: null,
    numTotal: 0,        //创建者设置的游戏总人数
    numCurrent: 1,      //当前加入的人数
    role: '',

    showMyrole: false
  },

  showRole: function(){
    let showMyrole = this.data.showMyrole ? false : true
    this.setData({
      showMyrole: showMyrole
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let role = SettingUtil.transRole(this.data.numCurrent)
    this.setData({
      roomId: app.globalData.roomId,
      userList: app.globalData.userList,
      numTotal: options.numTotal,
      role: role
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
    app.globalData.roomId = 0
    app.globalData.userList = null
    //创建者离开房间，房间销毁
    wx.request({
      url: API.DOMAIN + '/room/' + this.data.roomId,
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
    wx.request({
      url: API.DOMAIN + '/room/' + this.data.roomId,
      data: {
        code: app.globalData.code,
        name: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
      },
      method: 'GET',
      success: res => {
        this.setData({
          userList: res.data.data.userList,
          numCurrent: res.data.data.numCurrent
        })
      },
      fail: () => {
        wx.showModal({
          title: Error.networkErr,
          content: Error.networkErrContent,
          showCancel: false
        })
      }
    })
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