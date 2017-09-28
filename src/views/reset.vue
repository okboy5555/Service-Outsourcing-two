<template>
    <div class="reset" v-finger:swipe="swipe">
        <v-header title="重置密码" class="reset-header">
            <div slot="left" @click="$router.push('/login')">
                <i class="iconfont icon-back1"></i>
            </div>
        </v-header>
        <template v-if="flag == false">
        <div class="container">
            <p>请输入您的注册邮箱</p>
            <input v-model.trim="email" type="email" placeholder="邮箱*">
            <button @click="submit(email)">验证</button>
        </div>
        </template>
        <template v-else>
        <div class="container">
            <p>{{nickname}},请输入新密码</p>
            <input v-model.trim="password" type="password" placeholder="密码*">
            <button @click="reset(token,password)">确认</button>
        </div>
        </template>
    </div>        
</template>

<script>
import utils from '../utils/toast'
import api from '../axios'
export default {
    data () {
        return {
            email: '',
            flag: false,
            token: '',
            nickname: '',
            password: '',
        }
    },

    mounted () {
        this.init();
    },
    methods: {
        init () {
            for(var foo in this.$route.query) {
                if(this.$route.query.hasOwnProperty(foo)){
                    this.flag = true;
                    this.nickname = this.$route.query.name;
                    this.token = this.$route.query.key;
                }else{
                    this.flag = false;
                }
            }
            
        },

        submit (email) {
            // some code to check email
            api.send_resetMail({email}).then(({data}) => {
                console.log('data',data);
                return utils.toast(data.data);
            }).catch((err) => {
                return utils.toast('发送失败');
            })
        },

        reset (token, password) {
            api.reset_pass({token, password}).then(({data}) => {
                if(data.errno) return utils.toast(data.data);
                if (data.errno === 0) {
                    utils.toast(data.data);
                    return this.$router.push({ path: '/login' });
                }
                
            }).catch((err) => {
                return utils.toast('重置失败');
            })
        },

        swipe (evt) {
            if(evt.direction === 'Left') this.$router.go(-1);
        }
    },
}
</script>

<style lang="stylus" soped>
.container
  margin: 0 auto
  margin-top: 4rem
  margin-left: 2rem
.icon-back1
  font-size: 2rem
.reset-header
  background: #fff !important
  color: #333 !important
input
  display: inline-block
  line-height: 1rem
  width: 8rem
  margin: 1rem 0
button
  display: block
  width: 8rem
  height: 1.6rem
  line-height: 1rem
  border: .1rem solid #158cfb
  border-radius: 4px
  text-decoration: none
  font-size: 1rem
  color: #fff
  background: #158cfb
</style>