<template>
  <div class="goods-detail">
    <navgation :isShowBack="false" :navBarStyle="navBarStyle">
      <template v-slot:nav-left>
        <div class="goods-detail-nav-left" @click="onBackClick">
          <!-- 默认 -->
          <img src="@img/back-2.svg" alt="" :style="{opacity:leftImgOpacity}">
          <!-- 上滑 -->
          <img src="@img/back-white.svg" alt="" :style="{opacity:navBarOpcatity}">
        </div>
      </template>
      <template v-slot:nav-center>
          <p class="goods-detail-nav-title" :style="{opacity:navBarOpcatity}">商品详情</p>
      </template>
    </navgation>
    <div class="goods-detail-content" @scroll="onScrollChange">
      <parallax @onScrollChange="onScrollChange">
        <template v-slot:parallax-slow>
           <swiper 
            :height="SWIPER_IMG_HEIGHT + 'px'"
            :swiperImgs="goodsData.swiperImgs"
            :paginationType="'2'"
            ></swiper>
        </template>
        <template>
          <div>
             <!-- 商品详情内容 -->
            <div class="goods-detail-content-desc">
              <div class="goods-detail-content-desc-item">
                <p class="goods-detail-content-desc-item-price">¥{{goodsData.price}}</p>
                <p class="goods-detail-content-desc-item-name">
                  <!-- 是否直营标记 -->
                  <direct v-if="goodsData.isDirect"/>
                  <!-- 商品名称 -->
                  {{goodsData.name}}
                </p>
              </div>
              <div class="goods-detail-content-desc-item">
                <!-- 已选商品 -->
                <p class="goods-detail-content-desc-item-select">已选<span class="single-row-text">{{goodsData.name}}</span></p>
                <!-- 附加服务 -->
                <div class="goods-detail-content-desc-item-support">
                  <ul class="goods-detail-content-desc-item-support-list">
                    <li 
                      class="goods-detail-content-desc-item-support-list-item"
                      v-for="(item,index) in attachDatas"
                      :key="index"
                    >
                      <img src="@img/support.svg" alt="">
                      <span>{{item}}</span>
                    </li>
                  </ul>
                </div>
                <!-- 商品描述（图片） -->
                <div class="goods-detail-content-desc-detail">
                  <img v-for="(item,index) in goodsData.detail" :key="index" :src="item" alt="">
                </div>
              </div>
            </div>
          </div>
        </template>
      </parallax>
    </div>
    <!-- 加入购物车、购买 -->
    <div class="goods-detail-buy" :class="{'iphonex-top' : $store.state.shopping.isIphoneX}">
      <div class="goods-detail-buy-add" @click="onAddGoodsClick">
        加入购物车
      </div>
      <div class="goods-detail-buy-now" @click="onBuyClick">
        立即购买
      </div>
    </div>
  </div>
</template>
<script>
import navgation from '@c/currency/navigation'
import swiper from '@c/swiper/mySwiper'
import direct from '@c/goods/direct'
import parallax from '@c/parallax/parallax'
import {mapState,mapMutations} from 'vuex'
export default {
  name:'goodsDetail',
  components:{
    navgation,swiper,direct,parallax
  },
  data(){
    return{
      SWIPER_IMG_HEIGHT:364,
      goodsData:{},
      // 附加服务数据源
      attachDatas:[
        '可配送海外',
        '京东发货&售后',
        '京准达',
        '211限时达',
        '可自提',
        '不可使用优惠券',
      ],
      // 锚点值
      ANCHOR_SCROLL_TOP:310,
      // 页面滑动值
      scrollValue:0
    }
  },
  created(){
    this.goodsData = JSON.parse(this.$route.query.goods)
    console.log(this.goodsData)
  },
  /**
   * 清除keep-alive缓存
   * */ 
  deactivated () {
    this.$destroy(true)
  },
  methods:{
    /**
     * 购买事件
     * */ 
    onBuyClick(){
      // console.log(this.goodsData)
      this.$router.push({
        name:'buy',
        params:{
          routerType:'push'
        },
        query:{
          goods:JSON.stringify(this.goodsData)
        }
      })
    },
    ...mapMutations({
      addShoppingData: 'shopping/addShoppingData'
    }),

    /**
     * 加入购物车
     * */ 
    onAddGoodsClick(){
      // 保存物品信息到vuex
      this.addShoppingData(this.goodsData)
      alert('添加成功')
      this.$router.push({
        name:'Main',
        params:{
          routerType:'push',
          componentsIndex:1, //toolBar的index
          clearTask:true, // 清空虚拟任务栈
        }
      })
    },
    /**
     * 页面滑动
     * */ 
    onScrollChange(scrollValue){
      this.scrollValue = scrollValue  // 获取页面滑动值

    },
    onBackClick(){
      this.$router.go(-1)
    }
  },
  computed:{
    leftImgOpacity(){ // 默认左侧后退按钮样式
      // scroll / 锚点值 = opcatity
      // 后退按钮逐渐隐藏 1 - croll / 锚点值 = opcatity
      return 1 - this.scrollValue / this.ANCHOR_SCROLL_TOP
    },
    navBarStyle(){ // navBar样式
      return {
        backgroundColor:'rgba(216,30,6, ' + this.navBarOpcatity + ')',
        position: 'fixed',
        top:'0'
      }
    },
    navBarOpcatity(){ // navBar插槽透明度
      // 插槽逐渐展示
      return 1 - this.leftImgOpacity
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.goods-detail{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  &-nav-left{
    width: 100%;
    display: flex;
    position: relative;
    img{
      align-self: center;
      position: absolute;
    }
  }
  &-nav-title{
    width: 100%;
    height: 100%;
    font-size: $titleSize;
    font-weight: bold;
    text-align: center;
    color: white;
  }
  &-content{
    overflow: hidden;
    // overflow-y: auto;
    height: 100%;
    &-desc{
      width: 100%;
      background-color: $bgColor;
      box-shadow: 0 0 px2rem(16) 0 rgba(0,0,0,0.2);
      &-item{
        background-color: white;
        padding: $marginSize;
        margin-bottom: $marginSize;
        &-price{
          font-size: px2rem(20);
          color: $mainColor;
          font-weight: 500;
        }
        &-name{
          margin-top: $marginSize;
          font-size: $titleSize;
          font-weight: 500;
          line-height: px2rem(20);
        }
        // 已选商品
        &-select{
          font-size: $infoSize;
          color: $hintColor;
          height: px2rem(44);
          display: flex;
          align-items: center;
          border-bottom: px2rem(1) solid $lineColor;
          span{
            color: $textColor;
            font-size: $titleSize;
            font-weight: bold;
            margin-left: px2rem(4);
          }
        }
        // 附加服务
        &-support{
          margin-top: $marginSize;
          &-list{
             display: flex;
             flex-wrap: wrap;
             &-item{
               display: flex;
               align-items: center;
               padding: px2rem(6) 0;
               margin-right: $marginSize;
               img{
                 width: px2rem(12);
                 margin-right: px2rem(4);
               }
               span{
                 font-size: $minInfoSize;
                 color: $hintColor;
               }
             }
          }
        }
      }
      // 描述
      &-detail{
        img{
          width: 100%;
        }
      }
    }
  }
  &-buy{
    background-color: white;
    border-top: px2rem(1) solid $lineColor;
    height: px2rem(46);
    line-height: px2rem(46);
    text-align: right;
    div{
      display: inline-block;
      width: px2rem(100);
      text-align: center;
      font-size: $infoSize;
      color: white;
    }
    &-add{
      background-color: $mainColor;
    }
    &-now{
      background-color: darkgoldenrod;
    }
  }
}
</style>