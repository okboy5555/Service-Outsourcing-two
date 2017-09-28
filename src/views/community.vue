<template>
    <div>
    <v-nav></v-nav>
        <div class="community-header">
            <ul flex="box:mean">
                <li :class="{ active: !this.$route.query.tab }">
                    <router-link to="/community">全部</router-link>
                </li>
                <li :class="{ active: this.$route.query.tab == 'good' }">
                    <router-link to="/community?tab=good">精华</router-link>
                </li>
                <li :class="{ active: this.$route.query.tab == 'share' }">
                    <router-link to="/community?tab=share">分享</router-link>
                </li>
                <li :class="{ active: this.$route.query.tab == 'ask' }">
                    <router-link to="/community?tab=ask">问答</router-link>
                </li>
                <li :class="{ active: this.$route.query.tab == 'job' }">
                    <router-link to="/community?tab=job">招聘</router-link>
                </li>
            </ul>
        </div>
        <router-link class="create" to="/create">+</router-link>
        <v-content v-scroll-record class="community-content" v-finger:swipe="swipe">
            <ul class="list">
                <li v-for="item in list" key="item._id">
                    <router-link :to="'/community/topic/' + item._id">
                        <div class="type" flex v-if="item.is_top || item.is_good">
                            <div class="type-good" v-if="item.is_good">精华</div>
                            <div class="type-top" v-if="item.is_top">置顶</div>
                        </div>
                        <div class="top" flex="box:first">
                            <img class="headimg" :src='item.author.avatar'></img>
                            <div class="box" flex="dir:top">
                                <strong>{{ item.author.nickname }}</strong>
                                <div>
                                    <time>{{ item.create_at_ago }}</time>
                                    <span class="tag">#{{convertTab(item.tab)}}#</span>
                                </div>
                            </div>
                        </div>
                        <div class="tit">{{ item.title }}</div>
                        <div class="expand" flex="box:mean">
                            <div class="item click" flex="main:center cross:center">
                                <i class="iconfont icon-attention"></i>
                                <div class="num">{{ item.visit_count > 0 ? item.visit_count : '暂无阅读' }}</div>
                            </div>
                            <div class="item reply" flex="main:center cross:center">
                                <i class="iconfont icon-comment"></i>
                                <div class="num">{{ item.reply_count > 0 ? item.reply_count : '暂无评论' }}</div>
                            </div>
                            <div class="item last-reply" flex="main:center cross:center">
                                <time class="time">{{ item.last_reply_at }}</time>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
            <v-loading :complete="complete" :loading="loading" @seeing="seeing"></v-loading>
        </v-content>
        
    </div>
</template>

<script>
import list from '../mixins/list'
export default {
    mixins: [list],
    methods: {
        _pullList () {
            var { page, $route } = this 
            var { tab = '' } = $route.query 
            return {
                url: 'topics',
                data: { page, tab }
            }
        },        
        convertTab (tab) {
            if(tab == 'ask') return tab = '问答'
            if(tab == 'share') return tab = '分享'
            if(tab == 'job') return tab = '职业'
            if(tab == 'good') return tab = 'good'
        },
        swipe (evt) {
            if(evt.direction === 'Right') this.$router.push('/message')
            if(evt.direction === 'Left') this.$router.push('/learn')
        }
    },

}
</script>

<style lang="stylus" scoped>
.community-content
  padding: 0
.community-header
  position: fixed
  top: 0
  right: 0
  left: 0
  height: 3rem
  z-index: 999
  background: #fff
  border-bottom: 1px solid #ddd
  ul
    overflow: hidden
    padding: 0
    margin: 0
    li
      position: relative
      list-style: none
      line-height: 1rem
      padding: 1rem 0
      text-align: center
      a 
        display: block
        text-decoration: none
        font-size: 1rem
        color: #333
.active:after
  content: ""
  position: absolute
  right: 0
  left: 0
  bottom: 1px
  z-index: 1
  height: .1rem
  background: #3897ff
.create
  position: fixed
  bottom: 8rem
  right: 1rem
  height: 2.5rem
  width: 2.5rem
  line-height: 2.5rem
  font-size: 2rem
  text-align: center
  background: #FFCC00
  color: #fff
  border-radius: 50%
  z-index: 999
.list 
  overflow: hidden 
  padding: 0 
  margin-bottom: 3rem
  background: #eee 
  li
    position: relative 
    padding-bottom: .5rem
    padding-left: 1rem
    padding-top: 1rem
    margin-bottom: 0.5rem 
    box-shadow: 0 0 5px #ccc 
    background: #fff 
.top 
  height: 3rem
.headimg 
  overflow: hidden 
  width: 2.3rem 
  height: 2.3rem
  border-radius: 50% 
  background-position: center center 
  background-size: cover 
.box 
  padding-left: .3rem 
strong 
  line-height: 1rem 
  font-size: 1rem 
  font-weight: normal 
time 
  line-height: .7rem 
  font-size: .7rem  
  color: #aaa 
.tag 
  margin-left: .1rem
  line-height: .7rem 
  font-size: .7rem 
  color: #3897ff
.tit 
  padding: .8rem 0
  padding-right: .8rem 
  line-height: 1.2rem
  font-size: 0.5rem
  font-weight: bold 
  color: #000
.expand
  padding: .1rem 0
  color: #aaa;
  font-size: .8rem
.icon-comment
  font-size: 1rem
  margin-bottom: -.2rem
.icon-attention
  font-size: 1rem
  margin-bottom: -.2rem
.num
  padding-left: 0.5rem        
.type
  position: absolute
  right: .2rem
  color: #fff
  font-size: .8rem
  text-align: center
  div
    height: 1.5rem
    width: 2.5rem  
    border-radius: .3rem
.type-good
  background: #3897ff
.type-top
  background: #FF3300
</style>