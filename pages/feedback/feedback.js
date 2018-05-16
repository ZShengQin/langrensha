// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedbackContent: '',
    phone: '',
    count: 0
  },

  commitFeedback: e => {

    wx.reLaunch({
      url: '../index/index',
    })
  }
})