<template>
    <div>
        <v-header title="主题" class="topic-header">
            <div slot="left" @click="$router.go(-1)">
                <i class="iconfont icon-back1"></i>
            </div>
        </v-header>
        <v-content v-scroll-record class="topic-content" v-finger:swipe="swipe">
        <v-loading v-if="existence"></v-loading>
            <ul v-if="topic">
                <li flex="box:first">
                    <router-link :to="'/user/' + topic.author_id"><img class="headimg" :src="topic.author.avatar"/></router-link>
                    <div class="author">
                        <div flex>
                            <router-link flex-box="0" :to="'/user/' + topic.author_id">{{ topic.author.nickname }}</router-link>
                            <time flex-box="1">{{ topic.create_at_ago }}</time>
                            <div flex-box="0" class="num">#楼主</div>
                        </div>
                    </div>
                </li>
                <li>
                   <div class="tit">{{ topic.title }}</div>
                   <div class="body" v-html="topic.content"></div>
                </li>
                <li class="replies-count" v-if="topic.replies">
                    共(<span>{{ topic.replies.length }}</span>)条回复
                </li>
                <li v-for="(item, index) in topic.replies_author" v-if="item">
                    <div flex="box:first">
                        <div class="headimg">
                            <router-link :to="'/user/' + item._id" ><img class="headimg" :src="item.avatar" /></router-link>
                        </div>
                        <div class="author">
                            <div flex>
                                <router-link flex-box="0" :to="'/user/' + item._id">{{ item.nickname }}</router-link>
                                <time flex-box="1">{{ topic.replies[index].create_at_ago }}</time>
                                <div flex-box="0" class="num">#{{ index + 1 }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="markdown-body reply-body " v-html="topic.replies[index].content"></div>
                    <div class="bottom" flex="dir:right cross:center">
                        <div class="icon" @click="showComment(topic.replies[index])">
                            <i class="iconfont icon-comment"></i>
                        </div>
                        <div class="icon" :class="{up: isUp(topic.replies[index].ups)}" v-if="item.nickname !== topic.author.nickname" @click="upOrDown(topic.replies[index].ups, topic.replies[index]._id, item._id)">
                            <i class="iconfont icon-appreciate_light"></i>
                            <span v-if="topic.replies[index].ups.length != 0">{{ topic.replies[index].ups.length }}</span>
                        </div> 
                    </div>
                    <reply v-if="topic.replies[index].comment" :nickname="item.nickname" :replyId="topic.replies[index]._id" @success="getData"></reply>
                </li>
                <reply :nickname="topic.author.nickname"  @success="getData" class="reply-author"></reply>
            </ul>
        </v-content>
    </div>
</template>

<script>
import routeData from '../libs/index'
import reply from './reply.vue'
import api from '../axios'
import util from '../utils/toast'
import {mapState} from 'vuex'
export default {
    mixins: [routeData],
    components: { reply },
    computed: mapState(
        {
            user: (state) => state.user
        }
    ),
    data () {
        return {
            comment: false,
        }
    },
    routeData () {
        return {
            existence: true,
            topic: '',
        }
    },
    mounted () {
        this.getData();
    },
    methods: {
        getData () {
            let topic_id = this.$route.params;
            api.getTopicData(topic_id).then(({data}) => {
                if(data.errno) {
                    return util.toast(data.data);
                }
                var _topic = data.data;
                _topic.replies.forEach((item, index, arr,) => (arr[index].comment = false))
                this.topic = _topic;
                this.existence = false;
            })
        },

        isUp (ups) {
            return ups.indexOf(this.user._id || '') > -1
        },

        upOrDown (ups, replyId, replyAuthorId) {
            let topicId = this.$route.params.id;
            var index = ups.indexOf(this.user._id)
            if (index > -1) {
                ups.splice(index, 1)
            } else {
                ups.push(this.user._id)
            }
            api.upReply({topicId, replyId}).then(({data}) => {
                if(data.errno) {
                    ups.splice(index, 1)
                    return util.toast(data.data)
                }
            })
        },

        showComment (item) {
            if(item.comment === undefined) item.comment = false;
            item.comment = !item.comment;
        },

        swipe (evt) {
            if(evt.direction === 'Left') this.$router.push('/community')
        }
    }

}
</script>

<style lang="stylus" scoped>
.topic-content
  padding: 0 .5rem !important
time 
  line-height: .7rem 
  font-size: .7rem  
  color: #aaa 
.topic-header
  background: #fff !important
  color: #333 !important
.topic-theme
  text-align: center
.iconfont
  line-height: 2rem
.icon-back1
  font-size: 1.5rem
.headimg 
  overflow: hidden 
  width: 2.3rem 
  height: 2.3rem
  border-radius: 50% 
  background-position: center center 
  background-size: cover 
.author
  a
    padding-left: .5rem
    color: #3897ff
  time
    padding-left: 1rem
    line-height: 1.5rem
.num
  font-size: .8rem
.tit
  padding: .8rem 0
  padding-right: .8rem 
  line-height: 1.2rem
  font-size: 1rem
  font-weight: bold 
  color: #000
  border-bottom: .1rem solid #ddd
.body
  padding: .8rem 0
.replies-count
  border-left: 5px solid #3897ff
  padding: .2rem
  padding-left: .4rem
  span
    color: #3897ff
.reply-body
  margin: .3rem 0
  margin-left: 2.8rem
  font-size: 1rem
.icon
  margin: .2rem .5rem
  .iconfont
    font-size: 1rem
  span
    font-size: .9rem
li
  border-bottom: .1rem solid #eee
.up
  color: #3897ff
.replies_author
  position: fixed
  bottom: 0
</style>