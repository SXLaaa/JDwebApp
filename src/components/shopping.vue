<template>
<!-- 业务逻辑
商品详情点就加入购物车，添加成功，并跳转购物车页面。
跳转成功，展示添加的商品；默认商品是未选中状态。
+ -增加 减少购买数量，当商品数量是1，则不能减少。
加入购物车，如果商品已经存在，则商品数量自动加1。
显示总价格和总数量，当数量发生改变时，价格也改变。
 -->
  <div class="shopping">
        <navigation-bar :pageName="'购物车'" :isShowBack="false"></navigation-bar>

        <div class="shopping-content">
            <div class="shopping-content-list">
                <!-- 商品 -->
                <div class="shopping-content-list-item" v-for="(item, index) in shoppingDatas" :key="index">
                    <!-- check -->
                    <img class="shopping-content-list-item-check" :src="checkImg(item.isCheck)" @click="onGoodsCheckClick(item)" alt="">
                    <!-- 图片 -->
                    <img class="shopping-content-list-item-img" :src="item.img" alt="">

                    <!-- 描述 -->
                    <div class="shopping-content-list-item-desc">
                        <!-- 名称 -->
                        <p class="shopping-content-list-item-desc-name text-line-2">
                            <!-- 直营 -->
                            <direct v-if="item.isDirect"></direct>
                            {{item.name}}
                        </p>

                        <div class="shopping-content-list-item-desc-data">
                            <!-- 价格 -->
                            <p class="shopping-content-list-item-desc-data-price">￥{{item.price | priceValue}}</p>
                            <!-- 商品数量的控制组件 -->
                            <numberManager :defaultNumber="item.number" @onChangeNumber="onChangeNumber(arguments,item,index)"/>
                        </div>
                    </div>
                </div>

               
            </div>

             <!-- 统计 -->
            <div class="shopping-content-total">
                <!-- 全选的 check -->
                <div class="shopping-content-total-check">
                    <img alt="" :src="checkImg(totalData.isAll)" @click="onAllcheckClick">
                    <p>全选</p>
                </div>

                <!-- 总价格 -->
                <div class="shopping-content-total-price">
                    <p class="shopping-content-total-price-total">合计：
                      <span>￥{{totalData.totalPrice | priceValue}}</span>
                    </p>
                    <p class="shopping-content-total-price-all">总额：
                        <span>￥{{totalData.totalPrice | priceValue}}</span>
                        &nbsp;&nbsp;
                        立减<span>￥0.00</span>
                    </p>
                </div>

                <!-- 结算 -->
                <div class="shopping-content-total-commit">
                    去结算({{totalData.goodsNumber}})
                </div>
            </div>

        </div>

    </div>  
</template>
<script>
import {mapMutations, mapState} from 'vuex'
import navigationBar from '@c/currency/navigation.vue'
import direct from '@c/goods/direct.vue'
import numberManager from '@c/goods/numberManager.vue'
export default {
  name:"shopping",
  components:{
    navigationBar,direct,numberManager
  },
  data(){
    return{
      // 购物车数据
      shopping:this.shoppingDatas,
      // 总计
      totalData:{
        isAll:false, // 是否全选
        totalPrice:0, // 总价格
        goodsNumber:0, // 总数量
      }
    }
  },
  created(){
    console.log(this.shoppingDatas)
  },
  methods:{
    ...mapMutations({
      changeShppingDataNumber:'shopping/changeShppingDataNumber'
    }),
    /**
     * arguments js提供的类数组对象
     * arguments === 子组件传递过来的参数
     * $arguments[0] 来获取传递过来的第一个参数
     * */ 
    onChangeNumber($arguments,item,index){
      let number = $arguments[0];
      // 修改对应的商品数量
      let data = {
        index: index,
        number:number
      }
      this.changeShppingDataNumber(data);
      // 商品数量改变，如果该商品是在选中状态，统计数据
      if(item.isCheck){
        this.computedGoodsTotal();
      }
    },
    // 商品单选事件
    onGoodsCheckClick(item){
      item.isCheck = !item.isCheck
      this.computedGoodsTotal();
    },
    // 商品全选事件
    onAllcheckClick(){
      this.totalData.isAll = !this.totalData.isAll
      // 给每个商品选中
      this.shoppingDatas.forEach(item => {
        item.isCheck = this.totalData.isAll
      });
      this.computedGoodsTotal();
    },
    // check按钮图标
    checkImg(isCheck){
      return isCheck ? require('@img/check.svg') : require('@img/no-check.svg')
    },
    // 计算总计数据
    computedGoodsTotal(){
      this.totalData = { // 默认选中
        isAll:true,
        totalPrice:0,
        goodsNumber:0
      }
      // 计算总计数据
      this.shoppingDatas.forEach(item => {
        if(item.isCheck){ // 商品处于选中状态
          this.totalData.totalPrice += parseFloat(item.price) * parseInt(item.number);
          this.totalData.goodsNumber += parseInt(item.number);
        }else{
          this.totalData.isAll = false;
        }
      })
    }
  },
  computed:{
    ...mapState({
      shoppingDatas: state => state.shopping.shoppingDatas
    })
  }
}
</script>
<style lang="scss" scoped>
 @import '@css/style.scss';
.shopping {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-flow: column;

    &-content {
        background-color: $bgColor;
        border-top: px2rem(1) solid $lineColor;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;

        // 商品列表
        &-list {
            height: 100%;
            overflow: hidden;
            overflow-y: auto;

            &-item {
                background-color: white;
                padding: $marginSize;
                display: flex;
                border-bottom: px2rem(1) solid $lineColor;

                &-check {
                    width: $checkSize;
                    align-self: center;
                    padding: px2rem(6);
                }

                &-img {
                    width: $listGoodsImgSize;
                    height: $listGoodsImgSize;
                }

                &-desc {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 0 $marginSize;

                    &-name {
                        font-size: $infoSize;
                        line-height: px2rem(18);
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
                    }
                }
            }
        }

        // 总计
        &-total {
            height: px2rem(56);
            box-sizing: border-box;
            display: flex;
            align-items: center;
            background-color: white;
            border-top: px2rem(1) solid $lineColor;

            &-check {
                display: flex;
                align-items: center;
                margin: 0 $marginSize;

                img {
                    width: $checkSize;
                    height: $checkSize;
                    padding: px2rem(6);
                }

                p {
                    font-size: $infoSize;
                }
            }

            &-price {
                flex-grow: 2;
                display: flex;
                flex-direction: column;

                &-total {
                    font-size: $titleSize;
                    margin-bottom: px2rem(6);

                    span {
                        font-weight: bold;
                    }
                }

                &-all {
                    font-size: $minInfoSize;
                    span {
                        font-weight: bold;
                    }
                }
            }

            &-commit {
                width: px2rem(120);
                height: 100%;
                font-size: $titleSize;
                background-color: $mainColor;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}
</style>