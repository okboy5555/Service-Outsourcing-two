<template>
    <div class="register" v-finger:swipe="swipe">
        <canvas id="login-canvas"></canvas>
        <div class="register-header" flex="main:center">
            <img src="/static/img/brand.png" />
        </div>
        <div class="register-form" flex="main:center cross:center">
            <div>
                <input v-model.trim="nickname" type="text" placeholder="昵称* (3-24个字符)">
                <input v-model.trim="email" type="email" placeholder="邮箱*">
                <input v-model.trim="password" type="password" placeholder="密码* (至少6个字符)"/>
                <button @click="submit(nickname,email,password)">立即注册</button>
            </div>
        </div>
        <div flex="main:center">
            <v-footer></v-footer>
        </div>  
    </div>
</template>

<script>
import { mapActions,mapMutations } from 'vuex'
import utils from '../utils/toast'
import animation from '../utils/background'
import api from '../axios'
export default {
    data () {
        return {
            nickname: '',
            email: '',
            password: '',
        }
    },
    mounted () {
        animation.show();
    },
    methods: {
        // ...mapActions(['send_email', 'set_userInfo']),
        ...mapActions(['signin']),
        submit (nickname, email, password) {
            if ( !nickname || !password || !email ) {
                return utils.toast('您的信息不完整');
            }

            if(!new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/g).test(email)) {
                return utils.toast('无效的邮箱');    
            }

            if(!(nickname.length >= 5 && nickname.length <= 24)) return utils.toast('请输入合法的用户名');

            api.signup({nickname,password,email})
            .then( ({data}) => {
                console.log(data)
                if(data.errno) {
                    return utils.toast(data['data']);        
                }else{
                    this.signin(data.data);
                    utils.toast('注册成功，请查收邮件激活账号后登录',15000);
                    this.$router.push('/login');
                }
            }).catch( (err) => {
                console.log(err);
                return utils.toast('注册失败')
            })                        
        },
        swipe (evt) {
            if(evt.direction === 'Right') this.$router.go(-1);
        }
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
      z-index: -1
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
    .register
      width: 100%
      height: 100%
    .register-header
      position: relative
      top: 2rem
      img
        width: 14.1rem
        height: 3rem
    .register-form
      position: relative
      top: 4rem
    .btn-verify
      display: inline-block
      width: 5rem
      font-size: 1rem
      letter-spacing: 0rem
    .box-verify
      display: inline-block
      width: 12rem
    .btn-disabled
      display: inline-block
      width: 5rem
      font-size: 1rem
      letter-spacing: 0rem
      background: #ccc
      border:0.1rem solid #ccc
</style>