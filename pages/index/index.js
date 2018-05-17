//index.js
//获取应用实例
const app = getApp()
const Error = require('../../Global/Error.js')
const API = require('../../Global/API.js')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    enteredRoomId: 0
  },

  //点击按钮获取用户信息
  getUserInfo: function (e) {
    //用户点击确认，显示头像和昵称
    if(e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {
      wx.showModal({
        title: 'Warning！',
        content: '拒绝获取用户信息将导致该工具无法正常使用！请点击“获取头像昵称”重新授权！',
        showCancel: false
      })
    }
  },

  //响应房间创建者
  createRoom: function () {
    wx.navigateTo({
      url: '../setting/setting?hasUserInfo=' + this.data.hasUserInfo,
    })
  },

  //获取用户输入的roomId
  inputRoomId: function(e) {
    this.setData({
      enteredRoomId: e.detail.value
    })
  },

  enterRoom: function(){
    wx.request({
      url: API.DOMAIN + '/room/' + this.data.enteredRoomId,
      data: {
        code: app.code,
        name: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl
      },
      success: res => {
        console.log(res)
        //输入正确的房间号
        if(res.data.code == API.SUCCESS){
          app.globalData.roleString = res.data.data.roleString
          wx.navigateTo({
            url: '../role/role?numCurrent=' + res.data.data.numCurrent
          })
        //房间号不正确
        } else if(res.data.code == API.ENTER_ERROR) {
          wx.showModal({
            title: 'Error!',
            content: '请输入正确的房间号',
            showCancel: false
          })
        } else {
          wx.showModal({
            title: 'Failed!',
            content: '请求错误',
          })
        }
      },
      fail: res => {
        console.log("enter failed")
        wx.showModal({
          title: Error.networkErr,
          content: Error.networkErrContent,
          showCancel: false
        })
      }
    })
  },

  navRuleintro: function(){
    wx.navigateTo({
      url: '../gameintro/gameintro',
    })
  },

  navAbout: function(){
    wx.navigateTo({
      url: '../about/about',
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})
