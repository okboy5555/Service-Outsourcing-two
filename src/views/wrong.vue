<template>
    <div>
        <v-header class="profile-header" title="错题浏览">
            <div slot="left" @click="$router.go(-1)">
                <i class="iconfont icon-back1"></i>
            </div>
        </v-header>
        <v-content v-finger:swipe="swipe">

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

    },
    methods: {
        getWrongQuestions () {
            api.getWrongQuestions().then(({data}) => {
                if(data.errno) return util.toast(data);
                this.list = data.data;
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
</style>