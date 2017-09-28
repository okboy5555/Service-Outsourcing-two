<template>
    <div>
        <v-header class="profile-header" title="我的帖子">
            <div slot="left" @click="$router.go(-1)">
                <i class="iconfont icon-back1"></i>
            </div>
        </v-header>
        <v-content>
            <ul class="list" v-if="list">
                <template v-for="item in list">
                    <router-link :to="'/analysis/' + item._id">
                    <li>
                        {{ item.title}}
                        <span>{{ item.create_at_ago }}</span>
                    </li>
                    </router-link>
                </template>
            </ul>
        </v-content>
    </div>
</template>

<script>
import api from '../axios.js'
import util from '../utils/toast'
export default {
    data () {
        return {
            list: [],
        }
    },

    created () {
        this.getHistoryTopics();
    },
    methods: {
        getHistoryTopics () {
            api.getHistoryTopics().then(({data}) => {
                if(data.errno) return util.toast(data.data)
                this.list = data.data[0];
            })
        },   
        swipe (evt) {
            if(evt.direction === 'Right') this.$router.go(-1);
        }
    },

}
    
</script>

<style lang="stylus" scoped>
.icon-back1
  font-size: 1.5rem    
.list 
  font-size: .5rem
  color: #333
  li
    border-bottom: .05rem solid #eee
    padding: 0.5rem
    span
      float: right
      color: #3897ff
      font-size: .8rem
</style>