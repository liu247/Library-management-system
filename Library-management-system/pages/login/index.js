// pages/login/login.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    username: '',
    password: '',
    id: '',
    noinput: false,
    pwdinput: false,

    // passager: {
    //   borrow_num: null,
    //   college: "",
    //   face_url: "",
    //   phone: "",
    //   reader_id: "",
    //   reader_name: ""
    // }
  },
  noinput: function (e) {
    this.setData({ username: e.detail.value });
    this.setData({ noinput: true });
    if (this.data.noinput == true && this.data.pwdinput == true) {
      this.setData({ disabled: false });
    }

  },
  pwdinput: function (e) {
    this.setData({ password: e.detail.value });
    this.setData({ pwdinput: true });
    if (this.data.noinput == true && this.data.pwdinput == true) {
      this.setData({ disabled: false });
    }
  },
  formSubmit: function (e) {
    wx.showLoading({
      title: '登录中...',
    })
    console.log(e);
    this.setData({ disabled: true });
    wx.request({
      url: "https://www.tushuguan.lwbyuncloud.top/tushuguan/index/User/login",

      data: {
        username: e.detail.value.username,
        password: e.detail.value.password
      },
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      method: 'POST',
      success: function (res) {
        console.log(res);
        //wx.setStorageSync('passager', res.data.data);
        if (res.data.error_code == 0) {
          app.globalData.passager.borrow_num = res.data.data.borrow_num;
          app.globalData.passager.college = res.data.data.college;
          app.globalData.passager.face_url = res.data.data.face_url;
          app.globalData.passager.phone = res.data.data.phone;
          app.globalData.passager.reader_id = res.data.data.reader_id;
          app.globalData.passager.reader_name = res.data.data.reader_name;
          console.log(app.globalData.passager)
          // this.setData({
          //   passager
          // })
          wx.switchTab({
            url: '../index/index',
          })
        } else {
          wx.showLoading({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ disabled: false });
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
    if (this.data.username == '' || this.data.password == '') {
      this.setData({ disabled: true });
    } else {
      this.setData({ disabled: false });
    }
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