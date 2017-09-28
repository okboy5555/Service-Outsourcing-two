<template>
<div v-finger:swipe="swipe">
    <div class="test-topbar">
        <div class="test-title">{{test.test_type}}</div>
        <div class="title-status"@click="status">{{ count+1 }} / {{test_qid.length}}<i class="iconfont icon-moreunfold"></i></div>
        <div class="test-time">
            <i class="iconfont icon-time"></i>
            <span class="time">{{hour}}:{{min}}:{{sec}}</span>
        </div>
    </div>
    <div class="test-content">
        <v-item :question="question" :option="option" :kind="kind" :count="count"  ref="item" v-on:fromItem="save"></v-item>
    </div>
    <div flex="box:mean" class="test-footer">
        <div @click="prev">上一题</div>
        <div @click="next">下一题</div>
    </div>
    <div class="test-flag" :class="{'test-flag-filled': list[count] && list[count].marked }"  @click="mark">标记</div>

    <transition name="toggle-status">
        <v-status v-show="status_flag" :inTest="inTest" v-on:fromStatus="specify" v-on:showTip="tip"></v-status>
    </transition>
    <transition name="toggle-curtain">
        <div v-show="status_flag" class="curtain"></div>
    </transition>
    <transition name="scale-tip">
        <v-tip v-show="tip_flag" :tipText="tipText" v-on:cancel="cancel" v-on:confirm="confirm"></v-tip>
    </transition>
</div>
</template>

<script>
import utils from '../utils/toast'
import { mapState, mapActions } from 'vuex'
import api from '../axios'

export default {

    computed: mapState(
        { 
            sec: (state) => state.countdown_sec,
            min: (state) => state.countdown_min,
            hour: (state) => state.countdown_hour,
            rest_time: (state) => state.rest_time,
            list: (state) => state.list,
        },
    ),
    data: function () {
        return {
            status_flag: false,
            tip_flag: false,
            question: '',
            option: [],
            count: -1,
            kind: '',
            time: 60,// default is 60
            answer: [],
            ischoosed: [],
            history: [],
            create_at: '',
            inTest: true,
            test: JSON.parse(localStorage.getItem('evaluate_now_test')),
            test_qid: JSON.parse(localStorage.getItem('evaluate_now_test')).test_qid,
            tid: JSON.parse(localStorage.getItem('evaluate_now_test')).test_id,
            tipText: '确定要交卷吗?'
        }   
    },
    mounted () {
        this.init();
        this.count_testtime();
        this.next();
    },
    methods: {
        ...mapActions(['count_testtime','set_test','set_count','set_testtime','init_statuslist']),
        convert () {
            var _rest  = parseInt(((new Date(this.create_at).getTime() + 60000 * this.time) - new Date().getTime())/1000);
            console.log(this.create_at)
            this.set_testtime(_rest);
        },
        init () {
            if(JSON.parse(localStorage.getItem('evaluate_now_count') == 'number')) {
                this.count = parseInt(localStorage.getItem('evaluate_now_count'));
            }else{
                this.count = -1;
                this.set_count(-1);
            }
            this.init_statuslist();
        },
        save (data) {
            var tid = this.tid;
            if(this.count >= 0 && data[1] == 'single'){
                this.answer = data[0];
                this.next();
            }
            
            if(this.count >= 0 && data[1] == 'multiple'){
                this.answer = data[0];
                let answer = this.answer;
                let index = this.count;
                api.saveAnswerByTidIndex({tid, answer, index});
            }
        
        },
        next () {
            if(this.count + 1 >= this.test_qid.length) {
                this.tip_flag = true;
                return utils.toast('已是最后一题')
            }    
            var tid = this.tid;
            this.count++;
            var qid = this.test_qid[this.count];
            var answer = this.answer;
            var index = this.count - 1;
            api.getQuestionByQid({ tid, qid, answer, index })
            .then( ({data}) => {
                if(data.errno) {
                    return utils.toast(data.data);
                }
                this.time = data.data[2].time;
                this.question = data.data[0].question;
                this.option = data.data[0].option ? data.data[0].option : '';
                this.kind = data.data[0].kind ? data.data[0].kind : '';
                this.history = data.data[1].user_answer[index+1] ? data.data[1].user_answer[index+1] : '';
                this.create_at = data.data[1].create_at ? data.data[1].create_at : '';
                this.$refs.item.initABCD(this.history);
                // console.log('time',this.create_at)
                this.convert();
            })
        },
        prev () {
            var tid = this.tid;
            if(this.count == 0) {
                return utils.toast('没有上一题啦');
            }
            this.count--;
            var qid;
            if(this.count < this.test_qid.length) {
                qid = this.test_qid[this.count];
            }
            api.getQuestionByQid({ tid, qid })
            .then( ({data}) => {
                if(data.errno) {
                    return util.toasts(data.data);
                }
                this.question = data.data[0].question;
                this.option = data.data[0].option ? data.data[0].option : '';
                this.kind = data.data[0].kind ? data.data[0].kind : '';
                this.history = data.data[1].user_answer[this.count] ? data.data[1].user_answer[this.count] : '';
                this.$refs.item.initABCD(this.history);
            })
        },
        status () {
            this.status_flag ? this.status_flag = false : this.status_flag = true;

        },
        mark () {
            this.$refs.item.mark();
        },
        specify (index) {
            var {tid, count, test_qid} = this;
            var qid;
            count = index
            if(count < test_qid.length) {
                qid = test_qid[count];
            }
            api.getQuestionByQid({ tid, qid })
            .then( ({data}) => {
                if(data.errno) {
                    return utils.toast(data.data);
                }
                this.count = index;
                this.question = data.data[0].question;
                this.option = data.data[0].option ? data.data[0].option : '';
                this.kind = data.data[0].kind ? data.data[0].kind : '';
                this.history = data.data[1].user_answer[this.count] ? data.data[1].user_answer[this.count] : '';
                this.$refs.item.initABCD(this.history);
            })
            this.status_flag = false;
        },
        tip () {
            this.tip_flag ? this.tip_flag = false : this.tip_flag = true;
        },
        confirm () {
            this.tip_flag = false;
            this.$router.push({ path: '/analysis' });  
        },
        cancel () {
            this.tip_flag = false;
        },
        swipe (evt) {
            if(evt.direction === 'Right') this.prev();
            if(evt.direction === 'Left') this.next();
        }
    }
}
</script>

<style lang="stylus" scoped>
    .clear
     clear: both
    .test-topbar
      position: fixed
      height: 3rem
      width: 100%
      background: #3897ff
      color: #fff
      z-index: 999
    .test-title
      float: left
      margin-top: 1rem
      line-height: 1rem
      margin-left: 1rem
    .title-status
      float: left
      margin-left: 1rem
      margin-top: 1rem
    .test-time
      position: absolute
      right: 0
      padding: 0.75rem
      span
        position: relative
        top: -0.1rem
    .test-content
      position: absolute
      top: 3rem
    .iconfont
      font-size: 1.5rem
    .test-footer
      position: fixed
      bottom: 0
      height: 3rem
      width: 100%
      line-height: 3rem
      border-top: 1px solid #c0c0c0
      background: #F0F0F0
      z-index: 999
      text-align: center
      div:last-child
        border-left: 1px solid #c0c0c0
    .icon-moreunfold
      font-size: 1rem
      padding-left: 0.2rem
    .toggle-status-enter-active, .toggle-status-leave-active 
      transition: all .3s ease-out
    .toggle-status-enter, .toggle-status-leave-active 
      transform: translateY(100%)
    .toggle-curtain-enter-active, .toggle-curtain-leave-active 
      transition: opacity .1s
    .toggle-curtain-enter, .toggle-curtain-leave-active 
      opacity: 0
      transform: opacity
    .test-flag
      position: fixed
      right: 0.5rem
      bottom: 5rem
      text-align: center
      height: 2.5rem
      width: 2.5rem
      line-height: 2.5rem
      font-size: .8rem
      border-radius: 50%
      border: .05rem solid rgba(255, 164, 0, 0.8)
      box-shadow: 0 0 .1rem .05rem rgba(0, 0, 0, 0.09);
    .test-flag-filled
      background: rgba(255, 164, 0, 0.8)
      color: #fff
    .scale-tip-enter-active, .scale-tip-leave-active 
      transition: all .3s ease;
    .scale-tip-enter
      transform: scale(.3)
    .scale-tip-leave-active 
      transform: scale(1)
    .tip-container
      position: fixed
      top: 0
      bottom: 0
      left: 0
      right: 0
      z-index: 9
    .curtain
      position: fixed
      top: 0
      bottom: 0
      left: 0
      right: 0
      background: #000
      opacity: .5
</style>