<template>
<!-- 首页组件 -->
  <div class="home" @scroll="onScrollChange" ref="home">
    <!-- 标题组件 -->
    <navigationBar :isShowBack="false" :navBarStyle="navBarStyle">
      <!-- 上插槽 -->
      <template v-slot:nav-left>
        <img :src="navBarCurrentSlotStyle.leftIcon" alt="">
      </template>
      <!-- 中插槽 -->
      <template v-slot:nav-center>
        <search
          :bgColor="navBarCurrentSlotStyle.search.bgColor"
          :hintColor="navBarCurrentSlotStyle.search.hintColor"
          :icon="navBarCurrentSlotStyle.search.icon"
        />
      </template>
      <!-- 下插槽 -->
      <template v-slot:nav-right>
        <img :src="navBarCurrentSlotStyle.rightIcon" alt="">
      </template>
    </navigationBar>
    <div class="home-content">
      <MySwiper
        :swiperImgs="swiperImgs"
        :height="height"
      />
      <Activity>
        <div class="activity-520">
          <img v-for="(item,index) in activityData" :key="index" :src="item" alt="">
        </div>
      </Activity>
      <!-- 功能模块 -->
      <modeOptions/>
      <!-- 秒杀模块 -->
      <seconds :dataSource="secondsData"/>
      <!-- 品购节 -->
      <Activity>
        <div class="activity-pingoujie">
          <img src="@img/pinGouJie.gif" alt="">
        </div>
      </Activity>
      <!-- 商品列表 -->
      <goods :layoutType="layoutType" :isScroll="false"/>
    </div>
  </div>
</template>
<script>
import MySwiper from '@c/swiper/mySwiper.vue'
import Activity from '@c/currency/activity.vue'
import modeOptions from '@c/currency/modeOptions.vue'
import seconds from '@c/seconds/seconds.vue'
import goods from '@c/goods/goods.vue'
import navigationBar from '@c/currency/navigation.vue'
import search from '@c/currency/search.vue'
export default {
  components:{
    MySwiper,Activity,modeOptions,seconds,goods,navigationBar,search
  },
  data(){
    return {
      layoutType:'',
      // 插槽样式 页面未滑动，页面滑动之后的
      navBarSlotStyle:{
        normal:{
          leftIcon: require('@img/more-white.svg'),
          search:{
            bgColor:'#ffffff',
            hintColor:'#999999',
            icon: require('@img/search.svg')
          },
          rightIcon: require('@img/message-white.svg')
        },
        highlight:{
          leftIcon: require('@img/more.svg'),
          search:{
            bgColor:'#d7d7d7',
            hintColor:'#ffffff',
            icon: require('@img/search-white.svg')
          },
          rightIcon: require('@img/message.svg')
        }
      },
      // 当前使用的插槽样式
      navBarCurrentSlotStyle:{},
      // navBar 的定制样式
      navBarStyle:{
        position:'fixed',
        backgroundColor:''
      },
      // 记录页面滚动值
      scrollTopValue:-1,
      // 锚点值
      ANCHOR_SCROLL_TOP: 160,
      swiperImgs:[
        require('@img/swiper-1.jpg'),
        require('@img/swiper-2.jpg'),
        require('@img/swiper-3.jpg'),
        require('@img/swiper-4.jpg'),
        require('@img/swiper-5.jpg'),
        require('@img/swiper-6.jpg'),
        require('@img/swiper-7.jpg'),
        require('@img/swiper-8.jpg')
      ],
      height: this.$store.state.shopping.isIphoneX ? '228px' : '184px',
      activityData:[
        require('@img/520-1.gif'),
        require('@img/520-2.gif'),
        require('@img/520-3.gif')
      ],
      secondsData:[
        {
          icon: require('@img/jingDongMiaoSha-1.jpg'),
          price:"119.1",
          oldPrice:"169.2"
        },
        {
          icon: require('@img/jingDongMiaoSha-2.jpg'),
          price:"119.7",
          oldPrice:"169.1"
        },
        {
          icon: require('@img/jingDongMiaoSha-3.jpg'),
          price:"119",
          oldPrice:"169"
        },
        {
          icon: require('@img/jingDongMiaoSha-4.jpg'),
          price:"119",
          oldPrice:"169.33"
        },
        {
          icon: require('@img/jingDongMiaoSha-5.jpg'),
          price:"119.0",
          oldPrice:"169"
        },
        {
          icon: require('@img/jingDongMiaoSha-6.jpg'),
          price:"119",
          oldPrice:"169"
        },
        {
          icon: require('@img/jingDongMiaoSha-7.jpg'),
          price:"119",
          oldPrice:"169"
        },
        {
          icon: require('@img/jingDongMiaoSha-8.jpg'),
          price:"119",
          oldPrice:"169"
        },
        {
          icon: require('@img/jingDongMiaoSha-9.jpg'),
          price:"119",
          oldPrice:"169"
        },
        {
          icon: require('@img/jingDongMiaoSha-10.jpg'),
          price:"119",
          oldPrice:"169"
        },
      ]
    }
  },
  created(){
    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
    console.log(this.$store.state.shopping.isIphoneX)
  },
  activated(){
    this.$refs.home.scrollTop = this.scrollTopValue
  },
  methods:{
    onScrollChange($event){
      // console.log($event)
      // 计算滚动距离
      this.scrollTopValue = $event.target.scrollTop;
      // 计算nacBar背景颜色（透明度度）
      let opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP;
      this.navBarStyle.backgroundColor = 'rgba(255,255,255, ' + opacity + ')';
      // 设置插槽样式
      if(opacity >= 1){
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight;
      }else{
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
      }
    },
    initData(){
      this.$http.all([
        this.$http.get('/swiperData'),
        this.$http.get('/activits'),
        this.$http.get('/seconds'),
      ]).then(this.$http.spread((swiperData,activityData,seconds) => {
        // console.log(seconds)
      }))
    }
  },
  mounted(){
    this.initData();
    this.$nextTick(()=> {
      this.layoutType = '3'
    })
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.home{
  width: 100%;
  height: 100%;
  background-color: $bgColor;
  overflow-y: auto;
  &-content{
    height: 100%;
    .activity-520{
      margin-top: px2rem(-8);
      border-top-left-radius: px2rem(8);
      border-top-right-radius: px2rem(8);
      img{
        display: inline-block;
        width: 33.33%;
      }
    }
    .activity-pingoujie{
      background-color: white;
      margin-top: $marginSize;
      img{
        width: 100%;
      }
    }
  }
}
</style>