<template>
    <div>
        <div class="message-header">
            <ul flex="box:mean">
                <li :class="{ active: !this.$route.query.type }">
                    <router-link to="/message">用户消息</router-link>
                </li>
                <li :class="{ active: this.$route.query.type == 'system' }">
                    <router-link to="/message?type=system">系统通知</router-link>
                </li>
            </ul>
        </div>
        <v-nav></v-nav>
        <v-content v-finger:swipe="swipe">
            <div class="msg-box" v-if="list.length">
                <ul class="list">
                    <li flex="box:first" v-for="(item, index) in list">
                        <router-link class="user" :to="'/user/' + item.author._id">
                            <img class="headimg" :src='item.author.avatar'></img>
                        </router-link>
                        <div>
                            <div class="name">{{ item.author.nickname }}
                                <time>{{ item.create_at_ago }}</time>
                            </div>
                            <div v-if="item.type == 'at'" class="msg-content">
                                在帖子
                                <router-link :to="'/topic/' + item.topic._id">{{ item.topic.title }}</router-link> 中 @了你

                            </div>
                            <div v-if="item.type == 'reply'" class="msg-content">
                                回复你了的帖子
                                <router-link :to="'/topic/' + item.topic._id">{{ item.topic.title }}</router-link>
                            </div>
                            <div class="markdown-body" v-html="item.reply.content"></div>
                        </div>
                    </li>
                </ul>
            </div>
            <v-loading :complete="complete" :loading="loading" @seeing="seeing"></v-loading>
        </v-content>
    </div>
</template>

<script>
import routeData from '../libs'
import { mapState } from 'vuex'
import util from '../utils/toast'
import api from '../axios'
export default {
    mixins: [routeData],
    routeData () {
        return {
            list: [],
            loading: false,
            complete: false,

        }
    },
    created () {
        this.loading = true,
        this.getList();
    },
    methods: {
        getList () {
            api.getMessages().then(({data}) => {
                if(data.errno) {
                    this.loading = false;
                    this.complete = true;    
                    return util.toast(data.data);
                }
                this.list = data.data;
                this.loading = false;
                this.complete = true;
            })
        },
        
        seeing () {

        },
        swipe (evt) {
            if(evt.direction === 'Right') this.$router.push('/user')
            if(evt.direction === 'Left') this.$router.push('/community')
        }
    }
}    
</script>

<style lang="stylus" scoped>
.message-header
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
.list 
  overflow: hidden 
  padding: 0 
  margin-bottom: 3rem
  background: #eee 
  li
    position: relative 
    padding-bottom: .5rem
    padding-left: .5rem
    box-shadow: 0 0 5px #ccc 
    background: #fff 
    .msg-content
      font-size: .8rem
      a
        color: #3897ff
.user
  margin-right: .5rem
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
.markdown-body
  font-size: .8rem
  background: #eee
  padding: .5rem
</style>