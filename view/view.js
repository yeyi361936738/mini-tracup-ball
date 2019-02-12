// quality-ball/view/view.js
const qiniuUploader = require("../qiniuUploader");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remark: '',//备注
    question_type: '问题反馈',//问题类型
    brand: '',//手机品牌
    model: '',//手机型号
    version: '',//微信版本号
    system: '', //操作系统版本
    platform: '',//客户端平台
    SDKVersion: '',//SDKVersion
    page_path: '',//页面路径
    img_src: '',//图片路径
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取系统信息
    let _this = this
    wx.getSystemInfo({
      success (res){
        _this.setData({
          brand: res.brand,
          model: res.model,
          version: res.version,
          system: res.system,
          platform: res.platform,
          SDKVersion: res.SDKVersion,
        })
      },
      fail (err){
        console.log(err)
      }
    })
    // 获取上一个页面的路径
    let pages = getCurrentPages();
    this.setData({
      page_path: pages[pages.length - 2].route
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

  },

  // 获取备注内容
  getRemark(e){
    this.setData({
      remark: e.detail.value
    })
  },

  // 点击提交
  handleSubmit(){
    if(!this.data.remark){
      wx.showToast({
        title: '问题描述不能为空',
        icon: 'none'
      })
      return
    }
    if (!this.data.img_src){
      wx.showToast({
        title: '请上传图片',
        icon: 'none'
      })
      return
    }
    let html = '页面路径:\n\t' + this.data.page_path + '\n\t------------------\n\t' 
    html += '附件地址:\n\t' + this.data.img_src + '\n\t------------------\n\t'
    html += '问题描述:\n\t' + this.data.remark + '\n\t------------------\n\t'
    html += '手机基本信息:\n\t' + '手机品牌  ' + this.data.brand + '\n\t'
    html += '手机型号  ' + this.data.model + '\n\t'
    html += '微信版本号  ' + this.data.version + '\n\t'
    html += '操作系统版本  ' + this.data.system + '\n\t'
    html += '客户端平台  ' + this.data.platform + '\n\t'
    html += '客户端基础库版本  ' + this.data.SDKVersion + '\n\t'
    let data = {
      uKey: '3b87b8265546601fe5eba75d49a310db',
      _api_key: '6b7e10668b9d08d4ce240bef39c83105',
      pKey: '780d37713d977473d25c14c6e6270273',
      issueTitle: this.data.remark,
      issueType: '问题反馈',
      issueDescription: html
    }
    wx.request({
      url: 'http://www.tracup.com/apiv1/issue/create',
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
      },
      success: function (res) {
        let data = res.data
        if(data.code == 0){
          wx.showToast({
            title: '提交成功',
            duration:1000
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },1000)
        }
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        // complete
      }
    })
  },

  // 上传图片
  uploadImage(){
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        var filePath = res.tempFilePaths[0];
        console.log(filePath)
        wx.uploadFile({
          url: 'http://pay.beyondin.com/Api/uploadImage/appid/1/submit/submit',
          method: 'POST',
          name: 'upfile',
          filePath: filePath,
          header: {
            'content-type': 'application/x-www-form-urlencoded', // 默认值
          },
          success (res) {
            let data = res.data
            data = JSON.parse(data)
            if(data.code == 0){
              _this.setData({
                img_src: data.file_path
              })
              wx.showToast({
                title: '上传成功',
              })
            }
          }
        })
      }
    })
  }
})