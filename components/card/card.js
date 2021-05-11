// components/card/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    card: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    isHidden: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /** 
     * 显示隐藏内容
     */
    showBody() {
      this.setData({
        isHidden: false
      });
    }
  },


})