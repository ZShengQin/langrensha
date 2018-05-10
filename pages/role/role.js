// pages/role/role.js
const app = getApp()
const SettingUtil = require('../../utils/SettingUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    role: '',
    numCurrent: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let role = SettingUtil.transRole(options.numCurrent)
    this.setData({
      role: role,
      numCurrent: options.numCurrent
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})