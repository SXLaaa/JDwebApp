<template>
<!-- 商品列表 --> 
  <div ref="goods" 
    @scroll="onScrollChange"
    class="goods" 
    :class="[layoutClass,{'goods-scroll' : isScroll}]" 
    :style="{height:goodsViewHeight}">
    <div class="goods-item" 
      :class="layoutItemClass" 
      v-for="(item,index) in sortGoodsData" 
      :key="index" 
      ref="goodsItem" 
      :style="goodsItemStyles[index]"
      @click="onItemClick(item)"
    >
      <img class="goods-item-img" :src="item.img" alt="" :style="imgStyles[index]">
      <!-- 商品描述 description -->
      <div class="goods-item-desc">
        <p class="goods-item-desc-name text-line-2" :class="{'goods-item-desc-name-hint' : item.isHave}">
          <!-- 是否为直营 -->
          <direct v-if="item.isDirect"/>
          <noHave v-if="!item.isHave"/>
          {{item.name}}
        </p>
        <div class="goods-item-desc-data">
          <p class="goods-item-desc-data-price">¥{{item.price | priceValue}}</p>
          <p class="goods-item-desc-data-volume">销量：{{item.volume}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import direct from './direct'
import noHave from './noHave'
export default {
  components:{
    direct,noHave
  },
  props:{
    /**
     * 在父元素中指定的展示形式
     * 1 垂直列表
     * 2 网格布局
     * 3 瀑布流布局
     * */ 
    layoutType:{
      type:String,
      default:'1'
    },
    /**
     * 是否允许goods单独滑动
     * */ 
    isScroll:{
      type:Boolean,
      default:true
    },
    /**
     * 排序规则
     * 1:默认
     * 1-2 价格由高到低
     * 1-3 销量由高到低
     * 2 有货优先
     * 3 直营优先
     * */ 
    sort:{
      type:String,
      default:'1'
    }
  },
  data(){
    return{
      scrollTopValue:0, // 滑动距离
      // 排序数据
      sortGoodsData:[],
      dataSource:[
        {
          name:"【二手95新】 劳力士 日本进口 执行系列 试吃品18K白金打造",
          img:require('@img/goods/goods-1.jpg'),
          price:"20000",
          volume:"1213",
          isDirect: false, // 直营
          isHave: true, // 缺货
          id:1,
          swiperImgs:[
            require("@img/goods/goods-swiper-1-1.webp.jpg"),
            require("@img/goods/goods-swiper-1-2.webp.jpg"),
            require("@img/goods/goods-swiper-1-3.webp.jpg"),
            require("@img/goods/goods-swiper-1-4.webp.jpg"),
          ],
          detail:[
            require("@img/goods/goods-detail-1-1.jpg"),
            require("@img/goods/goods-detail-1-2.jpg"),
            require("@img/goods/goods-detail-1-3.jpg"),
            require("@img/goods/goods-detail-1-4.jpg"),
            require("@img/goods/goods-detail-1-5.jpg"),
            require("@img/goods/goods-detail-1-6.jpg"),
          ]
        },
        {
          name:"【二手95新】 劳力士 日本进口 执行系列 试吃品18K白金打造",
          img:require('@img/goods/goods-2.jpg'),
          price:"2002000",
          volume:"123",
          isDirect: true, 
          isHave: true,
          id:2,
          swiperImgs:[
            require("@img/goods/goods-swiper-2-1.webp.jpg"),
            require("@img/goods/goods-swiper-2-2.webp.jpg"),
            require("@img/goods/goods-swiper-2-3.webp.jpg"),
            require("@img/goods/goods-swiper-2-4.webp.jpg"),
          ],
          detail:[
            require("@img/goods/goods-detail-2-1.jpg"),
            require("@img/goods/goods-detail-2-2.jpg"),
            require("@img/goods/goods-detail-2-3.jpg"),
            require("@img/goods/goods-detail-2-4.jpg"),
            require("@img/goods/goods-detail-2-5.jpg"),
            require("@img/goods/goods-detail-2-6.jpg"),
            require("@img/goods/goods-detail-2-7.jpg"),
          ]
        },
        {
          name:"【二手95新】 劳力士 日本进口 执行系列 试吃品18K白金打造",
          img:require('@img/goods/goods-3.jpg'),
          price:"2020000",
          volume:"1222223",
          isDirect: true, 
          isHave: false,
          id:3,
          swiperImgs:[
            require("@img/goods/goods-swiper-3-1.webp.jpg"),
            require("@img/goods/goods-swiper-3-2.webp.jpg"),
            require("@img/goods/goods-swiper-3-3.webp.jpg"),
            require("@img/goods/goods-swiper-3-4.webp.jpg"),
          ],
          detail:[
            require("@img/goods/goods-detail-3-1.jpg"),
            require("@img/goods/goods-detail-3-2.jpg"),
            require("@img/goods/goods-detail-3-3.jpg"),
            require("@img/goods/goods-detail-3-4.gif"),
            require("@img/goods/goods-detail-3-5.jpg"),
            require("@img/goods/goods-detail-3-6.jpg"),
            require("@img/goods/goods-detail-3-7.jpg"),
            require("@img/goods/goods-detail-3-8.jpg"),
            require("@img/goods/goods-detail-3-9.jpg"),
          ]
        },
        {
          name:"【二手95新】 劳力士 日本进口 执行系列 试吃品18K白金打造",
          img:require('@img/goods/goods-4.jpg'),
          price:"22000",
          volume:"125893",
          isDirect:  false, 
          isHave: false,
          id:4,
          swiperImgs:[
            require("@img/goods/goods-swiper-4-1.webp.jpg"),
            require("@img/goods/goods-swiper-4-2.webp.jpg"),
            require("@img/goods/goods-swiper-4-3.webp.jpg"),
          ],
          detail:[
            require("@img/goods/goods-detail-4-1.jpg"),
            require("@img/goods/goods-detail-4-2.jpg"),
            require("@img/goods/goods-detail-4-3.jpg"),
            require("@img/goods/goods-detail-4-4.jpg"),
            require("@img/goods/goods-detail-4-5.jpg"),
            require("@img/goods/goods-detail-4-6.jpg"),
            require("@img/goods/goods-detail-4-7.jpg"),
            require("@img/goods/goods-detail-4-8.jpg"),
            require("@img/goods/goods-detail-4-9.jpg"),
          ]
        },
        {
          name:"【二手95新】 劳力士 日本进口 执行系列 试吃品18K白金打造",
          img:require('@img/goods/goods-5.jpg'),
          price:"24000",
          volume:"3323",
          isDirect: true, 
          isHave: true,
          id:5,
          swiperImgs:[
            require("@img/goods/goods-swiper-4-1.webp.jpg"),
            require("@img/goods/goods-swiper-4-2.webp.jpg"),
            require("@img/goods/goods-swiper-4-3.webp.jpg"),
          ],
          detail:[
            require("@img/goods/goods-detail-6-1.jpg"),
            require("@img/goods/goods-detail-6-2.jpg"),
            require("@img/goods/goods-detail-6-3.jpg"),
            require("@img/goods/goods-detail-6-4.jpg"),
            require("@img/goods/goods-detail-6-5.jpg"),
            require("@img/goods/goods-detail-6-6.jpg")
          ]
        },
        {
          name:"【二手95新】 劳力士 日本进口 执行系列 试吃品18K白金打造",
          img:require('@img/goods/goods-6.jpg'),
          price:"2050000",
          volume:"5683333",
          isDirect: true, 
          isHave: true,
          id:6,
          swiperImgs:[
            require("@img/goods/goods-swiper-13-1.webp.jpg"),
            require("@img/goods/goods-swiper-13-2.webp.jpg"),
            require("@img/goods/goods-swiper-13-3.webp.jpg"),
          ],
          detail:[
            require("@img/goods/goods-detail-8-1.jpg"),
            require("@img/goods/goods-detail-8-2.jpg"),
            require("@img/goods/goods-detail-8-3.jpg"),
            require("@img/goods/goods-detail-8-4.jpg"),
            require("@img/goods/goods-detail-8-5.jpg"),
            require("@img/goods/goods-detail-8-6.jpg"),
            require("@img/goods/goods-detail-8-7.jpg")
          ]
        },
        {
          name:"【二手95新】 劳力士 日本进口 执行系列 试吃品18K白金打造",
          img:require('@img/goods/goods-7.jpg'),
          price:"20067000",
          volume:"13",
          isDirect: true, 
          isHave: true,
          id:7,
          swiperImgs:[
            require("@img/goods/goods-swiper-8-1.webp.jpg"),
            require("@img/goods/goods-swiper-8-2.webp.jpg"),
            require("@img/goods/goods-swiper-8-3.webp.jpg"),
          ]
        },
        {
          name:"【二手95新】 劳力士 日本进口 执行系列 试吃品18K白金打造",
          img:require('@img/goods/goods-8.jpg'),
          price:"20078000",
          volume:"1283",
          isDirect: true, 
          isHave: false,
          id:8,
          swiperImgs:[
            require("@img/goods/goods-swiper-8-1.webp.jpg"),
            require("@img/goods/goods-swiper-8-2.webp.jpg"),
            require("@img/goods/goods-swiper-8-3.webp.jpg"),
            require("@img/goods/goods-swiper-8-4.webp.jpg"),
          ]
        },
        {
          name:"【二手95新】 劳力士 日本进口 执行系列 试吃品18K白金打造",
          img:require('@img/goods/goods-9.jpg'),
          price:"200",
          volume:"12673",
          isDirect: false, 
          isHave: true,
          id:9,
          swiperImgs:[
            require("@img/goods/goods-swiper-9-1.webp.jpg"),
            require("@img/goods/goods-swiper-9-2.webp.jpg"),
            require("@img/goods/goods-swiper-9-3.webp.jpg"),
            require("@img/goods/goods-swiper-9-4.webp.jpg"),
          ]
        },
        {
          name:"【二手95新】 劳力士 日本进口 执行系列 试吃品18K白金打造",
          img:require('@img/goods/goods-10.jpg'),
          price:"300",
          volume:"1253",
          isDirect: true, 
          isHave: false,
          id:10,
          swiperImgs:[
            require("@img/goods/goods-swiper-13-1.webp.jpg"),
            require("@img/goods/goods-swiper-13-2.webp.jpg"),
            require("@img/goods/goods-swiper-13-3.webp.jpg"),
          ]
        },
        {
          name:"【二手95新】 劳力士 日本进口 执行系列 试吃品18K白金打造",
          img:require('@img/goods/goods-11.jpg'),
          price:"4000",
          volume:"1223",
          isDirect: true, 
          isHave: true,
          id:11,
          swiperImgs:[
            require("@img/goods/goods-swiper-13-1.webp.jpg"),
            require("@img/goods/goods-swiper-13-2.webp.jpg"),
            require("@img/goods/goods-swiper-13-3.webp.jpg"),
            require("@img/goods/goods-swiper-13-4.webp.jpg"),
          ]
        },
        {
          name:"【二手95新】 劳力士 日本进口 执行系列 试吃品18K白金打造",
          img:require('@img/goods/goods-12.jpg'),
          price:"200000",
          volume:"1243",
          isDirect: false, 
          isHave: true,
          id:12,
          swiperImgs:[
            require("@img/goods/goods-swiper-9-1.webp.jpg"),
            require("@img/goods/goods-swiper-9-2.webp.jpg"),
            require("@img/goods/goods-swiper-9-3.webp.jpg"),
            require("@img/goods/goods-swiper-9-4.webp.jpg"),
          ]
        },
        {
          name:"【二手95新】 劳力士 日本进口 执行系列 试吃品18K白金打造",
          img:require('@img/goods/goods-13.jpg'),
          price:"2003000",
          volume:"1523",
          isDirect: true, 
          isHave: true,
          id:13,
          swiperImgs:[
            require("@img/goods/goods-swiper-13-1.webp.jpg"),
            require("@img/goods/goods-swiper-13-2.webp.jpg"),
            require("@img/goods/goods-swiper-13-3.webp.jpg"),
            require("@img/goods/goods-swiper-13-4.webp.jpg"),
          ]
        },
        {
          name:`【二手95新】劳力士 日本进口 执行系列 试吃品18K白金打造`,
          img:require('@img/goods/goods-14.jpg'),
          price:"2005000",
          volume:"12773",
          isDirect: false, 
          isHave: true,
          id:14,
          swiperImgs:[
            require("@img/goods/goods-swiper-13-1.webp.jpg"),
            require("@img/goods/goods-swiper-13-2.webp.jpg"),
            require("@img/goods/goods-swiper-13-3.webp.jpg"),
            require("@img/goods/goods-swiper-13-4.webp.jpg"),
          ]
        },
      ],
      MAX_IMG_HEIGHT: 230,
      MIN_IMG_HEIGHT: 178,
      imgStyles:[], // 商品列表 商品的图片样式
      ITEM_MARGIN_SIZE: 8, // 商品列表 商品的margin
      goodsItemStyles:[], //商品列表 商品样式
      goodsViewHeight: '100%', //组件的高度
      /**
       * 垂直 goods-list
       * 网格 goods-grid
       * */ 
      layoutClass:'goods-list',
      layoutItemClass:'goods-list-item'
    }
  },
  methods:{
    /**
     * 监听商品列表滑动事件
     * */ 
    onScrollChange($event){
      // console.log($event.target.scrollTop,"goods组件")
      this.scrollTopValue = $event.target.scrollTop;
    },
    /**
     * 商品点击事件
     * */ 
    onItemClick(item){
      if(!item.isHave){
        alert('该商品无库存')
        return;
      }
      this.$router.push({
        name:"goodsDetail",
        params:{
          routerType:'push'
        },
        query: {
          goods:JSON.stringify(item),
        }
      })
    },
    setSortGoodsData(){
      switch(this.sort){
        case '1':
          this.sortGoodsData = this.dataSource.slice(0); // 深拷贝，不改变原数组
          break;
        case '1-2':
          this.getSortGoodsDataFromKey('price')
          break;
        case '1-3':
          this.getSortGoodsDataFromKey('volume')
          break;
        case '2':
          this.getSortGoodsDataFromKey('isHave')
          break;
        case '3':
          this.getSortGoodsDataFromKey('isDirect')
          break;
      }
    },
    /**
     * 根据传入的key来进行排序
     * sort 进行排序
     * 如果return负数，goods1在前面
     * 如果return正数，goods2在前面
     * 如果是0，排序不变
     * */ 
    getSortGoodsDataFromKey(key){
      this.sortGoodsData.sort((goods1,goods2) => {
        let v1 = goods1[key],
        v2 = goods2[key];
        if(typeof v1 === 'boolean'){
          if(v1){
            return -1;
          }
          if(v2){
            return 1;
          }
          return 0;
        }
        if(parseFloat(v1) >= parseFloat(v2)){
          return -1;
        }
        return 1;
      })
    },
    // 随机的图片高度
    imgHeight(){
      let result = Math.floor(Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT);
      return result;
    },
    // 根据随机图片高度，生成对应图片样式数据
    initImgStyle(){
       this.dataSource.forEach(item => {
          // 随机生成的图片高度
          let imgHeight = this.imgHeight() + 'px';
          this.imgStyles.push({
              height: imgHeight
          })
      });
    },
    // 瀑布流布局
    initWaterfall: function () {
            let $goodsItems = this.$refs.goodsItem;
            if (!$goodsItems) return;
            // 左右两侧距离顶部的高度
            let leftHeightTotal = 0, rightHeightTotal = 0;
            $goodsItems.forEach(($el, index) => {
                let goodsItemStyle = {};
                let elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE;
                if (leftHeightTotal <= rightHeightTotal) {
                    goodsItemStyle = {
                        left: '0px',
                        top: leftHeightTotal + 'px'
                    };
                    leftHeightTotal += elHeight;
                } else {
                    goodsItemStyle = {
                        right: '0px',
                        top: rightHeightTotal + 'px'
                    };
                    rightHeightTotal += elHeight;
                }
                this.goodsItemStyles.push(goodsItemStyle);
            });
            if(!this.isScroll){
              this.goodsViewHeight = (leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal) + 'px';
              return;
            }
        },
    initLayout(){
      this.goodsViewHeight = '100%';
      this.goodsItemStyles = [];
      this.imgStyles = [];
      switch(this.layoutType){
        case '1':
          this.layoutClass = 'goods-list';
          this.layoutItemClass = 'goods-list-item';
          break;
        case '2':
          this.layoutClass = 'goods-grid';
          this.layoutItemClass = 'goods-grid-item';
          break;
        case '3':
          this.layoutClass = 'goods-waterfall';
          this.layoutItemClass = 'goods-waterfall-item';
          this.initImgStyle()
          this.$nextTick(()=> {
            this.initWaterfall();
          })
          break;
      }
    }
  },
  created(){
    this.sortGoodsData = this.dataSource.slice(0);
  },
  activated(){
    this.$refs.goods.scrollTop = this.scrollTopValue
  },
  watch:{
    layoutType(){
      this.initLayout()
    },
    sort(){
      this.setSortGoodsData();
    }
  },
  mounted(){
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
 .goods {
        background-color: $bgColor;
        &-scroll{
          overflow: hidden;
          overflow-y: auto;
        }
        &-item {
            background-color: white;
            padding: $marginSize;
            box-sizing: border-box;
            &-desc {
                width: 100%;
                &-name {
                    font-size: $infoSize;
                    line-height: px2rem(18);
                    &-hint {
                        color: $hintColor;
                    }
                }
                &-data {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: $marginSize;
                    &-price {
                        font-size: $titleSize;
                        color: $mainColor;
                        font-weight: 500;
                    }
                    &-volume {
                        font-size: $infoSize;
                        color: $hintColor;
                    }
                }
            }
        }
    }
// 瀑布流
.goods-waterfall {
  position: relative;
  margin: $marginSize;
  &-item {
    position: absolute;
    width: 49%;
    border-radius: $radiusSize;
    .goods-item-img {
        width: 100%;
    }
  }
}
//垂直列表
.goods-list{
  &-item {
    display: flex;
    border-bottom: 1px solid $lineColor;
    .goods-item-img {
      width: px2rem(120);
      height: px2rem(120);
   }
   .goods-item-desc{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: $marginSize;
    }
  }
}
// 网格列表
.goods-grid{
  padding: $marginSize;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &-item{
    width: 49%;
    border-radius: $radiusSize;
    margin-bottom: $marginSize;
    .goods-item-img{
      width: 100%;
    }
  }
}
</style>