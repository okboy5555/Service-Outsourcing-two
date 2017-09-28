<template>
    <div>
        <v-topbar></v-topbar>
        <v-content v-finger:swipe="swipe">
            <div class="user-profile">
                <router-link :to="flag ? '/settings':'/login' " flex="main:left cross:center box:justify">
                    <img :src="user.avatar || ''" />
                    <div class="user-info">
                        <p>{{ user.nickname || '登录/注册'}}</p>
                        <p><i class="iconfont icon-email"></i>{{ user.email || '暂未绑定email' }}</p>
                    </div>
                    <div class="user-arrow">
                        <i class="iconfont icon-right"></i>
                    </div>
                </router-link>
            </div>
            <div class="user-follow">
                <div><i class="iconfont icon-likefill"></i>关注了{{user.following || 0 }}人</div>
                <div><i class="iconfont icon-group_fill"></i>关注者{{user.followers || 0 }}人</div>
            </div>
            <div class="user-list">
                <router-link to="/wrong" class="user-vector">
                    <i class="iconfont icon-training"></i>
                    <span>错题浏览</span>
                    <i class="iconfont icon-right"></i>
                </router-link>
                <router-link to="/history" class="user-vector">
                    <i class="iconfont icon-history"></i>
                    <span>历史试卷</span>
                    <i class="iconfont icon-right"></i>
                </router-link>
                <router-link to="/historyTopic" class="user-vector">
                    <i class="iconfont icon-survey"></i>
                    <span>我的帖子</span>
                    <i class="iconfont icon-right"></i>
                </router-link>
            </div>
        </v-content>
        <v-nav></v-nav>    
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import api from '../axios'
import util from '../utils/toast'
export default {
    data: function () {
        return {
            nickname: '登录/注册',
            email: '暂未绑定email',
            flag: false,
            score: 0,
            avatar:'',
        };
    },
    computed: mapState(
        {
            user: (state) => state.user
        }
    ),

    methods: {
        ...mapActions(['set_user']),
        init () {
            api.getUserData().then(({data}) => {
                if(data.data.errno) {
                    return util.toast('无用户信息，请重新登录')
                }
                
                this.flag = true;
                console.log(data.data)
                this.set_user(data.data);
            }).catch((err) => {
                console.log(err)
                util.toast('请登录')
            })
        },
        swipe (evt) {
            if(evt.direction === 'Left') this.$router.push('/message')
        }
    },
    mounted () {
        this.init();
    }
}
</script>

<style lang="stylus" scoped>
.user
  padding-top: 2rem
.iconfont
  font-size: 1rem
  padding-right: 0.2rem
.user-vector
  display: block
  width: 100%
  height: 2rem
  padding: 0.5rem 0
  line-height: 2rem
  border-bottom: .05rem solid #d0d0d0
  .iconfont
    margin-left: 0rem
    padding-right: 0.2rem
.content
  padding: 0rem
.user-profile
  background: #3897ff
  p
    color: #fff
  img
    margin-left: 0.6rem
    height: 4rem
    width: 4rem
    border-radius: 50%
.user-info
  margin-left: 1rem
.user-list
  padding-right: 0.5rem
  padding-left: 0.5rem
.icon-right
  float: right
.icon-group_fill
  position: relative
  top: 0.1rem
  font-size: 1.3rem
.user-follow
  padding-top: 1rem
  padding-bottom: 1rem
  background: #3897ff
  color: #fff
  div
    display: inline-block
    width: 49%
    height: 1rem
    line-height: 1rem
    text-align: center
  div:first-child
    border-right: .1rem solid #ddd
.user-arrow
  margin: 0 auto
  .icon-right
    color: #fff
</style>