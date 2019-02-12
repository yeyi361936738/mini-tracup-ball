// components/quality-ball/quality-ball.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    step: {
      type: Number,
      value: 3
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handle(){
      wx.navigateTo({
        url: '/static/quality-ball/view/view',
      })
    }
  }
})
