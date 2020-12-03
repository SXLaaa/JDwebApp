<template>
    <div class="register-page">
        <navigationBar :pageName="'注册'" @onleftclick="onBackClick"></navigationBar>

        <!-- 内容区 -->
        <div class="register-page-content">
            <!-- 用户名 -->
            <div class="input-container">
                <input v-model="username" type="text" placeholder="用户名">
            </div>
            <!-- 密码 -->
            <div class="input-container">
                <input v-model="password" type="password" placeholder="密码">
            </div>
            <!-- 确认密码 -->
            <div class="input-container">
                <input v-model="confirmPassword" type="password" placeholder="确认密码">
            </div>

            <div class="register-page-content-register page-commit" @click="onRegisterClick">
                注册
            </div>
        </div>
    </div>
</template>

<script>
import navigationBar from '@c/currency/navigation.vue'
export default {
    name: 'register',
    components: {
        navigationBar
    },
    data: function () {
        return {
            username: '',
            password: '',
            confirmPassword:'',
            md5Password:''
        }
    },
    methods: {
        /**
         * 后退事件
         */
        onBackClick: function () {
            this.$router.go(-1);
        },
        // 注册
        onRegisterClick: function () {
            // 验证用户输入的合法性
            /**
             * 用户没有输出用户名，或者用户没有输入密码，或者用户输入的密码和确认密码不相同 ， return 方法
             */
            if (this.username.length === 0) {
                alert('请完善用户名');
                return;
            }
            if (this.password.length === 0 
            || this.password != this.confirmPassword) {
                alert('请完善密码');
                return;
            }
            // 原生交互，保存密码
            this.md5Password = this.$md5(this.password)
            if(window.androidJSBridge){ // 在window设备
                this.onRegisterToAndroid()
            }else if(window.webkit){ // 在IOS设备
                this.onRegisterToIos()
            }
        },
        /**
         * 调用 android 接口
         * */ 
        onRegisterToAndroid(){
            let userJson = JSON.stringify({
                'username' : this.username,
                'password' : this.md5Password
            })
            let result = window.androidJSBridge.register(userJson)
            this.onRegisterCallBack(result)
        },
         /**
         * 调用 IOS 接口
         * */ 
        onRegisterToIos(){
            let userObject = { // IOS 可以直接接收对象类型的参数
                'username' : this.username,
                'password' : this.md5Password
            }
            window.registerCallBack = this.onRegisterCallBack()
            // IOS不能直接返回返回值,需要把ios回调方法绑定到window对象上
            window.webkit.messageHandlers.register.postMessage(userObject)
        },
        /**
         * 处理原生返回值
         * */ 
        onRegisterCallBack(result){
            if(result){
                alert("注册成功")
                this.onBackClick()
            }else{
                alert("注册失败，请重试")
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    @import '@css/style.scss';

    .register-page {
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: white;

        &-content {
            width: 100%;
            height: 100%;

            &-register {
                margin-top: 40%;
            }
        }
    }

</style>