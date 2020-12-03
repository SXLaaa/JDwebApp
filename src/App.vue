<template>
  <div id="app">
     <transition :name="transitionName">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>

     <!-- <transition :name="transitionName">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
      </transition>
      <transition :name="transitionName">
        <router-view v-if="!$route.meta.keepAlive" />
      </transition> -->
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  data(){
    return{
      transitionName:'fold-left',
      // 虚拟任务栈
      virtualtaskStack:[
        'Main'
      ]
    }
  },
  created(){
    this.setIsIphoneX(window.isIphoneX)
    // 指定mnative主动调用的方法
    window.nativeFunctionUserLogin = this.nativeFunctionUserLogin();
  },
  methods:{
    ...mapMutations({
      setIsIphoneX: 'shopping/setIsIphoneX',
      setUsername: 'user/setUsername'
    }),
    /**
     * 提供给native调用的方法，可以接受自动登录的用户名
     * */ 
    nativeFunctionUserLogin(username){
      // 保存自动登陆的username到vuex
      this.setUsername(username)
    }
  },
  watch:{
    '$route'(to,from){
      // console.log(to)
      const routerType = to.params.routerType;
      if(routerType === 'push'){
        // console.log(1111)
        this.transitionName = 'fold-left'
      }else{
        // console.log(2222)
        this.transitionName = 'fold-right'
      }
      if(to.clearTask){ // 清空虚拟任务栈
        this.virtualtaskStack = ['Main']
      }
    }
      

    // '$route'(to,from){
    //   console.log(to)
    //   const routerType = to.meta.keepAlive;
    //   if(routerType){
    //     this.transitionName = 'fold-left'
    //   }else{
    //     this.transitionName = 'fold-right'
    //   }
    //   console.log(this.$router)
    // }


    // '$route'(to,from){
    //   const routerType = to.params.routerType;
    //   console.log(to)
    //   if(routerType === 'push'){
    //     // console.log(routerType,to.name)
    //     // 进入新页面时，保存新页面名到虚拟任务栈
    //     this.virtualtaskStack.push(to.name)
    //     this.transitionName = 'fold-left'
    //   }else{
    //     console.log('22222')
    //     // 后退时，把最后一个页面从虚拟任务栈中弹出
    //     this.virtualtaskStack.pop();
    //     this.transitionName = 'fold-right'
    //   }
    // }
  }
}
</script>
<style lang="scss">
@import '@css/style.scss';
#app{
  width: 100%;
  height: 100%;
  
  // push 页面时：新页面的进入动画
    .fold-left-enter-active {
      animation-name: fold-left-in;
      animation-duration: .4s;
    }
    @keyframes fold-left-in {
        0% {
          transform: translate(100%, 0);
        }
        100% {
          transform: translate(0, 0);
        }
    }

    // push 页面时：原页面的退出动画
    .fold-left-leave-active {
      animation-name: fold-left-out;
      animation-duration: .4s;
    }
    @keyframes fold-left-out {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(-100%, 0);
        }
    }

    // 后退页面时：即将展示页面的动画
    .fold-right-enter-active {
      animation-name: fold-right-in;
      animation-duration: .4s;
    }
    @keyframes fold-right-in {
        0% {
          transform: translate(-100%, 0);
        }
        100% {
          transform: translate(0, 0);
        }
    }

    // 后退页面时：后退的页面的动画
    .fold-right-leave-active {
      animation-name: fold-right-out;
      animation-duration: .4s;
    }
    @keyframes fold-right-out {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(100%, 0);
        }
    }
}
</style>
