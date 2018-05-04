// pages/room/room.js
const app = getApp()

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
    numGuard: 0
  },

  createRoom: function(){
    wx.request({
      url: 'https://www.sillycode.cn/room',
      data: {
        code: app.code,
        numTotal: this.data.numTotal,
        numPeople: this.data.numPeople,
        numWerewolf: this.data.numWerewolf,
        numSeer: this.data.numSeer,
        numWitch: this.data.numWitch,
        numHunter: this.data.numHunter,
        numGuard: this.data.numGuard
      },
      success: res => {
        console.log(res.data)
      }
    })
    wx.navigateTo({
      url: '../room/room',
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