// pages/feedback/feedback.js
const API = require('../../Global/API.js')
const SettingUtil = require('../../utils/SettingUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedbackContent: '',
    phone: '',
    length: 0
  },

  typingFeedback: function(e){
    let length = e.detail.value.length
    this.setData({
      length: length
    })
  },
  typedFeedback: function(e){
    let content = e.detail.value
    this.setData({
      feedbackContent: content
    })
  },

  typedPhone: function(e) {
    let phone = e.detail.value
    this.setData({
      phone: phone
    })
  },

  commitFeedback: function() {
    console.log(this.data.phone.length)
    let re = new RegExp('^[1][3,4,5,6,7,8,9][0-9]{9}$')
    if(!re.test(this.data.phone)){
      wx.showModal({
        title: 'Error!',
        content: '手机号码不存在！',
        showCancel: false
      })
    } else {
      wx.request({
        url: API.DOMAIN + '/feedback',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          phone: this.data.phone,
          content: this.data.feedbackContent
        },
        success: res => {
          console.log(res)
          if(res.data.code == API.SUCCESS){
            wx.showToast({
              title: '反馈成功',
            }) 

            //停留一秒让用户看到反馈成功的提示后返回主界面
            SettingUtil.sleep(1000)

            wx.reLaunch({
              url: '../index/index',
            })
          } else{
            wx.showToast({
              title: '反馈失败，请重新尝试',
            })
          } 
        },
        fail: () => {
          wx.showModal({
            title: 'Error!',
            content: '请检查网络设置！',
            showCancel: false
          })
        } 
      })
    }

    
  }
})