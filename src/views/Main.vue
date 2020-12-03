<template>
  <div class="main">
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
    <toolBar @onChangeFragment="onChangeFragment" ref="toolBar"/>
  </div>
</template>
<script>
import toolBar from '@c/ToolBar.vue'
export default {
  name:'Main',
  components:{
    toolBar,
    'home': () => import('@c/home'),
    'shopping': () => import('@c/shopping'),
    'my': () => import('@c/my')
  },
  data(){
    return {
      currentComponent: 'home'
    }
  },
  methods:{
    onChangeFragment(componentName){
      this.currentComponent = componentName
    },
    // 加载指定的页面组件
    pushFrahment(){
      let componentIndex = this.$route.params.componentsIndex;
      if(componentIndex === undefined) return;
      // 通过toolbar切换组件
      this.$refs.toolBar.pushFragment(componentIndex)
    }
  },
  activated(){
    // keepAlive激活时调用方法
    this.pushFrahment();
  }
}
</script>
<style lang="scss" scoped>
.main{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
}
</style>