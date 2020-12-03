<template>
<!-- 标题 搜索组件
  1.默认：左边后退，中间页面名称，右边空白
  2.通过插槽配置展示的样式：左中右三个插槽
 -->
  <div 
    class="nav-bar z-index-max" 
    :class="[{'iphonex-top' : $store.state.shopping.isIphoneX},{'bottom-line' : pageName}]"
    :style="navBarStyle"
  >
    <div class="left" @click="$emit('onleftclick')" >
      <!-- 默认 -->
      <img v-if="isShowBack" src="@img/back.svg" alt="">
      <!-- 具名插槽 -->
      <slot name="nav-left"></slot>
    </div>
    <div class="center">
      <!-- 默认 -->
      <span class="page-title" v-if="pageName">{{pageName}}</span>
      <!-- 具名插槽 -->
      <slot name="nav-center"></slot>
    </div>
    <div class="right">
      <!-- 具名插槽 -->
      <slot name="nav-right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    /**
     *  标题名
     * */ 
    pageName:{
      type:String,
      default:""
    },
    /**
     * 是否展示后退按钮
     * */ 
    isShowBack:{
      type:Boolean,
      default: true
    },
    /**
     * nacBar 样式
    */
   navBarStyle:{
     type:Object,
     default:()=>{
       return {
         backgroundColor:'white'
       }
     }
   }
  }
}
</script>
<style lang="scss" scoped>
@import "@css/style.scss";
.nav-bar{
  width: 100%;
  height: px2rem(44);
  line-height: px2rem(44);
  display: flex;
  justify-content: space-between;
  .left, .right{
    display: flex;
    height: 100%;
    width: px2rem(26);
    padding: 0 $marginSize;
    img{
      width: 100%;
      align-self: center;
    }
  }
  .center{
    height: 100%;
    display: flex;
    flex-grow: 1;
    .page-title{
      font-size: $titleSize;
      align-self: center;
      margin: 0 auto;
    }
  }
}
.bottom-line{
   border-bottom: 1px solid $lineColor;;
}
</style>