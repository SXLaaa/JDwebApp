<template>
    <div class="login-page">

        <navigationBar :pageName="'登录'" @onleftclick="onBackClick"></navigationBar>

        <!-- 内容区 -->
        <div class="login-page-content">
            <!-- 用户名 -->
            <div class="input-container">
                <input v-model="username" type="text" placeholder="用户名"> 
            </div>
             <!-- 密码 -->
            <div class="input-container">
                <input v-model="password" type="password" placeholder="密码"> 
            </div>

            <div class="login-page-content-login page-commit" @click="onLoginClick">
                登录
            </div>

            <a class="login-page-content-register" @click="onToRegisterClick">注册新用户</a>
        </div>
    </div>

</template>

<script>
import navigationBar from '@c/currency/navigation.vue'
import {mapMutations} from 'vuex'
export default {
    name: 'login',
    components: {
        navigationBar
    },
    data: function () {
        return {
            // 用户名
            username: '',
            // 密码
            password: '',
            // md5加密的密码
            md5Password:''
        }
    },
    methods: {
        ...mapMutations({
            setUsername: 'user/setUsername'
        }),
        // 后退事件
        onBackClick: function () {
            this.$router.go(-1);
        },
        // 登陆点击事件
        onLoginClick(){
            this.setUsername(this.username)
          if(this.username.length === 0 || this.password.length === 0){
            alert('用户名或密码未输入')
            return;
          }
          // 与原生交互验证用户名和密码
            this.md5Password = this.$md5(this.password)
          // 判断设备
            if(window.androidJSBridge){
                this.onLoginToAndroid();
            }else if(window.webkit){
                this.onLoginToIOS();
            }
        },
        /**
         * 调用android登陆 和 IOS登陆
         * */ 
        onLoginToAndroid(){
            let userJson = JSON.stringify({
                'username' : this.username,
                'password' : this.password
            })
            let result = window.androidJSBridge.login(userJson)
            this.onLoginCallBack(result)
        },
        onLoginToIOS(){
            let userObj = {
                'username' : this.username,
                'password' : this.password
            }
            window.loginCallBack = this.onLoginCallBack() // IOS回调方法
            window.webkit.messageHandlers.login.postMessage(userObj)
        },
        /**
         * 处理登陆接口返回值
         * */ 
        onLoginCallBack(result){
            switch(result){
                case '-1':
                    alert('系统内部错误')
                    break;
                case '0':
                    this.onBackClick();
                    // 保存主动登陆的用户名
                    this.setUsername(this.username)
                    break;
                case '1':
                    alert('登陆用户不存在')
                    break;
                case '2':
                    alert('用户密码错误')
                    break;
            }
        },
        // 注册
        onToRegisterClick(){
          this.$router.push({
            name: 'register',
            params: {
              routerType: 'push'
            }
          })
        }
    }
}
</script>

<style lang="scss" scoped>

    @import '@css/style.scss';

    .login-page {
        // 页面组件过渡动画，脱离标准文档流
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: white;

        &-content {
            width: 100%;
            height: 100%;

            &-login {
                margin-top: 40%;
            }

            &-register {
                font-size: $infoSize;
                color: $hintColor;
                margin-top: $marginSize;
                padding: $marginSize;
                float: right;
            }
        }
    }

</style>