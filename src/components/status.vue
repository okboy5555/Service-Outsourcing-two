<template>
    <div class="status">
        <div v-if="inTest">
            <div class="title" flex="box:mean">
                <div @click="check">交卷</div>
                <div></div>
            </div>
            <div class="list">
                <div class="box" @click="redirect(index)" v-for="(item,index) in list"  :class="{'filled': item.finished == true, 'marked': item.marked == true }">{{index + 1}}</div>
            </div>
        </div>
        <div v-else class="list">
            <div class="title" flex="box:mean" v-show="!inResult">
                <div></div>
                <div @click="clear">回到主页</div>
            </div>
            <div class="box" @click="redirect(index)" v-for="(item,index) in analysis_list"  :class="{'right': item == true, 'wrong': item == false }">{{index + 1}}</div>
        </div>
    </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
export default {
    props: ['inTest','inResult'],
    computed: mapState({
      list: (state) => state.list,
      analysis_list: (state) => state.analysis_list
    }),
    data: function () {
      return {
        // list: [],

      }
    },
    mounted () {
      // this.get_statuslist()
      // this.list = JSON.parse(localStorage.getItem('evaluate_now_status'))
    },
    methods: {
      // ...mapActions(['get_statuslist']),
      redirect (index) {
        this.$emit('fromStatus',index)  
      },

      check () {
        this.$emit('showTip')
      },

      clear () {
        this.$router.push('/learn');
        localStorage.removeItem('evaluate_now_list')
        localStorage.removeItem('evaluate_now_count')
        localStorage.removeItem('evaluate_now_test')
      }
    }
}
</script>

<style lang="stylus" scoped>
.status
  position: fixed
  bottom: 0
  left: 0
  width: 100%
  height: auto
  z-index: 999
  flex-wrap: wrap
  background: #fff
  border-top-left-radius: .5rem
  border-top-right-radius: .5rem
.title
  height: 3rem
  font-size: .8rem
  text-align: center
  line-height: 3rem
  border-bottom: .05rem solid #eeeeee
  div
    border-right: .05rem solid #eeeeee
  div:last-child
    border:none
.list
  margin: 0 auto
.box
  display: inline-block
  margin: .4rem
  padding: .5rem
  width: 2rem
  height: 2rem
  border-radius: .2rem
  line-height: 2rem
  text-align: center
  border: .05rem solid #eaeaea
.filled
  background: rgba(0, 158, 231, .1)
  color: #009ee7
  border: .05rem solid #009ee7
.marked
  background-color: rgba(255, 164, 0, .1)
  color: #FFA400
  border: .05rem solid #FFA400
.right
  background: rgba(0, 158, 231, .1)
  color: #009ee7
  border: .05rem solid #009ee7
.wrong
  background: rgba(255, 0, 0, .1)
  color: #ff0000
  border: .05rem solid #ff0000
</style>