<template>
    <div v-finger:swipe="swipe">
        <div class="topbar" flex="main:center box:last">
            <div class="title">{{ test.type }}</div>
            <span @click="status">{{ count+1 }} / {{length}}<i class="iconfont icon-moreunfold"></i></span>
            <div @click="extra"><i class="iconfont icon-more"></i></div>
        </div>
        <transition name="toggle-curtain">
            <div v-show="status_flag" class="curtain"></div>
        </transition>
        <transition name="toggle-status">
            <v-status v-show="status_flag" :inAnalysis="inAnalysis" v-on:fromStatus="specify" class="status"></v-status>
        </transition>
        <div v-show="result_flag" class="analysis-content">
        <div class="result-score">您在本次{{ test.test_name }}的成绩是<p>{{ Math.round(score) || 0 }}  分</p></div>
            <v-status class="result" :inResult="inResult" v-on:fromStatus="specify"></v-status>
            
            <div flex="box:mean" class="analysis-footer">
                <div @click="seeAnalysis">查看解析</div>
                <div><router-link to="/learn" @click.native="clear">回到首页</router-link></div>
            </div>
        </div>
        <div v-show="!result_flag" class="analysis-content" >
            <v-item :question="question" :option="option" :kind="kind" :count="count" :inAnalysis="inAnalysis" ref="item"></v-item>
            <div class="analysis-offical" v-if="answer && user_answer">
                <span>正确答案<b class="analysis-right">{{ answer.toString() }}</b></span>
                <span>你的答案<b class="analysis-origin">{{ user_answer[count] && user_answer[count].toString() || '空'}}</b></span>
                <div class="analysis-title">推荐解析</div>
                    {{analysis}}
            </div>
            <div class="list">
                <ul>
                    <li></li>
                </ul>
            </div>
           
            <div flex="box:mean" class="analysis-footer">
                <div @click="prev">上一题</div>
                <div @click="next">下一题</div>
            </div>
        </div>
         <transition name="toggle-extra">
            <div class="analysis-extra" v-show="extra_flag">
                <ul>
                    <router-link to=""><li>分享到朋友圈</li></router-link>
                    <router-link to="/learn" @click.native="clear"><li>回到主页</li></router-link>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
import api from '../axios'
import util from '../utils/toast'
import { mapState,mapActions } from 'vuex'
export default {
    data () {
        return {
            result_flag: true,
            status_flag: false,
            extra_flag: false,
            test: '',
            result: '',
            question_arr: [],
            count: 0,
            length: 0,
            inAnalysis: true,
            inResult: true,
            question:'',
            answer: '',
            option: '',
            kind: '',
            history: '',
            analysis: '',
            user_answer: [],
            score: null,
        }
    },
    mounted () {
        this.finish();
    },
    methods: {
         ...mapActions(['init_analysislist']),
        prev () {
            var qid = this.question_arr[this.count - 1];
            var index = this.count -1;
            if(index < 0) return util.toast('没有上一题啦')
            this.getData(index, qid);
            this.extra_flag = false;
            this.inResult = false;
        },
        next () {
            var qid = this.question_arr[this.count + 1];
            var index = this.count + 1;
            if(index >= this.length) return util.toast('已是最后一题')
            this.getData(index, qid);
            this.extra_flag = false;
            this.inResult = false;
        },
        specify (index) {
            // var { question, kind, option, count, question_arr, history, user_answer, result_flag, answer, $refs, status_flag } = this;
            var qid = this.question_arr[index];
            this.getData(index, qid);
            this.extra_flag = false;
            this.status_flag = false;
            this.inResult = false;
        },
        getData (index, qid) {
            api.getAnalysis({ qid }).then(({data}) => {
                if(data.errno) {
                    return util.toast(data.data)
                }
                this.question = data.data.question;
                this.option = data.data.option;
                this.kind = data.data.kind;
                this.answer = data.data.answer;// array
                this.count = index ;
                this.analysis = data.data.analysis;
                this.history = this.user_answer[index] ? this.user_answer[index] : '';
                this.result_flag = false;
                console.log(this.history)
                this.$refs.item.initABCD(this.history, this.answer);    
            }); 
        },
        seeAnalysis () {
            var qid = this.question_arr[0];
            this.getData(0, qid);
        },
        finish () {
            console.log(this.$route)
            if(JSON.parse(localStorage.getItem('evaluate_now_test'))) {
                var tid = JSON.parse(localStorage.getItem('evaluate_now_test')).test_id;
                this.test_name = JSON.parse(localStorage.getItem('evaluate_now_test')).test_name;
            }else if(this.$route.params.id) {
                var tid = this.$route.params.id;
            }else{
                return util.toast('没有正在进行的考试')
            }
             api.finishTest({ tid }).then(({data}) => {
                if(data.errno) {
                    return util.toast(data.data);
                }
                console.log(data)
                this.test = data.data[0];
                this.length = data.data[0].question_id.length;
                this.question_arr = data.data[0].question_id;
                this.result = data.data[1].map((i) => i.answer)
                this.user_answer = data.data[0].user_answer;
                this.score = data.data[2];
                let analysis_list = [];
                this.result.forEach((item,index) => {
                    this.user_answer[index] ? this.user_answer[index] : this.user_answer[index] = '';
                    if(item.toString() == this.user_answer[index].toString()) {
                        analysis_list.push(true)
                    }else{
                        analysis_list.push(false)
                    }
                })
                this.init_analysislist(analysis_list);
            })
        },
        status () {
            this.status_flag ? this.status_flag = false : this.status_flag = true;
        },
        extra () {
            this.extra_flag ? this.extra_flag = false : this.extra_flag = true;
        },
        clear () {
            localStorage.removeItem('evaluate_now_list')
            localStorage.removeItem('evaluate_now_count')
            localStorage.removeItem('evaluate_now_test')
        },
        swipe (evt) {
            if(result_flag) return;
            if(evt.direction === 'Right') this.$router.push('/message')
            if(evt.direction === 'Left') this.$router.push('/learn')
        }
    },
}    
</script>

<style lang="stylus" scoped>
.topbar
  position: fixed
  height: 3rem
  width: 100%
  background: #3897ff
  color: #fff
  z-index: 999
  text-align: center
  span
    line-height: 3rem  
    text-align: left
.icon-moreunfold
  font-size: 1rem
  padding-left: 0.2rem
.title
  line-height: 3rem
.analysis-content
  position: absolute
  top: 3rem
  left: 0
  right: 0
  z-index: 99
.analysis-footer
  position: fixed
  bottom: 0
  height: 3rem
  width: 100%
  line-height: 3rem
  background: #F0F0F0
  z-index: 999    
  text-align: center
  div:last-child
    border-left: 0.05rem solid #c0c0c0
.result
  position:fixed
  top: 8rem
  padding: 0 .2rem
  z-index: 999
.icon-more
  font-size: 1.5rem
  line-height: 3rem
  color: #fff
  margin-right: 1rem
.analysis-offical
  margin: 0 1rem
  position: relative
  top: -2rem
  span
    font-size: .8rem
.analysis-right
  color: red
  margin-left: .3rem
.analysis-origin
  color: #3897ff
  margin-left: .3rem
.analysis-title
  padding: .2rem
  margin: 1rem 0
  text-align:center
  height: 1.5rem
  width: 3.5rem  
  color: #fff
  background: #3897ff
  font-size: .8rem
  line-height: 1.5rem
  border-radius: .3rem
.toggle-status-enter-active, .toggle-status-leave-active 
  transition: all .3s ease-out
.toggle-status-enter, .toggle-status-leave-active 
  transform: translateY(200%)
.toggle-extra-enter-active, .toggle-extra-leave-active 
  transition: all .3s ease-out
.toggle-extra-enter, .toggle-extra-leave-active 
  transform: translateX(100%)
.analysis-extra
  position: fixed
  top: 3rem
  right: 0rem
  z-index: 999
  li
    border-bottom: 0.05rem solid #c0c0c0
    list-style: none
    height: 1rem
    font-size: .8rem
    line-height: 1rem
    color: #333
    padding: .5rem
    text-align: center
    background: #f0f0f0
    z-index: 999
.result-score
  margin: 1rem
  text-align: center
  line-height: 1rem
  font-size: 1rem
  p
    margin: .5rem 0
    font-size: 1rem
    line-height: 1rem
    text-align: center
.toggle-curtain-enter-active, .toggle-curtain-leave-active 
  transition: opacity .1s
.toggle-curtain-enter, .toggle-curtain-leave-active 
  opacity: 0
  transform: opacity
.curtain
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  background: #000
  opacity: .5
  z-index: 100
.status
  margin: 0 auto
</style>