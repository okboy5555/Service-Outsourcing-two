<template>
    <div class="settings">
        <v-header title="账户信息">
            <div slot="left" @click="$router.go(-1)">
                <i class="iconfont icon-back1"></i>
            </div>
        </v-header>
        <v-content class="settings-content" v-finger:swipe="swipe">
            <ul>
                <li class="avatar"><input id="upload" type="file" @change="uploadAvatar"/>头像<img :src="user.avatar || ''"/></li></router-link>
                <router-link to="/user/settings/name"><li>用户名<span>{{user.nickname || '无用户信息'}}</span></li></router-link>
                <router-link :to="{path: '/user/settings/select', query: {title: '职业',name: 'job'}}"><li>职业<span>{{user.job || '无用户信息'}}</span></li></router-link>
            </ul>
            <ul>
                <router-link :to="{path: '/user/settings/select', query: {title: '测试时间',name: 'time'}}"><li>测试时间<span>{{user.time || '0' }}分钟</span></li></router-link>
                <router-link :to="{path: '/user/settings/select', query: {title: '试卷题量',name: 'count'}}"><li>题目数量<span>{{user.count || 0 }}</span></li></router-link>
            </ul>
            <ul>
                <router-link to="/reset"><li>修改密码<span><i class="iconfont icon-right"></i></span></li></router-link>
            </ul>
            <button flex="main:center" @click="clear">退出登录</button>
        </v-content>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import api from '../axios'
import util from '../utils/toast'
export default {
    computed: mapState(
        {
            user: (state) => state.user
        }
    ),
    data () {
        return {

        }
    },
    methods: {
    ...mapActions(['signout']),
        clear () {
            this.signout();
            this.$router.push('/login');                       
        },
        uploadAvatar () {

            if(!this.user) return util.toast('请先登录')
            let input = document.getElementById('upload');
            let avatar = new FormData();

            avatar.append('avatar', input.files[0]);
            
            // avatar.getLength((err,length) => {
            //     if(err) console.log(err)
            //     let headers = Object.assign({'Content-Length':length},avatar.getHeaders())

            //     api.uploadAvatar({avatar,headers}).then((data) => {
            //         console.log(data)
            //     }).catch((err) => {
            //         console.log(err);
            //     })  
            // })

            api.uploadAvatar(avatar).then((response)=>{
                console.log(response.data)
            }).catch(e=>{console.log(e)})
            
        },

        swipe (evt) {
            if(evt.direction === 'Right') this.$router.go(-1);
        }
    }
}
</script>

<style lang="stylus" scoped>
.settings
  background: #c0c0c0
  z-index: 999
.settings-content
  padding: .5rem !important
.icon-back1
  font-size: 1.5rem
.icon-right
  font-size: .8rem
ul
  margin: 0
  padding: 0
  font-size: .8rem
  li
    list-style: none
    color: #333
    height: 3rem
    line-height: 3rem
    border-bottom: .05rem solid #ddd
    span
      float: right
.avatar
  height: 4rem
  line-height: 4.5rem
  padding-bottom: .5rem
  img
    float: right
    height: 4rem
    width: 4rem
    border-radius: 50%
  input
    display: block
    position: absolute
    height: 4rem
    width: 100%
    opacity: 0
button
  margin: 1.3rem auto 0
  border: none
  color: #fff
  width: 100%
  height: 2rem
  line-height: 2rem
  border-radius: .2rem
  text-align: center
  font-size: .6rem
  background: #d8584a
  letter-spacing: .1rem
</style>