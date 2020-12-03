<template>
  <div class="parallax" @scroll="onScrollChange">
    <div class="parallax-slow" :style="{top:slowTop}">
      <slot name="parallax-slow"></slot>
    </div>
    <div class="parallax-content z-index-2">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      parallaxScroll:0, // 滑动距离
      SPEED_DIFF: 2, // 速度差（正常和缓慢之间移动差，正常100，缓慢 100 / 2 = 50px）
    }
  },
  methods:{
    onScrollChange($event){
      this.parallaxScroll = $event.target.scrollTop;
      this.$emit('onScrollChange',this.parallaxScroll)
    }
  },
  computed:{
    /**
     * 缓慢区离顶部的距离
     **/ 
    slowTop(){
      return this.parallaxScroll - (this.parallaxScroll / this.SPEED_DIFF) + 'px';
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.parallax{
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  &-slow{
    width: 100%;
    position: relative;
  }
  &-content{
    width: 100%;
    position: relative;
  }
}
</style>