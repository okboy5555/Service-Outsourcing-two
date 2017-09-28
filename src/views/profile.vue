<template>
    <div>
        <v-header class="profile-header" v-if="user" :title="user.nickname">
            <div slot="left" @click="$router.go(-1)">
                <i class="iconfont icon-back1"></i>
            </div>
        </v-header>
        <v-content v-if="user" v-finger:swipe="swipe">
            <div class="profile">
                <div class="profile-bg">
                    <img src="/static/img/bg.jpg" />    
                </div>
                <div class="headimg" flex="cross:center main:center">
                    <img :src='user.avatar' />
                </div>
                <div class="follow" flex="main:center">
                    <span>关注了 {{ user.following_count}} 人</span><span class="divider">|</span><span>关注者 {{ user.follower_count }} 人</span>
                </div>
                <div class="operator" flex="main:center">
                    <button>关注</button>
                    <button>私信</button>
                </div>
                <div class="score">
                    <ul flex="box:mean">
                        <li><span>{{user.score}}</span><p>积分</p></li>
                        <li><span>{{user.score}}</span><p>被采纳</p></li>
                        <li><span>{{user.score}}</span><p>获赞</p></li>
                        <li><span>{{user.score}}</span><p>答对题</p></li>
                        <li><span>{{user.create_at_ago.slice(0,-1)}}</span><p>鸥龄</p></li>
                    </ul>
                </div>
                <div class="list">
                    <ul flex="box:mean">
                        <li :class="{ active: type == 0 }">动态</li>
                        <li :class="{ active: type == 1 }">打卡</li>
                    </ul>
                </div>
            </div>
        </v-content>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import api from '../axios'
import util from '../utils/toast'

export default {
    data () {
        return {
            user: null,
            type: 0,
        }
    },
    created () {
        this.getUser()
    },
    methods: {
        getUser () {
            var user_id = this.$route.params.id;
            api.getOtherUserData(user_id).then(({data}) => {
                if(data.errno) return util.toast(data.data)
                this.user = data.data;
            })
        },
        swipe (evt) {
            if(evt.direction === 'Right') this.$router.go(-1);
        }
    }
  
}    
</script>

<style lang="stylus" scoped>
.profile-header
  background: #fff !important
  color: #333 !important
.icon-back1
  font-size: 1.5rem
.profile-bg
  height: 12rem
  width: 100%
  img
    width: 100%
    height: 100%
.headimg
  margin-top: -2.5rem
  img
    width: 5rem
    height: 5rem
    border-radius: 50%
.follow
  margin:1rem 0
  font-size: .8rem
.divider
  padding: 0 1rem
.operator
  margin:1rem 0
  button
    display: inline-block
    margin: 0 1rem
    width: 5rem 
    height: 1.5rem
    background: #158cfb
    color: #fff
    font-size: .8rem
    border: .1rem solid #158cfb
    border-radius: .2rem
.score
  width: 100%
  text-align: center
  border-top: .05rem solid #eee
  span
    color: #158cfb
  p
    font-size: .8rem
    color: #ccc
.active
  color: #158cfb
.list
  text-align: center
  li
    border: .05rem solid #eee
    height: 3rem
    line-height: 3rem
</style>