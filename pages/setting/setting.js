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
    code: '',

    numTotal: 8,

    numPeople: 2,
    numWerewolf: 3,
    numSeer: 1,
    numWitch: 1,
    numHunter: 1,
    numGuard: 0,
    numCupid: 0,
    numIdiot: 0,
    numGirl: 0
  },

  createRoom: function(){
    let roleList = SettingUtil.genShuffleArray([
      this.data.numTotal,
      this.data.numPeople,
      this.data.numWerewolf,
      this.data.numSeer,
      this.data.numWitch,
      this.data.numHunter,
      this.data.numGuard,
      this.data.numCupid,
      this.data.numIdiot,
      this.data.numGirl
    ])

    wx.request({
      url: API.DOMAIN + '/room',
      method: 'POST',
      data: {
        code: app.globalData.code,
        name: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        roleList: roleList
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      //请求成功，创建并进入房间
      success: res => {
        console.log(res)
        app.globalData.roomId = res.data.data.roomId
        app.globalData.userList = res.data.data.userList
        app.globalData.roleString = res.data.data.roleString
        wx.navigateTo({
          url: '../room/room?numTotal=' + this.data.numTotal + '&roleList=' + res.data.data.roleList ,
        })
      },
      //请求失败，返回设置页面
      fail: res => {
        wx.showModal({
          title: Error.networkErr,
          content: Error.networkErrContent,
          showCancel: false,
        })
        console.log(res)
      }
    })
  },

  /**
   * 调整游戏人员设定
   */
  changePeople: function(e){
    let numPeople = e.detail.value
    let numTotal = this.data.numTotal + e.detail.value - this.data.numPeople
    this.setData({
      numPeople: numPeople,
      numTotal: numTotal
    })
  },

  changeWerewolf: function (e) {
    let numWerewolf = e.detail.value
    let numTotal = this.data.numTotal + e.detail.value - this.data.numWerewolf
    this.setData({
      numWerewolf: numWerewolf,
      numTotal: numTotal
    })
  },
  //为单选人物提供统一判断方法
  changeOthers: function (e) {
    let selected = 0
    let numTotal = this.data.numTotal
    if(e.detail.value){
      selected = 1
      ++numTotal
      this.setData({
        numselected: selected,
        numTotal: numTotal
      })
      return true
    }else{
      selected = 0
      --numTotal
      this.setData({
        numselected: selected,
        numTotal: numTotal
      })
      return false
    }
  },
  changeSeer: function(e){
    let numSeer = this.changeOthers(e) ? 1 : 0
    this.setData({
      numSeer: numSeer
    })
  },
  changeWitch: function (e) {
    let numWitch = this.changeOthers(e) ? 1 : 0
    this.setData({
      numWitch: numWitch
    })
  },
  changeHunter: function (e) {
    let numHunter = this.changeOthers(e) ? 1 : 0
    this.setData({
      numHunter: numHunter
    })
  },
  changeGuard: function (e) {
    let numGuard = this.changeOthers(e) ? 1 : 0
    this.setData({
      numGuard: numGuard
    })
  },
  changeCupid: function (e) {
    let numCupid = this.changeOthers(e) ? 1 : 0
    this.setData({
      numCupid: numCupid
    })
  },
  changeIdiot: function (e) {
    let numIdiot = this.changeOthers(e) ? 1 : 0
    this.setData({
      numIdiot: numIdiot
    })
  },
  changeGirl: function (e) {
    let numGirl = this.changeOthers(e) ? 1 : 0
    this.setData({
      numGirl: numGirl
    })
  },

  navRoleIntro: function(){
    wx.navigateTo({
      url: '../gameintro/gameintro',
    })
  },

  showMore: function() {
    wx.showToast({
      title: '敬请期待',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.hasUserInfo == 'false'){
      wx.showModal({
        title: 'Warning',
        content: '未授权用户信息，将无法创建房间，点击确定返回主页！',
        success: (res) => {
          if(res.confirm){
            wx.navigateBack()
          }
        }
      })
    }
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
  
  }
})