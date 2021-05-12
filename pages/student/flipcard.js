//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isDebug: true,
    cards: [], // 卡片数据，一个包含所有卡片对象的数组
    removed_cards: [], // 存放已经移除的卡片的索引数据，如果索引填充了其他卡片，需要将该索引移出
    review_results: new Map(),      // 存放向左滑动(不会)的次数）
    transition: true, //是否开启过渡动画
    circling: true, // 是否列表循环
    rotate_deg: 90, // 整个滑动过程旋转角度
    slide_duration: 200, // 手指离开屏幕后滑出界面时长，单位(ms)毫秒
    show_cards: 3, // 显示几张卡片
    thershold: 60, // 松手后滑出界面阈值，单位px
    scale_ratio: 0.05, // 下层卡片收缩力度
    up_height: 40, // 下层卡片下移高度，单位rpx
  },
  onLoad: function () {
    this.generateCards();
  },
  generateCards() {
    const cards = [{
        title: "worth",
        body: "相当于…价值,值…钱<br>sales worth 200m pounds a year<br>每年价值2亿英镑的销售额",
      },
      {
        title: 'get',
        body: '获得；得到；收获<br>get a prize<br>得奖'
      },
      {
        title: 'confidence',
        body: '信任<br>build confidence in oneself<br>建立自信'
      },
      {
        title: 'romance',
        body: '浪漫故事；浪漫作品<br>a starlet of seven romances<br>拍过七部爱情电影的小女星'
      },
      {
        title: 'wonderful',
        body: '美妙的，精彩的，奇特的<br>a wonderful sight<br>奇特的景象 '
      },
      {
        title: 'zealot',
        body: '狂热者；热心者<br>a religious zealot<br>宗教狂热分子'
      }
    ];

    let m = new Map();
    cards.forEach(function(e){
      m.set(e["title"], 0);
    });
    this.setData({
      cards: cards,
      current_cursor: cards.findIndex(item => item),
      removed_cards: [],
      review_results: m
    })
  },
  onSwitch: function (e) {
    const {
      symbol
    } = e.currentTarget.dataset
    switch (symbol) {
      case 'loop':
        this.setData({
          circling: e.detail.value
        })
        break
      case 'transition':
        this.setData({
          transition: e.detail.value
        })
        break
    }
  },
  onSlide: function (e) {
    const {
      symbol
    } = e.currentTarget.dataset
    switch (symbol) {
      case 'show_cards':
      case 'rotate_deg':
      case 'slide_duration':
        this.setData({
          [symbol]: e.detail.value
        })
        break
    }
  },
  cardOperate(e) {
    const {
      symbol
    } = e.currentTarget.dataset
    const {
      cards
    } = this.data
    switch (symbol) {
      case 'add':
        this.setData({
          ['cards[${cards.length}]']: {
            title: '新增卡片${cards.length + 1}',
            src: 'https://source.unsplash.com/collection/190727/600x600?id=${cards.length + 1}',
            desc: '这是一段新增卡片${cards.length + 1}的描述。'
          }
        })
        break
      case 'reset':
        this.setData({
          cards: null
        }, () => {
          this.generateCards(5)
        })
        break
      case 'remove':
        const {
          removeIndex
        } = e.currentTarget.dataset
        const {
          removed_cards
        } = this.data
        console.log("removed event fired:" + symbol + " " + removeIndex);
        if (removed_cards.includes(parseInt(removeIndex))) return
        removed_cards.push(parseInt(removeIndex))
        this.setData({
          ['cards[${removeIndex}]']: null,
          removed_cards
        })
        break
    }
  },
  removeCard(index) {
    const {
      removed_cards
    } = this.data;
    if (removed_cards.includes(parseInt(index))) return;
    removed_cards.push(parseInt(index));
    this.setData({
      ['cards[' + index +']']: null,
      removed_cards
    });
  },
  incRefs(t) {
    console.log("increase refs for: " + t);
    let i = this.data.review_results.get(t);
    this.data.review_results.set(t, i+1);
  },
  cardSwipe(e) {
    const {
      direction,
      swiped_card_index,
      current_cursor
    } = e.detail
    
    if (direction === 'left') {
      // keep it in current list
      this.incRefs(this.data.cards[swiped_card_index]["title"])
    } else {
      // remove it from current list
      this.removeCard(swiped_card_index);
    }
    if (this.data.removed_cards.length === this.data.cards.length) {
      console.log(this.data.review_results); // output the review results
      wx.redirectTo({
        url: '/pages/student/result' + '?n=' + this.data.cards.length,
      })
    }
    this.setData({
      current_cursor
    })
  }
})