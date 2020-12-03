import Vue from 'vue'
const state = {
  isIphoneX:false, // 当前设备是否为iphonex
  shoppingDatas:[]
}
const mutations = {
  /**
   * 添加商品到购物车
   * */ 
  addShoppingData(state,goods){
    console.log(goods,"添加数据")
    const isExit = state.shoppingDatas.some(item => {
      if(item.id === goods.id){
        item.number += 1
        return true;
      }
    })
   
    if(!isExit){ // 表示不包含这个新增加的商品
      // 添加商品时为商品增加两个属性，isCheck number，并且要是响应式的，通过Vue.set()
      // 如果通过goods.isCheck，那么isCheck就不是响应式的数据
      Vue.set(goods,'isCheck',false)
      Vue.set(goods,'number',1)
      state.shoppingDatas.push(goods)
    }
  },
  /**
   * 更改指定商品数量
   * */ 
  changeShppingDataNumber(state,data){
    state.shoppingDatas[data.index].number = data.number;
  },
  /**
   * 修改iphonex
   * */ 
  setIsIphoneX(state,isIphoneX){
    state.isIphoneX = isIphoneX;
  }
}
export default{
  namespaced: true,
  state,
  mutations,
};