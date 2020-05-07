//Page Object
import { request } from "../../request/index.js";
Page({
  data: {
    //左侧菜单栏
    leftMenuList: [],
    //右侧菜单栏
    rightMenuList: [],
    currentIndex: 0,
  },
  Books:[],
  //options(Object)
  onLoad: function(options){
    this.getBooks();
   },
   getBooks(){
     request({
       url:"https://www.tushuguan.lwbyuncloud.top/tushuguan/index/books/setall"
     })
     .then(res => {
          console.log(res);
          this.Books = res.data;
  
          // 把接口的数据存入到本地存储中
         // wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
  
  
          // 构造左侧的大菜单数据
          let leftMenuList = this.Books.map(v => v.bookstype_name);
          // 构造右侧的商品数据
          let rightContent = this.Books[0].children;
          this.setData({
            leftMenuList,
            rightContent
          })
        })
   },

   handleItemTap(e) {
    /* 
    1 获取被点击的标题身上的索引
    2 给data中的currentIndex赋值就可以了
    3 根据不同的索引来渲染右侧的商品内容
     */
    const { index } = e.currentTarget.dataset;

    let rightContent = this.Books[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      // 重新设置 右侧内容的scroll-view标签的距离顶部的距离
      scrollTop: 0
    })
  }
});