<template>
  <div class="goods-list-page">
    <navugation 
      @onleftclick="onLeftClick"
      :pageName="'商品列表'"
    >
      <template v-slot:nav-right>
        <img :src="layoutType.icon" alt="" @click="onChangeLayout">
      </template>
    </navugation>
    <!-- 筛选项 -->
    <div class="goods-list-page-content" :class="{'iphonex-top' : $store.state.shopping.isIphoneX}">
      <goodsOptions @optionsChange="optionsChange"/>
      <goods :layoutType="layoutType.type" :sort="sortType"/>
    </div>
  </div>
</template>
<script>
import navugation from '@c/currency/navigation.vue'
import goodsOptions from '@c/goods/goodsOptions.vue' 
import goods from '@c/goods/goods.vue'
export default {
  name:'goodsList',
  components:{
    navugation,goodsOptions,goods
  },
  data(){
    return{
      scrollTopValue: 0,
      layoutTypeDatas:[
        {
          type:'1',
          icon:require('@img/list-type.svg')
        },
        {
          type:'2',
          icon:require('@img/grid-type.svg')
        },
        {
          type:'3',
          icon:require('@img/waterfall-type.svg')
        },
      ],
      // 当前展示形式
      layoutType:{},
      sortType:'1'
    }
  },
  created(){
    this.layoutType = this.layoutTypeDatas[0];
  },
  methods:{
    onLeftClick(){ // 后退按钮点击事件
      this.$router.go(-1); // 返回上一级路由
    },
    onChangeLayout(){
      if(this.layoutType.type === '1'){
        this.layoutType = this.layoutTypeDatas[1];
      }else if(this.layoutType.type === '2'){
        this.layoutType = this.layoutTypeDatas[2];
      }else{
        this.layoutType = this.layoutTypeDatas[0];
      }
    },
    optionsChange(sortType){
      this.sortType = sortType
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.goods-list-page{
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: $bgColor;
  display: flex;
  flex-direction: column;
  &-content{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>