const state = {
  username: undefined
}
const mutations = {
  /**
   * 指定username
   * */ 
  setUsername(state,username){
    state.username = username
  },
  /**
   * 退出登陆，处理username
   * */ 
  clearUsername(state){
    console.log('清空用户名')
    state.username = undefined;
  }
}
export default{
  namespaced: true,
  state,
  mutations
};