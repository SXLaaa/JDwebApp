<template>
    <swiper :options="swiperOptions">
      <swiper-slide v-for="(item,index) in swiperImgs" :key="index">
        <img class="swiper-slide-img" :style="{height:height}" :src="item" alt="">
      </swiper-slide>
      <!-- 分页器 -->
      <template v-slot:pagination>
        <div class="swiper-pagination">

        </div>
      </template>
    </swiper>
</template>
<script>
export default {
  props:{
    height:{
      type: String,
      default: 'auto'
    },
    swiperImgs:{
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    /**
     * 分页器类型
     * 1 圆点切换
     * 2 数字切换
     * */ 
    paginationType:{
      type: String,
      default:'1'
    }
  },
  created(){
    this.initPaginationLayout();
  },
  data(){
    return{
      // swiper配置
      swiperOptions:{
        autoplay: true, // 自动滚动
        autoHeight: true, // 跟随slide高度变化
        // 分页配置
        pagination:{
          el: ".swiper-pagination", // 分页器对应的html元素
          type: "bullets", // 分页器样式
          bulletClass: "custom-bullet-class" // 分页器内的元素添加类名
        }
      }
    }
  },
  methods:{
    initPaginationLayout(){
      switch(this.paginationType){
        case '1':
          this.swiperOptions.pagination = {
             el: ".swiper-pagination", // 分页器对应的html元素
            type: "bullets", // 分页器样式
            bulletClass: "custom-bullet-class" // 分页器内的元素添加类名
          }
          break;
        case '2':
          this.swiperOptions.pagination = {
             el: ".swiper-pagination", // 分页器对应的html元素
            type: "fraction", // 分页器样式
          }
          break;
      }
    }
  }
}
</script>
<style lang="scss">
@import '@css/style.scss';
.swiper-slide-img {
  width: 100%;
}
// 圆点分页器
.swiper-pagination {
  bottom: px2rem(12);
  .custom-bullet-class {
    box-sizing: border-box;
    border-radius: 100%;
    height: px2rem(6);
    width: px2rem(6);
    border: px2rem(1) solid #fff;
    margin: 0 px2rem(4);
    display: inline-block;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background: white;
  }
}
// 数字分页器
.swiper-pagination-fraction {
  left: auto;
  right: 0;
  width: auto;
  font-size: $infoSize;
  background-color: rgba(0,0,0,0.3);
  padding: px2rem(6) px2rem(16);
  border-top-left-radius: px2rem(16);
  border-bottom-left-radius: px2rem(16);
  bottom: px2rem(32);
  color: white;
  .swiper-pa  gination-current{
    font-size: $titleSize;
    font-weight: bold;
  }
}

</style>