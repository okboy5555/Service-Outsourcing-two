<template>
    <div class="login">
        <canvas id="login-canvas"></canvas>
        <div class="login-header" flex="main:center">
            <img src="/static/img/brand.png" />
        </div>
        <div class="login-form" flex="main:center cross:center">
            <div>
                <input v-model.trim="email" type="email" placeholder="邮箱">
                <input v-model.trim="password" type="password" placeholder="密码"/>
                <button @click="submit(email,password)">立即登录</button>
            </div>
        </div>
        <div class="login-question" flex="main:center">
            <router-link to="register">注册账号</router-link>
            <span>|</span>
            <router-link to="reset">忘记密码</router-link>  
        </div> 
        <div flex="main:center">
            <v-footer></v-footer>
        </div>
    </div>
</template>

<script>
import { mapActions,mapMutations } from 'vuex'
import api from '../axios'
import utils from '../utils/toast'
import animation from '../utils/background'
export default {
    data () {
        return {
            email: '',
            password: '',
        }
    },
    mounted () {
        animation.show();
        // localStorage.clear();
    },
    methods: {
        ...mapActions(['signin']),
        submit(email,password) {
            if(email === '' || password === '') {
                return utils.toast('信息不完整')
            }

            if(!new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/g).test(email)) {
                return utils.toast('无效的邮箱');    
            }

            api.signin({ email, password })
            .then( ({data}) => {
                if(data.data.errno){
                    return utils.toast(data.data.data,3000);
                }
                utils.toast('登录成功');
                socket.emit('login', data.data._id);
                socket.on('test', function(data){alert(data)})
                this.signin(data.data);
                console.log(this.$store.state)
                if(data.data.job == 'unknown') return this.$router.push({ path: '/guide' });                       
                return this.$router.push({ path: '/learn' });                       
            }).catch( (err) => {
                console.log(err);
                return utils.toast('登录失败');
            })
        },
    },
}
</script>

<style lang="stylus" scoped>
    body
      background: #f7fafc
    canvas
      position: fixed
      top: 0
      bottom: 0
      z-index: 0
    input
      display: block
      margin: 1rem 0
      padding: 0 1rem;
      border: 1px solid #ddd;
      width: 18rem
      height: 2.8rem
      font-size: 1rem
    button
      display: block
      width: 20rem
      height: 2.8rem
      border: .1rem solid #158cfb;
      border-radius: 4px;
      text-decoration: none;
      letter-spacing: 0.3rem
      font-size: 1rem
      color: #fff
      background: #158cfb
    .login
      width: 100%
      height: 100%
    .login-header
      position: relative
      top: 2rem
      img
        width: 14.1rem
        height: 3rem
    .login-form 
      position: relative
      top: 4rem
    .login-question
      position: relative
      top: 8rem
      a
        color: #757575
        padding: 0 1rem      
</style>