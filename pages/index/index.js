//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    enteredRoomId: 0
  },

  //点击按钮获取用户信息
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //响应房间创建者
  createRoom: function () {
    wx.navigateTo({
      url: '../setting/setting',
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
      url: app.globalData.serverAddress + '/room/' + this.data.enteredRoomId,
      //method: 'GET',
      //header: {
      //  'content-type': 'application/x-www-form-urlencoded'
      //},
      data: {
        code: app.code,
        name: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl
      },
      success: res => {
        console.log(res)
        //输入正确的房间号
        if(res.data.roomId){
          //app.globalData.roomId = res.data.roomId
          //app.globalData.userList = res.data.userList
          wx.navigateTo({
            //url: '../room/room?roomId=' + app.globalData.roomId,
            url: '../role/role?role=' + res.data.role
          })
        //房间号不正确
        } else {
          wx.showModal({
            title: 'Failed',
            content: '请输入正确的房间号',
            showCancel: false
          })
        }
      },
      fail: res => {
        console.log("enter failed")
        wx.showModal({
          title: 'Error!',
          content: '请检查网络配置！',
          showCancel: false
        })
      }
    })
  },

  //事件处理函数
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
  }

})
